---
title: What the next Git platform needs to remember
date: 2026-10-03T10:00:00+01:00
categories: cloudflare
tags:
  - git
  - github
  - agents
  - software-development
---

A colleague made a suggestion this week that I've been thinking about since: the Git platform should keep the prompts we use to write the software. We were talking about what development becomes as more of us work with agents, and this struck me as something I'd want when picking up somebody else's code.

We keep the resulting diff, perhaps a commit message and a pull request description. The corrections and unsuccessful attempts often stay in someone's local session history, even when they explain a decision that would otherwise look odd to the next developer.

I've been building a Git hosting platform natively on Cloudflare, including the Git implementation itself and the review UI around it. This week Cloudflare [invited developers to build the next Git platform](https://blog.cloudflare.com/next-git-platform-on-cloudflare/) using Artifacts, so the conversation came at a useful moment.

I've spent a lot of time getting the storage and protocol right. If we're going to let agents make and ship more changes without waiting for us, I'd like the collaboration software around them to preserve enough of the work for someone to question it afterwards.

## Why I wrote a Git implementation

My project serves ordinary Git clients from Workers. The Git core is TypeScript, with no runtime dependencies and no `node:` imports. It implements objects, packfiles, refs and the wire protocol directly. There is no Git executable running in a container behind each clone.

A container would have let me use the existing Git binary, at the cost of making container execution part of serving repositories. A filesystem-oriented library would have meant adapting its reads and writes to Cloudflare storage. I wanted control over when bytes came out of R2, how much memory a request used, and which work had to run again on every fetch.

The Git core therefore knows about object and ref storage interfaces, with the backend supplied by the caller. Tests can use an in-memory store; the deployed service uses R2 and Durable Objects. Parsing a pack doesn't need to know about a bucket or a Cloudflare account.

One Durable Object coordinates each repository. Its state includes refs, the object index and review data. The packed Git objects live in R2. A branch is a mutable pointer to a commit, and two clients can disagree about where it should move next. Those updates go through compare-and-swap: move the ref only if its current value is still the one the writer expected. The check and update run under an explicit concurrency gate, because asynchronous work can interleave even inside a Durable Object.

The pack storage is the part I find particularly satisfying. Git often transfers an object as a delta against another object. An `OFS_DELTA` identifies its base by an offset into the pack, which becomes inconvenient when you rearrange the stored entries. My ingest path converts it to a `REF_DELTA`, identifying the base by its object ID, while keeping the compressed payload. Later operations can reuse those stored bytes without compressing the same data again, provided the receiving client also gets, or already has, the required bases.

The receiving Worker spools an incoming pack into R2. The repository's ingest code resolves it through bounded read windows, avoiding the need to hold the entire pack in the isolate. Memory use still grows with the maps of object IDs, staged index entries and connectivity checks, so the implementation budgets for objects and references as well as bytes. A push that exceeds those budgets is refused.

Getting there required correcting an early diagnosis. Windowed reads initially looked like they were causing the isolate to reset. Later measurements showed that the per-object bookkeeping had been underestimated; the production trace reported a memory failure. Blaming the network had obscured a memory-accounting problem. The architecture decision records both explanations and the evidence that changed the diagnosis. Without that, someone reading the older decision could reasonably conclude that we'd already tried windowing and found it unsuitable.

I check correctness against fixtures produced by real Git, including object IDs and bytes my code must reproduce. Testing my own output through my own parser would miss bugs shared by both. Deployed tests exercise clone, push and browser review between separate users. Recovery has had live drills too, though some crash cases and longer-term retention guarantees remain unproven.

## What Artifacts would take off my hands

