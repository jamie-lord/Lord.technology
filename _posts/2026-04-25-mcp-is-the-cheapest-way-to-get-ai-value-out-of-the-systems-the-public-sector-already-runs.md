---
date: 2026-04-25T09:00
title: MCP is the cheapest way to get AI value out of the systems the public sector already runs
categories:
  - ai
tags:
  - mcp
  - cloudflare
  - public-sector
  - agentic-engineering
---
A proof of concept I built for the College of Policing is included in the techUK ['From Pilots to Practice'](https://www.techuk.org/resource/from-pilots-to-practice-using-ai-in-the-public-sector.html) report this month as the Justice and Policing case study. It was a short engagement against representative data rather than a production integration. The specific details of the work sit with the client; what's worth writing up is the pattern, because it applies to a lot of public sector organisations.

The shape of the problem is familiar. A department or agency has valuable data, but it lives across multiple systems that each grew up to serve a specific function. Training records in one place, compliance data in another, policy and guidance in a shared drive somewhere, bookings in a line-of-business database, HR in a different system again. Each system works. What's missing is a way to ask questions that span them. The usual answer involves exporting to spreadsheets, manually reconciling, and producing a static report that's out of date by the time anyone reads it.

MCP turns that shape of problem into something tractable without replacing any of the underlying systems.

## The pattern

You put an MCP server in front of each source system, exposing a small set of tools that answer specific kinds of question. An LLM client then gets a natural-language question, decides which tools are relevant, calls them, and stitches the results together. The user asks 'how does our completion rate compare to similar organisations, and what guidance applies' and gets a coherent answer in seconds. Each tool is a short piece of code that knows how to query its particular source and normalise the result.

The important property is that the source systems don't change. They keep their existing access controls, their existing owners, and their existing role in the business. The MCP layer is a translation layer, not a replacement. That makes it something you can ship as a proof of concept in weeks, because the work is in writing tools against data that already exists rather than standing up new infrastructure.

This matters for the public sector specifically because the alternative is usually a multi-year data warehouse or lakehouse programme. Those programmes have their place, but they're slow, expensive, and often have to justify themselves before anyone sees an analytical query. An MCP wrapper layer sits in front of that conversation rather than competing with it. You can get useful capability in front of users quickly, and let actual usage inform what the longer-term data platform should look like. If a warehouse arrives in eighteen months, the MCP tools point at the warehouse instead of the source systems; the query experience for users doesn't change.

## What the proof of concept could and couldn't show

A short engagement can demonstrate that the pattern is viable, that developer velocity is high, and that the answers a language model produces over well-scoped tools are good enough to be useful. It can't demonstrate production readiness. Real deployment needs identity integration, proper security boundaries, data classification controls, audit trails that satisfy public sector requirements, and enough data quality work inside each tool to make answers trustworthy in operational use. None of that was in scope. The proof of concept showed the architecture could support those things; it didn't prove they'd hold up.

That distinction matters because public sector AI pilots often get over-claimed on the way from demo to board paper. It's worth being clear that a PoC demonstrates a direction worth exploring, not a product ready to deploy.

## Why the platform choice wasn't incidental

I built this on Cloudflare's developer platform. The usual primitives were there: Workers for compute, R2 for object storage, Hyperdrive for the connection into an on-prem database, Durable Objects for the MCP server runtime, Workers AI for inference when it made sense to keep it on-platform, AI Search (what used to be AutoRAG) for document retrieval. You can build a version of this on AWS or Azure with equivalent primitives, and the resulting system would work. It would take longer and cost more.

Three specifics mattered.

R2's zero egress model changes the cost projection at scale. Intelligence queries are compound operations over multiple sources, so data moves through the system even when the underlying datasets are modest. On platforms that charge for egress, the data transfer line becomes part of the cost envelope. On R2 it doesn't. For public sector budgets where the cost ceiling determines whether users can query freely or have to ration, this is the difference between a useful system and a constrained one.

Durable Objects fit the stateful shape of MCP sessions. Conversations accumulate context, tool calls depend on prior results, and demand is bursty. Durable Objects hibernate when idle and resume with state intact, so compute is paid for during actual use rather than provisioned for peaks. For internal tools inside a public sector organisation, where usage spikes around planning cycles or incidents and drops off between them, that's a good fit.

AI Search handled document retrieval as a managed pipeline: ingestion, chunking, embedding, retrieval, caching, all as one service. For a short engagement where the alternative was spending a week on infrastructure nobody would see, that meant more time on the tool implementations users actually interact with.

## What transfers

If you're thinking about where AI might deliver value inside a public sector organisation, the most productive question isn't 'what new capability can we build'. It's 'which questions do our people currently answer by pulling data from three systems and reconciling it by hand'. Those are the places where an MCP wrapper pays for itself almost immediately, because you're replacing labour rather than creating new demand. The data exists. The systems exist. The integration is the missing piece.

The [techUK report](https://www.techuk.org/resource/from-pilots-to-practice-using-ai-in-the-public-sector.html) collects fourteen case studies across the public sector, spanning justice, health, education, local government, trade, and national security. Most of them land on a similar observation from different angles: the biggest gains come from connecting what's already there rather than building something new. MCP is one way to do that connection. It's not the only way, and it won't be the right fit for every organisation, but for clients sitting on valuable data in systems that don't talk to each other, it's worth a proof of concept before committing to anything larger.
