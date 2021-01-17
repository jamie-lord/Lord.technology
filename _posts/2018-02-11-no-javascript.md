---
title: No JavaScript here
date: 2018-02-11 21:45:00 +00:00
---

Earlier today I turned Cloudflare's automatic email obfuscation off on this site. _Why_ you might ask? Well because it was the only JavaScript on this site and I liked the idea of having absolutely none. A JS free website in 2018 is highly unusual, from analytics to graphics frameworks, a lot can be done with the terrible language[^1]. But I have no need for it here, this is a pure website, one that is as fast as your browser and should load instantly on the dodgiest of internet connections and tiniest of devices.

I find this all rather amusing - try finding any website that has no JavaScript, and I'm not talking about a fully featured web app, I mean a simple blog like this one, I think you'll really struggle to find a single one.

In fact, this gives me an idea for a project - an API/web site that only returns the pure content of any page. For example you could get just the content of a news website's post without any ads or styling, allowing you to experience the benefits outlined above. I've looked into 'reader' projects before, the ones you find in browsers that allow you to view the main content of a page in a less-obtrusive way, but not found anything open source that looked promising; all you'd need to do is wrap that in a basic API and you could consume the raw content through any means of your choosing. Understandably that would be an interesting problem to solve as there is no real standard for marking up web content once inside the `<body>`, although there are some common traits. One solution might be to employ machine learning to extract the key information from a fully rendered page. I will definitely look into this, it's something I might use myself.

[^1]: I can't wait for WebAssembly to start taking off and then I can write client side code in a nicer language!