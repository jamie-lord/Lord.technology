---
title: Ubuntu on Windows
date: 2018-02-03 15:49:51 +00:00
---

At home I use two computers: a 13 inch MacBook Pro for less intensive tasks and a Dell Precision T1700 with a 4K monitor when I want to stretch the software engineer bit of my brain. Jekyll is only officially supported on Linux and MacOS but it is possible to use Jekyll on Windows if you install Ubuntu via the Microsoft Store[^1]. I remember reading about this awesome little thing when it became available but hadn't got around to trying it - but now I wanted to run Jekyll on my Windows machine the time had come to install a Linux subsystem.

It was trivial to install[^2] and setup via the Microsoft Store and everything worked right out of the box. I was able to install Ruby and get access to my site's repository[^3] on my Windows filesystem as by default Ubuntu had mounted my drives, meaning all I have to do was navigate to `/mnt/c/Users/Jamie/ThisSiteRepo` and run `jekyll serve` and off I was to the races.

I don't have a favorite operating system, I use MacOS and Windows every day in my job and at home. Although this situation is slightly unusual (I'd wager that most computer users tend to pick one ecosystem and remain in it as _it's the best_) it means that I have a particular fascination with programming languages and tools that can be used across multiple platforms. In my job I write software for Android, iOS and Windows so appreciate the power in writing one line of code that can be run on a very wide variety of hardware. This is why since .Net Core 2.0 came out it's been my go-to for little projects and tools as well as a few more complex systems. Jekyll is now the same for me, something that makes the experience all the more interesting, plus it's got me to finally play with the Linux subsystem on Windows, something I'm sure I will use more now it's versatility and elegance has been made clear.

[^1]: [https://www.microsoft.com/en-us/store/p/ubuntu/9nblggh4msv6](https://www.microsoft.com/en-us/store/p/ubuntu/9nblggh4msv6)
[^2]: [https://jekyllrb.com/docs/windows/#installation-via-bash-on-windows-10](https://jekyllrb.com/docs/windows/#installation-via-bash-on-windows-10)
[^3]: [https://github.com/jamie-lord/Lord.technology](https://github.com/jamie-lord/Lord.technology)