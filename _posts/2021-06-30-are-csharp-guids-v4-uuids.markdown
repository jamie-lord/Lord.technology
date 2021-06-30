---
title: Are C# GUIDs v4 UUIDs?
date: 2021-06-30T08:53:00.0000000+01:00
last_modified_at: 2021-06-30T13:08:00.0000000+01:00
notion_id: c56c0025-7591-45bc-b10a-458caab34094
categories:
- programming
tags:
- C#
---

No. No they're not. There's too much misinformation floating around about this issue and it's easy to prove they're not. Although when using `Guid.NewGuid()` you seem to always get a v4 UUID, this doesn't mean that all instances of the GUID struct in C# are that way. The GUID struct is just a 128 bit integer - nothing more. This means `Guid.Parse(42.ToString("00000000000000000000000000000000"))` will get the C# GUID '00000000-0000-0000-0000-000000000042' even though it's not a valid v4 UUID.

