---
date: 2026-09-14T08:02:00+01:00
title: AI is making the nice version worth building
description: Shopify's return to native mobile development shows how coding agents change which improvements are worth the effort, from platform polish to products that previously never got built.
categories:
  - ai
tags:
  - mobile-development
  - software-development
  - agentic-engineering
  - native-apps
---

There is a particular kind of software improvement that lives forever in the backlog. Everyone agrees it would be better. Nobody can quite justify doing it.

The Android app that deserves as much attention as the iPhone version. The awkward interaction that takes three taps because fixing it means unpicking a shared component. The little utility that would save a colleague twenty minutes every Friday, provided somebody first spends a fortnight building it.

They accumulate under perfectly sensible headings: later, nice to have, not worth the effort. Eventually, we stop seeing them as choices. They become what the software is like.

Shopify moving its mobile apps from React Native back to Swift and Kotlin makes me wonder how many of those decisions deserve another look.

I have built native iOS and Android apps, done plenty of cross-platform work with Xamarin, and co-founded a startup where we used Ionic for both mobile platforms. I was doing this long before LLMs could do useful development work. I know what it cost to build a feature twice, and why sharing the implementation was attractive.

I can appreciate a lovely native app and still remember that a startup has to get something into people's hands before it runs out of money. Knowing how to build the better version does not give you the time to build it.

AI is changing how often we have to leave that version on the drawing board.

Shopify's [announcement](https://shopify.engineering/back-to-native) is explicit about this. React Native served it well after its 2020 decision to adopt it. Coding agents changed the cost of building and maintaining separate implementations. Shop has already migrated; the larger Shopify merchant app is still underway. The earlier decision did its job. That does not oblige the company to keep it forever.

