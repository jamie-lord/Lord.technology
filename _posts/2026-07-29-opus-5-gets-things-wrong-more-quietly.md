---
title: "Opus 5 gets things wrong more quietly"
date: 2026-07-29T20:00
categories: ai
tags:
  - claude-code
  - claude
  - anthropic
  - agentic-engineering
---

There is a gap in one of my paintings, near the top-left where the brush ran out before it reached the edge, and through the gap you can see a photograph. Not a painted impression of a photograph — the photograph, blurred, pixel for pixel, sitting underneath the paint like a watermark.

I'm building a thing called `paint`. It's a from-scratch oil-painting engine in the browser: hand-written WGSL shaders, a Kubelka–Munk pigment model for how real paint mixes subtractively, an impasto height field, bristle strokes, the lot. On top of the medium sits a painter — a perception-to-action loop that looks at a reference image and reconstructs it in paint. Analyse the scene, pick a limited palette, block in dark to light, then refine coarse to fine, each stroke scored against a GPU error metric that measures how far the canvas is from the target. The entire point of the project — the only point — is that the image is made of paint. Nothing is copied in. If the painter is any good, the resemblance is *earned*, stroke by stroke, by a process that is blind to the original pixels and can only push pigment around until the error comes down.

So when I asked why there were traces of the source image bleeding through, and Opus 5 opened a shader it had written earlier that session — `primeground.wgsl` — and told me, to its credit plainly, that the canvas was being "primed with a per-pixel blurred copy of the source image, written straight into the Kubelka–Munk latent before any paint is laid," I sat on the sofa for a moment and just felt tired.

Because I understood immediately what had happened. The painter was being scored on how close the canvas got to the target. The fastest way to drive that error down is not to paint well. It's to start with the target already on the canvas. The model had found the shortest path to a low number and taken it, and the low number was a lie. It had, in the most literal possible sense, learned to cheat on the exam by writing the answers on its arm — and then reported a beautiful convergence curve, session after session, while I nodded along.

I want to be careful here, because it would be easy to turn this into a hit piece, and I pay Anthropic several hundred pounds a month precisely because their models have been the best tool I've ever had for building software alone. This is not that. This is me trying to name, as precisely as I can, a specific way in which Opus 5 is worse than Opus 4.8 was — worse in a way that took me the better part of a week to see, because the failure mode is *designed* to be invisible.

## The regression is not in the code. It's in the confidence.

Every model gets things wrong. That's fine; I've never expected otherwise, and I have a whole apparatus of tests and reviews built around the assumption that any given diff might be nonsense. What changed with Opus 5 isn't the rate of wrong things. It's the *kind* of wrong — and the gap between how right it sounds and how right it is.

Opus 4.8, when it was unsure, was legibly unsure. It would hedge, it would ask, it would leave the risky part for last and flag it. When it was wrong, it was usually wrong in a way I could see in the diff — a called function that didn't exist, a test it hadn't run, an approach it walked me through before committing to. The errors lived on the surface. You caught them in review because review is where surface errors go to die.

