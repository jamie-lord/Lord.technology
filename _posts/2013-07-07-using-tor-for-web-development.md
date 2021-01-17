---
title: Using Tor for web development
date: 2013-07-07 01:00:00 +01:00
---

Project Tor enables anyone to browse the internet anonymously as if from another side of the planet. This is useful to those wanting to engage in shady activities, it's also very convenient for web developers.

Cars frequently kill people; this doesn't make every driver a murderer. Using the Tor network is the same: it can be used for good and evil. Reporters use it to send highly sensitive information from nations that aren't too happy to let them spread the truth, it could also be used by paedophiles and other unsavoury characters, but there’s nothing we can do about that.

> **Tor** (originally short for **The Onion Router**) is free software for enabling online anonymity. Tor directs Internet traffic through a free, worldwide volunteer network consisting of more than three thousand relays to conceal a user's location or usage from anyone conducting network surveillance or traffic analysis. Using Tor makes it more difficult to trace Internet activity, including "visits to Web sites, online posts, instant messages and other communication forms", back to the user and is intended to protect users' personal privacy, freedom, and ability to conduct confidential business by keeping their internet activities from being monitored.
>
> "Onion Routing" refers to the layers of the encryption used. The original data, including its destination, are encrypted and re-encrypted multiple times, and sent through a virtual circuit comprising successive, randomly selected Tor relays. Each relay decrypts a "layer" of encryption to reveal only the next relay in the circuit in order to pass the remaining encrypted data on to it. The final relay decrypts the last layer of encryption and sends the original data, without revealing or even knowing its sender, to the destination. This method reduces the chance of the original data being understood in transit and, more notably, conceals the routing of it. – [Cheers Wikipedia](http://en.wikipedia.org/wiki/Tor_(anonymity_network))

Browsing the internet from an external source is extremely useful when testing new sites and applications; it gives a developer an easy way to view something from the perspective of a newcomer. This isn’t easily achievable without fiddling with proxies or physically joining another network. Using this method can quickly identify issues with new projects such as 404 errors, cache problems and compression woes.

Keeping a Tor Browser Bundle up-to-date and ready for action at a moment's notice is something I highly recommend. One possibly undesired effect is that you might be browsing the Internet from an entirely different continent. This can give you an insight into load times from across the globe; it can also be a pain having to wait for lengthy loading times...