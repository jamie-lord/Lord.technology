---
date: 2026-06-30T20:00
title: Nobody ever knew how it worked
categories:
  - ai
tags:
  - claude-code
  - agentic-engineering
  - cloudflare
---
Cyrus Lopez published an essay last week, ['The Last People Who Know How It Works'](https://unix.foo/posts/last-people-who-know-how-it-works/), and it's the best thing I've read about computing this year. It mourns an intimacy with machines that he thinks is ending: the boot disk built for one game, the IRQ jumper set with a fingernail, the modem handshake you could diagnose by ear before the line dropped. His case is that competence is safe, because the models have read every manual we never bothered to, while acquaintance is dying. We're about to lean on these machines harder than we've leaned on anything, and know them worse than he knew a beige PC in 1995.

He's mourning the wrong thing. Nobody ever knew how it worked, him included. You learn the layer you were born onto, maybe a rung or two below it, and past that your understanding gets thin and then stops. The boy poking at IRQs had no idea what the silicon under his sound card was doing. The people who understand the silicon couldn't tell you much about the lithography that made it, or the chemistry under that, or the trade routes the raw materials came down. Lopez writes as if there was once a whole machine you could hold in your head. There wasn't. Everyone has only ever held one floor of a very tall building and called it the world, because it was where they happened to be standing.

## The skill, not the knowledge

Each layer gets built over the last, and when one hardens the knowledge stays put; it's the wage attached to it that goes. The skill that made you the person to call turns into a checkbox in someone else's dashboard, and you're left fluent in a problem nobody has any more.

I've watched this happen to me more than once. Hand-writing SQL and reading query plans was a genuine skill until the ORMs ate it. Knowing how to provision and patch a Linux box mattered right up until containers made it irrelevant, and now most of what I ship runs on Cloudflare Workers, where there's no box to patch and no server I'm allowed to think about. The man pages are all still there. They just stopped paying.

## The floor I'm standing on now

None of that ever kept me up at night, because the abstraction was always happening somewhere below me. Now it's reached the floor I work on, and I'm the one who brought it. I spend my days building with Claude Code and wiring up MCP servers so that agents can do the integration work I used to charge for by the hour. I know how that sounds from someone with 'architect' in his job title. The boilerplate, the glue, the fourth API client this month, more and more of it is something I read over rather than type.

The agents aren't coming for all of it, and pretending they are is its own kind of laziness. They're very good at work that's been done ten thousand times and documented badly once. Where they still struggle is the calls with no precedent to copy: what consistency a system actually needs, whether a Durable Object earns its keep over a plain queue, what to do when the requirement itself is wrong rather than just unmet. Fluency is the part losing value. The judgement to design something nobody has built yet is not, for now.

The one thing in the essay I can't dismiss has nothing to do with intimacy. Every abstraction before this one was something you built once and then owned, and a CPU keeps working long after you've stopped paying for it. This is the first time the layer underneath you is a meter running against someone else's pricing page. The compiler that put the assembly programmer out of work never phoned home or raised its rates. This one does both. It comes down to who owns the floor you stand on, not to whether you understand the machine, and nostalgia for jumpers and boot disks is a very good way of never noticing the difference.

So Lopez is grieving the feel of one floor while the floor itself is being sold out from under us. The closeness he describes was real, but it was closeness to one layer, not to the machine, and it lasted only until that layer set hard and turned into something nobody has to touch again. Abstraction has never punished the people who didn't understand the metal. It punishes the ones who mistook their floor for the ground.
