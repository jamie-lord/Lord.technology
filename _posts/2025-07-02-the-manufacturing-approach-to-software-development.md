---
date: 2025-07-02T08:00
title: The Manufacturing Approach to Software Development
categories:
  - software development
---
The most profound changes in software development rarely come from new languages or frameworks. They emerge when we fundamentally alter how we approach creation itself. We're witnessing such a shift as developers begin orchestrating networks of AI agents rather than writing code directly. This represents a leap from crafting individual solutions to designing systems that generate solutions.

Traditional development centres on direct code manipulation. We write functions, debug logic, and iterate through manual refinement. But what happens when we invert this relationship and focus on perfecting the instructions that generate code instead? This pattern—treating code generation as a first-class design concern—changes everything about how we build software.

## Code as Manufacturing Output

The ["AI factory" approach](https://www.john-rush.com/posts/ai-20250701.html) treats code as a product of a manufacturing process rather than handcrafted artefacts. The principle is elegantly simple: when generated code fails, don't modify the output—refine the inputs that produce it. This mirrors infrastructure as code, where we modify templates rather than manually adjusting deployed resources.

The workflow involves specialised agents working in concert. A planning agent analyses requirements and creates implementation strategies. Execution agents transform plans into working code, with different models selected based on task complexity. Verification agents review output against both the plan and original requirements, creating feedback loops that identify gaps in the generation process.

Git worktrees enable parallel agent workflows, letting developers explore multiple implementation approaches simultaneously. Rather than sequential iteration, this creates breadth-first exploration of solution space. The developer's role evolves from direct creation to orchestrating this generation pipeline.

## What This Changes About Software

This raises serious questions about ownership and maintainability. When code becomes disposable and the generation process becomes the primary artefact, traditional concepts like code review, technical debt, and system evolution need reconsideration.

The emphasis on "fixing inputs, not outputs" creates a compiler-like relationship between specifications and implementations. Just as we debug compiler problems by adjusting source code rather than modifying assembly output, the factory pattern treats generated code as intermediate representation that shouldn't be manually modified.

Team dynamics shift dramatically. Institutional knowledge moves from understanding specific implementations to understanding the patterns that produce good implementations. Team members must become fluent in prompt engineering, agent orchestration, and workflow design rather than just programming languages.

The factory metaphor extends beyond individual development. Manufacturing companies invest in production line efficiency rather than individual product assembly. Development teams might optimise generation pipelines rather than coding skills. This could democratise software creation by lowering barriers to producing working systems, whilst requiring new expertise in agent coordination and specification design.

## The Reality of Implementation

Practical implementation reveals both opportunities and constraints. The cost structure differs dramatically from traditional development—high upfront investment in prompt refinement and agent coordination, but potentially lower marginal costs for additional features.

Quality assurance becomes complex when multiple AI agents contribute to the same codebase. Each agent has different biases, coding styles, and preferences. Without careful coordination, the resulting code lacks coherence despite individual components working correctly. This demands strong governance encoded directly into the generation process.

Verification becomes critical for maintaining confidence in outputs. Having multiple models review code independently helps identify issues the original generating agent might miss. However, this multiplies computational costs and requires careful orchestration to prevent verification agents from simply agreeing rather than providing independent assessment.

Version control and debugging present unique challenges when code is generated rather than written. Traditional debugging assumes you can trace from effect to cause through code you wrote. When that code is generated, debugging must trace back through the generation pipeline to identify which inputs produced problematic outputs.

## Where This Leads

We're moving towards development tools that operate at higher abstraction levels. Rather than text editors and debuggers, we might work with specification designers, agent orchestrators, and generation pipeline monitors. Programming evolves from syntax manipulation to system design at the generation level.

The implications extend beyond productivity to software maintenance and evolution. If code becomes truly disposable and generation processes become reliable enough for production use, applications might be regularly regenerated from evolving specifications rather than incrementally modified.

This requires fundamental trust in the generation process that many organisations aren't ready to embrace. The transition will likely involve hybrid approaches where critical components remain hand-written whilst auxiliary features are generated. The challenge lies in maintaining coherence across this boundary.

The trajectory points towards development environments where human creativity focuses on problem definition, vision, and generation process design, whilst mechanical code creation becomes automated. This doesn't eliminate programming expertise but redirects it towards higher-level system design and pipeline creation.

Rather than replacing developers, this pattern amplifies their impact by focusing them on strategic system design whilst automating tactical implementation. The most successful practitioners will be those who can think systematically about both the systems they're building and the systems that build those systems.