---
date: 2026-04-25T10:00
title: On Graham-Cumming, POPFile, and which side of the spam problem Cloudflare actually knows
categories:
  - cloudflare
tags:
  - email
  - spam
---
A reader emailed after my Email Service post to flag something I had missed. John Graham-Cumming, Cloudflare's CTO until March 2025 and now a board member, has a long pre-Cloudflare history in spam detection. The implication is that the deliverability question I raised, whether Cloudflare can survive the reputation game given their existing abuse posture, has a more credible answer at the top of the company than I credited.

The reader is right that I missed it, and the credentials are more substantial than 'has thoughts on email.' Graham-Cumming wrote POPFile, the open-source Bayesian email classifier, starting in 2002. It won a Jolt Productivity Award in 2004 and ran on POP3 proxies on hundreds of thousands of desktops at its peak. He presented 'How to Beat a Bayesian Spam Filter' at the MIT Spam Conference in 2004, which became one of the foundational papers in the Bayesian poisoning literature and is still cited in academic work on adversarial machine learning two decades later. He published in Virus Bulletin in 2006 on whether Bayesian poisoning was a real attack vector in the wild. This is someone who spent years thinking about how spammers and filters fight each other at a level of technical detail almost nobody at Cloudflare's competitors can match.

So the original concern needs a partial revision. Cloudflare is not stumbling into email sending blind. There is institutional knowledge at the board level about how mailbox providers actually decide what to filter, and that knowledge is older and deeper than the company itself.

## The expertise points the wrong direction

The harder question, and the one I think the reader's framing slightly elides, is which side of the email problem POPFile addresses.

POPFile is a receiver-side classifier. It sits between a POP3 server and a mail client and decides whether an arriving message is spam. Its job is to look at the content of an email and assign a probability. That is a different problem from the one Cloudflare Email Service has to solve, which is sender-side reputation management. Sender-side reputation is about IP warming, feedback loop integrations with Yahoo and Microsoft, response to Spamhaus listings, suppression list hygiene, bounce handling, complaint rate monitoring, and the operational discipline of refusing to onboard customers who will burn the shared IP pool. None of that is in POPFile. None of it is what the 2004 MIT talk was about.

The two skills are related in the way that being a tax inspector is related to being a tax accountant. Both deal with the same domain. Both require deep knowledge of how the system works. They are not the same job.

This matters because the criticism I quoted in the original post, from the email sending operator on Hacker News who runs a service at billions of messages per month, was specifically about the sender-side game. Fifteen years of cat-and-mouse with senders trying to deliver garbage and receivers trying to block it. What he was describing is not Bayesian classification accuracy. It is the much messier, much less academic problem of running an IP pool that Gmail does not blackhole at the SMTP layer, and the diplomatic work of staying off the proprietary blocklists that Microsoft and Yahoo never publish.

Graham-Cumming's POPFile work is on the other side of that exchange. He was the receiver, building tools to keep spam out. The instinct to identify what spam looks like is genuinely useful when you are designing abuse detection for outbound mail (you know what your customers' garbage will look like to the receiver), but it is the input to the operational problem, not the operational problem itself.

## What this changes about the original take

I will hold the original conclusion: this is a deliverability bet, and the bet won't be settled for at least six months of production data. But the bet is being made by people who understand the receiver's filter logic in unusual depth, which is a real asset I should have flagged.

The shape of the test becomes clearer. If Cloudflare ends up with above-industry deliverability for transactional mail, the explanation will not be 'they hired the right operations team' (every email service hires that team eventually) but 'they had a CTO turned board member who could specify the abuse detection requirements at the architectural level rather than learning them from Spamhaus listings.' POPFile-derived intuitions show up in things like the suppression list logic, the bounce handling, the spam-complaint feedback loop integrations, and the willingness to refuse a customer who 'just wants to send 100 emails a month' (the HN operator pegged that profile as 'far more likely to be a spammer'). The fingerprints are in the design, not in operational vigilance after the fact.

If Cloudflare ends up with average-to-poor deliverability, the explanation will be that knowing what spam looks like from the inbox is not enough. The IP reputation game has physics that no amount of architectural cleverness shortcuts in year one. New senders get throttled. Microsoft is opaque. Spamhaus listings happen for reasons that have nothing to do with whether your Bayesian intuitions are correct.

## A more specific decision for the reader

The original post said wait six months and watch the reputation data. That stands, but here is what I would actually look at, given Graham-Cumming's involvement.

Watch the suppression list semantics first. Cloudflare's docs already say they integrate with Postmasters to receive spam complaints and that removing addresses from automatic suppression is rate-limited 'to avoid abuse.' That is exactly the design choice you would expect from someone who has thought hard about how senders cheat. If the suppression list defaults stay strict as the product scales (rather than loosening under pressure from customers who want to keep emailing people who marked them as spam) that is a real signal that the POPFile lineage is shaping decisions. If they loosen, the architectural advantage is being eaten by the commercial pressure, and the reputation problem will follow.

Watch the customer onboarding posture next. The HN reaction included real worry about 'cold prospecting' workflows treating Email Service like AgentMail's first-listed use case. The Cloudflare docs already state Email Service is 'intended only for transactional emails.' Whether that intent holds up against revenue is the test. A company that turns away the cold outreach customers will keep its IP pool clean. A company that doesn't will burn it down for everyone.

The reader was right that I should have known about Graham-Cumming's spam work. The assessment is sharper for noting it. The deliverability question is still the right one to ask, but the answer now hinges on a more specific thing: whether someone who has spent twenty years thinking about how spammers cheat receivers can build a sender that does not become the cheating receivers' next target.
