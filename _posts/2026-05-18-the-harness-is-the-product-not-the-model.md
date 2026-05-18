---
title: "The harness is the product, not the model"
date: 2026-05-18T21:00
categories: ai
tags:
  - cloudflare
  - security
  - agents
  - claude
---

Cloudflare's [Project Glasswing write-up](https://blog.cloudflare.com/cyber-frontier-models/) landed today and the Hacker News thread is mostly arguing about whether the prose was written by Mythos or by Opus. It is a fair complaint and an irrelevant one. The diagram halfway down the page is the actual deliverable, and almost nobody is talking about it.

Cloudflare has published the reference architecture for doing vulnerability research with a frontier model at scale. The model in the headline is the easy part. The seven-stage agent pipeline around it is what makes the model useful, and it is the bit worth stealing.

## What the pipeline actually does

Recon reads the repository top-down and produces a shared architecture document covering build commands, trust boundaries, entry points, and likely attack surface. Every downstream agent works from the same map.

Hunt fires roughly fifty agents in parallel, each pinned to one attack class against one narrow scope. Each hunter can compile and execute proof-of-concept code in a per-task scratch directory. Not 'reason about whether this might be exploitable', but actually run the exploit and see what happens.

Validate is the move that separates this from a clever prompt. An independent agent with a different prompt, a different model, and no ability to emit its own findings re-reads the code and tries to disprove the hunter. Putting two agents in deliberate disagreement does more for noise reduction than any amount of careful single-agent prompting.

Gapfill re-queues areas the hunters touched but did not cover. Dedupe collapses variants. Trace fans out one agent per consumer repository, uses a cross-repo symbol index, and answers the question that actually matters, which is whether attacker-controlled input reaches the flaw from outside the system. Feedback turns reachable traces into new hunt tasks. Report writes structured output against a schema and fixes its own validation errors before submitting.

Each stage is a fix for a specific failure mode anyone who has tried this work at scale will recognise. Unconstrained scope makes the model wander. Self-review turns the model into a generous marker. Once a hunter has had a few wins with one attack class it starts drifting toward that class and ignoring the rest of the surface. And the gap between 'we found a thing' and 'an attacker can actually reach the thing' is where most security findings die.

This is not Claude Code with a system prompt. It is a directed graph of agents with deliberately different prompts and deliberately constrained tool access, where the disagreement between agents carries the structural weight.

## Why the model is the wrong thing to fixate on

The thread keeps trying to litigate whether Mythos is genuinely a step change or a marketing exercise. Pick whichever side you prefer. The harness works because Mythos is good enough at chained reasoning to make the hunt stage productive, but it would still work, with degraded signal-to-noise, on Opus 4.7 or GPT-5.5. The architecture is the moat, not the weights.

Anyone who has pointed Claude Code at a hundred-thousand-line repository and asked it to find security issues knows the failure mode Cloudflare describe. A single agent session, even with subagents, covers maybe a tenth of a percent of the attack surface usefully before compaction kicks in and the earlier findings get dropped without ceremony. Driving harder does not help past a certain point. The bottleneck stops being the model and starts being the shape of the interaction.

This is the lesson most teams reaching for agentic engineering on non-trivial problems are going to learn the hard way. The model is necessary and nowhere near sufficient. Scope hints, adversarial reviewers, per-task scratch environments, structured output schemas, an explicit reachability stage. That is where the engineering lives. Security research makes the point obvious because the problem is narrow and parallel by nature. Plenty of other domains have the same shape if you look.

## What to take from this

The adversarial review stage is the change with the highest payoff. Drop a second agent into your existing single-agent setup with a different prompt and no ability to emit findings of its own, and watch the false-positive rate fall. It generalises to anything where 'is this finding real' and 'did the model find it' need to be different questions.

The other pattern worth lifting is the split between 'is there a flaw' and 'can an attacker actually reach it'. Asking the model both questions in one prompt produces worse answers to both. Splitting them across agents is cheap, and the same shape applies anywhere coverage matters more than depth on a single hypothesis.

The Cloudflare post itself is over-edited, light on hard numbers, and probably an inadequate basis for forming a view on Mythos specifically. [Daniel Stenberg's write-up on a Mythos finding in curl](https://daniel.haxx.se/blog/2026/05/11/mythos-finds-a-curl-vuln/), [XBOW's competitive evaluation](https://xbow.com/blog/mythos-offensive-security-xbow-evaluation), and the [AISI evaluation](https://www.aisi.gov.uk/blog/our-evaluation-of-claude-mythos) are better signal on the model. Trust the harness diagram more than the framing around it.

The model gets the headline. The harness is what ships.
