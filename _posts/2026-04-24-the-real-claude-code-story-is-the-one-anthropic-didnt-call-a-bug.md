---
date: 2026-04-24T12:00
title: The real Claude Code story is the one Anthropic didn't call a bug
categories:
  - ai
tags:
  - anthropic
  - claude-code
  - agentic-engineering
---
Anthropic published [a postmortem yesterday](https://www.anthropic.com/engineering/april-23-postmortem) covering three separate changes that degraded Claude Code output between 4 March and 20 April. Two were deliberate product decisions. One was an actual bug. The postmortem treats all three as the same category of problem, and that framing is doing a lot of work.

The bug is the interesting part only because it made the other two visible. On 26 March, Anthropic shipped a change that cleared older thinking blocks from sessions idle for more than an hour, to avoid a full cache miss when users resumed. The implementation cleared thinking every turn for the rest of the session instead of once. That is a straightforward regression, it took over a week to find, and they fixed it on 10 April. Fine.

The other two are not bugs. On 4 March, Anthropic silently changed Claude Code's default reasoning effort from high to medium because some users were seeing long enough latency on high that the UI looked frozen. On 16 April, they added a system prompt instruction telling Claude to keep text between tool calls under 25 words and final responses under 100 words, to reduce output tokens on the verbose Opus 4.7. Both of these were deliberate choices made by people who knew they were trading intelligence for cost or latency, and both shipped without telling users.

## The framing is the point

The postmortem opens with 'we never intentionally degrade our models' and then describes, in detail, two intentional degradations. The trick is the word 'model'. Anthropic is technically correct that the weights of Opus 4.6 and 4.7 did not change. What changed was the harness, the default effort parameter, and the system prompt. From the user's perspective those are the product. From Anthropic's PR perspective they are infrastructure.

This matters because Anthropic requires you to use their harness if you want to use your Claude Code subscription. You cannot swap in opencode or crush or anything else; the terms forbid it. So the harness, the defaults, and the system prompt are not separable from the model in any way the user can control. When a thing you pay $200 a month for gets noticeably worse, and the company tells you the model is fine, they are answering a question you did not ask.

Boris Cherny, who runs the Claude Code team, was on Hacker News for most of yesterday answering comments directly, which is genuinely rare and worth noting. His explanation of the one-hour idle cache threshold is the most useful technical detail in the whole thread: when a session goes cold, the KV cache on the GPU is gone, and resuming a 900k-token session means writing all 900k tokens back to cache at once, which chews through rate limits fast. That is a real constraint. The design choice to clear thinking on resume was an attempt to soften it. The implementation was buggy. All of that is reasonable.

What is not reasonable is that none of this was documented. Users who built workflows around long-running sessions, which Anthropic's own staff have spent months on X telling people to do, discovered only through a postmortem that sessions older than an hour were being silently reshaped on resume. The Anthropic developer relations account has tweets from March recommending long-running sessions as a feature of Opus 4.6's million-token context window. Those tweets are still up. The implicit contract those tweets created with users is exactly what the 26 March change broke.

## The deeper problem is that the harness is a black box

Every friction point in this postmortem maps to the same underlying issue. Users cannot inspect the state of their session: not the current reasoning effort, not the current system prompt, not the cache age, not what has been elided from context, not which harness changes have shipped since yesterday. When quality regresses, there is no way to distinguish a bad day from a deliberate cost cut from a shipped bug.

This is a product problem, not a technical one. The information exists; it is just not surfaced. A status line showing context tokens, cache TTL, and effort level would have made both the 4 March change and the 26 March bug diagnosable in minutes instead of weeks. A changelog for system prompt changes, separate from the marketing changelog, would have let affected users roll back or adapt. Anthropic has neither.

Compare this with how you would treat any other paid production system. Postgres shows you `pg_stat_user_tables`. Redis shows you `INFO keyspace_hits`. A message queue shows you depth. These are not optional features; they are how you build trust that the thing is doing what it says it is doing. Claude Code is now load-bearing infrastructure for a lot of people's jobs, and it ships with less observability than a Redis install from 2012.

## What to actually do about it

If you are paying for Claude Code, the practical takeaway is narrow. The default reasoning effort is now xhigh on Opus 4.7 and high on everything else, so that part is back. The cache bug is fixed. The verbosity system prompt is reverted. As of today, output quality should be back to roughly where it was in late February.

The harder takeaway is that the product will continue to change underneath you without warning, and the business model rewards that. Anthropic is compute-constrained, on the runway to an IPO, and pricing a $200 subscription that heavy users can burn five to ten thousand dollars of inference through in a month. Something has to give, and the thing that gives will be output quality on the margins, dressed up as a tradeoff against latency or usage limits.

If the workflows you are building depend on stable session behaviour across hours or days, the honest answer is that Claude Code via subscription is not currently the right substrate. The API is; it does not have the harness layer doing things behind you. Pay per token, set your own effort, manage your own context, and you get what you pay for. For agentic pipelines that actually need reliability, that is the trade.

The test for whether Anthropic has learned anything from this is what the next cost-cutting change looks like. If it ships with a changelog entry, a visible setting, and a way to opt out, the lesson took. Otherwise this postmortem is a rehearsal for the next one.
