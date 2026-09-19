---
date: 2026-09-19T11:00
title: The ciphertext has a calendar
categories:
  - technology
tags:
  - gps
  - cryptography
  - satellites
  - military
---

In March 2023, [someone pointed a home-built GPS receiver at the sky](https://kiedontaa.blogspot.com/2023/03/) and found this:

`N9Y2L L'O:CJL O2AY"WMG`

It was not noise. The parity checked out. It used exactly the peculiar little alphabet permitted by the GPS specification. Other satellites were transmitting the same 22 characters, and after a day or two they would all switch to a different, equally meaningless string.

GPS has been doing this for at least nineteen years.

That sounds like the opening of a spy story, which is why [the discovery has been described as a global numbers station](https://hackaday.com/2026/06/08/spy-tech-the-gps-numbers-station/). There is probably some truth in the comparison. A transmitter covers the planet; the intended listeners are invisible; and anyone can receive the message while only someone holding the right secret can understand it.

But the comparison is also a distraction. The best explanation is not that field agents are receiving orders between the ephemeris and the almanac. It is that hundreds of thousands of military GPS receivers are being serviced by a small encrypted maintenance channel hidden in plain sight.

The contents remain secret. The traffic pattern does not. It has a calendar, and that calendar appears to record the modernisation of the American military's navigation system.

## The empty field

The original GPS signal is gloriously slow. Its legacy navigation message arrives at 50 bits per second, divided into a repeating schedule of pages. Page 17 of subframe 4 is reserved for what the [official interface specification calls “special messages”](https://archive.gps.gov/technical/icwg/IS-GPS-200N.pdf). The Operating Command may put whatever it likes there, subject to an odd constraint inherited from the 1970s: the message must be 22 eight-bit characters drawn from an alphabet of capitals, numbers and a few punctuation marks.

Every satellite gets an opportunity to send one every 12½ minutes. The examples in the specification are innocent announcements to users. In practice, the field has spent most of its observable life looking like ciphertext.

Security researcher Steven Murdoch first noticed the strings more than a decade ago while working on a GPS decoder. In 2023 he [asked publicly if anybody knew what they were](https://gis.stackexchange.com/questions/465079/explanation-for-the-gps-special-message-field). This year he and collaborators turned the question into a formidable piece of digital archaeology: [24,087,691 observations from all 32 satellite identifiers](https://sjmurdoch.github.io/gps-special-messages/), spanning June 2007 to January 2026.

They found 5,009 distinct payloads. Almost every byte belongs to the permitted 45-character alphabet. The distribution is close to random, ordinary words are absent until late 2023, and most satellites broadcast the same payload at the same time. For much of the 2010s it changed almost daily, usually around midnight.

Random-looking text is not proof of encryption. Compression can look random; test equipment can look random; a bored engineer can make something look random. The interesting evidence is what happened when the messages stopped looking random.

Among the apparent ciphertext were three unmistakable placeholders: 22 spaces, 22 null bytes, and 22 repetitions of `AA`. In binary, `AA` is the alternating pattern `10101010`, the sort of thing engineers use to test a channel rather than communicate a thought. These sentinel values appeared while the system was being prepared, briefly replaced the ciphertext across the whole constellation in January and May 2011, then largely disappeared.

That timing matters because the US military has already told us, in broad terms, what it was putting into the GPS navigation message.

## A key delivered by satellite

Military GPS receivers need cryptographic keys. Historically, getting those keys into a receiver meant classified paper tape, a bulky fill device and a human custodian. This was sufficiently awkward that [a 2008 government report](https://www.gps.gov/sites/default/files/2025-07/biennial-gps-report.pdf) warned that users often fell back to unkeyed civilian GPS, giving up resistance to spoofing and interference in the process.

The solution was Over-the-Air Distribution, or OTAD. An encrypted “black” key could be broadcast in the GPS navigation message and recovered by an authorised receiver that already possessed the necessary cryptographic material. The channel is one-way. Nothing in the receiver has to acknowledge the message, so listening does not disclose its position.

This is not itself secret. A wonderfully candid [2015 US Air Force presentation](https://archive.gps.gov/multimedia/presentations/2015/04/partnership/tyley.pdf) describes the system, its deployment and its operational convenience. Testing began in 2005. Exercises followed in 2009. In 2010 a coalition key was transmitted on every satellite for 28 days. Continuous US operations began in March 2011. The same presentation explains that a receiver must be switched on, have a current daily key, and wait up to 12½ minutes for the next black key.

That is a remarkably close fit for Page 17: a globally receivable, fleet-wide, 12½-minute broadcast whose payload turned from test patterns into daily high-entropy text as OTAD entered continuous operation.

The fit is circumstantial, not official confirmation. Murdoch's own analysis is more careful than some of the coverage it produced. Daily cadence is strong evidence, and the sentinels are suggestive, but six of seven documented OTAD milestones having a nearby statistical change sounds better than it is: there are many changes in a nineteen-year signal, and the timing test was not significant. The official description also allows different groups of satellites to carry keys for different missions, while Page 17 mostly behaves like one fleet-wide channel.

There are possible explanations. Mission groups might take turns. The grouping could happen inside the encrypted payload. The relevant multi-group traffic could be carried elsewhere. Or Page 17 could be a related key-management function rather than OTAD itself.

Still, no competing explanation accounts for the format, reach, cadence, activation date and test states nearly as well. “Probably OTAD” is justified. “GPS numbers station cracked” is not.

There is also a small puzzle inside the cadence. The Air Force presentation describes a daily key but says the actual re-keying burden is 12½ minutes once a month. Yet Page 17 generally changed every day between 2012 and 2021. One possibility is that the channel did not carry a fresh underlying key each day. It may have repeatedly wrapped or derived the next monthly key using changing daily cryptographic state. That would produce new ciphertext without new key material. It is only a hypothesis, but it is a more useful one than assuming every new string represents a new secret.

## The dates in the noise

If Page 17 is cryptographic plumbing, its most revealing property is not what it says but when its behaviour changes.

On 22 July 2020, 29 satellites abruptly broadcast a sentinel value. It was the last such fleet-wide event in the dataset. Twenty-seven days earlier the military had completed fielding the first operational software capable of using the modern M-Code signal. [Formal testing ran through that summer and autumn](https://archive.gps.gov/governance/advisory/meetings/2020-07/mcdougall.pdf), before [operational acceptance on 18 November](https://www.losangeles.spaceforce.mil/News/Article/2437107/mceu-receives-operational-acceptance/).

In May 2022 the Page 17 rhythm changed again. Messages began lasting longer and transitions became less frequent. The statistical change points fall in the weeks of 23 and 30 May. Between them, on 25 May, [GPS III satellite SV05 became healthy](https://www.gps.gov/space-segment), completing a baseline constellation of 24 satellites capable of transmitting M-Code.

Then, on 12 and 13 December 2023, the nonsense acquired its first readable word. Nine satellites, then all 32, began sending payloads prefixed with `TEXT`, followed by 18 high-entropy characters. Eight days earlier, according to [minutes from the National Space-Based Positioning, Navigation and Timing Advisory Board](https://archive.gps.gov/governance/advisory/meetings/2023-12/minutes.pdf), the Space Force had completed the final formal qualification run of OCX, the next-generation ground-control system for GPS.

These are retrospective correlations. GPS has enough launches, tests, software releases and contract milestones that dates can be made to rhyme by accident. The OTAD report itself is an excellent warning against finding a bullseye after firing the arrow.

But `TEXT` supplies another clue. It did not simply replace the old format everywhere. After several fleet-wide trials in 2024, sustained daily `TEXT` traffic moved onto individual satellite identifiers. PRN 1 carried it from 28 December 2024 to 13 January 2025. The new GPS III satellite assigned PRN 1 was still being commissioned and [was not declared healthy until 23 January](https://www.caa.co.uk/Documents/Download/1851/6c8c7359-e7fa-4904-8b81-60a20aa1fdbd/102). PRN 21 carried two later runs, including one ending a week before the GPS III satellite using that identifier [became operational on 25 June 2025](https://cms-prod.navcen.uscg.gov/gps-constellation?order=field_nanu_type&sort=desc).

That pattern makes `TEXT` look less like a message for soldiers and more like a test envelope used while spacecraft or ground systems are being introduced. The readable prefix may identify a payload type to new software; the unreadable suffix may be authentication data, test vectors or encrypted content. We cannot tell which. What we can see is engineering activity migrating from the whole fleet to particular satellites at moments when those slots were changing.

The intriguing possibility is that Page 17 has served more than one job. A field created for operator-defined notices may have become an OTAD carrier, then a convenient compatibility channel during the long transition from legacy P(Y)-code equipment to M-Code and OCX. Reserved fields have a habit of becoming load-bearing infrastructure. Galileo did something comparable in public: its [Open Service Navigation Message Authentication](https://www.euspa.europa.eu/galileo-osnma) puts cryptographic authentication data into fields that had previously been reserved in the navigation message.

## Secrecy has side channels

There is a limit to what can fit in Page 17. Although it occupies 176 transmitted bits, its 45-symbol alphabet carries only about 121 bits of information. A raw 128-bit key does not fit. Any key-management scheme using it must derive a key, split it across messages, use it as an index, or wrap a smaller object. The public signal tells us the size of the box, not what the classified machinery puts inside it.

It also tells us when the machinery is busy.

This is the real connection to a numbers station. The mystery is not merely that an encrypted broadcast exists. It is that one-way broadcasts make their recipients hard to find while making the broadcaster's routine impossible to conceal. Radio operators have long inferred military activity from call signs, schedules and message volumes without reading a word. Page 17 is traffic analysis conducted against a machine rather than a human network.

Encryption protects content. It does not automatically conceal whether every satellite changed message at midnight, whether a test pattern appeared during a software rollout, or whether an experimental format followed a new spacecraft through commissioning. The same lesson applies well below orbit: packet sizes betray video calls, certificate logs reveal unreleased products, and software update timings expose which systems an organisation considers important. Metadata is what remains after the secrets have done their job.

There is a second lesson in how this story was found. The first published analysis reported 12.2 million observations and 3,994 unique messages. [After release, Murdoch discovered](https://github.com/sjmurdoch/gps-special-messages/blob/main/CHANGELOG.md) that the decoder had silently discarded roughly half the raw streams because of a subtle GPS parity-complement rule. The corrected corpus doubled to 24.1 million observations and overturned several of the more exciting findings: an apparent class of rare messages vanished, a supposed single-satellite `TEXT` trial became fleet-wide, and the claim that traffic had become unusually slow after 2022 no longer held.

That correction makes the work more convincing, not less. The [raw-data pipeline, tests and claim-level verification are public](https://github.com/sjmurdoch/gps-special-messages). A secret system is an unusually fertile place for pattern hallucination because nobody with complete knowledge is likely to correct you. Reproducibility is the nearest substitute.

Nobody outside the programme has decrypted Page 17, and perhaps nobody will. That is not the failure of the investigation. The useful discovery is that decryption was never the only way to read it.

The strings still look like nonsense. Their calendar does not.
