---
date: 2026-02-02T21:00
title: OpenAI's Codex App Confirms Anthropic Sets the Pace in Coding Agents
categories:
  - ai
---
OpenAI has released a macOS desktop application for its Codex coding agent, providing a dedicated interface for running multiple AI agents in parallel across software projects. The launch confirms what the past six months have suggested: Anthropic now defines the feature roadmap for coding agents, and OpenAI is working to match it. Organisations evaluating these tools should note that OpenAI's competitive response, including doubled rate limits and temporary free access, creates a narrow window of unusually favourable pricing.

## What the app actually does

The Codex app functions as a management layer for multiple coding agents working simultaneously. Each agent operates in an isolated git worktree, preventing conflicts when several agents modify the same repository. Users can review diffs, approve changes, and maintain oversight without switching between terminal windows.

The core features mirror what Claude Code Desktop and similar tools already offer: project organisation, git integration, diff review, and sandboxed execution. OpenAI has added a 'skills' system that bundles instructions and scripts for common workflows, with pre-built skills for Figma design implementation, Linear project management, and deployment to Cloudflare, Vercel, and similar platforms.

A scheduling system called Automations allows agents to run on recurring schedules for tasks like daily issue triage or CI failure summaries. OpenAI reports using this internally for monitoring and reporting workflows.

## The competitive positioning is clearer than the product differentiation

The announcement includes pricing moves that reveal competitive pressure. Codex is temporarily available to ChatGPT Free and Go subscribers, and rate limits have doubled across all paid tiers. OpenAI claims over one million developers have used Codex, with usage doubling since the December launch of GPT-5.2-Codex, though neither figure provides meaningful context about sustained engagement.

The feature timeline tells a clear story: OpenAI has adopted MCP (Model Context Protocol), skills systems, and now a desktop app format that Anthropic pioneered. Anthropic released Claude Code with MCP support and skills integration before OpenAI introduced equivalent features in Codex. The pattern suggests Anthropic currently drives feature innovation in this category while OpenAI competes on model quality, pricing, and integration breadth.

Both factors matter for technology leaders, but they suggest different evaluation criteria depending on whether an organisation prioritises cutting-edge workflow capabilities or broad platform support.

## Practical constraints narrow the initial audience

The app launches exclusively on macOS, with Windows described as 'coming very soon' and Linux unmentioned beyond acknowledgment that Electron was chosen to enable cross-platform support. OpenAI staff confirmed in the discussion that Windows sandboxing requires additional work to match the macOS security model.

This creates an immediate limitation for organisations with mixed development environments. The security approach also differs from Anthropic's: Claude Code runs agents in isolated virtual machines, while Codex uses OS-level sandboxing with configurable permission rules. Neither approach is inherently superior, but they present different risk profiles for security-conscious deployments.

Early adopters have reported launch issues, broken documentation links, and extended loading times. OpenAI has acknowledged these problems and indicated active fixes, which is typical for a launch-day product but relevant for teams considering immediate adoption.

## Where Codex may hold advantages

Early usage patterns suggest some differentiation. Codex appears to handle complex, long-running tasks more reliably without hitting usage limits, while Claude Code may resolve difficult problems faster when Codex enters unproductive loops. Some practitioners have adopted a workflow of starting with Codex, switching to Claude Code when stuck, then returning to Codex, a pattern that suggests complementary strengths rather than clear dominance by either tool.

The parallel agent capability is a genuine differentiator. Running four agents simultaneously on different aspects of a problem can compress calendar time significantly for suitable tasks. Whether this matters depends entirely on the nature of the work: highly interdependent changes gain little from parallelism, while independent features or refactoring tasks could benefit substantially.

Codex's integration with ChatGPT subscriptions also creates administrative simplicity for organisations already using ChatGPT for other purposes, avoiding the separate billing and account management that Claude Code requires.

## What this means for tool selection decisions

Teams currently evaluating coding agents face a temporarily favourable market. Competition between OpenAI and Anthropic has produced doubled rate limits from OpenAI and generally aggressive pricing from both parties. This environment rewards short commitment periods and explicit contract flexibility, since pricing and capabilities are shifting quarterly.

The skills and MCP ecosystem creates a secondary consideration. Both platforms now support extensibility through similar mechanisms, but the specific integrations differ. Organisations with heavy Figma-to-code workflows, Linear project management, or Vercel deployments should evaluate the specific skill implementations rather than assuming feature parity.

For teams not yet committed to either platform, the current moment offers an opportunity to run parallel evaluations at reduced cost. OpenAI's doubled limits and temporary free tier access expire at an unspecified date, creating urgency that serves OpenAI's interests but also genuinely reduces evaluation costs for prospective users.

The deeper question is whether coding agents are mature enough for production reliance. Both tools exhibit significant inconsistency: similar prompts can produce excellent results in one session and unusable output in another. Until that variance narrows, these tools work best as accelerators for experienced developers rather than autonomous workers, regardless of which vendor provides them.