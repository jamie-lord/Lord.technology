---
title: "Cloudflare's Outage: A Lesson in Overconfidence and Complacency"
date: 2023-11-04 12:00:00 +00:00
categories:
  - cloudflare
---

The [recent Cloudflare outage](https://blog.cloudflare.com/post-mortem-on-cloudflare-control-plane-and-analytics-outage/) is a stark reminder that even the most robust and seemingly secure systems are not impervious to failure. The incident, lasting from November 2 at 11:44 UTC until November 4 at 04:25 UTC, exposed critical vulnerabilities in Cloudflare's high availability systems and their control plane's resilience. Here's a critical look at what happened, the decisions made, and the implications for Cloudflare and their clients.

Cloudflare's admission that their high availability systems were insufficient to prevent this outage suggests an overconfidence in their infrastructure. Despite their sophisticated setup across three independent data centres in Hillsboro, Oregon, it was alarming to learn that the system had non-obvious dependencies which were crucial enough to cause significant downtime. This oversight demonstrates a worrying gap in Cloudflare's redundancy strategies and risk assessments.

The incident was exacerbated by Flexential's failure to inform Cloudflare of the switchover to generator power — a lapse in what should be basic communication protocol between a data centre provider and its customer. Cloudflare's inability to detect such a critical change in power source also raises questions about the effectiveness of their monitoring tools. In such an environment, where real-time data is crucial, this blind spot was a significant contributor to the subsequent problems.

The crux of the issue lay in Cloudflare's high availability system's incomplete integration. Some newer products were not yet part of the high availability cluster, and logging systems were kept separate, revealing a risky prioritisation strategy. It is concerning that, despite being in implementation for four years, the system was not comprehensively applied to all of Cloudflare's services, leading to a patchwork of coverage that failed when most needed.

The decision to not include logging systems in the high availability cluster — predicated on the belief that delayed analytics were acceptable — now appears to be a significant miscalculation. Analytics and logs are the lifeblood of customer insights and operations; their unavailability can cause cascading issues for clients who rely on real-time data for decision-making.

Cloudflare's disaster recovery measures seemed to have been activated as an afterthought rather than a pre-emptive strategy. It is perplexing why, after identifying a single point of failure, there wasn't an immediate switch to disaster recovery sites. Furthermore, the fact that newer products lacked fully implemented and tested disaster recovery procedures points to a systemic underestimation of potential risks.

The 'thundering herd' issue encountered when services were turned up at the disaster recovery site further underscores a lack of anticipation for high-load scenarios following an outage. In a well-rounded disaster recovery plan, such eventualities should be planned for, with rate limits predefined rather than reactively implemented.

There were significant lapses here in risk management, communication, and contingency planning. Cloudflare needs to re-evaluate their high availability and disaster recovery protocols, bring all services—not just the older ones—into the cluster, and tighten communication lines with third-party providers like Flexential. Until those changes happen, the reputation for resilience is doing more work than the architecture is.