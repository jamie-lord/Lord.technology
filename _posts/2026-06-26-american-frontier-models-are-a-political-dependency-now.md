---
date: 2026-06-26T21:00
title: American frontier models are a political dependency now
categories:
  - ai
  - policy
tags:
  - openai
  - anthropic
  - export-controls
  - open-models
---
Claude Fable 5 was in public hands for about three days before Anthropic took it back. Nothing was wrong with the model. The block came from a US demand Anthropic couldn't meet: keep non-US nationals away from it, including the ones living in America. Rather than build that wall, the company pulled the model outright. A week later OpenAI previewed GPT-5.6 to a short list of partners it had cleared with the government first, with the usual line about wider access in 'the coming weeks'.

I do this for a living, in England. Mostly Claude Code, some MCP plumbing, Azure underneath, Cloudflare around the edges. I also pay £180 a month for Claude out of my own pocket, on top of whatever my employer spends. So none of this lands as abstract policy. A model I pay for in full, every month, can be switched off for me specifically because of the passport I hold, and that changes what the model is. You can't call something infrastructure when a government you didn't vote for can revoke your access to it to lean on the company selling it.

A US frontier model is a political dependency now. Build outside America and the only safe assumption is that your access can be taken away, because it just was.

## There is no rule to follow

Ordinary protectionism at least comes with a rule. This doesn't. No published threshold, no criteria, no process a lab could read and satisfy in advance. Someone in the White House looks at a model and decides, case by case, who gets it and when. David Sacks spent the past year warning anyone who'd listen that AI regulation was a Trojan horse for regulatory capture, and now there is regulation of a kind, one that bears no resemblance to a rule. OpenAI complied and complained in the same breath, saying in its own announcement that it doesn't want this to 'become the long-term default'. When the company benefiting from a restriction publicly wants rid of it, you can stop pretending the motive is safety. The GPT-5.6 list is firms the government has signed off on, and there is no route onto it for an individual subscriber, paying or not.

Everyone reaches for the same comparison here, and for once it's the right one. The last time Washington decided software was a weapon, it went after encryption in the nineties, and that ended with people printing RSA on t-shirts to show how stupid the line had become. It took most of a decade to unwind. We're back at the start of that argument, except the thing being controlled now ships as a download, and the strongest uncontrolled version of it comes out of China every few weeks.

## The economics were never going to hold

Strip the politics out and the numbers still don't work. I'd be paying American labs to train models I'm then banned from using, while the export-cleared version costs exactly the same. GPT-5.6 Sol is $5 per million tokens in and $30 out, and outside the US that price buys whatever tier got waved through, not the model the benchmarks ran on. GLM 5.2 is already level with Opus 4.6. DeepSeek V4 Flash sits where last summer's GPT-5 did, for a fraction of the cost, and its weights live on a disk no one in Washington can reach. A year ago, saying that out loud was the sort of thing hobbyists did to feel better. It reads differently when you're the one signing off the budget.

None of this calls for anything dramatic. Treat access to US frontier models as a switch a foreign government holds, and put enough abstraction in front of your inference that swapping Anthropic or OpenAI for an open-weight model is a config change, not a fortnight of work. Keep a fallback you've actually stood up and tested, not a bookmark to a HuggingFace page. If you're already on Cloudflare or Azure, most of the routing is there already, and the only real choice is whether you wire it up before you need it or after.

I'm not waving a flag, and I'd be in no position to, with a stack that rests on an American cloud and an American lab. The point is narrower than that. The supplier has told me, in plain terms, that my £180 a month buys second-class standing, the kind that gets cut the moment domestic politics calls for it. The sensible thing is to believe them. The crypto wars ended because the controls became too obviously pointless to defend. This time the pointlessness is there on the first day, the best alternatives are being given away for free by the country the controls are meant to contain, and the people drawing the lines move them every week. So I'll keep using Opus and GPT for as long as they let me, and build as though they won't.
