---
title: "Cloudflare OS is an architecture of distrust"
date: 2026-08-05T21:00
categories: ai
tags:
  - cloudflare
  - agents
  - security
---

The strangest thing in the [Cloudflare OS source code](https://github.com/cloudflare/cloudflare-os) took me a while to understand.

When an agent inside Cloudflare OS wants to do something with a side effect (merge a pull request, send an email, write a row to a system of record), it goes through a Gatekeeper, a small service that holds the credential and mediates the action. So far, that's just a well-built MCP server. But read the contract a Gatekeeper is written against (`packages/workshop-shared/src/gatekeeper.ts`, [around line 617](https://github.com/cloudflare/cloudflare-os/blob/e1ab8fbd4f609aff7ede9d490bafe1bcf9b2a682/packages/workshop-shared/src/gatekeeper.ts#L617)) and you find this instruction to the author:

> It is suggested that the gatekeeper "simulate" actions that have not been approved yet, that is, the `Session` interface should reflect the state of the resource as if all actions had been applied.

Sit with that. The agent asks to merge the PR. The human hasn't approved it. So the Gatekeeper tells the agent the PR is merged, and if the agent reads the branch back to check its work, hands it a fabricated reality in which the merge happened. The agent, satisfied, queues the next three steps that depend on it. None of it is real. Later a human looks at the batch and either commits it or bins it, and if they bin it, everything the agent built on the fiction goes too.

The first time I traced this I thought it was a hack. It's the philosophy of the whole system, compressed into one method signature. The Gatekeeper lies to the agent on purpose, because the alternative (letting an agent's actions touch the world the moment it decides to take them) assumes the agent's decisions are sound. Cloudflare OS is built from end to end on the assumption that they are not.

The name is a distraction, so set it aside. The Hacker News thread spent most of its energy arguing about whether "OS" is a permitted word for the thing, and that's a dead end. What's actually interesting is that a team led by Kenton Varda, the people who built the Workers runtime, sat down to design a platform for AI agents doing real work inside a company, and the organising principle they landed on was this: the agent cannot be trusted, so build so that its mistakes cannot matter. Every load-bearing part of the system is a variation on that sentence.

