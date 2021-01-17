---
title: ".Net Core blockchain"
date: 2018-02-06 20:30:00 +00:00
---

I recently forked a popular C# blockchain demonstration program and ported the project to .Net Core. Fortunately the project is very simple by design, its entire point is to provide a practical demonstration of how a blockchain works. After conducting some minor refactoring and migrating the project to .Net Core everything worked well and as expected. One issue was that the [*TinyWebServer*](https://bitbucket.org/tevert/tinywebserver) library used is not .Net Core ready so I manually included that in the project.

After fixing a few minor bugs I came across, the repository is ready for more playing with - I'm interested in implementing a contractual document store next. Now it's possible to run a blockchain system on any common platform from the same codebase! .Net Core is super awesome, you can find the repo [here](https://github.com/jamie-lord/blockchain_netcore).