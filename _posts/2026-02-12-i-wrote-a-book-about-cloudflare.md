---
date: 2026-02-12T23:00
title: I wrote a book about Cloudflare
categories:
  - cloudflare
---
I have been writing about Cloudflare's Developer Platform on this blog for a while now. Posts about [Workers](https://lord.technology/2024/02/21/hashing-passwords-on-cloudflare-workers.html), [Containers](https://lord.technology/2025/06/24/cloudflare-containers-changes-everything-for-serverless-computing.html), [Analytics Engine](https://lord.technology/2025/02/04/what-is-cloudflare-workers-analytics-engine.html), [the platform as a whole](https://lord.technology/2026/01/12/rethinking-state-at-the-edge-with-cloudflare-durable-objects.html). Each one started the same way: I would encounter something that surprised me, spend a few days pulling it apart, and write up what I found. It was never planned as a series. I just kept finding things worth writing about.

At some point last year, the posts started feeling incomplete. Not wrong, but limited. I would finish writing about Durable Objects and realise I had not explained how they relate to D1, or when you would choose one over the other, or what happens to your architecture when you combine them. Each post existed in isolation when the platform does not. The interesting questions are not about individual services; they are about the decisions between them.

So I started writing something longer. It became [_Architecting on Cloudflare_](https://architectingoncloudflare.com).

**What it is**

Twenty-six chapters covering the entire Developer Platform. Workers and the V8 isolate model. Durable Objects and why they have no equivalent on any other cloud. D1 and its horizontal-by-design approach to relational data. R2 and zero egress economics. Queues, Workflows, Containers, the Agents SDK, Workers AI, AI Gateway. Production operations, cost modelling, reference architectures, and migration playbooks for teams coming from AWS, Azure, or GCP.

The scope sounds excessive when I list it like that. But the platform has grown into something genuinely comprehensive, and treating it piecemeal is how teams end up fighting the architecture rather than working with it.

**Why I wrote it**

The honest answer is that I enjoy the engineering.

Cloudflare's Developer Platform does something that most cloud platforms do not: it makes interesting architectural choices and then follows them through to their consequences. The V8 isolate model is not a compromise; it is a deliberate decision that gives you sub-millisecond cold starts at the cost of 128 MB of memory. Durable Objects are not a workaround for the lack of a coordination service; they are a genuinely novel primitive that lets you reason about state in ways that AWS and Azure simply do not offer. Even the constraints are interesting. A 10 GB database limit per D1 instance sounds restrictive until you realise you can have 50,000 of them, and that the platform is quietly pushing you towards horizontally partitioned architectures that scale better than the monolithic databases most of us instinctively reach for.

I find this fascinating in a way I have not found a cloud platform fascinating since I first encountered Azure a decade ago. There is a coherence to the design that rewards close study. The more time you spend with it, the more the individual services reveal themselves as parts of a larger architectural philosophy rather than a collection of products someone decided to ship.

The other honest answer is that I kept having the same conversations. A CTO would ask whether Cloudflare could replace their AWS setup. A lead engineer would want to know how Durable Objects compared to DynamoDB with streams. Someone would ask whether D1 was "production ready" without defining what they meant by the question. Each conversation started from scratch because there was nowhere to point them that answered the architectural questions rather than the API questions.

There is at least one existing book that walks you through building things on the platform with code examples. It does that job well. But what I kept needing was something different: the wider context, the honest comparison against hyperscalers, the decision frameworks for choosing between Cloudflare's own primitives. When should you reach for KV versus D1 versus a Durable Object's embedded SQLite? The answer depends on your consistency requirements, your read/write ratio, your data size, and your latency tolerance. Code samples cannot convey that. Architecture reasoning can.

**The chapter I am most proud of**

Chapter 24 is called "When Not to Use Cloudflare."

I am aware of how that sounds for someone who works at a Cloudflare partner and writes enthusiastically about the platform. But this is the chapter that makes the rest of the book trustworthy. Every platform has a shape, and every shape has edges. If your workload needs more than 128 MB of memory and streaming will not help, Workers are wrong. If you need inbound TCP connections that are not WebRTC, Cloudflare cannot do it. If your database requires cross-partition transactions, the platform's eventual consistency patterns are not a substitute, they are a different thing entirely.

I wrote those assessments because I would give you the same advice in a consulting engagement. If the book told you the platform was perfect for everything, you would rightly dismiss it, and you would be correct to do so. The book earns the right to be enthusiastic about Durable Objects by being honest about the limitations of D1.

**What surprised me**

Writing a book is different from writing blog posts in ways I did not fully anticipate.

A blog post can be wrong about something adjacent to its main point and nobody notices because the scope is narrow enough that the error does not cascade. In a book, everything connects. A claim about KV consistency in chapter 14 has implications for the rate limiting patterns in chapter 21 and the multi-tenant architecture in chapter 23. Getting the KV semantics wrong does not just produce an incorrect sentence; it undermines three chapters of architectural advice.

This interconnectedness is also what made the writing satisfying. The platform has a coherence that revealed itself gradually as I wrote across chapters. Patterns that seemed arbitrary in isolation made sense when viewed as parts of a consistent design philosophy. Cloudflare's insistence on global-by-default deployment is not a marketing decision; it is a consequence of the V8 isolate model's ability to start anywhere in under 5 milliseconds. The absence of region selection is not a missing feature; it is the point.

The other surprise was how much the platform changed whilst I was writing. The subrequest limit went from a fixed 1,000 to a configurable 10 million. Queues appeared on the free plan. React Server Components gained native support through the Vite plugin. Markdown for Agents introduced content negotiation for AI crawlers at the edge. A book about a fast-moving platform is a snapshot, and I had to make peace with the fact that some details would shift between writing and reading.

**The engineering that still excites me**

I keep coming back to Durable Objects. They are, I think, the most underappreciated primitive in cloud computing right now. A globally unique actor with strongly consistent SQLite storage, processing requests sequentially, that migrates itself to wherever it is needed. You can build things on Durable Objects that would require stitching together three or four AWS services, and the result is simpler, faster, and cheaper.

The Agents SDK building on top of Durable Objects is the most recent example. Each AI agent is a Durable Object, which means it gets strong consistency, hibernation, WebSocket support, and the full SQLite API for free. The agent maintains conversational state without external databases, survives infrastructure failures without external checkpointing, and scales to as many concurrent agents as you have users. The elegance of building complex capability from simple primitives is what good platform engineering looks like.

I also find the economic model genuinely interesting. Workers charge for CPU time, not wall time. Waiting for I/O is free. This inverts the economics of the entire serverless model. A Worker that spends two seconds waiting for an API response whilst computing for 20 milliseconds costs the same as one that completes in 20 milliseconds with no I/O at all. Once you internalise this, it changes how you think about application design.

**Go and read it**

The book is freely available at [architectingoncloudflare.com](https://architectingoncloudflare.com). I made it free because the goal was always to be useful. If it helps you make better architectural decisions, or saves you from a mistake I have already made, that is the point.

If you find errors, I want to know. If you disagree with an architectural recommendation, I especially want to know. The book is better for being argued with.