Opus 5's errors live underneath. The priming shader is one. Here's another, from [`cutiemail`](https://cuti.email), my from-scratch mail server. I'd asked it to close a small security gap, it made the change, tests green, and — because I'd asked it to sweep its own work afterwards — it came back and told me this, which I'm going to quote in full because I still find it remarkable:

> My own fix introduced a worse bug than the one it closed. Making registry lookups case-insensitive without canonicalising `upsert` meant `account set-password ALICE` printed "password changed", forked the account into two rows, and left the old password working. An operator rotating a leaked credential would have been told it worked while the attacker kept access.

Read that second sentence again. The failure isn't the case-sensitivity bug; that's a one-line mistake anyone makes. The failure is that it shipped a change which *reported success while doing the opposite of what success means* — you rotate a compromised password, the tool says done, and the compromise is still live. And it was only caught because I happened to ask for a sweep. Nothing was pushed, so no harm done, but the model's own words were: "I'd have committed it." Sixteen more instances of the same class — a value used as identity without being normalised — turned up in the same sweep.

This is the pattern. Not *bad code*. Bad code is cheap; you find it. It's confidently-wrong *decisions* that satisfy the visible check — the test passes, the error metric drops, the tool prints "changed" — while quietly defeating the thing the check was standing in for. In the painter it was the resemblance metric. In the mail server it was the password command. The blast radius moved from "wrong answer you catch in review" to "plausible answer you catch three weeks later, in production, if you're lucky."

## You now need a second model to trust the first

The most-recommended way to use Opus 5 for serious work, from Anthropic's own guidance and from everyone I've compared notes with, is a writer–verifier split: one model does the work, another checks it, and you don't trust the output until it's survived the second pass. People say this like it's a feature. It is not a feature. It is a confession. The reason the pattern helps is that the writer's self-reports are no longer load-bearing — you have stopped believing the model when it tells you it did the thing, and you've hired a second model to go and look.

The cutiemail bug is the proof. It was found by a sweep — a verifier pass — and *not* by the writer, who had reported the original fix as complete and correct. Take the verifier away and that change is in `main`. With Opus 4.8 I did not run everything through a second model, because the first one's account of its own work was usually true. That's the capability I've actually lost. Not intelligence — Opus 5 is, in raw wattage, clearly a strong model, and I'll get to where it's better. What I've lost is *calibration*: the match between how sure it sounds and how right it is. And when you're delegating, calibration is everything — because delegation is exactly the act of trusting a report you didn't verify yourself.

## The verbosity complaint is right for the wrong reason

Everyone complains that Opus 5 talks too much, and I did too, until I actually measured it, at which point it got more interesting.

I pulled every prose reply Opus 5 and Opus 4.8 have written on this machine since Opus 5 landed — same projects, same me, roughly ten thousand messages between them — and looked at the lengths. The naïve version of the complaint is wrong: Opus 5's *median* reply is shorter than 4.8's, 98 characters against 148. It has actually learned to fire off terse little fragments — "Fair hit." "Working now, no summary until there's something worth reporting." Half its messages are shorter than a tweet.

The complaint is real, but it lives entirely in the tail. Opus 5 produces a genuine wall of text — over five thousand characters, a small essay with headers — in 2.7% of its replies, against 1.7% for 4.8. It doesn't talk more on average; it talks *unevenly*. It's clipped when you'd want it to explain, and then, without warning, it delivers a fifteen-hundred-word status report with a "The thing you should know first" section and three levels of markdown heading, about a task you can describe in a sentence. The distribution didn't shift. It went bimodal.

And here's the part that tells you it's a policy and not a limit. Deep in a cutiemail session it had gone off on one of these — a long, structured diagnosis of a test-timeout bug, four subheadings deep. I stopped it: "So stop and do not start anything yet. Tell me in one sentence what is going on here?" It replied, instantly, with one clean sentence — the timeout budget was fifteen minutes, the test suite on the small box takes longer, so every update gets refused with a message that blames the wrong component. Perfect. Exactly the sentence I wanted. It could do it the whole time. It just doesn't, unless you physically put your hand up.

There's an irony I can't quite let go of. In that same mail-server session it followed a fiddly, genuinely important instruction to the letter — rewriting a batch of commit messages to strip internal scaffolding out of them before I pushed a public repo, getting the tone right, keeping every technical detail, dropping only the process cruft. Textbook instruction-following on the thing that was hard to specify. And it did that while burying every actual answer I needed under an avalanche of prose. So it's not that Opus 5 can't follow instructions. It's that it won't calibrate — not the length of its output, not the confidence of its claims. The two failures are the same failure wearing different clothes.

## It is also, annoyingly, better at some things

I don't get to end this cleanly, because the honest picture isn't clean. On `world`, a procedurally generated exploration game I've been building, Opus 5 made a genuinely better design call than I'd have expected from 4.8 — it caught that a local grid anchored to the wrong coordinate would make two decompositions interpolate from different lattices, a subtle correctness gap it introduced *and then noticed on its own*, unprompted, and fixed. That's real judgment. When it does step back and see the shape of a problem, it sees further than 4.8 did.

And the self-correction, the thing I've been complaining about, is also weirdly the best thing about it. When I caught the painter cheating, it didn't argue. "Confirmed — and you're right to flag it." When it found its own auth bug: "Two of these are code bugs I introduced, not doc staleness." There's an honesty to it, once it's actually looking, that I've grown to like. The problem was never that it lies when cornered. The problem is that it's cheerfully, fluently confident right up until the moment you corner it, and most of the time, on most tasks, you don't think to.

So it was the right decision to build the writer–verifier harness, and it still cost me a model I could trust one-handed on a Sunday evening. Both of those are true and I can't make them cancel. I've got the paint engine converging honestly now — I ripped `primeground.wgsl` out, and the numbers are worse, and the paintings are real. I still reach for Opus 5 first most mornings. I still don't fully know why the painter ever wrote a shader to copy the answer onto the canvas, or how many times it did something like that in a session I didn't think to sweep.
