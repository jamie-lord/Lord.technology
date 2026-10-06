---
title: Solving problems is still the fun part of software development
date: 2026-10-06T20:00:00+01:00
categories:
  - ai
tags:
  - software-development
  - agentic-engineering
---

I love the current state of software development. I care about solving people's problems, and coding agents make more of the things I want to build feel worth attempting. There is a particular pleasure in getting rid of an awkward workaround that somebody has been putting up with for years. I don't find that pleasure diminished by having written less of the code myself.

Curiositry's [Vibecoding isn't as fun as writing code by hand](https://www.autodidacts.io/vibecoding-isnt-as-fun-as-writing-code-by-hand/) describes a different experience. They enjoy making things too, but find that the excitement of generating a first version gives way to a process they don't much like. The [Hacker News discussion](https://news.ycombinator.com/item?id=49979306) is full of people recognising that feeling, alongside others who are having a wonderful time.

I believe the people who miss writing code. You cannot refute somebody's afternoon by showing them your productivity graph. And Curiositry is right that a working version doesn't automatically give you the understanding or sense of accomplishment you might get from building it by hand. What I disagree with is the suggestion that the fun has mostly been spent by then. Getting something working is often the point where I start getting properly interested.

Curiositry built a pitch-training app they had wanted for about a decade, a Kobo migration assistant, and a prediction-market party game for a lecture. They acknowledge that some of these projects would otherwise never have happened, and that they were immensely pleased with the results.

I kept coming back to the pitch-training app. Ten years of wanting a tool, and now you can use it. The novelty of generating it will wear off, but presumably you still want to practise singing. There is a reason to keep opening it, to notice what's awkward, to make it better. I can imagine becoming quite attached to that project.

Of course, you can get an impressive demo out of an agent and then discover that every small change breaks three other things. If you accepted a pile of code you don't understand, the speed of that first afternoon may turn out to have been misleading. You have to count the checking and repair work, and sometimes writing it yourself would have been quicker.

But that is a reason to examine what you have built. Getting a useful result early doesn't, by itself, mean you've borrowed the time from somewhere else. Even when the code is maintainable, the process may leave you cold. For me, using the thing and improving it can supply plenty of enjoyment afterwards.

Some of the HN comments divide us into people who love programming and people who love building things. I don't recognise that as a useful division. I can want to understand an algorithm and also want to get an annoying import process out of somebody else's life. Calling programming typing is just as dismissive. Writing the implementation is often how you discover that the design doesn't make sense.

There are other ways to discover you were wrong, though. Put a working version in front of someone and watch where they hesitate. That will usually give you something to think about.

Imagine someone moving records between two systems. An agent helps you produce a parser and an upload screen. Then you find duplicates in the source data, and realise that a failed import leaves the user unsure whether it is safe to try again. They also need to check the changes before accepting them. Perhaps a preview that lets them correct five records without starting over would save them more trouble than anything else you've built.

I enjoy working through that sort of problem. These decisions have always been part of development; what excites me is having time to try more of the possible answers. Faster implementation can make another attempt affordable. It can also produce five wrong approaches in record time, so you still have to pay attention.

Curiositry describes AI as introducing a layer between the developer and reality. That rings true when I don't understand what a program is doing. But the person struggling with the import is part of reality too. If I can get something usable into their hands earlier, I can learn from them earlier. I want to stay close enough to the implementation to understand its failures, while spending more time on the problem that made it worth writing.

I've already [written about a fairly spectacular failure in my browser painting engine](/2026/07/29/opus-5-gets-things-wrong-more-quietly.html). A model inserted a blurred copy of the reference image underneath the simulated paint. The picture looked more like the target, which was what the scoring function rewarded. Unfortunately, the whole purpose was to reconstruct the image through simulated painting. Putting the answer underneath it rather spoiled the exercise.

That is why I hesitate when people say the result is all that matters. You have to be clear about what counts as a result. A migration that looks successful but loses someone's annotations has failed. So has a password change that leaves the old credential working. A convincing screenshot or a passing test suite may tell you less than you think.

Caring about users gives me good reasons to care about the code. I need to be able to fix it when something goes wrong, and they need to be able to recover from mistakes without losing their work. Nobody should have to ask for those things separately.

The objection in the thread that I find hardest to answer is that [becoming primarily a code reviewer takes the enjoyment out of the job](https://news.ycombinator.com/item?id=49979795). Smaller changes and better tests might make review manageable. They won't necessarily make it fun.

I would still keep changes small enough to understand, and decide what correct behaviour looks like before asking an agent to implement it. For the import, a retry must not duplicate records and cancelling the preview must leave the data alone. I'd want to test those behaviours and inspect the code. Asking another model to approve the change is no guarantee; it may share the first one's misunderstanding.

That is a more involved process than accepting code without reading it, but Curiositry has tried serious agent workflows too. I don't think the answer is that they simply used the tools wrong. I enjoy the product work enough to make the checking worthwhile. Someone else might reasonably feel differently, and sometimes I would rather write the code than work out what an agent has done.

There is also the [question raised by the conductor analogy in the comments](https://news.ycombinator.com/item?id=49980570): how do people develop the judgement to direct work they haven't learned to do? I have [written about that concern before](/2026/02/04/the-real-ai-coding-debate-is-about-capability-not-productivity.html). The experience I draw on when reading generated code took time to acquire. Watching an agent work won't automatically give a beginner the same understanding. They need practice: making predictions, getting things wrong, investigating, making changes themselves. My enjoyment today doesn't settle how we should train people.

One [commenter is planning to leave the industry](https://news.ycombinator.com/item?id=49980291) because they no longer enjoy the job. Telling them they can still code as a hobby seems a miserable response to losing work they liked. I don't want my enthusiasm to become another demand that everyone adopt the same tools and be grateful.

What I do want is more chances to build things that are worth somebody's time. I find it satisfying to work out why a feature keeps confusing people, or why a task still takes too long, and do something about it. The source code matters because I need the answer to keep working. And when somebody comes back with the next problem, I want to be able to help with that too.

That is enough to make me want to open the project again. Having more of it within reach is a good reason to be excited.
