---
date: 2025-06-14T17:00
title: Three Lenses for Understanding Software Complexity
categories:
  - programming
---
Software complexity discussions often devolve into frustrating exchanges where participants talk past each other. The reason is simple: we lack a shared definition of what complexity actually means. Three prominent thinkers offer distinct perspectives that reveal fundamentally different priorities about how we should design and evaluate systems.

Rich Hickey frames complexity as objective "complecting" - the inappropriate intertwining of concerns. John Ousterhout views it through cognitive burden and dependencies. Zach Tellman approaches it as explanatory effort required over time. Each perspective leads to markedly different architectural decisions and team dynamics.

## Objective Simplicity: Hickey's Structural Perspective

Hickey defines something as simple when it exhibits "oneness" in role, task, or concept. Complexity arises when we inappropriately combine distinct concerns - what he calls "complecting". This perspective treats simplicity as objective and observable regardless of the developer's background.

A foreign key relationship between database tables might be considered complex because it forces us to consider both tables simultaneously when making changes. State management libraries that combine data and behaviour would similarly be problematic under this definition.

The strength lies in providing clear, decisive guidance about system structure. The limitation emerges when distinguishing between appropriate composition and inappropriate complecting, particularly for cross-cutting concerns like security or observability.

## Cognitive Burden: Ousterhout's Developer Experience

Ousterhout defines complexity as "anything that makes a system hard to understand and modify". He identifies dependencies and obscurity as the primary causes, manifesting as change amplification, cognitive load, and unknown unknowns.

This perspective acknowledges some subjectivity whilst maintaining practical criteria for evaluation. It focuses on the developer experience rather than abstract structural principles. However, the circular nature of some definitions - where complexity is defined partly in terms of its own symptoms - can make consistent application challenging.

## Explanatory Effort: Tellman's Audience-Centric View

Tellman offers the most explicitly contextual definition: complexity as "the sum of every explanation, weighted towards future explanations". This framework treats complexity as fundamentally audience-dependent.

Coupling becomes "the degree to which two things tend to be explained together". Rather than treating coupling as inherently problematic, this perspective evaluates it based on explanatory frequency. If distributed tracing requires explaining multiple components together, but this explanation occurs regularly during debugging, the coupling may be justified.

## Where Perspectives Diverge

Consider introducing distributed tracing to a system with structured logging. Hickey's framework suggests avoiding the "complecting" of application logic with instrumentation. Ousterhout's approach would evaluate the cognitive burden and dependencies created. Tellman's perspective would focus on whether debugging frequently requires understanding request flows across services.

These differences become pronounced when evaluating team dynamics. When a new team member struggles with existing code that others navigate comfortably, the three perspectives offer different interpretations:

*   **Hickey**: The code is either objectively simple or complex, independent of the developer's experience
    
*   **Ousterhout**: Difficulty indicates excessive complexity requiring remediation
    
*   **Tellman**: Teams must establish competency baselines and explanation budgets
    

## Practical Implications

The choice of complexity definition shapes architectural decisions and team standards. Hickey's objective simplicity might drive aggressive decoupling even when it creates communication overhead. Ousterhout's cognitive focus might result in extensive documentation efforts. Tellman's explanatory approach might accept higher apparent complexity to reduce future explanation costs.

Tellman's framework offers particular value for modern development contexts involving distributed teams and varying skill levels. By explicitly considering who needs to understand what and when, it provides tools for reasoning about complexity within organisational realities rather than purely technical abstractions.

## Synthesis

Rather than competing definitions, these represent complementary lenses for different aspects of complexity. Hickey's structural independence principles inform service boundary decisions. Ousterhout's cognitive burden guidance shapes API design. Tellman's explanatory framework addresses team dynamics and documentation strategies.

The most sophisticated approach involves applying the appropriate lens contextually. This multi-faceted view aligns with contemporary trends towards contextual decision-making in software architecture, recognising that complexity emerges from the interaction between systems, people, and organisational contexts.

Understanding these different perspectives enables more productive complexity discussions and better-informed architectural trade-offs that serve both technical and human needs effectively.