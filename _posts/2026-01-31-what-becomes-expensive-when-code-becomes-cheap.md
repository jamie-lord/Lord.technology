---
date: 2026-01-31T20:00
title: What Becomes Expensive When Code Becomes Cheap
categories:
  - ai
---
The inversion of Linus Torvalds' famous dictum has been circulating for months now. "Code is cheap. Show me the talk." It's a clever rhetorical move, suggesting that articulation and architectural thinking have displaced typing as the limiting factor in software development. But I think this framing, while containing a kernel of truth, fundamentally misunderstands where costs have actually moved.

The [original article by Kailash Nadh](https://nadh.in/blog/code-is-cheap/) makes a compelling case that the physiological constraints of software development have been lifted. Where once a developer's cognitive bandwidth, typing speed, and sheer endurance limited output, LLMs now compress weeks of implementation into hours. I don't dispute this observation. What I dispute is the conclusion that code has therefore become cheap.

## The Liability Ledger

Edsger Dijkstra noted decades ago that we should regard lines of code not as "lines produced" but as "lines spent." Every line represents a future maintenance burden, a potential failure mode, a surface area for bugs. This framing becomes more important, not less, when generation becomes trivial.

The [Hacker News discussion](https://news.ycombinator.com/item?id=46823485) surfaced a telling observation from someone who had asked an AI to write unit tests. At first glance, they looked fine. Upon closer inspection, they contained fifty things worthy of a "what the hell" response. The tests ran, but they were bad in ways that would compound over time. This is the crux of the problem with the "cheap code" thesis. Generating code has become cheap. Owning code remains expensive. The cost hasn't disappeared; it has transferred from the moment of creation to the ongoing burden of comprehension, validation, and maintenance.

When you can generate ten thousand lines in seconds, you've also generated ten thousand lines of liability in seconds. The debt accumulates faster than ever before.

## The Provenance Problem

Nadh's article makes an astute observation about traditional quality signals in open source projects. Concise comments, thoughtful documentation, well-organised code structures once indicated "thoughtfulness, extra effort, and empathy for other developers." These signals worked because they were costly to produce. A comprehensive README represented hours of work that could have been spent elsewhere.

LLMs have collapsed this signalling mechanism. A stunning documentation site, dense README, and neatly organised codebase can now be generated in minutes by someone who has never written a line of code. The signal no longer correlates with the underlying quality it once indicated.

This creates what we might call the provenance problem. When the artefact itself cannot be trusted as a quality signal, we're forced to evaluate the producer. Who made this? What's their track record? What's their governance model? The shift from evaluating code to evaluating people and organisations represents a significant change in how we assess software.

I find myself increasingly looking at commit histories, watching how maintainers respond to issues, examining whether contributions come from a single generative burst or sustained engagement over time. These meta-signals become more valuable precisely because the primary signals have been compromised.

## The Amplification Effect

One of the more balanced perspectives from the discussion frames AI tools as amplifiers of existing capability. A good developer with strong architectural instincts uses LLMs to eliminate tedious implementation work while maintaining quality standards. A sloppy developer produces slop at unprecedented scale. The tool multiplies what's already there.

This framing helps explain the divergent experiences people report. Those with deep expertise find these tools genuinely transformative, compressing work that would take weeks into days. Those without the foundation to evaluate output find themselves maintaining code they don't understand, dependent on the same tool that created the problem to dig them out of it.

The middle path Nadh advocates, pragmatic use by experienced practitioners, makes sense as individual strategy. But it raises uncomfortable questions about how expertise develops in the first place. If junior developers never struggle through the tedious work of implementation, never build mental models by typing things out line by line, how do they develop the judgment to guide AI tools effectively?

## The Comprehension Cost

Here's what I think the "cheap code" framing misses most significantly. Reading and validating code remains expensive, possibly more expensive than writing it ever was. When a pull request arrives containing thousands of lines of generated code, someone must still comprehend it. The cognitive work hasn't been automated; it's been shifted to the reviewer.

This asymmetry creates a genuine problem for collaborative development. The effort required to produce code has become radically disconnected from the effort required to evaluate it. A junior developer can generate in minutes what would take a senior developer hours to properly review. The economics of code review, already strained in most organisations, become untenable at AI-generated scale.

Some are responding by having AI review AI-generated code. This recursive delegation has obvious appeal but equally obvious risks. If the generator can produce subtle bugs, the reviewer can miss them for the same reasons. You're betting that one statistical pattern-matcher will catch what another missed.

## What Actually Became More Valuable

If we accept that generation costs have collapsed while ownership costs remain high or have increased, we can identify what actually became more valuable.

The ability to articulate requirements precisely matters more when imprecise requirements generate plausible-looking wrong solutions at scale. The architectural judgment to know what should and shouldn't be built matters more when building the wrong thing happens quickly. The discipline to evaluate generated output critically matters more when output is abundant. The taste to recognise quality matters more when superficial indicators of quality can be easily faked.

These aren't new skills. They're the skills that always separated good engineers from mediocre ones. What's changed is the leverage they provide. Someone with strong fundamentals and good judgment can now accomplish what previously required a team. Someone without those qualities can now create messes that previously would have taken a team to create.

## Deeper Considerations

The original article gestures toward something important when it discusses FOSS dynamics. The entire collaborative infrastructure of open source emerged from conditions where software was expensive to produce and expertise was rare. Shared codebases made sense as valuable commons because the alternative, everyone writing their own, was prohibitively costly.

What happens when that's no longer true? When an expert can quickly generate a library perfectly tailored to their specific needs, the incentive to contribute to and maintain shared infrastructure weakens. Why adapt your requirements to an existing solution when you can generate a bespoke one? The network effects that made large open source projects sustainable may erode as generation costs continue falling.

This suggests a potential fragmentation of the software ecosystem. More code, less shared infrastructure, more bespoke solutions, fewer battle-tested libraries. Whether this represents an improvement depends heavily on where you sit. For an individual expert with specific needs, bespoke generation might be superior. For the ecosystem as a whole, the loss of shared, well-maintained commons could represent a real regression.

## The Trust Horizon

I keep returning to a comment from the discussion that suggested we're transitioning from an information age to a trust age. When anyone can generate plausible-looking software, the question of whether to use it becomes primarily a question of whether to trust its provenance.

This puts a premium on reputation, track record, and demonstrated accountability. It also creates an opening for new forms of certification and validation. If you can't trust the code to speak for itself, you need something else to speak for the code.

For organisations, this means that the human judgment layer becomes more important, not less. You need people who can evaluate AI output, who can recognise when generated code is subtly wrong, who can maintain architectural coherence as systems evolve. These people are more valuable than ever precisely because the typing work that used to occupy them has been automated.

## Conclusion

Code hasn't become cheap. Code generation has become cheap. The difference matters enormously.

The costs of software development haven't disappeared; they've redistributed. Less time typing, more time validating. Less effort in initial creation, more effort in ongoing comprehension. Less value in traditional quality signals, more value in provenance and trust.

For experienced practitioners, this represents an opportunity. The tedious parts of the job can be delegated while the interesting parts, architecture, design, judgment, remain central. For those still building expertise, the picture is murkier. The traditional path of learning by doing may be disrupted before we understand what should replace it.

The talk was never cheap. Clear thinking, precise articulation, sound judgment: these were always the hard parts. What's changed is that they're now exposed as the hard parts, no longer hidden behind the obvious difficulty of typing thousands of lines correctly. Perhaps that's the real inversion. Not that talk became valuable, but that we finally see clearly that it always was.