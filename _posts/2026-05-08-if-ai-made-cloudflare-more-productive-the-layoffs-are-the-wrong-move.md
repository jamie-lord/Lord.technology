---
date: 2026-05-08T13:00
title: "If AI made Cloudflare more productive, the layoffs are the wrong move"
categories:
  - cloudflare
tags:
  - cloudflare
  - ai
  - business
---

Cloudflare laid off more than 1,100 people yesterday, around 20% of the company. The announcement, titled 'Building for the Future', explains the cuts by noting that internal AI use is up 600% in three months and the company needs to 'architect itself for the agentic AI era'. The stock dropped 15-18% in after-hours trading.

I work at a Cloudflare partner, build on the Developer Platform daily, and have spent the last few years arguing that the platform is the strongest place to put new edge workloads. So when I say the public reasoning here does not survive five minutes of scrutiny, it is not contrarianism. It is concern.

The argument Matthew Prince and Michelle Zatlyn put forward is that AI has made the workforce so productive that the company can be smaller. If that were true, the rational move would be to hire more, not fewer. Cloudflare sits in front of a substantial portion of internet traffic and sells exactly the products that benefit from agent traffic going up: DDoS protection, Workers, AI Gateway, Bot Management, Browser Rendering, Durable Objects. The world is filling up with autonomous software that needs ingress, egress, security, and stateful compute at the edge. If your engineers are 6x more productive and your addressable market is expanding at the same time, the move is to fund more shots on goal. Ship more product. Undercut competitors who are still slow. Hire the people the rest of the market just laid off.

You do not cut 1,100 people.

## What the numbers say

Cloudflare reported Q1 2026 revenue of $639.8 million, up 34% year on year. Free cash flow was $84.1 million for the quarter, 13% of revenue. Cash and equivalents stand at $4.16 billion. On the surface, a healthy growing business.

But the company has never posted a GAAP profit. Net loss in 2025 was $102 million, in 2024 was $79 million, in 2023 was $184 million. Stock-based compensation ran at $470 million last year against roughly 5,000 employees, around 22% of revenue. Gross margin compressed five points year on year, from 76% to 71%. Q2 guidance of $664-665 million implies growth decelerating into the high 20s.

That is the actual story. Margins are compressing, growth is slowing from a very high base, SBC is creeping up, and the company has been signalling profitability to the market for years without getting there. The AI narrative is more flattering. 'We are reorganising for the agentic AI era' lands better in a press release than 'our gross margin is going the wrong way and analysts will punish us if we miss profitability targets again'.

## Why the framing matters for the platform

If the company were honest about this, I would have less to say. Public companies cut costs. The severance is good, full base pay through end of 2026, vesting through August, cliff-waivers for the recently hired. That is the kind of package that takes effort to put together and signals a leadership team that wants to do this right by people.

The framing matters because it determines who got cut. A margin-driven layoff selects for the bottom of the performance distribution and roles that are genuinely surplus. An 'agentic-AI-era reorganisation' selects for whoever a consultant told you to cut. The reports surfacing from inside Cloudflare on Hacker News describe the second pattern. Engineering managers said they had been actively trying to hire and lost team members anyway. SREs and PMs running connectivity-critical systems lost a quarter of their headcount. One manager wrote that his team's products were running at 95% margin and he was still cut deep.

This is the bit that should worry Cloudflare's customers and partners. The platform had two major incidents in the last twelve months that shook confidence. The remediation work after incidents like those is exactly the kind of unglamorous, institutionally-rooted effort that does not show up on a productivity dashboard but matters a great deal at 03:00 on a Sunday. An agent can triage a ticket. An agent cannot tell you why a particular config drift in a particular POP eighteen months ago is the reason a particular class of bug keeps recurring.

Cut 20% across an org and you do not lose 20% of the institutional memory. You lose the load-bearing 20%, because the load-bearing 20% is also the most expensive and the most senior, and consultants' spreadsheets don't have a column for 'knows the system'.

## The intern post

In September 2025, Cloudflare announced a programme to hire 1,111 interns, the number a deliberate nod to 1.1.1.1. The blog post was called 'Help Build the Future'. Eight months later, they laid off 1,100 people in a post called 'Building for the Future'. The interns are a separate cohort and were not, from what I can see, the ones cut.

The kindest reading is coincidence. The less kind reading is that Cloudflare front-loaded cheap labour, kept the cheap labour, and shed the expensive labour. That is the oldest playbook in tech, dressed up in current-cycle vocabulary.

## What this changes for the platform

I will keep building on Cloudflare. Workers, Durable Objects, R2, Queues, Workers AI, the developer platform as a whole is still the strongest place to design edge-first systems. None of that changes overnight. Product velocity over the last three years has outpaced every comparable platform, and the recent agentic-platform launches show no sign of letting up.

What I am revising is my confidence in the rate of improvement from here. The velocity came from teams of senior engineers who knew the systems and shipped hard against an aggressive roadmap. If a meaningful slice of those people just left, the velocity leaves with them, regardless of how many agent sessions the survivors are running. It will show up in product gaps, in regressions, and in incidents.

If you have anything load-bearing on Cloudflare, this is the week to look at your fall-back posture. Not because the platform is about to fall over, but because the assumption that the engineering organisation behind it is in the same shape as last quarter is no longer safe.

The honest version of yesterday's announcement would have been one paragraph. We over-hired into a different macro environment, our gross margin needs defending, here is who is leaving and how we are paying them. The version we got tries to make a margin decision sound like a vision, by borrowing the same productivity story Cloudflare sells to its customers and turning it on its own staff. That is not building for the future. It is calling the bill from the past a strategy.
