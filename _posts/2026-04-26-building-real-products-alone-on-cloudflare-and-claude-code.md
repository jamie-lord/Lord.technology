---
date: 2026-04-26T09:00
title: Building real products alone on Cloudflare and Claude Code
categories:
  - ai
  - cloudflare
tags:
  - claude-code
  - workers
  - workflows
  - agentic-engineering
---
Six weeks ago I started building something. A real commercial SaaS product, not a prototype — authentication, billing, scheduled background work, document ingestion, AI generation, distribution flows, an end-to-end test suite that actually passes, and the kind of architectural scaffolding that survives a code review. I am one person. The product sits roughly where you would expect a small team to be after a quarter, and the experience of getting it there felt different in a way I do not think the industry has fully absorbed yet.

Two things made it possible. The first is that the Cloudflare Developer Platform has reached the point where a single developer can deploy a serious product on it without any other infrastructure. The second is that Claude Code has reached the point where it functions less like a clever autocomplete and more like a junior team you direct instead of supervise. Neither of these is news in isolation. What is news is what they feel like together.

## The platform stops being a thing you fight

Most cloud platforms make you choose your battles. You pick which database, which queue, which object store, which secret store, which observability stack, which deployment tool, which frontend host, which CDN, and then you spend a non-trivial fraction of your time wiring those choices together and apologising when they leak through to the application code. Cloudflare mostly removes that work because the choices have already been made and they fit together by design.

The product I built runs entirely on Workers, with SvelteKit compiled through the Cloudflare adapter as the application runtime. D1 is the database. R2 holds the binary artefacts customers upload. Workers AI serves the inference, fronted by AI Gateway for logging, caching, and provider fallback. Workflows handles every long-running operation: document ingestion, generation, scheduled scans against external sources. KV holds rate-limit counters. There is no Postgres, no Redis, no S3, no SQS, no scheduled GitHub Action acting as a cron, no Sentry, no Datadog, no separate frontend host. Just bindings on `platform.env`.

The thing I keep coming back to is that I never had to make an integration work. The bindings are present at deploy time or the deploy fails. The IAM model is implicit because there is no IAM. Secrets live in `wrangler secret`. Logs stream from `wrangler tail`. An AI request gets logged in AI Gateway with token counts and latency before I write a line of observability code. Production and staging are the same Worker pointed at different bindings. Local development is one command, and local development uses the actual storage layers via Miniflare. The platform behaves as if a small group of engineers spent a long time worrying about the seams so that I would not have to.

You feel this most acutely when you do something that would otherwise be load-bearing infrastructure. The product polls a dozen or so external sources on a daily schedule, hashes the responses, diffs against the previous hash, and triggers a child workflow whenever a source has changed. On AWS this is a Lambda triggered by EventBridge writing to DynamoDB and dispatching Step Functions, with the IAM policies and the dead letter queue and the X-Ray tracing that go with it. On Cloudflare it is a Workflow class with a cron trigger and a `step.do` that calls the database. The retry policy is a config object on the step. The whole monitoring system is two files.

## The constraints are the design

Cloudflare's constraints are well advertised. Workers cap at 128 MB of memory. D1 caps at 10 GB per database. Workflow classes cannot be exported from a Worker that is also a SvelteKit application — they have to live in their own deployable. Each of these is occasionally inconvenient and each of them, in practice, pushes you towards the architecture you should have written anyway.

The 10 GB D1 ceiling means you put a tenant column on every table from day one whether you currently need it or not, because the path to scaling out is sharding by tenant and the schema has to be ready when that day arrives. The Workflow export limitation means each long-running concern lives in its own worker, cross-script bound from the main application — which sounds annoying until you notice that this is exactly the right separation of concerns for retry behaviour, scaling, and operational failure isolation. The 128 MB memory limit means you stream rather than buffer, and your processing pipelines stay composable rather than collapsing into one fat function that does everything.

This is the observation Cloudflare keeps making about its own platform: the constraints are not arbitrary, they are a design with consequences. The platform asks you to write code that scales horizontally, hibernates when idle, and keeps state close to compute. If you do that, the architecture is correct by construction. The platform does not let you build the wrong thing very easily.

## Claude Code is not autocomplete, and that matters

