---
date: 2026-05-05T21:00
title: "A Loop Intelligence Hub guarantees the failure it claims to solve"
categories:
  - ai
tags:
  - agentic-engineering
  - rant
---

Robert Glaser has [a long post](https://www.robert-glaser.de/when-everyone-has-ai-and-the-company-still-learns-nothing/) arguing that individual AI productivity gains do not become organisational gains, and that companies need a 'Loop Intelligence Hub' to capture which agentic workflows produce learning. The diagnosis is right. The fix would guarantee the failure it claims to solve.

The article hit the front page of Hacker News, and the top-voted comment, from a developer called olsondv, refuted the proposal in real time. 'There is simply no motivation to develop this sort of intelligence loop as a dev who has their own responsibilities which their job depend on. Management can ask as nicely as they want, but I'm not going to selflessly share my productivity gains with the broader company for free.' A reply from ravenstine went further: in an employer's market, treat your personal AI workflows as trade secrets. If they want them, they can pay for them.

This is not cynicism. It is a rational read of the incentive structure inside every company that has started asking VPs how many story points AI delivered this sprint. Glaser writes that 'the whole thing dies if it turns into employee scoring' as if that were a risk to be managed by good intent. It is not a risk. It is the default outcome of any system that instruments how individuals use AI, no matter what the kickoff deck says.

## The harness collects what people are willing to be seen doing

Glaser proposes a 'feedback harness' that listens to real work loops, collecting prompts, specifications, reviews, accepted and rejected hypotheses, production signals, rework, human decisions, and interventions. A Loop Intelligence Hub then turns those signals into an enablement backlog, a capability radar, investment briefs, governance gaps. The framing is careful, and the whole edifice rests on engineers routing their genuine work through it.

They will not. Once a system exists that captures which loops produced learning, three things happen quickly. The most productive engineers route their best work outside the harness. The teams furthest along on agentic patterns develop a parallel toolchain on personal accounts. And the harness fills with the kind of demonstrable, well-narrated AI work that makes you look good in a quarterly review. Visible compliance, invisible learning, which is the failure mode Glaser names. The harness produces it.

A manager called daheza describes the mechanism in the same thread. VPs are asking 'how many story points are we getting with AI now', and 'plenty of other managers are fully ready to just give bogus numbers'. His own team has cut stories that used to be five points to three because of AI, and total points delivered per sprint have stayed flat. The unit of measurement is being adjusted to keep the dashboard stable. That is not adoption failure. That is the system behaving exactly as a measured workforce behaves when the measurement turns into a ratchet.

## The bottleneck is somewhere else entirely

The single most upvoted comment on the article, from pards, makes a point Glaser does not address. 'Development speed was never the bottleneck; it's all the other processes that take time: infra provisioning, testing, sign-offs, change management, deployment scheduling etc. Code takes 6-12 months to make it from commit to production. AI makes these post-development bottlenecks worse. Changes are now piling up at the door waiting to get on a release train.'

This is the Theory of Constraints in plain English. If your constraint is post-development, accelerating pre-development creates inventory rather than throughput. A team running Claude Code at five times its previous output, against a release train that ships every six months, has produced five times the merge conflicts, five times the regression surface, and far more stale code that must be re-reasoned about by the time it finally moves. The unshipped code is, as pards puts it, a liability rather than an asset.

Glaser half-acknowledges this. He cites his own [argument](https://www.robert-glaser.de/what-if-iteration-is-all-we-need/) that scrum was built for expensive iteration and that agile organisations preserved the reflexes agile was supposed to remove. But he treats the constraint as a cultural problem about loop sizes and elastic delegation, rather than a structural problem about who owns the deployment pipeline. A Loop Intelligence Hub does nothing for change advisory boards, security review queues, or the manual sign-off your platform team requires before anything reaches production.

It will, however, give you a very nice dashboard about which teams are stretching their loops well.

## What the article gets right

The three capabilities Glaser names are useful before the harness framing flattens them. Agent operations, the control plane for what agents can touch and which actions need approval, is genuine engineering work. Capability distribution, the question of how a useful skill discovered in one team becomes available to others without turning into a dead template, is the harder problem and the more interesting one. The middle layer, loop intelligence, is the one I would not build as a centrally instrumented thing.

The version that works is closer to what the support team in Glaser's own example already does. They turn recurring tickets into workflow automation because they know exactly where the work hurts and nobody in the centre of excellence ever asked the right question. The learning is local, the artefact is functional, and nobody had to publish their prompts to a hub. If a pattern is good enough that another team would want it, the path for it to travel is the platform layer, as a tool, an MCP server, a skill, or a runbook evaluated against real scenarios. The travel does not need a meta-layer watching loops to identify which ones travelled.

## What to actually do

If you are running this rollout in a real company, the useful questions are narrower than the article's framing, and most of them point away from AI.

Start with the deployment pipeline. If your release train ships every six months and your engineers can now produce changes several times faster than before, you are buying inventory you cannot move. The next budget cycle should fund deployment frequency before it funds agentic engineering enablement, because one of those investments compounds and the other turns into queue depth.

Then check the performance reviews. If AI use is touching individual scoring in any form, the ability to learn what is working has already been lost, and any harness built on top will collect performances rather than work. The fix is editorial, not technical, and it has to be in writing before anyone trusts it.

The remaining question is whether a pattern discovered in one team has any path to becoming a real platform capability without passing through a steering committee. If your platform team is allowed to ship a tool, an MCP server, a skill, or a runbook on the back of one team's experience, the learning travels by itself. If everything has to be generalised, governed, and badged before it moves, the patterns will stay where they were discovered and the people who discovered them will keep them private.

The honest answer to 'where is the ROI for the two million euros we paid Anthropic last year' is that you cannot know yet, and that any system designed to tell you will be gamed before the next quarter closes. The companies that will get value from this technology are the ones whose deployment pipelines, platform layers, and incentive structures already work. The ones whose pipelines and incentives are broken will find that AI surfaces the breakage faster than expected, which is itself a useful outcome, and not the one the procurement deck promised.
