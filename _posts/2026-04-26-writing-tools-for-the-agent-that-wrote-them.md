---
date: 2026-04-26T15:00
title: Writing tools for the agent that wrote them
categories:
  - ai
tags:
  - claude-code
  - mcp
  - agentic-engineering
---
Most of what I have shipped this year has been built using Claude Code. That part is no longer interesting on its own — half the engineering timeline is talking about it. What is more interesting is that one of the projects I have been working on is also *for* Claude Code to use, written by Claude Code, to extend what Claude Code can do for me. The agent built its own tools, and now the agent uses them. I want to talk about that loop, because the second time you encounter it the implications start to widen out.

The project itself is not the point of this post. Pipeline shape: it pulls some external state into a local snapshot, runs deterministic rules over the snapshot to produce a queue of items, and then needs an agent to evaluate each item — decide whether it is real, relevant, and worth surfacing — before producing a final artefact for the user. The evaluation step is the agentic part. When I started, I built it the way you would expect: an in-process loop that called Anthropic's SDK, parsed the model's tool calls, dispatched them, and handed the response back. It worked. It had tests. It produced the right thing.

About four days after that loop landed I deleted it.

## When the IDE is also the runtime

The realisation that triggered the deletion was banal. I had been running every real evaluation by hand inside Claude Code rather than through the SDK loop. I had built the SDK loop because that is what you do when you are writing an agentic application — you instantiate your own loop, your own transport, your own tool registry, your own structured-output retry policy. But I never used it. The actual runtime where the work happened was the same Claude Code session I was already sitting inside while writing the code.

So the SDK loop went, along with the in-process tool registry, the recording transport, the headless-context detection, the API key plumbing, the preflight tests, the budget enforcement, all of it. About 1,200 lines of source and 600 lines of tests. The replacement is four stdio MCP servers that Claude Code spawns at session start, a custom subagent in `.claude/agents/`, a handful of skills in `.claude/skills/`, and an ADR explaining the reasoning. The agent now does its work by calling tools my code exposes. The structured-output contract is enforced at the tool boundary. There is no model SDK in the dependency graph at all.

This is the inversion the post is about. A normal agentic application has its own loop, and the model is one of its dependencies. When Claude Code is your runtime, the loop is the model's, and your application is one of *its* dependencies. The arrow flips. You stop writing an agent and start writing tools for an agent that already exists.

## What you build when you build for the agent

The MCP servers I ended up with are small. The biggest is around 500 lines including its schema validation. The smallest is forty. They are not exciting individually. What is interesting is what they are, collectively, optimised for.

A normal library is optimised for human callers. Function names are descriptive but compact. Errors are structured for catching in known places. Tests assert on the happy path and the obvious failure modes. An MCP server you write for an agent to use is optimised for a different consumer. The function names have to make sense to a model that has read your tool descriptions once, half a context window ago. The errors have to teach the agent what to do next, because the agent is going to read the error and decide whether to retry, branch, or escalate to the human. The schemas are not just for validation; they are an authoring surface that the model writes against. The tool descriptions are the prompt.

The most useful tool I wrote is the one that ingests the agent's structured output. Each evaluation produces a typed reasoning chain — a closed set of claim kinds with strict shapes, plus a narrative, plus a conclusion. Rather than ask the model to emit JSON and parse it post-hoc, the chain arrives as the input to a tool. The tool's input schema is the structured-output contract. Zod validates the shape; a separate pass checks the semantic content (every cited claim must verify against the snapshot; references must resolve to the structured corpus the project ships; inferred claims must trace back to base claims that verified). If anything fails, the tool returns an error the agent can read, and the agent retries from where it is, mid-task, without losing the reasoning it already did. The integrity boundary is the tool, not a post-hoc parser.

This is a different shape from the tool registries I have written before. In a conventional agent loop, tools are functions the model calls to get information; structured output is a separate concern handled outside the tool surface. In an MCP-first design, the two concerns collapse. The structured-output mechanism is just a tool whose input schema happens to be the contract. The same boundary that would have been a parser becomes a server-side validator with retry semantics the agent already knows how to use.

## Subagents are how the project enforces its discipline

