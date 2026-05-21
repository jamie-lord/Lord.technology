---
date: 2026-05-21T17:00
title: "The military aircraft tracker I built for an audience of one"
categories:
  - cloudflare
  - personal
tags:
  - workers
  - d1
  - workflows
  - queues
  - adsb
  - claude-code
  - aviation
---

At about half past eleven one evening this week I noticed a US Navy E-6B Mercury orbiting over the North Sea. Not "noticed" in the way of someone who happened to look up — I was on the sofa with a laptop balanced on one knee, and the orbit was being drawn for me, in slow careful circles, by a dashboard I had been building, in evenings and weekends, for the previous eight days. The aircraft is a survivable airborne command post for the strategic nuclear force. It does not normally show up on a flight tracker at all, and when it does, it tends to fly straight lines between US bases. An orbit over the North Sea at FL250 with the callsign blanked is not a routine sight. The dashboard, which I had taught about a hundred small things by then, had quietly composed the event for me as a "rare type" anomaly with a "long sortie" co-signal. I watched the orbit for about forty minutes.

That feeling — the feeling of a system noticing something on my behalf — is the reason the project exists. It is called MilMov, it is closed source, and nobody but me will ever log in. I have a full-time day job; almost all the work on it has been done one-handed on the sofa, in evenings and weekends, with the other hand usually holding a mug of something. What follows is the engineering, the platform, the agent that wrote most of the code, and why the whole thing is private.

## What MilMov actually is

