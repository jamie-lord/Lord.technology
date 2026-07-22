---
date: 2025-04-04T14:00
title: What is Cloudflare Developer Platform?
categories:
  - cloudflare
tags:
  - workers
  - serverless
  - book
---
*Updated July 2026. The original version of this post described the platform as it stood in April 2025. Enough has changed since — Containers went GA, Workflows arrived, Pages quietly stopped being the recommended front door — that a light touch-up wasn't going to cut it. The bigger change is mine, though: earlier this year I wrote a full book about this platform, [Architecting on Cloudflare](https://architectingoncloudflare.com/), free to read, twenty-six chapters. Where this post gives you two paragraphs on a service, the book gives you the trade-offs. I've linked the relevant chapters throughout.*

If you've heard about Cloudflare's Developer Platform but aren't quite sure what it offers, this guide breaks it down in plain terms.

## What is the Cloudflare Developer Platform?

Cloudflare Developer Platform is a set of tools that lets developers build, deploy and run applications globally without managing traditional server infrastructure. Applications deploy worldwide across Cloudflare's network, which now spans more than 330 cities, providing performance benefits regardless of where your users are located. There is no region selector anywhere in the platform, and that's not a missing feature — it's the point. Your code runs everywhere by default.

This post existed first; the book grew out of it and posts like it. If you want the strategic view — what the platform actually is architecturally, and how to assess whether it fits your organisation — that's [chapter 1](https://architectingoncloudflare.com/chapter-01) and [chapter 2](https://architectingoncloudflare.com/chapter-02) of _Architecting on Cloudflare_.

## Key Components

### Workers

Workers lets you run code globally without managing servers. Your application logic executes close to your users, using V8 isolates rather than containers or virtual machines, which is why cold starts are measured in milliseconds rather than seconds. You're billed for CPU time, not wall-clock time — waiting for an API to respond is free, which quietly inverts the economics of the entire serverless model.

Workers also serves static assets now, free and unlimited, which is why it has absorbed the role Pages used to play. A single Worker can host your whole application, frontend and backend together.

