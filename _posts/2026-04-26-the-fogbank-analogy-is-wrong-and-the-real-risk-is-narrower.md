---
title: "The Fogbank analogy is wrong, and the real risk is narrower"
date: 2026-04-26T18:30
categories: ai
tags:
  - claude-code
  - agentic-engineering
---

Denis Stetskov's piece this week, '[The West Forgot How to Build. Now It's Forgetting Code](https://techtrenches.dev/p/the-west-forgot-how-to-make-things)', does a superb job of opening with the Fogbank story and the EU's failure to deliver a million artillery shells on time. The hook works. The argument that follows, that AI-assisted coding is the same pattern of optimisation eating the talent pipeline, is half right and half a category error, and the half that is wrong is doing most of the rhetorical work.

Fogbank failed because the knowledge was physical. The original batch contained an unintentional impurity that nobody had documented because nobody knew it mattered. The workers who handled the material left, and with them went the muscle memory of a process that existed nowhere else. Code is the opposite kind of artefact. It is the most reproducible thing humans make. Every line of every dependency a senior engineer has ever shipped is sitting on GitHub, in npm, in the training data, in a Claude context window the moment you ask. The substrate of the problem is not the same.

This matters because the Fogbank framing implies a one-way ratchet, a thing that can be lost forever once the last person who knew it dies. The failure mode in front of us is narrower than that, and worth naming precisely.

## What is actually at risk

Syntax and frameworks are not what atrophies when juniors skip the formative years. Those are recoverable in days from documentation an LLM will happily summarise. The thing that erodes is the judgement to know when generated code is wrong about your particular system, with its data shapes, its failure modes, its deploy history, the bug from eighteen months ago that everybody on the team carries around in their head. METR's [2025 study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), which Stetskov cites, found experienced developers using AI tooling were 19% slower on real open source tasks, against a self-prediction of 24% faster. The 43-point gap shows up because reviewing generated code against an unfamiliar system is genuinely harder than writing it yourself, and the developers had not yet built that muscle. The bottleneck was their review skill under new conditions, and that skill takes a while to grow in.

That gap is a review problem, and review problems are tractable. Stetskov hints at this when he describes rewriting pull request templates, adding dedicated reviewers per project, demanding before-and-after screenshots. Those are good moves. They are also the kind of moves that look obvious in hindsight and were not obvious in 2023, which is the entire history of how teams adapt to new tools.

I see this clearly running Claude Code on our own client work. The first month with an agent on a codebase, even one I knew well, was slower than coding by hand. The second month, once I had a CLAUDE.md that captured the bits of the system the model could not infer from the source, was faster. The difference was almost entirely about how much of the context I had bothered to write down. Stetskov calls this 'institutional knowledge that exists nowhere in the codebase'. I would call it institutional knowledge that exists nowhere in the codebase yet.

## Where the parallel does hold

The talent pipeline problem is real. The hiring numbers Stetskov cites are real. CRA's [2025 enrollment survey](https://cra.org/crn/2025/10/cerp-pulse-survey-a-snapshot-of-2025-undergraduate-computing-enrollment-patterns/) found 62% of computing departments reporting declining undergraduate intake, and that has a seven-to-ten year lag before it shows up at the staff engineer level. The bit of the defence parallel that does hold is the timeline. You cannot hire your way out of a senior engineer shortage in eighteen months any more than France could restart propellant production in eighteen months after a seventeen-year shutdown. If the bet on agentic coding turns out wrong, the lag to recover is measured in years.

The bet does not have to turn out wrong. Hedging it well means being honest about what the tooling absorbs and what it does not. Generation is mostly solved. Review under context is the bottleneck Stetskov correctly identifies and incorrectly diagnoses, and the teams that come out of this decade ahead will be the ones that treat writing down their system context as a first-class engineering deliverable rather than a chore to do later.

The Fogbank story ends with $69 million and years of reverse engineering to recover something that should have been written down. Stetskov reads that as a warning to keep more juniors on the manual work, the way the Pentagon should have kept more apprentices on the missile line. I read it the other way around. The institutional knowledge we have always relied on seniors to carry in their heads now has, for the first time, a credible place to live outside of them. Most teams have not done that work yet. The teams that do are the ones who will still be shipping in 2031.