MilMov tracks "interesting" aircraft. Most of the catalogue is military — combat aircraft, transports, tankers, ISR platforms, helicopters, drones — but the underlying source data is curated by the [plane-alert-db](https://github.com/sdr-enthusiasts/plane-alert-db) project, which also flags government VIP movements, special-mission civilian airframes, and a sprinkling of celebrity tail numbers that I deliberately filter out of the "what's happening right now" surfaces because Taylor Swift's jet is not what I am here for. The site polls [ADS-B Exchange](https://www.adsbexchange.com/)'s global feed every five minutes, reconstructs closed flight legs every ten, scores anomalies on the way in and the way out, and serves a server-rendered dashboard from a single Cloudflare Worker.

The current numbers, on the day I am writing this:

- **43,436 flights** captured in the last seven days
- **9,794 anomalies** in the archive, scored across ten dimensions
- **5,125 sorties by C-17 Globemasters alone** in thirty days, across nine operators
- **One developer**, no users other than me, and no AWS bill

![MilMov daily brief](/uploads/milmov-daily-brief.png)

The header above is roughly what greets me when I open the laptop in the morning. The "What's happening" feed is composed events — co-firing anomalies grouped by subject — and the chips on the right are the dimensions they fired on. Four Pilatus PC-21s in formation at FL185 over France. Sixteen British T-6 Texan IIs out of Whiting Field within thirty minutes. A New York State Police Bell 430 squawking emergency. The number in the orange pill on the left is the composed score; the colour intensity is the rarity tier. If you have ever stayed up too late reading Aviation Week, this image is probably already producing a small reaction in your chest.

## It started as a different project

The first version of MilMov was a .NET console app and a Blazor Server site. The first commit lands in March 2022. The early subjects — "ADS-B client decoding single flight data", "Get aircraft type descriptions", "Generate a new cookie" — read like the lab notebook of someone learning the territory in public, because that is what they were. I had a Raspberry Pi receiver in the loft feeding the ground network, a vague sense that I wanted to do *something* with that data beyond contributing it back, and no architecture worth defending. The Blazor site rendered server-side and used SignalR for live updates, which was fine, until I needed it to be globally distributed and cron-driven and resilient to ADS-B Exchange's rate-limit behaviour, at which point hosting it became the whole problem. The project went into hibernation, with one attempted v2 in 2025 that did not make it past August.

I started the Cloudflare rewrite on the 13th of May this year. The commit subject is "Add TypeScript Cloudflare Worker; move C# to csharp/". The C# directory was deleted six days later. This post is being written eight days after that first TypeScript commit. In those eight days the project has grown to 26,637 lines of code across 80 source files and 174 commits, on a single mainline branch, all of them mine, all of them written in evenings and weekends. That number is the part of the story I find slightly unbelievable when I look at it written down, and most of the rest of this post is an attempt to explain why it is not as unbelievable as it looks.

The .NET version was a hobby project I had to host. The Cloudflare version is a hobby project that hosts itself, and it overtook the .NET version in raw scope inside seventy-two hours.

## The ingestion problem is the interesting one

The thing that makes any kind of aircraft tracking interesting is also the thing that makes it hard, which is that the upstream feed is not designed for you. ADS-B Exchange serves a global snapshot every second or so, but it serves it in a binary format called *binCraft*, compressed with Zstandard, gated behind a session cookie that you can only obtain by pretending to be a browser that has just fetched a particular JSON manifest, and rate-limited aggressively if you ask for the historical archive without warming the same cookie first. None of this is hostile — the format exists because JSON for global airborne traffic is enormous, and the cookie exists because the project's economics depend on humans, not bots — but it does mean the first thing your tracker has to do is reverse-engineer the wire format and impersonate a browser politely.

The binary parser was a fascinating exercise. Each aircraft is a 112-byte struct in which integer fields are scaled by powers of ten and validity is encoded in separate bit-flag bytes. A null position is not a missing field; it is a flag bit that is off, against fields that are still present in the buffer. The decoder walks the struct in a `DataView`, scales each integer back to a human unit, and consults `flags73` and `flags74` to decide which of the resulting numbers are real. It is precisely the kind of code that you would expect to take weeks to land cleanly, and that Claude Code drafts in about an hour from a C# reference implementation with a careful prompt. One of my favourite small moments in the codebase is a comment where the parser notes a suspected scaling typo in the reference implementation (a QNH field being multiplied by ten where it should be divided), produces values like 101,000 hPa instead of the expected 1013, and I had to decide which side of the disagreement to land on. The reference was wrong. The atmosphere was right.

The cookie dance is more behavioural than technical. The worker generates an `adsbx_sid` cookie locally, primes it against the `/globeRates.json` endpoint to make it valid, and then uses that cookie for the next two days of binary fetches. The historical-archive endpoint is stricter — a fresh cookie that has not just primed sometimes gets a 429 anyway — so there is a distinct exception type for rate-limit hits and an adaptive throttle that backs off from 300 ms between requests to 1,500 ms after the first 429 of a run. None of this is exposed to the rest of the system. It is one function. It returns a cookie, or it throws.

## Reconstruction is where the lies get caught

A single position fix is data. A flight is interpretation. Stitching one into the other turns out to be the most subtle part of the system.

The pipeline gets a stream of position samples — latitude, longitude, altitude, timestamp, ground/airborne flag — and is asked to produce a closed flight: a takeoff airfield, a landing airfield, a route line, a duration, an altitude profile. The obvious approach (look for the airborne-to-ground transition) breaks immediately, because the upstream feed lies. Aircraft ICAOs are only twenty-four bits, and they are reused across the world, which means a single ICAO sometimes returns positions from two unrelated airframes concatenated into one apparent "flight" that crosses the planet at Mach 6. The MilMov trace cleaner filters anything moving faster than 3,000 knots between adjacent samples — Mach 4-ish ground speed, well past anything operational, and well past the SR-71 that the US Air Force retired in 1998 — and drops sentinel positions at lat ±89.99° that the feed emits when it cannot resolve a location.

A subtler problem is the helicopter that sits with its rotor turning on a forward apron for forty minutes between two short hops, and looks to a naive segmenter like one continuous "airborne" flight with a very strange profile. The reconstruction code looks for any ground-altitude run longer than fifteen minutes inside what the feed has flagged as a single leg, and retroactively splits it. One row in the database becomes two real sorties, with two takeoffs, two landings, two timelines.

Once a flight is closed, a second-pass classifier reads the altitude profile and tags the mission. It looks at the ratio of cruise to loiter, whether takeoff and landing share an airfield, whether the altitude oscillates in touch-and-go shapes. From that, the row ends up tagged as one of `transit`, `training`, `patrol`, or `mixed`. None of this is AI — it is a small state machine over segment durations and altitude bands. The mission type is a column in the flights table; it backs a filter chip on the flights index; it is one of the reasons the dashboard can ever say something more interesting than "this aircraft was airborne for two hours".

The same machinery runs *live*, against still-open flights. Each segment is appended as it stabilises, so the flight-detail page shows takeoff and climb and cruise as they happen rather than after the aircraft has landed.

![A Royal Australian Air Force MC-55A Peregrine airborne over Mississippi](/uploads/milmov-flight-in-progress.png)

The page above is one of those still-in-progress flights, caught while I was writing this. It is a Gulfstream MC-55A Peregrine — a brand-new signals-intelligence platform that the Royal Australian Air Force is still introducing, with single-digit numbers of airframes currently flying — operating out of Majors Airport in Texas, currently over Mississippi at FL388 with a SAMSS-prefixed callsign. The big black card is the live mission, broken row by row into the segment timeline the classifier is building as the aircraft flies it: takeoff at 13:33Z, climb to FL375 over thirteen minutes, ninety-odd minutes of cruise, and the airborne row that grows in real time — 676 nautical miles flown so far, one hour fifty-seven minutes in the air. The strip of tiles below it is the trailing history MilMov has built for this tail since it first appeared: 15 sorties, 36,969 nm total, time aloft of 88 hours, longest mission 3,158 nm, highest altitude FL450. There are not many flight trackers in the world that will surface a one-of-a-handful RAAF SIGINT type and tell you, at a glance, that this is its third sortie in the past thirty days.

The trace itself, in decimated form, lives in R2. One JSON blob per flight, keyed by flight ID, downsampled to the minimum number of points that preserves the shape of the route. R2 is where blob storage should live when you do not care about egress fees — which, on Cloudflare, you do not, because there are none.

## The anomaly framework is the part I am proudest of

Once a flight is closed and a fact-pack has been computed for it, the anomaly engine fires. There are ten dimensions in the current registry, four of them firing inline against live position ticks, six of them firing on flight-close. They are:

- **type-rarity** — a type that has been seen in fewer than a small number of prior flights worldwide
- **type-global-count** — today's count of a type against its trailing average
- **type-region-novelty** — first sighting of a type in a country or region
- **per-airframe-novel-route** — an airframe flying a route pair it has never flown
- **per-airframe-duration** — a flight much longer than the airframe's median
- **per-airframe-inactivity** — an airframe back after a long quiet stretch
- **burst-launch** — N or more aircraft of one type leaving one airfield in a short window
- **spatial-density** — interesting aircraft clustering in one 2° grid cell against the cell's seasonal baseline
- **spatial-type-density** — clustering of *one* type in one cell, which is the formation/exercise detector
- **emergency-squawk** — 7500, 7600, or 7700 observed

A score is computed for each dimension separately, and a composition layer groups co-firing signals on the same subject — say, four T-6 Texans launching from the same airfield within a thirty-minute window, three of them flying a novel route, the cluster also tripping a spatial-type-density spike — into one composed event with a single headline. The composition is the thing that lets the dashboard say "16 × T-6 Texan launched within 30 min" rather than dumping fifty separate signals on me and asking me to fuse them in my head.

The spatial-density detector is my favourite, because it is the only one where the baseline does the interesting work. Every five minutes the discover cron sees what is airborne, buckets each aircraft into a 2° grid cell, and compares each cell's count against the cell's own (day-of-week, hour) EWMA baseline. A spike fires when the z-score crosses two. The cells learn from the same observations that score against them, which keeps the comparison honest — once enough Tuesday evenings have rolled by, a cell off the British coast settles into a notion of what "normal RAF coastal patrol density" looks like, and only fires when it is busier than that. Exercises light it up. So do news events. The grid does not know what news is, and it does not need to.

![MilMov anomaly archive](/uploads/milmov-anomalies.png)

The page above is the anomaly archive. The chips at the top are dimension counts: 3,500 novel-route events, 1,461 coordinated launches, 1,066 rare-type sightings, 471 long sorties, 30 emergencies, 5 air-to-air refuelling events. The last category was the most fun to land. Tankers and receivers do not normally announce themselves; you have to detect them by spatial coincidence of two specific role tags at compatible altitudes within a tight box for long enough that one of them must be donating fuel to the other. It is not a high-volume signal — five events ever, in the live archive at the time of writing — but it is the one I most enjoy spotting in the wild.

## The Cloudflare primitives are quietly load-bearing

I do not believe MilMov would exist if I had had to host it myself. The specific way the Cloudflare primitives compose is what makes a project at this scope tractable for one tired person on a sofa, and it is worth being specific about which primitive does what.

**Workers and Hono** — the entire site is one Worker. There is no frontend host, no separate API gateway, no CDN configuration. Hono routes the requests and JSX renders the pages server-side. The site has no client framework. There is no React, no Svelte, no hydration. Pages ship as HTML with a few inline scripts for the Leaflet maps and the polling refresh. There is nothing on the wire that can be slow.

**D1** — fifteen live tables, twenty-six migrations, sixty-eight hand-written query functions, no ORM. Hand-written is the operative word. The single biggest performance win in the project came from a commit that added two indexes and rewrote one list query as a CTE; the `/types` page went from scanning 3.3 million rows in 225 ms to scanning 158 thousand in 56 ms. SQLite rewards exactly this kind of attention, and D1 inherits the reward.

**R2** — one decimated trace per closed flight, read once when I open the flight-detail page. No egress fees, a generous free tier, and a bucket that grows by thousands of objects a day without making me think about cost.

**Queues** — the reconstruct and compute-facts pipelines both run on Cloudflare Queues. Each has its own producer (a cron that scans for eligible work), its own consumer (a handler that drains the queue with bounded concurrency), and its own dead-letter queue. The compute-facts consumer runs eight invocations in parallel, each fanning out twenty in-flight R2 reads, against a queue depth that can spike to hundreds of thousands after a backfill. It does not break. Queues are the unsexy part of the Cloudflare platform and the most impressive piece of operational engineering they have shipped.

**Workflows** — the per-type historical backfill is a Cloudflare Workflow. When I trigger `/run/backfill-type/C17`, a Workflow class spins up and walks every active C-17 in the system, calls the backfill routine against each, and survives ADS-B Exchange rate-limit retries through the Workflow runtime's own exponential-backoff machinery. The same code, on a long-running VM, would have been a process I would have had to babysit. As a Workflow, it just runs to completion, and the dashboard shows me which airframe it is currently working on because the workflow writes step-level status into D1 as it goes.

**Crons** — seven scheduled triggers, ranging from every five minutes (live ingest) to once a day (baseline rebuild). They are declared in `wrangler.toml`. There is no separate scheduler. There is no calendar. There is no Lambda + EventBridge invoice. They are just there.

There is no LLM in any of this. The project did briefly have a Workers AI binding, for a daily narrative-summary experiment, and I tore it out within the first few days. The deterministic templates over the facts pipeline produced better summaries than the model did, more cheaply, more predictably, and more easily styled. I think about this when I read articles arguing every product now needs to be AI-powered. MilMov needed to be observation-powered. The observations are the thing.

## Claude Code is the reason this is the size it is

It would be easy to overclaim here. Let me try to be precise.

If I had written MilMov by hand at evenings-and-weekends pace, I would have shipped maybe a quarter of the surface area in the same eight days, and the anomaly framework specifically would not exist. The reason I know this is that the .NET version, which I wrote by hand across short bursts in 2022 and again in 2025, got as far as "show me what is airborne and decode the binary feed" before I lost interest in the maintenance overhead of the rest of it. The TypeScript version, in roughly eight days of one-handed sofa evenings, has ten anomaly dimensions, a composition layer, a backfill workflow, a queue-driven reconstruction pipeline, an FTS5 search index, and a full anomaly replay system that can rebuild the archive over arbitrary date ranges without re-fetching traces. The difference is not motivation. The difference is leverage.

Claude Code does most of the actual typing. What I do is decide what to build, decide what the shape of the change is, decide what the data model has to look like, and review the diff. I run the typecheck, I open the migration file, I read the SQL, I push back on the ugly parts. The work that used to be a series of one-week side-quests ("write the queue consumer", "wire up the workflow", "add a column and a migration", "rebuild the index") is now mostly a series of evenings where I describe what I want and review the result. The repository carries a CLAUDE.md that tells the agent how the project is shaped, what conventions matter, where the SQL gotchas are. I add to it whenever I notice a mistake the agent is likely to make twice. The harness, [as I have written elsewhere](https://lord.technology/2026/05/18/the-harness-is-the-product-not-the-model.html), is the product.

The single highest-leverage commit so far is the one that introduced the queue-driven reconstruction pipeline. I described the problem (the in-cron `reconstruct()` was starving on a `LIMIT 25` with no ordering, ingestion was outrunning reconstruction by a factor of about twenty, traces were going un-stitched), described the shape of the fix (move reconstruction onto a queue, producer-consumer split, bounded parallelism for ADS-B Exchange rate limits, dead-letter queue for failures), and pressed send. I reviewed the resulting diff for about thirty minutes, asked for two changes, applied the migration, and deployed. The throughput jump that evening was the biggest single behavioural change the project has had so far. I did not type any of it.

I want to be honest about one other thing. Claude Code makes me a better engineer at this project, not a more careless one. The thing I am better at is the architectural call: what should be a queue, what should be a workflow, what should be a cron, what should be a column versus a derived view, where the indexes need to land, what the right abstraction boundary is. I am worse, at the margins, at remembering syntax for SQLite's `ALTER TABLE` quirks, or how Hono's middleware ordering interacts with cookies, and I no longer particularly care that I am worse at those. The harness handles them. I handle the shape.

![MilMov Boeing C-17 Globemaster 3](/uploads/milmov-type-c17.png)

The page above is the kind of thing I find delightful, partly because every metric on it (the operator distribution, the country distribution, the top airfields, the 30-day activity sparkline, the airborne-right-now count) is one carefully-tuned SQL query against one D1 database, and partly because the C-17 is one of the most aesthetically perfect transport aircraft ever built and I will fight anyone who says otherwise.

## Why it is closed source

The obvious question is why I do not open it up. The honest answer is that the system is finely tuned to my taste, and the value of that tuning is precisely that it is not negotiable with anyone else. I do not want a pull request asking me to add Taylor Swift's jet to the home feed. I do not want an issue thread relitigating whether `Oligarch`-tagged airframes should be in the live map. The project is private the way a workshop is private. There is no roadmap to maintain, no contributor onboarding to write, no GitHub Discussions to ignore. The site has an access-token gate not because the data is sensitive — most of it is on ADS-B Exchange's own site — but because the gate keeps the audience at one person, and one person is the design.

There is a version of this project I could imagine open-sourcing, and it would attract a small, intense community, and I would resent every minute of running it. The version I have built instead is one I love spending evenings inside.

The Cloudflare bill, after a week of running this at full volume, is a single-digit number of dollars. The Claude Code subscription pays for itself any week the project makes me smile, which is most of them.

## What I get out of it

I have learned more about military aviation in the eight days of building this thing than in years of casual reading. I now know which RAF squadrons fly Texans out of which fields, why the US Navy E-6Bs and Air Force E-4Bs co-orbit during certain exercises, what a Royal Australian Air Force C-17 is doing in Diego Garcia, what the standard FL for a Globemaster transatlantic crossing tends to be, which Belarusian An-148 belongs to whom. I have started recognising airframes by registration the way some people recognise birds by song.

I have also learned, in a way no platform documentation ever quite teaches, what the Cloudflare Developer Platform feels like under sustained load from someone being slightly unreasonable about how much they want to do per dollar. I [wrote a book](https://architectingoncloudflare.com/) earlier this year about how these primitives compose; MilMov is what taking my own advice in a single week looks like. It scales further than any hobby project has any right to need. The primitives genuinely compose the way the marketing claims they do. The constraints (the 128 MB memory cap, the 30-second wall on cron invocations, the D1 placeholder limit, the FTS5 tokenizer quirks) push you towards architectures that turn out, even after only a week of running them, to be the architectures I would have wanted in the first place.

The E-6B Mercury that orbited over the North Sea has not reappeared in MilMov since. The composed anomaly is still in the archive, with its decayed score, its dimension tags, its little caption explaining what fired and why. The orbit ended after about three hours; the aircraft turned west, climbed, and went home. Whatever it was doing was none of my business. The fact that the system noticed, on my behalf, while I was on the sofa with one hand free and a day job to do in the morning — that is the whole point of the project, and the whole point of building anything for an audience of one.
