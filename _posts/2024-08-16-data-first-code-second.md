---
date: 2024-08-16T22:30
title: Data First, Code Second
categories:
  - software engineering
tags:
  - architecture
  - design
---
In the world of software engineering, we often glorify elegant algorithms and clean code. Yet, there's a fundamental truth that frequently goes unacknowledged: the superiority of well-designed data structures over clever code. This principle, often attributed to Linus Torvalds, deserves far more attention than it typically receives.

At its core, this idea suggests that the way we organise and represent our data is more critical to a system's success than the code that manipulates it. A well-designed data structure can simplify complex logic, improve performance, and make a codebase more maintainable. In contrast, even the most brilliantly written code can't compensate for a poorly conceived data model.

Consider a real-world example: a project tasked with optimising a complex algorithm. After weeks of painstaking work refining the code, the team realised that by restructuring their data, they could eliminate entire classes of problems. A 500-line function was replaced by a 50-line function and a well-designed data structure. Not only was the new code faster, but it was also far easier to understand and maintain.

This scenario isn't uncommon. In our haste to deliver features and meet deadlines, we often neglect the crucial step of properly modelling our data. We dive into coding without fully understanding the problem domain or considering how our data might evolve. This short-sightedness inevitably leads to technical debt and brittle systems that struggle to adapt to changing requirements.

The implications of this principle extend beyond individual projects. Systems built on solid data models tend to be more resilient and adaptable. They're easier to scale, simpler to debug, and more amenable to feature additions. In contrast, systems built around complex algorithms with little regard for data structure often become tangled messes of special cases and workarounds.

Static typing, while not a panacea, can be a powerful tool in this regard. It forces developers to think more deeply about their data structures from the outset. It's no coincidence that many large-scale, long-lived systems are built with strongly-typed languages. The discipline imposed by a good type system can be a formidable ally in crafting robust software.

That said, types can be a double-edged sword. Overzealous use of complex generics and esoteric language features can lead to code that's harder to understand and maintain than a simple dynamically-typed solution. As with all things in software engineering, balance and pragmatism are key.

The "Rule of Representation" from The Art of Unix Programming captures this idea succinctly: "Fold knowledge into data so program logic can be stupid and robust." This principle encourages us to embed complexity in our data structures rather than our code, resulting in systems that are easier to reason about and more resilient to change.

So why don't we see more emphasis on data modelling in software development? Part of the problem may lie in our education and interview processes. Computer science curricula often focus heavily on algorithms and code optimisation, with data structures playing a secondary role. Similarly, technical interviews frequently test a candidate's ability to write clever code on the spot, rather than their skill in designing effective data models.

Another factor might be the instant gratification that comes from writing code. It's satisfying to see a function come together or a feature spring to life. In contrast, the benefits of a well-designed data structure often only become apparent over time, as a system grows and evolves.

As an industry, we need to shift our focus back to the fundamentals. We should be spending more time on data modelling and less on chasing the latest framework fads or coding techniques. This doesn't mean abandoning clean code practices or ignoring algorithmic efficiency. Rather, it means recognising that these concerns should be secondary to getting our data structures right.

In practice, this might mean starting new projects with a focus on domain modelling rather than jumping straight into code. It could involve regular reviews of data structures alongside code reviews. For larger systems, it might mean having dedicated "data architects" who focus on maintaining and evolving the overall data model.

The next time you're faced with a complex programming task, try approaching it from a data-first perspective. Ask yourself: "What's the most effective way to represent this information?" Rather than "How can I write code to solve this problem?" You might be surprised at how often restructuring your data can simplify your code.

In the end, the mark of a truly skilled software engineer isn't the ability to write clever code, but the wisdom to know when clever code isn't necessary. By focusing on our data structures, we can build systems that are not just functional, but truly robust and adaptable. It's time we gave this unsung hero of software engineering the recognition it deserves.