Last week I [wrote about Opus 5](https://lord.technology/2026/07/29/opus-5-gets-things-wrong-more-quietly.html) getting things confidently, quietly wrong: shipping a change that reported success while doing the opposite, caught only on a second pass. This is what it looks like to take that failure mode not as a grievance but as a permanent design constraint, and pour concrete on top of it.

## Make the code irrelevant to safety

Start with the sandbox, because everything else stands on it.

When you make a slide deck in Cloudflare OS, you aren't using one shared slide-deck app. The system spins up a private instance of the slide-deck code, a "gadget", that belongs only to you. It runs in its own Dynamic Worker, with its own SQLite database behind a Durable Object Facet, outbound networking switched off. Every document is its own sandboxed process.

This is Sandstorm, Kenton's startup from a decade ago, reborn. What Sandstorm got right and could never make cheap was fine-grained instancing: every document in its own isolation boundary. Containers made that far too expensive, seconds of cold start and hundreds of megabytes per grain, so the idea sat on a shelf for ten years until V8 isolates made it roughly a hundred times cheaper to run. I wrote [a book about this platform](https://architectingoncloudflare.com/) and called Durable Objects its most underappreciated primitive; the thing they were waiting to enable, it turns out, was this.

Per-document instancing changes where security lives. For twenty-five years the boundary in multi-tenant SaaS has run straight through the application code. One shared service holds everyone's data, and a single mistake in a `WHERE` clause, one missing `tenant_id`, leaks customer B's records to customer A. The code is load-bearing for security. It has to be correct, and a junior engineer's off-day is a breach.

Cloudflare OS moves the boundary out of the code and into the platform. If every user has their own instance, and the platform controls who can reach an instance at all, a bug in the gadget can only hurt the one person who owns it. Kenton puts it flatly: the AI cannot introduce a significant security bug. He's right, in the sense that matters. A gadget can't leak to another user however badly it's written, because there is no other user in its sandbox to leak to.

This is the first and boldest act of distrust. They didn't make the AI's code trustworthy. They gave up on that and made it irrelevant, arranging things so the correctness of what the agent writes is no longer a security property at all. You can let a non-technical colleague vibe-code an app and share it, and the reason the security team sleeps is not that the app is good. It's that a bad app can't reach them.

## Never let the agent hold the key

The cleverest move is the quiet one.

The obvious way to give an agent access to GitHub is to give it a GitHub token. Anyone who has wired up an MCP server has done some version of this, and felt the small cold moment of realising a token in a prompt can end up anywhere the prompt's output goes.

Cloudflare OS never gives the agent the credential. The Gatekeeper holds it. What the agent gets is a capability: in the generated code it appears as a binding, `env.PROJECT`, an object it can call methods on. Not the key itself, but permission to perform a specific, narrowed set of operations the Gatekeeper will carry out on its behalf. Give the GitHub Gatekeeper a single repository and it can let the agent read issues but not source, mask fields, refuse to merge without approval. The agent can call `listIssues()`. It cannot see the token, widen its own access, or reach the network except through capabilities it was explicitly handed.

None of this is theoretical to me. I built exactly this credential-broker pattern for CDS, and it has since rolled out across the engineering practice there: the broker holds the secret, the agent gets a handle and never the key itself.

This is the object-capability model, and it isn't decoration. It's the Cap'n Proto lineage Sandstorm was built on, resurfacing as Cap'n Web RPC, because a capability is the only kind of authority you can safely hand an actor you've decided not to trust. A key is bearer authority: whoever holds it wields it. A capability is a leash. It does one thing, it can be revoked, it stays attached to whatever granted it. If your agent might be confidently wrong, or prompt-injected, or just careless about what it writes into an app's source, the credential is the one thing it must never touch. So it never touches it.

## Let it act, but never let it commit

Now the simulated merge from the opening makes sense: the same idea, moved from access into control flow.

The problem it solves is one I've felt every day for a year. Synchronous approval is miserable. The agent stops on step one, you've wandered off to make coffee, you come back to no progress. So people cave and turn on auto-approve, or `--dangerously-skip-permissions`, and the safety mechanism they installed to sleep at night is the first thing they switch off to get anything done.

Cloudflare OS splits acting from committing. Reads flow: a read is authorised against the capability and recorded, but it doesn't stop for a human. Writes are provisional. The Gatekeeper accepts the action, simulates the result, and lets the agent race ahead building whatever depends on it, while the real effect sits in a queue for a person to release in a batch, later, when it suits them. The agent gets the throughput of auto-approve; the human keeps the veto of manual review. The human is no longer an interruption in the loop. The human is the commit.

It's optimistic concurrency for actions in the real world, with a person as the transaction monitor, and it has the property optimistic concurrency always has: the agent spends part of its life operating on a state that isn't true yet and may never be. It reads back its own un-happened writes and reasons about them. The architecture's answer to "isn't that dangerous?" is a shrug. It doesn't matter what the agent believes about a world no human has ratified. Belief is free. Only the commit is real, and the agent doesn't hold the commit.

## Distrust the outputs, not just the actions

The subtlest move is the one [the blog post](https://blog.cloudflare.com/cloudflare-os/) almost entirely hides.

The first three mechanisms distrust what the agent does. This one distrusts what it produces. An agent reads a sensitive revenue table and builds a live dashboard from it. The dashboard is a new artefact with no access list of its own. Share it, and you may have just handed the table to everyone who can see the dashboard: a leak no single component did anything wrong to cause.

So Cloudflare OS records every observation a gadget makes. The mechanism lives in [`docs/observers.md`](https://github.com/cloudflare/cloudflare-os/blob/e1ab8fbd4f609aff7ede9d490bafe1bcf9b2a682/docs/observers.md), and it is, in essence, decentralised information-flow control: the academic dream of the mid-2000s, the Jif and HiStar and Flume line of work that never shipped commercially because labelling every piece of data by hand cost more than it returned. When Alice shares a gadget with Bob, every Gatekeeper the gadget has touched is asked, independently, whether Bob may directly read everything the gadget has already read through it. If he can't, he's refused. From then on, any new read the gadget makes that Bob isn't cleared for is blocked outright.

The detail I keep turning over is that the kernel refuses to understand identity. The overseer, the "kernel" in the repo's own OS analogy, does not know what a GitHub user is, or a Google user, or what any vendor's permissions mean. It hands each Gatekeeper an opaque token minted by the observer's own account and lets the Gatekeeper be the sole authority on its own resource. The code goes out of its way to make that handle a random string, so no Gatekeeper author is tempted to parse identity out of it. Authority is decentralised on purpose. The centre is built to know as little as it can.

Where the policy engine can't yet express the nuance, it falls back to raw distrust. A flag, `prohibitAllSharing`, marks data so sensitive it must never leave the owner. Once a gadget reads something wearing that flag, it drops into "lockdown mode": it can still read, but it can no longer take a single action, through any Gatekeeper, ever, in case the action is what smuggles the secret out. A taint bit. A one-way door. The bluntest instrument available, and the comment above it says so and calls it a stopgap. What DIFC never had a good enough reason to ship for, an autonomous agent supplies: you cannot hand-audit what a thing read when it reads a thousand times an hour and reasons about all of it at once.

## A tell in the contributing guide

The worldview surfaces in an odd place. `CONTRIBUTING.md` asks you, politely, not to send pull requests longer than a dozen lines or so, and says why: AI has made writing code cheap, so an outside contribution donates the easy part while creating the expensive part, which is review and keeping the whole thing coherent. They would rather you didn't.

There's a real claim buried there. The scarce resource in software has inverted. Producing code is no longer the bottleneck; vouching for it is. And it's the same reflex as everything else in the system. An unreviewed contribution is untrusted input, and it barely matters whether a careless human or a confident model produced it: the instinct, now written into the project's own governance, is to keep unvetted work out until someone accountable has looked at it. They've generalised their distrust of the agent into a distrust of the contribution, and then into a policy about you.

## Is this wisdom or a cage?

I've read a lot of agent frameworks this year, and most are optimistic in a way that embarrasses them within a month. This one isn't, and I admire it for that. It's the first agent platform I've seen that treats the failure mode as real instead of writing a longer system prompt and hoping. If you believe, as I've come to, that the models are confidently wrong often enough that their self-reports can't be load-bearing, then an architecture that assumes exactly that isn't cynicism. It's honesty.

But an architecture built on the premise that the worker can't be trusted also caps what the worker is allowed to become. An agent that can never hold a credential can never do the job that truly needs one. A write that is always provisional means a human is always, structurally, in the loop: the precise bottleneck agents were meant to remove. Every act of distrust here is also a leash, and the leash that keeps the animal safe is the one that stops it pulling the cart very far. You can't design for maximum autonomy and maximum containment at once. Cloudflare has chosen containment, hard, betting that a caged agent doing real work beats a free one you daren't deploy.

And there's one thing the distrust never turns on. The agent is untrusted. The user's code is untrusted. The human contributor is untrusted. Every principal is held at arm's length and made to earn each move through a capability. Every principal except Cloudflare, whose primitives are the arm. The observation log, the Gatekeepers, the sandbox that makes the whole thing safe are all Workers, Durable Objects, Facets, some added to the runtime for this and existing nowhere else. It runs on `workerd`, which is open source, and you can self-host it, which is more than most of its rivals can say. But the architecture that trusts no one rests entirely on trusting the one party that poured the ground beneath it.

Last week a model told me it had fixed something, and it hadn't, and I only found out because I went and looked. Cloudflare has built a whole operating system on the certainty that it always will (that the thing you delegate to will report a success it hasn't earned), and then arranged matters so that when it does, a human holds the only pen that writes to the world. Whether that's the shape of all serious agent infrastructure from here, or a very elegant set of walls we'll spend three years learning to resent, I can't tell. Probably both. The kernel table in the README has a row for processes, a row for users, and a row for agents left blank, marked only `???`. They know it's a new kind of thing. They just don't trust it yet.
