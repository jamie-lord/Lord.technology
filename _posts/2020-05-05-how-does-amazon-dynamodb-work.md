---
title: How does Amazon DynamoDB work?
date: 2020-05-05 10:12:23 Z
---

I've recently been looking into _how_ exactly nosql document databases work. Not just existing solution APIs like Amazon DynamoDB and Azure CosmosDB, I mean how they work _inside_, with a view to creating my own for fun. Amazon DynamoDB's [wikipedia](https://en.wikipedia.org/wiki/Amazon_DynamoDB) page is a good starting place but I wanted more technical detail!

Luckily [this talk](https://www.youtube.com/watch?v=yvBR71D0nAQ) goes into much more detail than I could find anywhere else, explaining secondary indexes, throttling, burst capacity, accumulating read capacity and adaptive capacity amongst other areas.

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin-bottom: 1em; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed//yvBR71D0nAQ' frameborder='0' allowfullscreen></iframe></div>
