---
date: 2026-10-11T20:00:00+01:00
last_modified_at: 2026-10-12
title: The clones are coming home
description: AI is helping people rebuild Adobe and Office as local, open software. Cheaper development could make it easier to leave a vendor, provided users can take their skills and files with them.
categories:
  - ai
tags:
  - software-development
  - open-source
  - copyright
  - agentic-engineering
---

There is something extremely funny about watching people use AI to rebuild the software they are tired of renting.

The promise was that these models would make other people's expensive expertise available on demand. Writing, illustration, programming: describe what you want and the machine will produce something resembling it. Now people are asking for the applications too.

Photoshop. Illustrator. Word. Excel. On my own computer, with the source code, please.

Brandon Thomas's [Crafting Apps](https://getartcraft.com/apps), from ArtCraft, use Claude to attempt just that. The Rust recreations of Adobe's creative tools have been joined by [WordCraft, GridCraft and DeckCraft](https://www.tomshardware.com/software/microsoft-office/creator-of-free-adobe-clones-unveils-open-source-microsoft-office-excel-powerpoint-and-word-replications-autodesk-tools-and-other-subscription-based-services-may-come-next), targeting Microsoft Office. They have native desktop builds, familiar interfaces and public repositories.

I love the ambition. The announcements of Adobe's demise can wait.

PhotoCraft's [11 October roadmap](https://github.com/storytold/photocraft/blob/main/ROADMAP.md) reports all 628 menu items wired up, while estimating readiness for real work at about 45%. WordCraft's [own assessment](https://github.com/storytold/wordcraft/blob/main/ROADMAP.md) lists charts, SmartArt and embedded objects being silently dropped from documents. A command appearing in a menu tells you much less than a client's file surviving an edit.

The [Hacker News discussion](https://news.ycombinator.com/item?id=49958850) mixes detailed failure reports with accounts of simple work going surprisingly well. Later replies describe improvements without agreement about professional usability. [TechRadar's 10 October review](https://www.techradar.com/pro/one-dev-is-recreating-7-adobe-apps-in-rust-for-free-so-i-tested-it-out) found working basics alongside performance problems and broken workflows. Builds are changing quickly enough that reports need a version and a task attached.

Some of the hostility is deserved. Grand claims invite people to test them. Dismissing GIMP, Krita and LibreOffice also grates when their maintainers spent years doing work these newcomers promise to finish in weeks. Enthusiasm for an escape from Adobe does not require pretending the escape route is ready.

What interests me is how that route might get built.

A mature application gives its imitator a considerable advantage: somebody has already worked out what is useful. Its interface records product decisions; its files preserve behaviour that written specifications may leave ambiguous. Where access is lawful, the original can help establish both what to build and whether it works.

PhotoCraft's [public test corpus](https://github.com/storytold/photocraft-corpus) makes this concrete. Scripts create synthetic documents in Photoshop and save them with Photoshop's own rendered composite. PhotoCraft can then check its rendering and file handling against those results. The reference data is pinned so it cannot quietly change what counts as success.

An agent that writes code and invents its own expected answers can congratulate itself on the same misunderstanding twice. An independent reference gives it something to disagree with.

Choosing good tests still takes expertise. A synthetic document cannot stand in for every client project, and a correct image tells you little about how a brush feels on a tablet. But a discovered difference can become a repeatable check. Fix it, keep the check, and the next attempt has less to rediscover.

That collection could outlast the application. If PhotoCraft stalls, a successor could inherit code and an increasingly useful account of Photoshop's behaviour. A properly licensed compatibility corpus could help established alternatives too. This need not be a bet on one team finishing an entire suite.

Access to the original is already a complication. As checked on 12 October, [VectorCraft's instructions](https://github.com/storytold/vectorcraft/blob/main/CLAUDE.md) forbid contributors from running, scripting or measuring Adobe applications, even to create synthetic test files. They cite Adobe's terms and direct contributors towards public documentation and permitted user material. PhotoCraft's corpus still describes using Photoshop for reference results. The repositories' approaches differ; their documents may be changing at different speeds.

Adobe's [terms, section 17](https://www.adobe.com/legal/terms.html), expressly include “monitoring or tracking the inputs and outputs” to recreate an application within their prohibition on reverse engineering. I have not established when that wording appeared or that it was a response to ArtCraft.

As implementation gets cheaper, reliable examples of correct behaviour become more valuable. Restricting observation can make a replacement harder to verify without anybody copying the original source. Part of the competition moves towards who is allowed to find out how software works.

The contract does not settle every legal question. In [SAS Institute v World Programming](https://curia.europa.eu/jcms/upload/docs/application/pdf/2012-05/cp120053en.pdf), the EU court held that program functionality was not protected expression under the Software Directive, and addressed a lawful user's ability to study its operation under specified conditions. That does not decide ArtCraft's position, but the distinction between a vendor's terms and the law matters.

Documentation helps without resolving everything. Adobe [publishes a Photoshop file-format specification](https://www.adobe.com/devnet-apps/photoshop/fileformatashtml/), despite a claim to the contrary in the HN thread. Its introduction distinguishes the format of the data from its interpretation. Knowing where a field lives is only the beginning of reproducing what Photoshop does with it.

“Clean room” needs similar care. The intended separation is between studying behaviour and copying implementation. [WordCraft's rules](https://github.com/storytold/wordcraft/blob/main/AGENTS.md) permit observing Word with synthetic documents while prohibiting inspection of its implementation and copying its assets. Those rules describe a process; they cannot establish what a pretrained model has encountered.

Equally, an unknown training history does not prove a particular output infringes anything. “Claude has seen everything” is speculation. “We told Claude to be clean-room” is not a provenance audit.

The copyright irony is strong enough without exaggerating it. In [Bartz v Anthropic](https://cases.justia.com/federal/district-courts/california/candce/3%3A2024cv05417/434709/231/0.pdf), the June 2025 ruling found the training use at issue to be fair use while rejecting the justification for a separate library of pirated books. Acquisition, training and generated outputs raise different questions. Adobe, meanwhile, [says Firefly is trained on licensed and public-domain material](https://www.adobe.com/ai/overview/firefly/gen-ai-approach.html). Neither fact supports a blanket claim that all models were necessarily trained illegally.

The funny part is an industry selling machines that make other people's accumulated expertise cheaper, then finding its own expensive products candidates for the same treatment. Software has no natural exemption.

The model vendors might profit handsomely. Anthropic can collect money from people trying to reduce their Adobe bill. We could end up moving spending towards an even smaller group of suppliers. Democratising development does not automatically democratise the infrastructure behind it.

Local software gives users something durable from that exchange. An editor built with a hosted model can keep working after its developer stops paying the provider. Moving a layer or saving a document need not require another inference request. The intelligence is rented during construction; the resulting program can be kept and shared.

Maintenance still costs money, as I have [argued before](/2026/01/31/what-becomes-expensive-when-code-becomes-cheap.html). Open source already offers this bargain. AI could make more applications affordable to bring into it, provided someone finishes the work.

Familiarity has value here too. Users have spent years learning their tools.

A photographer's knowledge of masks, shortcuts and presets belongs to the photographer. An alternative that requires relearning every interaction charges them in time before they know whether it can do the job. A compatible workflow lets that investment travel. The [Office discussion's objections about retraining costs](https://news.ycombinator.com/item?id=50043110) are also an argument for making alternatives familiar.

Cloning can preserve bad decisions. But a familiar starting point lets users choose which parts to change. They can keep what they understand and fix what irritates them.

It is tempting to suggest everyone simply build the five per cent of Office they use. Then somebody emails them the other ninety-five per cent.

You choose the features you invoke, but not everything embedded in an incoming document. A narrow interface can still need extensive compatibility machinery underneath. Losing an object you never intended to edit is enough to disqualify an application.

I expect adoption to begin where work has clear boundaries: a finished image export, a document generated from a known template, a batch conversion whose output can be checked. Exchanging complex, editable projects will be harder. Those are plausible footholds, rather than claims about what these builds can reliably do today.

Organisations also buy collaboration, identity, support and somebody to call when work stops. Replacing Word does not replace Microsoft 365. Smaller departures still matter, though. A credible alternative lets a team move one workflow, reduce some seats or refuse an unwanted change. A vendor can lose bargaining power long before it loses every customer.

Making open tools dependable could itself support a business. A design studio might pay for validated imports of its project files, predictable releases and responsibility for breakages. Several studios could share that expense. Collectively maintaining a reliable editor seems far more plausible than every designer nursing a private Photoshop fork.

That suggests a better use for some of the enthusiasm. Fund a public collection of troublesome documents. Pay for regression testing and careful releases. Existing open-source maintainers have years of knowledge to contribute. Treating them as obsolete because their applications took longer to build would waste precisely the expertise these projects need.

Nor will cheap imitation hurt only incumbents. A small developer who discovers a useful workflow may face copies sooner too. I do not want original product work to become unviable while the token supplier gets paid on every attempt to reproduce it. Paying people for thoughtful software is compatible with wanting the freedom to leave it. The difficulty of leaving should not be something a vendor is entitled to preserve indefinitely.

Cloning might also be a useful intermediate step. [WordCraft exposes its shared command system](https://github.com/storytold/wordcraft) to both the interface and automation tools, including MCP. A familiar word processor can become a programmable document engine.

Imagine adding a tool that prepares your particular client pack, checks it and exports the required files. The engine could be maintained collectively while that small addition serves one organisation. Your need would no longer have to be common enough to win space on Microsoft's roadmap.

That is the democratisation I want: more people able to decide what gets built. Some will write changes, some will direct agents, and many will pay somebody competent. Software they are allowed to alter gives all of them somewhere to start.

For ArtCraft, the next convincing evidence will be people repeatedly completing real work, files surviving exchange and fixes staying fixed after the launch excitement fades. Another hundred menu items will tell us less.

I want these projects to become good enough that leaving is practical. I want useful tests and components to survive failed attempts. And I would love to see more of our software budgets go towards improving tools we can keep.

The industry sold us AI as a way to make expensive work reproducible. It would be very funny, and very welcome, if users got to take that promise home.
