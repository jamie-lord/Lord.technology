---
date: 2026-05-03T08:00
title: "The UK already answered who owns AI-generated code, and it answered it the other way"
categories:
  - ai
tags:
  - claude-code
  - copyright
  - regulation
  - agentic-engineering
---

Sena Evren's piece on who owns the code Claude Code writes was the most-discussed link on Hacker News this week, and it is a careful walk through human authorship, work-for-hire, GPL contamination, and the Bartz settlement. Every authority it cites is American. So is every authority cited in the 549 comments. The thread argues out US copyright doctrine to four decimal places without anyone mentioning that the UK has had a statutory answer to the same question since 1988.

I work on UK contracts for UK clients, mostly on Cloudflare's developer platform, and Claude Code writes a lot of what I ship. The answer that applies to my output is not the one being argued over.

Section 9(3) of the Copyright, Designs and Patents Act 1988 says that where a literary work is computer-generated and has no human author, the author is taken to be 'the person by whom the arrangements necessary for the creation of the work are undertaken'. Code is a literary work under UK copyright law. The provision was drafted in the era of expert systems and procedural generation, three decades before transformer models, but it is on the books and unambiguous on the point the US is currently tying itself in knots over. If a US court eventually rules that Claude Code output lacks human authorship and falls into the public domain, the same output produced under UK law has a copyright owner: whoever ran the prompt. The duration is shorter, fifty years rather than life-plus-seventy, but the ownership is settled.

The asymmetry matters most in an acquisition. A US-incorporated startup with a Claude-generated codebase has a chain-of-title problem; a UK-incorporated startup with the same codebase, run from the same prompts, does not. I have not seen a single M&A diligence checklist that asks where the prompts were executed, but I expect to within the year.

## Why this is about to get more complicated, not less

The catch is that the UK government wants to scrap section 9(3). The March 2026 Report on Copyright and Artificial Intelligence, published under section 136 of the Data (Use and Access) Act 2025, proposes its repeal. The reasoning is candid. The provision is unclear, has been seriously applied in only one case (Nova Productions v Mazooma Games, a 2007 dispute over a pool-themed arcade game), and contradicts the originality standard the UK absorbed from EU case law. That standard, set by Infopaq in 2009 and reaffirmed by the Court of Appeal in THJ Systems v Sheridan in 2023, requires a work to be the 'author's own intellectual creation' reflecting their 'free and creative choices'. A computer-generated work with no human author cannot meet it. Section 9(3) and the originality test cannot both be right, and the government has signalled that it will resolve the contradiction by deleting the older provision rather than the newer one.

So UK developers are in a strange position. Today, the law on the books gives them clean ownership of Claude Code output. In a year, depending on how the repeal is drafted and what replaces it, that protection may be gone. Most likely the line ends up where the US has settled: AI-assisted works with sufficient human direction remain copyrightable, purely AI-generated works fall into the public domain. Two jurisdictions arriving at the same answer from opposite directions, neither having intended to.

## What this changes for how I work

For UK work I have stopped chasing the 'meaningful human authorship' standard the US Copyright Office is still trying to define. Under s.9(3) I do not need it, and arguing about prompt-versus-output creative direction is a fight that consumes hours and produces no code. The diligence concern that actually matters is GPL contamination from training data, which is a license-scan problem, not an authorship problem. FOSSA and Black Duck handle it.

Anticipating the repeal, I have changed how I write commit messages. They now describe architectural intent rather than just what changed, on the bet that UK law will move toward the EU position before this becomes settled either way. 'Restructured the rate-limiter to use a token bucket because the leaky-bucket variant Claude proposed first does not handle burst traffic from our scheduler' is the sort of evidence that survives a transition from 'arrangements necessary' to 'free and creative choices'. 'Add rate limiter' does not.

Who owns the code Claude Code writes depends on which jurisdiction asked the question and when. The US is working it out in court. The UK had an answer for thirty-eight years, is about to throw it away, and has not yet decided what replaces it. The developers shipping the most AI-assisted code, including most of the people who argued in that thread, are operating as if the US debate is the only debate. It is not, and acting as if it is leaves money on the floor.