The thing the agent calls when it does the work is not the parent Claude Code session. It is a subagent — a fresh context, a tightly scoped tool allowlist, and a system prompt that lives in version control next to the rest of the project. The subagent has read access to the snapshot, to the rule pack, to the structured reference corpus, and to the submission tool. It cannot run shell commands. It cannot read or write arbitrary files. It cannot make network calls. The constraint set is encoded in `.claude/agents/<name>/AGENT.md` and enforced by Claude Code itself, not by my code.

This matters more than it sounds. The system prompt for the subagent — what it is, what it must do, what it must never do — is a load-bearing artefact. It defines the closed set of claim kinds. It encodes the rule that the agent must never invent a framework reference if the corpus does not contain one. It explains how to use the operator-knowledge server when the model encounters a vendor-specific shape it has not seen before. Putting that prompt in `.claude/agents/` means it is reviewed when I review the rest of the codebase, diffed when I diff a change, and regression-tested when I run the test suite. The prompt is part of the project, not part of my head.

The skills are the project's verbs. There is a skill that orchestrates a single evaluation, a skill that batches the work across the whole pending queue, a skill that runs the deterministic pipeline end-to-end. They live in `.claude/skills/` alongside the agent. They are how I actually use the system from inside Claude Code. The batch skill groups items into cohorts by rule and account, dispatches one subagent per cohort, and lets each subagent emit one chain per item. Claude Code's own parallel agent fan-out is the scheduler. None of this required me to write a job runner.

## The operational details that surface

Once Claude Code is your runtime, there are operational details that do not exist in a conventional architecture. The MCP servers are long-lived child processes. They cache their data at session start. A change to the rule pack is hot-reloaded by the affected server on the next tool call; a change to the chain schema requires Claude Code to restart, because Node has cached the old import. I learned this the painful way. My first batch run produced 27 failed chains because a rule addition was not seen by the rules server, and 44 chains that could not emit a new claim kind because the schema in the chain server was stale. The result became an ADR titled "MCP hot-reload vs. restart — what takes effect when," which is now the operational guide every contributor reads before adding a rule or touching a schema.

That ADR exists because the project's user is the agent. A normal piece of code does not need an operator's manual for "what takes effect when you change source files." A long-running stdio MCP server inside an editor session does. The shape of the documentation changes when the runtime changes.

## The deletion as evidence

The strongest evidence that the model has actually inverted is the size of the codebase. When you build a conventional agentic application, the parts of the system that are about *being* an agent — the loop, the transport, the tool registry, the budget, the recording infrastructure — accrete continuously. Every new failure mode you discover gets a new piece of code. When the runtime moves out, those parts go away. The MCP servers are smaller than the loop they replaced. The tests are tighter than the recording fixtures they replaced. The dependencies are fewer. The operational surface is narrower. The integrity guarantees are stronger, because they live in one place — the tool boundary — instead of spread across a parser, a retry policy, and a downstream consumer of a JSON blob.

I keep an ADR titled "Claude Code is the sole runtime." It is mostly a list of what was deleted and why. It is short, and it is the one I am most proud of, because it is the only ADR in the project that records work done by removal rather than addition. The architecture got smaller when the runtime moved.

## The recursion is the point

The thing I keep coming back to, watching my own projects, is the recursive shape of this. Claude Code wrote almost every line of those MCP servers under my direction. I read the diffs and run the tests and push back on bad designs, but the typing is its. Once the servers are merged, the next session of Claude Code spawns them. The agent that authored the tools is now using the tools. The same fingerprints are on both sides of the boundary.

This is not a parlour trick. It changes what you build. When you know that the consumer of your library is the agent that just wrote it, you write the library differently. The descriptions become richer because the agent will rely on them. The error messages become instructive because the agent will read them. The schemas become tighter because schema enforcement is your only line of defence against drift. You stop optimising for human ergonomics and start optimising for agent ergonomics, and you discover that the two often want different things. The agent does not want a clever fluent API. It wants a small set of well-named tools, predictable error shapes, and a contract it cannot accidentally violate.

Most of the discourse about agentic engineering still treats the agent and the codebase as separate populations: the codebase is what the agent edits, and the agent is the editor. That framing was right two years ago. It is becoming wrong. A growing class of projects is one in which the codebase is also the agent's runtime — the project is the harness, and the harness is the project. When you build for that, the deliverables look different. You ship MCP servers, you ship subagents, you ship skills, you ship hooks, and you ship the discipline that makes them safe to compose. The agent does the work. Your code is what makes the work trustworthy.

I find that an unusually satisfying place to be writing software in 2026.
