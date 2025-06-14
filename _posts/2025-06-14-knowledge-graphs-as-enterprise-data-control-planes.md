---
date: 2025-06-14T17:15
title: Knowledge Graphs as Enterprise Data Control Planes
categories:
  - architecture
---
Ask any enterprise architect about their greatest frustration, and they'll likely describe the same scenario. A simple business concept like "customer" exists in dozens of systems across the organisation. Each system models it differently. Each operates in isolation. When someone asks "how many active customers do we have," the answer depends on which system you ask.

[Netflix's recently detailed](https://netflixtechblog.com/uda-unified-data-architecture-6a6aee261d8d) Unified Data Architecture (UDA) offers a compelling solution to this pervasive problem. Rather than building yet another integration layer, they've treated semantic understanding itself as infrastructure. The result is more than clever engineering - it's a demonstration of knowledge graphs functioning as control planes for enterprise data architecture.

This approach suggests we're witnessing the emergence of semantic infrastructure as a first-class architectural concern, with implications that extend far beyond Netflix's streaming platform.

## The Semantic Control Plane Pattern

Traditional data integration approaches focus on moving and transforming data between systems. UDA inverts this entirely. It begins with establishing a shared conceptual layer - what Netflix calls "Upper" - that defines how business concepts should be understood across the enterprise. From this semantic foundation, the system generates schemas, enforces consistency, and automatically provisions data movement pipelines.

This represents a control plane in the truest sense. Just as Kubernetes abstracts infrastructure concerns through desired state declarations, UDA abstracts data integration concerns through semantic declarations. Teams define what their domain concepts mean once. The platform handles how those concepts manifest across GraphQL schemas, Avro records, Iceberg tables, and dozens of other concrete representations.

The elegance lies in this inversion of control. Rather than systems defining their own models and hoping for eventual consistency, the conceptual model becomes the authoritative source that projects into concrete implementations. This transcends schema sharing - it's semantic governance as executable code.

## Deeper Implications for Enterprise Architecture

Netflix's approach reveals several architectural insights that extend well beyond their specific implementation, each with significant implications for how we build enterprise systems.

**Semantic Infrastructure as a Foundational Layer**

The most significant insight is treating semantic understanding as infrastructure rather than an application concern. UDA positions domain models not as documentation that becomes stale, but as executable specifications that actively drive system behaviour. This suggests enterprises need semantic infrastructure teams, much like they have platform infrastructure teams today.

This shift parallels our evolution from hand-crafted deployments to infrastructure-as-code. Just as we learned to codify operational intent, UDA demonstrates codifying semantic intent. The domain model becomes the authoritative definition that cascades through the entire technology stack, from database schemas to API contracts to user interfaces.

**The Composability of Meaning**

UDA's federated approach to domain modelling enables what we might call semantic composability. Teams can extend and contribute to shared conceptual models while maintaining clear ownership boundaries. This mirrors microservices patterns but operates at the semantic layer, enabling autonomous teams while preserving conceptual coherence across the organisation.

Consider the implications for how large organisations scale their data architectures. Rather than hoping different teams will interpret business concepts consistently, the system enforces semantic alignment whilst preserving team autonomy. The result is distributed ownership with centralised meaning - a powerful pattern for managing complexity.

**Intent-Based Data Movement**

Perhaps most intriguingly, UDA enables what Netflix describes as "intent-based automation" for data movement. Because mappings encode both meaning and location, the system can reason about how data should flow between systems without explicit choreography. This represents a significant leap beyond traditional ETL approaches.

This suggests a future where data pipelines are derived from semantic intent rather than manually configured. Instead of writing complex transformation logic, you declare what concepts need to be where, and the system determines how to make it happen whilst preserving meaning throughout the journey.

## Implementation Considerations

Building semantic infrastructure requires confronting several technical and organisational challenges that Netflix's experience illuminates. Their solutions reveal practical patterns for organisations considering similar approaches.

**The Bootstrap Problem**

UDA solves a classic bootstrap problem elegantly. How do you build a system for managing models when the system itself needs models to function? Netflix's solution is intellectually satisfying and practically sound - Upper is self-describing, self-referencing, and self-validating. The metamodel models itself, providing a concrete foundation for all other domain models.

This bootstrap approach proves crucial for practical implementation. You need a way to begin that doesn't require the entire semantic infrastructure to already exist. Starting with a self-contained metamodel provides solid ground whilst enabling iterative expansion without architectural rework.

**Developer Experience as a Strategic Investment**

Netflix explicitly acknowledges that most engineers find ontology concepts alien. Their response reveals a critical insight - successful semantic infrastructure requires abstracting away RDF and SHACL complexity behind familiar domain-specific languages and generated APIs.

The goal isn't transforming every developer into an ontology expert, but making semantic concepts as approachable as REST APIs or database schemas. This demands significant investment in tooling, clear migration paths from existing systems, and careful attention to cognitive load. The organisations that nail developer experience will see adoption; those that don't will watch their semantic infrastructure become shelf-ware.

**Organisational Coordination at Scale**

The technical challenge of semantic consistency pales beside the organisational challenge of getting distributed teams to converge on shared understanding. UDA's approach of making domain models into data - versioned, queryable, and introspectable - provides technical mechanisms for managing this coordination.

But the fundamental challenge remains deeply human. Success requires new governance processes, clear ownership models, and cultural shifts toward shared responsibility for conceptual consistency. Netflix's federated approach suggests a path forward - centralised semantic governance with decentralised execution and contribution.

## The Broader Pattern

UDA's significance extends beyond Netflix's specific implementation to signal a fundamental shift in enterprise architecture patterns. We're witnessing similar ideas emerge across the industry - semantic layers appearing in data platforms, schema registries evolving toward semantic registries, and growing investment in knowledge graphs for enterprise use cases.

This convergence suggests we're experiencing something analogous to earlier architectural transitions. Just as service-oriented architecture evolved into microservices, and imperative infrastructure gave way to declarative platforms, we may be seeing the emergence of semantic-oriented architecture as the next dominant pattern.

The implications prove far-reaching. When semantic understanding becomes infrastructure, it transforms how we think about system boundaries, team ownership, and technology evolution. It suggests a future where business concepts are first-class citizens in our technical architectures, not just documentation that inevitably drifts from reality.

Netflix's UDA demonstrates this future isn't theoretical - it's implementable today with existing technologies and achievable within realistic organisational constraints. The question isn't whether semantic infrastructure will emerge, but how quickly enterprises will recognise its strategic importance and invest in building these capabilities.

The organisations that treat semantic understanding as infrastructure rather than an afterthought will find themselves with more consistent, discoverable, and maintainable data architectures. More fundamentally, they'll find themselves better positioned to reason about and evolve their business concepts as the business itself evolves.

Perhaps that represents the most important insight from Netflix's work. Our technical architectures should reflect our conceptual architectures, and keeping them aligned isn't just possible - it's necessary for sustainable complexity management at enterprise scale. The alternative is the status quo, where "how many customers do we have" remains an unanswerable question in a world drowning in customer data.