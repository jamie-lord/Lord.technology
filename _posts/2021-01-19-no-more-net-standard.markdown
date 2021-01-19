---
title: "No more .Net Standard \U0001F389"
date: 2021-01-19 19:51:00 +00:00
categories:
- dotnet
---

Whilst reading about the [plan for Entity Framework Core 6.0](https://devblogs.microsoft.com/dotnet/the-plan-for-entity-framework-core-6-0) I noticed a [remark about .Net Standard](https://devblogs.microsoft.com/dotnet/the-future-of-net-standard) that I'd not clocked last year.

As of .Net 5.0, there will be no future .Net Standard versions. .Net Standard 2.1 is the last version.

**Going forward, developers can just use .Net 5.0 projects to share code as libraries.**

As far as I'm concerned, this is a great change and will make explaining what the difference between .Net Framework, .Net Core and .Net Standard is a thing of the past. Everything is just .Net. Couple this with faster major version releases and things will feel quite different in the .Net ecosystem.

When .Net 6.0 (the first post .Net Core release with long term support) is released in November 2021, it should be easy to migrate all .Net 5.0 and .Net Standard 2.1 projects to .Net 6.0 and have a unified LTS version being used across all code. Of course, if any projects aren't migrated from .Net Core 3.1 or before then you'll need to keep shared code as .Net Standard, but as migration from .Net Core 3.1 to .Net 5.0 or above looks like it will be much easier than moving from 2.1 to 3.1, I don't think this will be an issue for most.