[Artifacts](https://developers.cloudflare.com/artifacts/) offers versioned storage with a Git interface. Introduced in April and now in open beta on the Workers Paid plan, it lets a Worker [create and fork repositories, inspect their contents and issue scoped credentials](https://developers.cloudflare.com/artifacts/api/workers-binding/). A repository can belong to one agent session or one attempt at a task, rather than having to be the permanent home of a product.

Cloudflare's [launch architecture](https://blog.cloudflare.com/artifacts-git-for-agents-beta/) also uses Durable Objects, with a Git engine written in Zig and compiled to WebAssembly. It stores objects in SQLite and uses R2 for snapshots. We've used some of the same components but made different decisions about storage and runtime.

[Workers Builds can deploy directly from Artifacts](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/artifacts-integration/), with branch Previews available when enabled, and [repository events](https://developers.cloudflare.com/artifacts/guides/event-subscriptions/) can start custom automation. Source, execution and deployment can all live within the Developer Platform.

I'm interested in handing some of that work over, after evaluating the behaviour and limits: Artifacts is still beta, with [current limits of 1 GB per repository and 32 MB per blob](https://developers.cloudflare.com/artifacts/platform/limits/). My project still uses its own engine, but a managed service could free more time for the collaboration software.

## The conversation that never reaches the repository

Consider an agent asked to make a slow endpoint faster. It proposes a cache. The developer explains that permissions can change during a session, so cached results must not survive a change in access. After a couple of attempts, they settle on a different implementation.

Six months later, someone sees code that looks unnecessarily cautious and asks an agent to simplify it. The diff from the original change might show what happened without explaining the rejected cache. A good commit message or architecture decision could preserve the reason, but only if someone made time to write it down. The conversation already contained it.

That's what I like about my colleague's suggestion. I deliberately recorded the corrected memory diagnosis in my project. Capturing the working conversation could help preserve the smaller discoveries that never make it into an architecture decision. The first prompt may be the least informative part of the session; what I'd want to find later is the correction that explained why the obvious solution wouldn't work.

Looking into it, I found several implementations worth learning from. [Entire's checkpoints](https://entire.io/blog/the-entire-cli-how-it-works-and-where-its-headed) link commits to session context, keeping the metadata separately from working branches. [Git AI](https://usegitai.com/docs/get-started/how-git-ai-works) attaches authorship records through Git notes and tracks how those records move through history rewrites. Cloudflare itself [recommends Git notes for prompts and model output](https://developers.cloudflare.com/artifacts/concepts/best-practices/).

When I open a change, I'd like to see what was requested, how that request evolved, and the evidence used to accept the result, without finding the original developer and asking whether they still have the chat open.

We've always lost useful discussions in meetings and private messages. Agent-assisted development puts more of that discussion into a form the tools can capture. It also means an apparently small correction to a prompt can lead to changes across dozens of files. Reviewing the request itself may reveal a problem that is much harder to spot by reading each file separately.

## How I would attach that history

I've already had to deal with a related problem in the review implementation. A commit hash changes when the commit is amended or rebased. A review thread needs a longer-lived identity if it is going to survive that operation. My ordinary pull requests have a managed change ID, separate from their current commits, and the original comment context is retained when a line changes. An outdated comment remains available against the code it described.

One session can produce several commits; one commit can contain work from several sessions and subsequent human edits. I'd give sessions their own IDs and keep those relationships, including the starting revision and what each attempt produced. Squashing a branch should preserve links to all its contributing sessions.

[Git notes](https://git-scm.com/docs/git-notes) are one useful attachment mechanism because they add metadata without changing the commit itself. They live on separate refs, so fetching and pushing them needs to be part of the product. History rewrites also need deliberate handling. Storing a transcript beside a SHA and hoping every tool preserves the relationship would leave too many ways to lose it.

For my project, I'd start with a short account of the task and its constraints, linking to the prompts and corrections. It would record the model and tooling used, the resulting revisions and their test results. A summary should cite the messages it draws on: I want to be able to check whether it dropped a qualification or presented a rejected suggestion as a decision. If the chat says the tests passed, there should be a link to the runner's result for that revision.

My platform has the review identity machinery; automatic session capture would be new work. A Git server cannot infer a local conversation from the objects a client pushes. Capture has to happen where the agent runs, with an export format that survives changing the coding tool or hosting platform.

Nor would I make every transcript available to everyone who can clone the code. Sessions can contain customer data, credentials or discussion that was never intended to become public. I'd want sensitive material filtered before it entered the shared store, separate access controls, and a way to remove material captured by mistake. Developers should be able to see and control what will be uploaded. Keeping a private transcript on another branch of a publicly readable repository would provide no useful separation.

Saving a prompt won't guarantee a reproducible run: the model, retrieved context, tool results and environment all affect what happens. The record should help us investigate the work and attempt it again without reconstructing everything from the code.

## What changes when agents inherit the history

The next reader might be another agent. Before suggesting a cache, it could retrieve the session that ruled the cache out and the test that demonstrates the permissions problem. That is much more useful than having it rediscover the constraint, or having me explain it every few weeks.

I'd still distinguish a historical instruction from a current one. Someone might have told an agent to skip a check during a local experiment, or worked around a limitation that no longer exists. A retrieved transcript should be treated as evidence about what happened, with its date and scope, rather than fresh authority to repeat every instruction in it. Otherwise preserving context could preserve mistakes just as effectively.

A maintained decision should point back to the conversation that informed it and show when it was superseded. A new permissions design might make caching safe. The next agent needs to discover that too, rather than inherit an ever-growing list of things it has been told never to do.

If a repair repeatedly comes back for rework, the team could inspect the requirements and tests that kept accepting it. That seems a better use of this history than counting generated lines or ranking developers by how much they use an agent. People would quickly learn to produce whatever activity the dashboard rewarded.

Of course, adding a thousand-line conversation to every thousand-line diff would make review worse. When the system proposes a change, it should point me to the requirement and the checks it believes establish that the work is done, with the discussion available where I need to investigate. I shouldn't have to read the whole session to find out that the agent quietly gave up on one of the requirements.

## What I would let ship without me

In January I wrote about [what becomes expensive when code becomes cheap](/2026/01/31/what-becomes-expensive-when-code-becomes-cheap.html). I still think owning and validating software are where the costs accumulate. If agents produce changes faster than people can review them, requiring a person to read everything eventually means either slowing production or approving work they haven't understood.

Take a pagination bug that drops the final record. The expected behaviour is already specified: following every page must return each matching record exactly once. An agent gets a fork and permission to propose a fix, with no credential for the production repository. A separate runner checks the candidate against fixtures and expectations the agent cannot edit. An established policy for that class of repair could authorise a limited rollout, with production observations determining whether to continue.

On Cloudflare, Artifacts could hold the work, a [Sandbox](https://developers.cloudflare.com/sandbox/) could run it, and [Workflows](https://developers.cloudflare.com/workflows/) could coordinate verification. Workers Previews could expose a candidate for behavioural testing. I'd still have to build the rules for accepting and promoting it.

If two agents start from the same commit, their changes can pass separately and fail when merged. The compare-and-swap in my merge implementation prevents overwriting a branch somebody else has moved, but the combined result still needs testing. Neither agent's earlier green build establishes that the code about to ship works.

They can also disagree without touching the same files. One task may assume a user's permissions are checked on every request; another may assume a session keeps the permissions it started with. Git could merge both changes cleanly. Retaining the requirements and the conversations gives us somewhere to look for that disagreement, although detecting and resolving it would still be work for the platform and its users.

The captured conversation would help explain the requirement and the decisions made. It wouldn't prove the implementation correct. An agent can be mistaken in both its patch and its explanation, and a second model can share the same assumption. Permission changes, destructive migrations and ambiguous requirements would still reach a person. For work we can test adequately and recover from, I expect the routine approval click to become much less common.

I'd still want to inspect a sample of accepted changes, including their test results and deployment observations. Knowing what a system was allowed to do and what it actually did is how I would decide whether to give it more responsibility.

## GitHub has a chance to build this too

GitHub already has APIs, automated merging and [multiple coding agents through Agent HQ](https://github.blog/news-insights/company-news/pick-your-agent-use-claude-and-codex-on-agent-hq/). Its [Copilot cloud agent commits link to session logs](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents), giving it a starting point for the kind of collaboration I'm describing.

What I think it could lose is its place as the assumed centre of development. If the application running the agents also provisions their repositories, retains their sessions, tests their work and deploys the result, a separate collaboration website becomes optional. GitHub could win that transition by making those things work well together. It also has relationships and trust that matter particularly in open source, where accepting a contribution involves deciding whom to trust.

Cloudflare offers an appealing place to build a different workflow, but putting source, builds and deployment with one provider increases the cost of leaving. I'd want to be able to take the session history and its links with me as readily as the code. Keeping the Git interface while trapping the explanation elsewhere would be an unsatisfying outcome.

When someone next works on my pack reader, I'd like them to find the measurements that changed my mind about windowed reads before they spend an afternoon repeating the investigation. I'd want an agent to find them too. My colleague's suggestion makes me think that keeping this context should be an ordinary part of finishing the work, with the platform doing most of the remembering.
