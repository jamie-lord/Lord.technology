---
date: 2026-05-02T13:00
title: "Claude Code's hook system just got weaponised"
categories:
  - ai
tags:
  - claude-code
  - security
  - supply-chain
  - agentic-engineering
---

The Lightning PyPI compromise published on 30 April is being written up as another Shai-Hulud variant, which it is. Versions 2.6.2 and 2.6.3 of the `lightning` package shipped with a hidden `_runtime` directory, a 14.8 MB obfuscated JavaScript payload, and the usual exfiltration to AWS, Azure, GCP, GitHub Actions secrets, and any environment variable it could reach. Andy from Lightning has confirmed on Hacker News that the PyPI credentials were stolen via a compromised `pl-ghost` bot account, not a malicious PR. The GitHub source was clean. PyPI was the entry point.

That part of the story is [well-covered by Semgrep](https://semgrep.dev/blog/2026/malicious-dependency-in-pytorch-lightning-used-for-ai-training/) and Socket. What is not being talked about enough is that this appears to be the first documented instance of malware abusing Claude Code's hook system in the wild.

## What the worm does to your repo

Once the payload runs on a developer machine or CI runner, it plants persistence hooks in two places. The VS Code one is familiar territory, a `.vscode/tasks.json` with `runOn: folderOpen` that fires `node .claude/setup.mjs` every time someone opens the project folder. Endpoint tooling has been catching that pattern for years.

The Claude Code hook is new. The malware writes `.claude/settings.json` with a `SessionStart` hook, matcher `"*"`, pointing at `node .vscode/setup.mjs`. Every time a developer opens Claude Code in the infected repo, the hook fires. No tool use, no user prompt, no approval dialog. Launching the session is enough. The dropper then bootstraps a Bun runtime, downloading `bun-v1.3.13` from GitHub releases if it isn't already installed, and executes the full 14.8 MB payload from `.claude/router_runtime.js`.

Opening Claude Code in a cloned repository is now sufficient to execute arbitrary attacker-controlled code with the full credentials of your developer environment. The hook system was designed to let you run formatters, log telemetry, kick off pre-task checks. It is doing exactly what it was built to do. The threat model just caught up.

## Why this is not the same as a `package.json` script

The obvious objection is that npm has had `preinstall` and `postinstall` hooks forever, this is not new, calm down. It is not the same.

A `preinstall` hook fires when you install the package. You are taking an action; the action runs the code. The Claude Code `SessionStart` hook fires when you open Claude Code in a directory that contains a `.claude/settings.json`. You did not install anything. You did not run anything. You opened a tool.

The closest analogue is VS Code's workspace trust prompt, which exists precisely because Microsoft learned this lesson with `tasks.json` and `launch.json`. Claude Code does not currently prompt on first session in a repo that contains hooks. It probably should. If you have cloned a repo today and opened Claude Code in it without reading `.claude/settings.json` first, you have run whatever the author of that repo wanted you to run.

## The training cutoff problem made worse

The HN comment from `nrengan` on the thread is the bit I have been thinking about most. Most of his pip installs come from Claude Code suggesting them, and he hits enter. The model was trained months ago. It has no idea `lightning@2.6.2` was compromised on 30 April 2026.

This generalises beyond Lightning. Any model with a knowledge cutoff is, by construction, blind to whatever got compromised after that cutoff. If your workflow is 'ask Claude Code what package to use, accept the suggestion, run the install', the model is functioning as a recommendation engine that cannot see the last six months of CVEs. The agent will happily suggest a pinned version that was malicious-by-the-time-you-installed-it.

The mitigation is not 'be more careful'. It is 'do not let the agent run installs in environments that hold credentials worth stealing'. Which means containers, devcontainers, ephemeral VMs, anything that gives the agent a working surface and revokes it when the task is done.

## What to actually do

If you have run `pip install lightning` between 30 April and now, treat the host as compromised. Rotate every token, every cloud credential, every API key that was reachable from that environment. Audit your repos for `.claude/settings.json`, `.claude/router_runtime.js`, `.claude/setup.mjs`, `.vscode/tasks.json`, and `.vscode/setup.mjs` files you did not write. The SHA256 of the malicious `router_runtime.js` is `5f5852b5f604369945118937b058e49064612ac69826e0adadca39a357dfb5b1` per the [Lightning team](https://semgrep.dev/blog/2026/malicious-dependency-in-pytorch-lightning-used-for-ai-training/). Search GitHub for repos with the description 'A Mini Shai-Hulud has Appeared'; there are over two thousand of them as of yesterday and the stolen credentials are sitting inside in plaintext JSON.

For the longer term, two things. First, `pip` 26.1 added relative cooldown support; you can now pass `--uploaded-prior-to=P1D` or set `PIP_UPLOADED_PRIOR_TO=P1D` to refuse packages uploaded in the last day. `uv` has had the equivalent (`--exclude-newer`) for longer. Most worms get caught within hours; an analysis of ten recent supply chain attacks found eight had exploitation windows under one week. A 24-hour cooldown turns 'I am patient zero' into 'I read about this on Hacker News and updated my pin'. There is no good reason not to have this on by default in CI.

Second, treat `.claude/settings.json` the same way you would treat a `Makefile` you found in a stranger's repo. Read it before you open the project. If you do not want to read it, do not open Claude Code in untrusted directories. Your IDE's workspace trust model needs to extend to the agent now, because the agent has hooks too.

Every primitive that lets you customise an agent's behaviour also lets an attacker customise it. We are now past the point where that is hypothetical.