The [Shop migration took twelve weeks](https://shopify.engineering/shop-app-migration) from proof of concept to release. Six engineers built the foundations and main journeys, with feature teams joining to validate their areas. Shopify reports startup time falling by 23% on iOS and 50% on Android. The Android app shrank by 109 MB; the iOS app grew by 1 MB. The team also simplified parts of the product, so the framework cannot take all the credit. Still, these are improvements in an app people can use.

Apple also named Notion as an app migrating its interface to SwiftUI during the [WWDC26 Platforms State of the Union](https://developer.apple.com/videos/play/wwdc2026/102/), although Notion's [investment in native mobile code dates to 2020](https://www.notion.com/blog/notion-on-android-is-now-more-than-twice-as-fast-to-launch). Its longer migration should not be mistaken for another instance of Shopify's AI-driven rewrite. The attraction of native development is well established. Its affordability is changing.

Cross-platform development helps a team decide where its attention goes. Xamarin and Ionic made different technical choices, but both let us reuse work. The time saved could mean another feature shipped, fewer implementations to coordinate, or an Android app that otherwise would not exist.

That last case matters. It is easy to imagine a native app better than the cross-platform one a team actually shipped. The imaginary app has no bugs, no payroll and no release deadline.

The useful comparison is between things your team can actually deliver. Sharing implementation can save substantial work, then create extra work when a feature needs to behave differently on each platform. Native development has its own awkwardness. No framework exempts you from engineering.

Now make the repeated implementation substantially cheaper. The balance can move even if every tool involved improves.

Agents accelerate React Native development too, which is a good reason to stay with it and enjoy the speed. But implementation cost is only part of the decision. You are also choosing an experience for your users.

If native delivers a meaningful improvement, its additional cost only has to fall below the value of that improvement. It can become worth choosing while the shared implementation remains cheaper.

Even Shopify has to choose what its engineers spend their time on. Being able to afford a project does not make it the best use of those people. Reducing the effort can change that judgment.

The decision itself becomes cheaper to investigate. Rebuild one troublesome journey, run it on the devices users own and measure the difference. If the improvement is negligible, stop. Otherwise, there is something concrete to weigh against the maintenance cost. We could spend less time arguing about hypothetical apps.

The same calculation applies to software that has never been built. Imagine an internal tool used by twelve people. A web interface handles most of their work, but some of it happens in a warehouse with an unreliable connection. A mobile companion could make scanning and recording items much easier. The estimate might once have killed the idea before anybody tried it. Staff would keep working around the software because the workaround was cheaper than the fix.

If the cost of building and supporting that companion falls far enough, the decision changes. Those twelve people were always worth helping. The price of helping them was the obstacle.

That is what excites me: more useful ideas can survive contact with an estimate.

I saw a personal version of this with [the aircraft tracker I built for an audience of one](/2026/05/21/the-military-aircraft-tracker-i-built-for-an-audience-of-one.html). AI made its scope manageable in evenings and weekends. I did not need to find a larger audience to justify building it. The work became affordable for the audience it already had: me.

We could also spend some of the gain on making existing software less irritating. Fix the neglected tablet layout. Investigate the slow launch on an older phone. These improvements struggle to compete with the next headline feature, especially when they help only a fraction of the audience.

Development savings appear in a company's budget. Waiting appears in somebody else's day. A small delay, repeated across thousands of users, consumes time that never becomes a line item for the team responsible. Users learn to open the app earlier, tap twice, or avoid it when they are in a hurry.

An app with the same buttons that opens faster and loses your place less often would be a perfectly respectable use of progress.

You can still build an unpleasant native application at impressive speed. Better software requires choosing to spend some of that speed on quality.

Separate implementations also force a useful question about what needs to be shared. Some product decisions must hold everywhere: when an order can be cancelled, who has permission to change it, what happens if a request fails. Shared code is a powerful way to keep those rules consistent. API contracts and behavioural tests can also capture parts of the agreement. As translating implementation gets cheaper, I expect those explicit descriptions of the product to become more valuable.

Consider an interrupted upload. Both apps should retain the pending item, explain its status and recover without creating a duplicate. Their controls can suit their respective platforms. Checking that agreement means exercising the failure and recovery, well beyond comparing screenshots.

Someone still has to decide what must be consistent, what may differ and how to check it. A shared library may remain the simplest home for important business rules. The opportunity is to reconsider where sharing helps most.

Shopify describes [separating business logic from the UI and exposing it through a CLI](https://shopify.engineering/back-to-native), so agents can exercise behaviour without waiting on simulator interaction for every change. That investment pays back with each subsequent attempt: fast generation becomes much more useful when a wrong answer can be found quickly. A testable architecture matters more when you can afford to try more things.

This is where my mobile experience matters. I want to know what happens when the operating system kills the process, a permission changes, or a request succeeds but its response never arrives. Those questions shape the work I would give an agent and the evidence I would require before shipping.

The [Shop team says native expertise remained essential](https://shopify.engineering/shop-app-migration). Engineers reviewed plans and behaviour, and generated code still introduced architectural and performance problems. Faster implementation gives experienced developers more to work with, and plenty to catch.

A migration also has a ready-made reference. The existing app embodies years of decisions, including many nobody wrote down. Reproducing it is a more bounded problem than deciding what should exist next. Sustaining development across both platforms will be a more revealing test than the first port.

As I have [written before, owning code remains expensive](/2026/01/31/what-becomes-expensive-when-code-becomes-cheap.html). Another platform means another release process, more devices to test and more ways for things to fail. Those costs belong in the estimate, even as implementation gets cheaper.

Companies can also use the gain to employ fewer people. More viable projects do not guarantee a painless transition for the people whose work is displaced. What becomes possible and who benefits remain separate questions.

Having worked on both sides of the native-versus-shared decision, I want to revisit the improvements we rejected on cost. Build enough to find out whether they help, measure the difference and account for supporting them. Some will still be bad investments. Others may finally be worth finishing.

Somewhere in almost every software team there is a ticket for the version everybody would prefer to use. I would like us to start opening those tickets again.
