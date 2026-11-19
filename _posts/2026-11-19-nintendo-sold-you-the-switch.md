---
title: Nintendo sold you the Switch
date: 2026-11-19T19:00:00+00:00
categories:
  - hardware
tags:
  - nintendo
  - copyright
  - homebrew
description: Nintendo's Picofly takedown puts a copyright claim between a Switch owner and a backup of their own game progress. Who gets to decide what runs on the machine after the sale?
---

Lend me your copy of *Breath of the Wild* and I can spend the weekend catching horses. I won't get the one you called Nigel. He stays at your house, because the Switch [keeps your progress in its own memory](https://www.nintendo.com/en-gb/Support/Nintendo-Switch/Data-Management-FAQ-1508495.html) even when the game comes on a cartridge. It's a perfectly sensible arrangement until the day the console gives up and the cartridge is the bit that still works.

A local backup would settle that, and there's a microSD card slot right there on the Switch. Nintendo lets you put a screenshot on the card, so you can keep a lovely picture of Nigel, but the save file itself is off limits. For games that support it, Nintendo sells a [cloud backup service](https://en-americas-support.nintendo.com/app/answers/detail/a_id/22306) as part of a Switch Online subscription. I've no objection to paying someone to look after a backup. I do object to needing their permission to look after it myself.

As Louis Rossmann points out in his [video about Picofly](https://www.youtube.com/watch?v=-TLCGUpoD6c), someone has already written the program you'd want. It's called [JKSV](https://github.com/J-D-K/JKSV), and it does the unglamorous work of backing up save files and restoring them when you need them. On a laptop you'd be about two clicks from the end of this story. On a Switch you have a problem before the backup program even gets a chance to run. At startup the console checks that the software it's loading has Nintendo's approval. This is where Picofly comes in. Its firmware runs on an extra chip fitted to the Switch, giving the owner a way past that check. Now the console can run JKSV, along with whatever else its owner fancies.

In a [notice dated 6 November](https://github.com/github/dmca/blob/master/2026/11/2026-11-06-nintendo-2.md), Nintendo of America asked GitHub to take down the Ansem-SoD/Picofly repository. The notice lists copyright registrations for four games, including *Breath of the Wild*. You might reasonably expect the next paragraph to tell you where in the repository someone had stashed a copy of Zelda. The allegation Nintendo actually makes is that the firmware lets people bypass a protection against playing pirated games. On the strength of that complaint, GitHub disabled the repository and its forks, 144 repositories in all.

The distinction matters because of an American law, [section 1201 of the Digital Millennium Copyright Act](https://uscode.house.gov/us/usc/119-118/t17/s1201/). Under that law, distributing a tool designed primarily to bypass a measure that effectively controls access to a copyrighted work can itself be unlawful. You could go through the firmware line by line and find none of Nintendo's code, and the company could still make the same complaint. It turns on what the tool was designed to get past.

People do use modchips to pirate games, and it would be daft to build a defence of homebrew on the hope that there are only six people doing it. Suppose piracy is exactly what most buyers have in mind. I can see why a company faced with that problem would sooner go after the tool once than chase down bootleg copies of Zelda for the rest of time. From the sofa, though, it looks rather different. You've paid for Zelda, you've paid for the Switch and all you're trying to copy is a record of your own Sunday afternoons. If you sent me that file I'd still need to get hold of the game before I could do so much as fall off your horse. Exactly whose work are you getting for free?

Rossmann takes issue with a comparison to slipping past a nightclub bouncer. I think the comparison works beautifully for playing online. It's Nintendo's club. If you turn up with a modified console and want to race strangers on Nintendo's servers, Nintendo gets to decide who comes through the door. Now go home, switch off the Wi-Fi and sit down on the sofa to try a game you've written yourself. What's the bouncer doing in your sitting room?

What I find grubby is how easily we accept that he belongs there. Even in defending the owner it's tempting to start listing all the respectable things a modified Switch can do, as though the right combination of backups, Linux and worthy educational projects might persuade Nintendo to let us keep it. I don't care if you want to turn yours into the world's least convenient egg timer. Being able to spend a perfectly good Saturday doing something pointless with a computer you paid for is one of the pleasures of owning it.

By all means charge me for Zelda. Sell me a cloud subscription if you can do a better job of looking after Nigel than I can. But the Switch itself was a sale. If Nintendo wants the final say over what runs on a machine it has already sold, it can buy it back.