The other half of the leverage is the agent. I have used every flavour of AI coding tool over the last two years, from inline completions to chat sidebars to agent IDEs, and Claude Code is the first one where the tool/operator relationship genuinely inverted. I do not type code. I type architectural intent and review what comes back. The artefact is not a function — it is a feature shipped behind an ADR, a migration file, a database access layer, a route, a unit test, an end-to-end test, a regression check, and a commit on a feature branch.

The mechanism that makes this work is not the model on its own. It is the fact that Claude Code lets you build a project-specific agent, with project-specific subagents and project-specific skills and project-specific rules, and that it actually uses them. My repository carries a `CLAUDE.md` that tells the agent what the product is, what the build commands are, what the architecture is, what is in the structured reference data that constrains generation, and what the operating rules are. There is a `.claude/rules/` directory with code style, API design, testing, security, and documentation rules that get pulled in automatically. There is a `.claude/skills/` directory with workflows for the recurring tasks: adding a route, adding a migration, planning a feature, fixing an issue, running a regression check, running a pre-deployment check. There is an agents directory with a product manager, a solution architect, a lead developer, a developer, a tester, a domain specialist, and a security auditor.

When I ask the agent to add a feature, the planner plans it, the solution architect writes the ADR, the developer implements it, the tester writes the tests, and the lead developer reviews the diff. Not because I am orchestrating that flow — because the harness is. The skill for a new route knows it needs to add the route, the form action, the load function, the activity log entry, and the end-to-end test, and that those have to land in the same commit. The skill for a new migration knows it needs to update the schema, the access layer, the type, and the test. The agents are not theatre. They are the way the project enforces its own discipline on the model.

The result is that I work more like a tech lead than a developer. I describe the change. I read the plan. I push back on the parts that are wrong. I read the diff. I run the regression check. I commit. The agent never returns a raw `Response` from a SvelteKit form action because the rules forbid it. The agent updates the e2e tests in the same commit as the UI change because the rules require it. The agent never invents reference data because the rules tell it not to and the structured store tells it where to look. None of this requires me to remember anything in the moment. The discipline is in the harness, not in my head.

## The economics are quietly absurd

The Cloudflare bill for the entire build through development was effectively zero. The Workers free tier covers a hundred thousand requests a day. D1's free tier covers five gigabytes of storage and millions of row reads. R2's free tier covers ten gigabytes. Workers AI's free allocation is generous. AI Gateway is free. The only meaningful cost during the build was inference for the harder generation prompts, and that cost was less than my coffee budget.

Cloudflare's pricing is shaped so that the marginal cost of running a real product approaches zero until you have paying customers, at which point the costs scale with revenue rather than ahead of it. That is the right shape for a solo founder. The platform is not designed to extract money from you while you are still figuring out whether the product works. It is designed to disappear until usage says you need to be charged.

The Claude Code subscription is a separate budget. The honest answer is that for a project of this scope it pays for itself in a week. The model writes code that I would otherwise pay a senior engineer to write, and it does it under direction, and the work product is reviewable. I do not think about the subscription cost. I think about whether the agent is producing the right thing.

## What this actually changes

I am wary of the "AI changes everything" register. Most of the time it changes specific things, and the specific things matter, and the rhetorical inflation gets in the way. So let me be precise.

It has been true for a while that a solo developer could build a small SaaS product if the scope was modest, the architecture was simple, and the operational requirements were minimal. Stripe and a managed Postgres on a managed host got you a long way. What was not true was that a solo developer could build a substantive product with scheduled background processing, AI throughout, document handling, billing, distribution, end-to-end evidence trails, and the kind of architectural rigour that survives an acquirer's due diligence. That required a team.

The combination of Cloudflare's platform and Claude Code as a directed agent has moved that line. Not by an enormous amount and not for every kind of product, but for a real and recognisable class of SaaS products it has moved enough that one person can do it now, and the resulting code is not embarrassing. The artefact passes type checks and lint and the test suite. The migrations are reversible. The ADRs are written. The end-to-end tests pass. The activity log is append-only. The bindings are typed. The deployment order is enforced.

What I find most interesting is that this is not really about speed. The speed is impressive, but the speed is a consequence. The actual change is in the shape of the work. The boring infrastructure is gone, the platform handles the platform, the agent handles the implementation, and the human gets to think about the product. That is what people mean when they talk about leverage, and it is finally available to one person at a desk.

The market has not absorbed this yet. It will.
