---
date: 2026-10-18T18:00:00+01:00
title: How AI data centres really use water
categories:
  - technology
tags:
  - ai
  - infrastructure
  - water
  - sustainability
---

The claim that AI consumes water sounds odd if you picture a server as a box of electronics. The obvious objection is that the cooling water goes round in pipes. It returns to where it started, gets used again, and never goes anywhere. How can a conversation with ChatGPT consume it?

The answer is that you can be looking at the wrong pipes. A sealed circuit carries heat away from the processors. A separate circuit can release that heat through a cooling tower, evaporating some of its water in the process. One loop keeps circulating while the other needs topping up.

The US Department of Energy's [engineering guidance for data centres](https://www.energy.gov/cmei/femp/cooling-water-efficiency-opportunities-federal-data-centers) shows exactly this arrangement. A data centre can recycle its cooling water and consume water at the same time. There is no contradiction to resolve.

That settles the basic question. The water consumption is real. What I find much less convincing is the confidence with which it gets attached to an individual prompt. A bottle, a teaspoon, a fraction of a millilitre: each sounds like a measurement of the same thing. Look at the calculations and they turn out to be counting different things, on different systems, with very different access to the machinery.

## The water does not have to disappear

The [US Geological Survey's glossary](https://water.usgs.gov/water-basics_glossary.html) distinguishes withdrawal, the water taken from a source, from consumption, the portion no longer available for immediate reuse. Evaporation counts as consumption. The molecules have not been destroyed, but that was never the question.

If a facility takes in 100 litres, evaporates 80 and returns 20 as liquid, it has withdrawn 100 litres and consumed 80. Calling all 100 consumed exaggerates the loss. Saying none was consumed because it will eventually rain somewhere is equally unhelpful. Rain elsewhere next month cannot supply the original town this afternoon.

Evaporation is useful precisely because it carries heat away. In a cooling tower, some circulating water turns into vapour. New *make-up water* replaces it.

Evaporation also concentrates dissolved minerals. Operators discharge some liquid as *blowdown* to control the build-up; tiny droplets escape as *drift*. The [Department of Energy's cooling-tower guidance](https://www.energy.gov/cmei/femp/best-management-practice-10-cooling-tower-management) accounts for all three losses. Better controls can reduce blowdown, but evaporative cooling still needs water to evaporate.

[NIST's water-property tables](https://nvlpubs.nist.gov/nistpubs/Legacy/IR/nistir5078.pdf#page=10) show the physics. At 25°C, evaporating a kilogram of water absorbs about 2.44 megajoules. A kilowatt-hour is 3.6 megajoules: if evaporation did all the work, removing that much heat would take roughly 1.5 litres.

Real systems also shed heat without evaporation and operate at different temperatures. The calculation explains the appeal of evaporative cooling; it is not a universal water cost per kilowatt-hour of computing.

## Follow the heat out of the building

A sealed loop can instead send heat to a dry cooler: essentially a radiator with air moving across it. Air-cooled refrigeration can also avoid routine evaporation. The Department of Energy [describes multiple cooling configurations](https://www.energy.gov/cmei/femp/cooling-water-efficiency-opportunities-federal-data-centers) including systems with no cooling-water requirement.

This is the detail I would want before accepting a claim about a closed loop: where does the heat go next? “Liquid cooled” describes how heat is collected. The water bill depends on how it leaves the site.

Microsoft's [December 2024 engineering announcement](https://www.microsoft.com/en-us/microsoft-cloud/blog/2024/12/09/sustainable-by-design-next-generation-datacenters-consume-zero-water-for-cooling/) proposed a design that avoids evaporation for cooling, while acknowledging extra electricity use and water for kitchens and restrooms. Its schedule called for pilots in 2026 and new sites from late 2027; the existing fleet would retain a mix of cooling systems.

OpenAI's [April 2026 description of Stargate in Abilene](https://openai.com/index/building-the-compute-infrastructure-for-the-intelligence-age/) says the facility uses sealed cooling circuits instead of conventional evaporative towers. They need an initial fill. Its forecast of low subsequent cooling-water use at full buildout remains a projection, rather than a measured annual result.

There is no physical rule requiring AI to evaporate fresh water at the data centre. Avoiding it is a useful engineering achievement, and a fair account ought to say so.

The scope of the claim still matters. Electricity generation and hardware manufacturing can use water elsewhere; maintenance and ordinary building use continue. “Zero water for cooling” is a claim with a boundary. Removing the last two words changes the claim.

## The operators already report consumption

We do not need to multiply a speculative prompt estimate by a speculative number of prompts to establish that consumption occurs. The operators publish accounts.

Google's [2026 environmental report, pages 96–97](https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf#page=96) says its owned and fully leased data centres withdrew 13.562 billion US gallons in 2025, discharged 3.039 billion and consumed 10.523 billion. That is about 39.8 billion litres consumed across Google's services. Assigning it all to Gemini would be an invention.

Microsoft's [2026 environmental data factsheet, page 7](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/msc/documents/presentations/CSR/2026-Microsoft-Environmental-Data-Fact-Sheet-PDF.pdf#page=7) reports 13.266 billion litres withdrawn and 8.170 billion litres consumed in financial year 2025. Its boundary includes offices and laboratories as well as data centres. It is not ChatGPT's water bill.

These numbers also look more exact than the underlying measurement. Microsoft's [methodology on page 17](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/msc/documents/presentations/CSR/2026-Microsoft-Environmental-Data-Fact-Sheet-PDF.pdf#page=17) says most sites lack discharge meters; the inventory combines utility bills and estimates. The accounts are evidence of consumption, with an estimation method attached. The decimal places do not remove the estimation.

Lawrence Berkeley National Laboratory's [2024 US data-centre report](https://eta-publications.lbl.gov/sites/default/files/2024-12/us_data_center_energy_usage_report_lbnl-2001637_0.pdf#page=55) estimates that US data centres consumed 66 billion litres directly in 2023, with nearly 800 billion litres indirectly associated with electricity generation.

That covers the whole sector, not just AI. The electricity estimate uses regional power mixes, including hydropower reservoir evaporation, rather than individual facilities' power-purchase agreements or generation behind the meter. Most of that estimated water consumption occurs outside the data centre.

The federal [*2025 Update*](https://www.energy.gov/documents/united-states-data-center-energy-usage-report-2025-update) revises the electricity model. The earlier water figures remain historical estimates with their own methodology.

## A bottle and a fraction of a millilitre

The bottle comparison comes from Pengfei Li and colleagues' [*Making AI Less “Thirsty”*](https://arxiv.org/html/2304.03271v5), first released in 2023. Its March 2025 version estimates roughly 500 millilitres for 10–50 medium-length GPT-3 responses, depending on deployment conditions.

The researchers assumed four watt-hours of server electricity per request. Their US-average scenario gives 2.2 millilitres on site plus 14.7 off site, through electricity generation. Their estimate of roughly 700,000 litres evaporated directly during training is also modelled, rather than measured from the actual run.

That is a defensible modelling exercise. It does not give us a meter reading for present-day ChatGPT, let alone half a litre for every prompt.

Google's [2025 inference paper](https://arxiv.org/html/2508.15734v1) reported 0.24 watt-hours and 0.26 millilitres for its median Gemini Apps text prompt in May 2025. Its electricity account includes host processors, memory, allocated idle capacity and facility overhead. The water estimate uses operational freshwater consumption at the data centres, excluding electricity-generation and manufacturing water. The study also excludes training.

Even the word *median* needs unpacking. Google ranks models by average energy per prompt, then identifies the model serving the middle prompt in its traffic distribution. Multiply that figure by all requests and you will not recover the total: it is not an arithmetic mean. Nor does it describe every long reasoning task or output type.

Sam Altman's [June 2025 statement](https://blog.samaltman.com/the-gentle-singularity) puts an average ChatGPT query at 0.000085 gallons, about 0.32 millilitres assuming US gallons. He supplies no reproducible method or accounting boundary, so we cannot tell whether electricity-generation water is included.

I would not use any of these figures to declare the other two disproved. A smaller number can mean more efficient computing, an easier task, different infrastructure or a narrower account. Until those choices match, comparing the results tells us very little about which provider uses less water.

The unit itself is troublesome. The [ML.ENERGY benchmark](https://arxiv.org/html/2505.06371v1) measures how hardware, serving configuration and batching change energy per request. Processing several requests together shares equipment costs between them; generating more text changes the work. A prompt is something the interface accepts. It is not a fixed quantity of computation.

For Claude, disclosure is thinner. Anthropic's [compute announcement with Amazon](https://www.anthropic.com/news/anthropic-amazon-compute) describes training and serving infrastructure without a per-request water account. In the Anthropic disclosures reviewed through 18 October 2026, I found no reproducible figure.

Researchers can estimate what the providers do not disclose. The November 2025 revision of [*How Hungry is AI?*](https://arxiv.org/html/2505.09598v6) combines observed API performance with assumed hardware, utilisation and batching. Those assumptions are available to inspect. They are still assumptions about machines the researchers cannot meter, so I would treat the resulting figure as a model to examine, not a receipt for my conversation.

## The power station has a water bill too

A dry data centre can still depend on a power system that consumes water. This is where the footprint becomes harder to follow.

Thermal generating stations may withdraw water for cooling and return much of it, or evaporate a larger fraction in recirculating systems. Wind and solar photovoltaics have comparatively low operational water requirements. The [national-laboratory review by Macknick and colleagues](https://research-hub.nlr.gov/en/publications/operational-water-consumption-and-withdrawal-factors-for-electric-4/) shows why fuel type alone is insufficient: cooling technology strongly affects water use. Lower-carbon electricity is not automatically lower-water electricity.

Hydropower makes the accounting especially delicate. Water passing through a turbine is not thereby consumed. Water evaporating from a reservoir may be attributed to electricity production. But how much would have evaporated without the reservoir, and how should losses be shared with irrigation, flood protection and water supply? A [hydrological review by Bakken and colleagues](https://hess.copernicus.org/articles/17/3983/2013/) explains why gross reservoir evaporation divided by electricity output can mislead.

There is another distinction here that matters to anyone asking what their next prompt will cost. Dividing annual water use between requests allocates an existing footprint. Working out the extra water caused by one more request means knowing which equipment runs longer, which generators respond and whether cooling demand changes at that moment. The first calculation does not answer the second.

Water usage effectiveness, or WUE, expresses site water use per kilowatt-hour of IT electricity. Check its numerator: a withdrawal-based WUE cannot be compared directly with a consumption-based WUE. [AWS explicitly describes its fleet metric in withdrawal terms](https://sustainability.aboutamazon.com/natural-resources/water).

The Green Grid's [original WUE technical paper](https://www.thegreengrid.org/system/files/store/WUE_v1.pdf) separates site water from water used to supply electricity. For consumption over a defined place and period, the calculation is:

`operational water = IT electricity × site water intensity + total facility electricity × grid water intensity`

Use consumption figures for both terms, matching the place, period and energy boundary. Calculate different sites and periods separately before adding them. Facility electricity must include cooling and electrical overhead exactly once.

Take an invented example: a task uses one watt-hour of IT electricity at a site consuming 0.5 litres per IT kilowatt-hour. With power usage effectiveness (PUE) of 1.2, the facility needs 1.2 watt-hours including overhead. If the electricity source consumes two litres per kilowatt-hour, the task accounts for 0.5 millilitres on site and 2.4 upstream: 2.9 millilitres altogether.

Now assume zero site consumption allocated to the task and a grid factor of 0.1 litres per kilowatt-hour. Keeping the same PUE gives 0.12 millilitres. These invented inputs illustrate the arithmetic, not a chatbot footprint or a predicted retrofit saving: changing the cooling system could change PUE too.

Dry cooling can demand more electricity. Whether it saves water overall depends on how much extra power it needs and where that power comes from. Even a lower total can shift consumption into a more vulnerable watershed. The Green Grid described this trade-off in 2011, long before ChatGPT.

Before either operational account comes manufacturing. Chip fabrication needs ultrapure water, as [Fraunhofer's work on water systems for chip production](https://www.ipms.fraunhofer.de/en/press-media/press/2025/Sustainable-semiconductor-production.html) describes. Assigning that water to an answer requires assumptions about equipment lifetime, utilisation and shared workloads. An operational estimate leaves this out.

Training needs a separate account too. Spreading its footprint across future requests depends on how much the model is eventually used; that allocated share is not fresh cooling water consumed each time someone presses Enter.

## The town matters more than the teaspoon

Google's 2026 report provides a useful local example. For The Dalles, Oregon, its [site table](https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf#page=97) reports 654.3 million US gallons withdrawn in 2025, 185.3 million discharged and 469.0 million consumed. The last figure is about 1.78 billion litres. Calling the withdrawal figure consumption would overstate the reported loss by nearly 40%.

The volume warrants scrutiny. It cannot, by itself, tell us which household experienced a shortage or what share belongs to AI.

The city's [September 2024 council packet](https://ompnetwork.s3-us-west-2.amazonaws.com/sites/312/documents/cc_2024-09-23_council_agenda_0.pdf#page=75) shows the broader engineering problem. Its water-system planning includes treatment-plant replacement and expansion, transmission mains, storage, fire flow, and seismic and wildfire resilience. Attributing the entire investment programme to Google would erase the existing system's age and other requirements.

National comparisons offer little reassurance here. A small share of a country's water consumption can still be a substantial demand on one utility. The relevant constraint is the capacity of this site's sources, pipes and treatment works.

To assess harm, we need seasonal supply, peak demand, discharge destination and quality, and the needs of other users and ecosystems. We also need a baseline: what would happen without the facility or its expansion? Annual averages can hide the hardest days.

The source matters too. [DOE guidance on alternative supplies](https://www.energy.gov/cmei/femp/best-management-practice-14-alternative-water-sources) describes treated wastewater, rainwater and other cooling supplies, with appropriate treatment. Reclaimed water can ease pressure on drinking-water supplies, but evaporating it still consumes water. Its wider value depends on where that flow would otherwise have gone.

Microsoft's [2026 report](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/msc/documents/presentations/CSR/2026-Microsoft-Environmental-Sustainability-Report-PDF.pdf#page=24) says its water projects replenished more than 14.2 million cubic metres in FY2025, exceeding global withdrawals. It also identifies the remaining task: achieving this locally in priority regions. Replenishment can deliver real benefits while cooling towers keep consuming water. A global balance can conceal a local deficit.

## What I would want the providers to publish

The useful disclosure would let us trace the connection from a product to a facility to a watershed. At the moment, the figures are much easier to find than the connections between them.

I would want facility withdrawals and consumption reported separately, with water sources, discharge, seasonal peaks, cooling systems and electricity use. For products, I would want measured energy for defined tasks and an explanation of how shared equipment and idle capacity are divided between them. Cooling, electricity, training and manufacturing need their own accounts before anyone adds them together.

A typical prompt helps explain an ordinary interaction. Means, totals and the range of heavier tasks explain scale. A design for a future facility tells us something else again. Putting all three into a reassuring headline does not make them interchangeable.

Efficiency is real progress, but it is a ratio. Halving water per unit of computation while tripling computation increases total water use by half. Microsoft's figures illustrate the need to inspect both sides: its [reported owned-data-centre WUE fell to 0.27 litres per kilowatt-hour in FY2025](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/msc/documents/presentations/CSR/2026-Microsoft-Environmental-Sustainability-Report-PDF.pdf#page=24), while its [wider operational consumption rose from a restated 6.693 to 8.170 billion litres](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/msc/documents/presentations/CSR/2026-Microsoft-Environmental-Data-Fact-Sheet-PDF.pdf#page=7). The scopes differ, so those figures do not isolate AI's contribution. They do show why an efficiency announcement cannot substitute for a water account.

I do not think the evidence supports dismissing AI's water use as a misunderstanding of recycling. The engineering and the operators' own accounts rule that out. I also do not think a universal bottle-per-prompt figure survives much scrutiny. Too much changes between the prompt, the hardware, the cooling system and the electricity supply.

For the town supplying a data centre, the question is what happens on its hardest summer day. For someone using ChatGPT or Claude, it is what has actually been counted in the number attached to their conversation. Those are answerable questions if the operators disclose enough. “The water goes round again” does not answer either of them.
