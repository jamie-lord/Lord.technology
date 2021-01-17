---
title: Winning Experian's Hack24 2018 challenge
date: 2018-03-17 15:40:00 +00:00
---

For the third year in a row I attended [Tech Nottingham's Hack24](https://www.hack24.co.uk/); a 24 hour hackathon hosted in the heart of Nottingham and sponsored by some of the most prominent technology businesses in the area and beyond. Myself and three colleagues from IFS R&D in Nottingham took part together last year and decided to do the same again in 2018. We had a different strategy this time though, instead of spending the entire time working on our hack, we would enjoy as much of the event as possible and try and have a great time - not that last year wasn't awesome, we just ended up spending the whole time with our heads down working.

Frankly, our planning before the event was non-existant, we hadn't decided what challenge to do or what technologies to use; this is something that I would presume would put us at a disadvantage, but apparently not...

<p style="text-align: center;">
<img src="{{ site.url }}/assets/img/PorgPowered.svg" alt="Team PorgPowered logo" style="background: white; padding: 1em; max-width: 25em;">
</p>

During the introductory talks, [Experian's challenge](https://www.hack24.co.uk/blog/the-experian-learning-about-money-challenge) judge [James Cameron-Williams](https://twitter.com/fonters) inspired me to formulate an idea for our hack. We could produce a bot that you could confide your salary and other personal information in, and could then tell you, based on other data it had collected from other users, if you were earning above or below the average wage for people doing similar jobs in your area. This would help people understand if they should ask for a raise or be damn grateful for what they've got!

We used [Microsoft's Bot Framework](https://dev.botframework.com/) as well as LUIS ([Language Understanding Intelligent Service](https://www.luis.ai/home)) to create the bot and tested using their bot emulator as well as integrating it with Slack. We also managed to setup continuous integration with GitHub so that any new commits pushed to our master branch resulted in the new code automatically being deployed to Azure. You can find the repo [here](https://github.com/jamie-lord/Hack24-2018).

This was potentially a bold move as although most of the team are .Net developers (with the excepting of Matt, the designer) we had never used these tools before. Fortunately the workshop in the afternoon on Saturday included getting started with these systems and provided some helpful tips - thanks Microsoft! Without this resource, development would've been much slower and it's clearly less likely we would've won the challenge.

The primary feature of our bot was implemented using a [FormFlow](https://docs.microsoft.com/en-us/bot-framework/dotnet/bot-builder-dotnet-formflow), enabling us to easily construct a series of questions that we wanted the user to answer. This was then stored in an Azure database to enable comparison with other users. As a fun easter egg (for the MHR challenge), if the user earned below the average then they were asked if they wanted to play a game, this was of course _Who Wants to Be a Millionaire?_

Additionally we included Giphy integration, in my opinion no bot is complete without plenty of gifs. There were a few other fun easter eggs, such as the bots fascination with horses - mentioning them in any context would lead to a surprising [result](https://www.youtube.com/watch?v=O3rpmctmC_M).

The final feature that Matt amd I put together with only about 30 minutes left on the clock was to include new credit card information, something possibly helpful to the user if they were earning below the average for their job. We used sample data from Experian and with Matt's help I managed to put together a quick example of a card layout in the bot, a neat feature that's used as a visually interesting way to display potential options to the user.

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin-bottom: 1em; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed//u1y8NoTfgog' frameborder='0' allowfullscreen></iframe></div>

Amazingly we won the challenge. Not something we expected, we were honestly really happy that we were in the top three, we would've been pretty pleased with that on it's own!

Thank you James from Experian and all the brilliant Hack24 staff, we will certainly try and attend next year if we can get tickets. In the meantime, it's time to start hacking that Amazon Echo!

![PorgPowered]({{ site.url }}/assets/img/PorgPowered.jpeg)