The full treatment — the isolate model, its 128 MB memory ceiling, and what that constraint buys you — is [chapter 3 of the book](https://architectingoncloudflare.com/chapter-03).

### Pages

Pages provides a straightforward git-push way to build and deploy websites, and it still works fine. But as of 2026, Cloudflare's recommendation for new projects is Workers with static assets instead, which reached [full feature parity with Pages](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/) in March 2026. If you're starting fresh, skip Pages and deploy to Workers from day one; if you have existing Pages projects, there's no urgency, but the direction of travel is clear. [Chapter 4](https://architectingoncloudflare.com/chapter-04) covers full-stack applications on Workers, including the framework adapters that make this practical.

### R2 Storage

R2 is Cloudflare's object storage solution, comparable to services like Amazon S3. The standout feature is the absence of "egress fees" — the charges typically applied when data leaves a storage service. This makes it particularly cost-effective for applications that serve media files or other large assets, and it's the economic foundation for Cloudflare's newer [data platform](https://lord.technology/2025/09/26/data-architecture-at-the-network-edge.html): R2 Data Catalog exposes your objects as Apache Iceberg tables you can query with standard tools. Zero-egress economics get a full chapter — [chapter 13](https://architectingoncloudflare.com/chapter-13).

### Workers KV

KV (Key-Value) store provides a global cache-like store for applications that need to read information quickly. It replicates your data across Cloudflare's network, making it ideal for configurations, feature flags, or other data that needs low-latency access worldwide and can tolerate eventual consistency. That last clause matters more than it sounds — KV's consistency semantics are the thing most likely to surprise you in production, and [chapter 14](https://architectingoncloudflare.com/chapter-14) (which also covers Hyperdrive, Cloudflare's connection pooler for your existing Postgres or MySQL database) spells out exactly what you can and cannot rely on.

### D1

D1 is Cloudflare's serverless SQL database, built on SQLite. It allows you to store structured data and query it using standard SQL, with point-in-time recovery to protect against mistakes. Each database caps at 10 GB, which sounds restrictive until you realise you can have 50,000 of them on a single account — the platform is quietly pushing you towards horizontally partitioned, database-per-tenant architectures that scale better than the monolithic databases most of us instinctively reach for. [Chapter 12](https://architectingoncloudflare.com/chapter-12) covers D1; [chapter 11](https://architectingoncloudflare.com/chapter-11) answers the question that actually matters: when do you choose KV versus D1 versus a Durable Object's own storage?

### Durable Objects

Durable Objects solves the challenge of maintaining consistent state across a distributed application: a globally unique actor with strongly consistent, SQLite-backed storage, processing requests one at a time. Chat applications, online games, rate limiters, collaborative editing — anything where operations must happen in a specific order. They're available on the free plan now, and I think they remain [the most underappreciated primitive in cloud computing](https://lord.technology/2026/01/12/rethinking-state-at-the-edge-with-cloudflare-durable-objects.html); no other cloud has an equivalent. [Chapter 6](https://architectingoncloudflare.com/chapter-06) is the deep dive.

### Workflows

Workflows didn't exist as a GA product when I first wrote this post. It provides durable execution: multi-step processes that survive failures, restarts, and waits of days or weeks, with retries configured per step. Document ingestion pipelines, scheduled scans, anything you'd have reached for Step Functions or a cron-plus-queue contraption to build elsewhere. When I [built a commercial SaaS product single-handed on this platform](https://lord.technology/2026/04/26/building-real-products-alone-on-cloudflare-and-claude-code.html), Workflows handled every long-running operation in it. [Chapter 7](https://architectingoncloudflare.com/chapter-07) covers the model and its sharp edges.

### Queues

Queues helps manage tasks that don't need to happen immediately. Rather than processing everything at once (which could overwhelm your system), it allows your application to handle tasks in a controlled manner — sending emails, processing uploads, any background work that doesn't need an immediate response. Now included on the free plan. [Chapter 8](https://architectingoncloudflare.com/chapter-08) covers when a Queue is the right tool and when a Workflow is.

### Containers

The newest major piece, and the one that removes the platform's oldest objection. [Containers](https://lord.technology/2025/06/24/cloudflare-containers-changes-everything-for-serverless-computing.html) runs full Docker images — Python, Go, that legacy binary, anything needing more than the Workers memory ceiling — globally, with each container instance backed by a Durable Object for routing and lifecycle. It [reached general availability in April 2026](https://developers.cloudflare.com/changelog/post/2026-04-13-containers-sandbox-ga/) alongside Sandboxes (isolated environments aimed at AI agents that need to execute code), with active-CPU pricing so you only pay for cycles actually used. [Chapter 9](https://architectingoncloudflare.com/chapter-09) covers when to step outside the isolate model.

### Workers AI

Workers AI lets you run open AI models — text generation, embeddings, image models, speech — on GPUs across Cloudflare's network. Instead of sending data to a centralised provider for inference, the models run within the platform your application already lives on, with a free daily allocation to experiment against. [Chapter 16](https://architectingoncloudflare.com/chapter-16) covers the catalogue and its economics.

### Vectorize

Vectorize is designed for applications that use AI to understand and search content. It stores and searches embeddings — numerical representations of text, images, or other content — making it the retrieval half of any RAG (retrieval-augmented generation) application you build on the platform. [Chapter 17](https://architectingoncloudflare.com/chapter-17) builds a complete RAG pipeline out of Vectorize, Workers AI, and R2.

### AI Gateway

AI Gateway sits between your application and AI providers — OpenAI, Anthropic, Google, or Workers AI itself — providing a single access point that handles caching, logging, rate limiting, and fallback between providers. You get per-request token counts and latency in a dashboard before you've written a line of observability code. It's covered alongside the rest of the AI stack in [chapter 15](https://architectingoncloudflare.com/chapter-15).

### Agents SDK

The Agents SDK is the platform's answer to the question everyone is currently asking. Each AI agent is a Durable Object under the hood, which means it gets strong consistency, hibernation, WebSocket support, and its own SQLite database for free — conversational state without an external database, checkpointing without external infrastructure. It's the clearest example of the platform's design philosophy: complex capability composed from a small set of primitives that were designed to fit together. [Chapter 18](https://architectingoncloudflare.com/chapter-18) covers agent architectures and the patterns that emerge from them.

## The book, since you're here

Between the first version of this post and this one, I wrote [_Architecting on Cloudflare_](https://architectingoncloudflare.com/) — twenty-six chapters on decisions, trade-offs, and patterns for this platform, written over a few months and [published free in February 2026](https://lord.technology/2026/02/12/i-wrote-a-book-about-cloudflare.html).

It exists because posts like this one kept feeling incomplete. A summary can tell you what D1 is; it can't tell you when to choose it over KV, or what happens to your architecture when you combine it with Durable Objects, or how the whole platform compares honestly against AWS, Azure, and GCP when a CTO asks whether they can migrate. Those are the questions the book answers: cost modelling ([chapter 19](https://architectingoncloudflare.com/chapter-19)), reference architectures ([chapter 22](https://architectingoncloudflare.com/chapter-22)), multi-tenant designs ([chapter 23](https://architectingoncloudflare.com/chapter-23)), and migration playbooks for teams coming from the hyperscalers ([chapter 25](https://architectingoncloudflare.com/chapter-25)).

## Why Developers Choose It

1.  **Global Performance**: Applications run closer to users, reducing latency and improving experiences regardless of location.

2.  **Simplified Operations**: The platform handles infrastructure concerns like scaling, availability, and security. There's no IAM policy language to learn, no VPC to design, no capacity to provision.

3.  **Cost Predictability**: Generous free tiers, CPU-time billing on Workers, no egress charges on R2, and active-CPU pricing on Containers. The pricing model consistently charges for work done rather than resources reserved.

4.  **Coherence**: The services aren't a collection of acquisitions wearing a shared logo. Containers are backed by Durable Objects; the Agents SDK is built on Durable Objects; Workflows and Queues bind directly into Workers. Learning one primitive keeps paying off in the others.

## Getting Started

Cloudflare's free tier includes substantial resources to build and experiment:

*   100,000 Workers requests per day, with static asset requests free and unlimited

*   10 GB of R2 storage

*   Free tiers across D1, KV, Durable Objects, Queues, and Workflows

*   A daily free allocation of Workers AI inference

The paid Workers plan starts at $5 per month. As your needs grow, you scale by usage rather than by re-architecting.

## When it isn't the right platform

The chapter of the book I'm proudest of is [chapter 24, "When Not to Use Cloudflare"](https://architectingoncloudflare.com/chapter-24). If your workload needs more memory than an isolate offers and a Container doesn't fit the shape of the problem, if you need inbound TCP connections that aren't WebRTC, if your database genuinely requires cross-partition transactions — the platform has edges, and you should know where they are before you commit. Every platform has a shape. This post has told you what Cloudflare's shape is; the book will tell you whether your workload fits it.
