---
date: 2026-09-11T16:45
title: Limiting AI news would hide what is happening to software
categories:
  - ai
tags:
  - hacker-news
  - software-development
  - agentic-engineering
---

There is an [Ask HN thread on the front page today](https://news.ycombinator.com/item?id=49657850) asking whether Hacker News can "please limit the AI news flood". To be fair to its author, this is not a request to ban AI. The complaint is that AI stories take up so much of the front page that interesting hardware, open-source projects and ordinary programming work never escape the `newest` page. Attention is finite; one story surfacing means another one does not. Could Hacker News put its thumb on the scale and make room for the rest of technology again?

There is too much bad writing about AI. Every minor model release arrives with a benchmark selected by its maker, a launch post declaring a new era and fifty people reporting that it either replaced their engineering department before lunch or failed to count the letters in *strawberry*. The same three arguments consume the comments. I would happily read less of it.

Limiting AI stories is still the wrong fix.

AI is not a specialist interest taking attention away from software development. It is changing how software is made, what one developer can build, what users expect and which attacks our systems must survive. You do not need to believe in AGI, enjoy generated prose or want a chatbot in your toaster to recognise that. You only need to have used the tools seriously, or to employ somebody who has.

The flood is irritating because the change is large, uneven and happening in public. Filtering it out would produce a tidier front page and a worse account of the world.

## The category has already broken

The proposal assumes that "AI news" is a category like photography, databases or laptop cooling: useful to people who follow it, safely removable for everyone else. That category no longer holds.

A vulnerability found by an agent is security news. A browser redesigned around an agent is browser news. A chip built for inference is hardware news. A change in how a developer turns a requirement into running software is programming news. Which of these should be moved into the AI section so that technology can return?

The problem becomes more obvious in the thread's own replies. People build AI classifiers to remove AI stories. Someone uses Gemini to repair a brittle regular expression intended to hide mentions of Gemini. A commenter objects that AI projects are not really DIY because they are "ways of getting something else to do it for you", while another points out that this would also make a 3D printer rather suspect. The boundary keeps collapsing because the tool is no longer sitting beside the work. It is entering the way the work gets done.

The comparison with previous Hacker News obsessions only gets us so far. HN has been full of cryptocurrency, Rust, JavaScript frameworks, self-driving cars, SaaS and Apple launches before. Those subjects rose and fell. AI may also be overfunded and overreported, but unlike cryptocurrency it is a general-purpose input into other technical work. It writes Rust, operates browsers, searches codebases and triages support queues. Its failures now appear inside otherwise ordinary systems. Calling all of that "AI-adjacent" does not define a useful category. It defines most of the adjacency graph.

Asking a technology forum to cap that at ten or twenty per cent would be rather like asking one in 1998 to restrict Internet stories so there was still room for proper computers. It would have removed plenty of rubbish. It would also have hidden the fact that networking was becoming part of what a computer was.

## Hacker News is not a balanced newspaper

There is another assumption underneath the complaint: that the front page ought to represent the whole field in fair proportions. Some hardware, some languages, some operating systems, some small projects, and no one subject allowed to consume the issue.

That would be a perfectly reasonable editorial product. It is not what Hacker News is.

HN's own [guidelines](https://news.ycombinator.com/newsguidelines.html) reduce its subject matter to "anything that gratifies one's intellectual curiosity". Its front page is not a syllabus. It records what one particular technical community finds urgent enough to submit, discuss and upvote today, with ranking rules and moderators modifying the result. Sometimes that attention is badly allocated. Popularity is not merit. But a link aggregator that guarantees every beat a share of the page is no longer measuring collective attention; it is publishing a magazine.

The author wants overlooked work to be discoverable, which is reasonable. Reducing the representation of a subject other people currently consider important does not tell us which neglected stories deserve the vacant slots. It only guarantees that some lower-ranked non-AI stories receive them. A quota can manufacture variety. It cannot manufacture interest.

The two examples in the post make this awkward. One is a Lenovo proof of concept using solid-state cooling. The other is a promotional video for a set of devices that are not yet available. Both might be interesting; the cooling system interests me more than another funding round. But neither was necessarily denied a front-page discussion by AI. Commenters offer ordinary reasons for passing over them: scant technical detail, vaporware, a video instead of a substantial write-up, doubts about the company, and the fact that the cooling technology has appeared in products before. Those judgments may be wrong. They are still judgments about the submissions themselves.

"My interesting link did not rise" and "another subject prevented it from rising" are not the same claim. The second needs more evidence than the first.

## I did not become a developer to preserve typing

One of the thread's most revealing comments says: "I miss all the programming articles. It feels like everyone has given up with the very idea of ever writing code now." The commenter sees the practice of making software being handed over to AI.

I understand the loss in that sentence. Programming is a satisfying craft. Holding a problem in your head, reducing it until the right abstraction appears and then making the machine obey is one of the best feelings in the job. I do not want a profession of people who prompt systems they do not understand, accept code they cannot review and call the result engineering. I have written before that [code generation became cheap while owning code did not](/2026/01/31/what-becomes-expensive-when-code-becomes-cheap.html), and that [models can become more dangerous when they get things wrong more quietly](/2026/07/29/opus-5-gets-things-wrong-more-quietly.html).

But I did not become a developer to preserve the act of entering syntax into a text editor. I became one because I like building things for people and solving problems for them. Code is usually the material, sometimes the obstacle, and never the user need.

If programming means producing code, an agent looks like an elaborate machine for taking programming away. If it means turning an ambiguous human need into a system that reliably meets it, an agent removes some implementation cost and leaves the hard part exposed. What is the actual problem? What must never happen? How will we know the answer is right? What will this cost to operate in three years? The model can help with those questions. It cannot be accountable for the answers.

Earlier this year I built [a military aircraft tracker for an audience of one](/2026/05/21/the-military-aircraft-tracker-i-built-for-an-audience-of-one.html). There is no LLM in the running product. I tried one for its daily summaries and removed it because deterministic templates were better. But a coding agent wrote much of the implementation under my direction. That leverage is why an evenings-and-weekends project grew an ingestion pipeline, queues, workflows, anomaly detection, replayable history and a usable interface before the old version would have made it past decoding the feed.

Was that less like hacking because I did not type every queue consumer? I think it was more like hacking. I found an itch, assembled tools, learnt the constraints, discarded AI where it made the product worse and used it heavily where it made the product possible. The important judgment was not loyalty to or rejection of the tool. It was knowing which problem belonged to it.

Blind AI enthusiasts mistake generation for understanding. At the other extreme, some developers have turned a justified dislike of the hype into a refusal to inspect the capability. Neither is especially technical. The job is to evaluate the thing in front of us: use it where it works, contain it where it is unreliable, and remove it where it does not help the user.

## Slop is a quality problem, not a subject

The best case for intervention is that AI has made low-effort material extremely cheap to produce, and that material is consuming a system whose scarce resource is human attention. The label "AI story" is a bad way to identify it.

A person can repeat a press release, cherry-pick a benchmark and contribute nothing. A hand-written project can be useless. An AI-assisted one can solve a real problem and contain careful engineering. The production method is not the quality. "Slop" describes the distance between the confidence and volume of an artefact and the thought behind it, not whether a model touched the keyboard.

The thread demonstrates this neatly. Several developers have built sites that filter AI stories out of Hacker News; at least one uses an LLM to classify them. That is not hypocrisy. Fuzzy classification is exactly the sort of bounded, reversible task language models are useful for, and the developer shipped something people in the thread wanted. A filter made with AI to avoid reading about AI is still a product built for users. The user need decides whether it is worthwhile; ideological consistency does not.

Hacker News should be more aggressive about the properties it already cares about: originality, technical substance and intellectual curiosity. A model release that changes nothing, a generated essay with no firsthand evidence and a demo whose only feature is that a model produced it should struggle. So should their human-made equivalents. A careful account of a failed AI deployment or a developer showing exactly how a tool changed their work should survive. So should the cooling system and the open-source wall display, if the submitted material gives readers enough substance to engage with them.

Judge the work by what it reveals. "AI" is too blunt a proxy for that judgment.

## The attention problem is partly us

There is a more uncomfortable reason AI keeps swallowing the front page: even people who hate the subject cannot leave it alone.

They open the story to complain that it is there. They add the hundredth comment saying language models merely predict the next token. They call the project slop without running it, somebody responds with an extravagant claim about AGI, and both sides return for six rounds. A modest post about an unusual cooling system cannot compete with a subject that recruits its supporters and opponents into the same engagement loop.

No ranking change can entirely solve that because the flood is not only a supply problem. It is demand, including hostile demand. The Ask HN thread objecting to too much AI became one of the day's largest AI discussions within hours. That is funny, but it is also the mechanism.

Personal filters are reasonable. If reading another model announcement makes your day worse, hide it. Use a third-party feed. Read Lobsters. Go directly to Hackaday for hardware. No single front page has ever owed us a complete view of an industry. Choosing several narrower sources is healthier than expecting one community to preserve the mixture of subjects we happened to like when we joined it.

What personal filtering should not become is institutional denial. There is a difference between "I do not want to spend my attention on this today" and "this community should behave as if the subject is less consequential than its members believe". The first is curation. The second is distortion.

## Look harder, not away

I do not want more AI news merely because it is about AI. I want fewer launch posts, fewer benchmark victory laps, fewer wrappers presented as companies, fewer declarations that software engineering ended last Tuesday and fewer denunciations written by people whose last serious experiment with a coding model was asking it for a sorting function two years ago.

I want more evidence. Show me what the system made possible that was not possible before. Show me where it failed under real load. Show me the review burden, the changed threat model, the bill, the maintenance cost and what the users thought. Show me the code when code is the interesting part and the product when it is not.

Boosterism asks us to lower our standards because the future has arrived. I want higher standards because these systems are being deployed before they are understood, and will affect developers whether or not we enjoy reading about them.

AI is a massive part of development now. It is also full of hype, waste, brittle systems and people selling inevitability because they cannot yet sell a reliable product. Both are true. The answer to a noisy, important change is not to reserve fewer slots for it. It is to get better at distinguishing signal from noise.

Hacker News should make room for deeply interesting work wherever it appears. It should give overlooked submissions a second chance and punish repetitive, shallow material. But it should not decide in advance that the largest change to the practice of building software in decades has received its fair allocation of attention for the day.

I do not need to love AI to know that ignoring it would make me worse at building things for users. Believing everything its vendors say would too. The job is still the same: pay attention, test the claims and build something useful.
