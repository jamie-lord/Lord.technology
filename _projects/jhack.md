---
title: JHACK - The Technology Blog
date: 2013-01-01 00:00:00 +00:00
---

In late 2012 I decided to start my own technology blog to learn more about website design and maintenance and to provide a reasonable excuse for my vast appetite for technology news.

The site is called JHACK - I decided on this name simply because it's short and easy to remember. Using WordPress and a melody of plugins, coupled with a heavily customised theme, I developed the sites branding and design over a three month beta period. The main reason for setting the site up was to discover and implement new technologies such as CloudFlare and Varnish Cache; as well as enhancing my Linux sysadmin knowledge.

![JHACK homepage]({{ site.url }}/assets/img/jhack-home.jpg)

The site includes Facebook and Twitter accounts, as well as a forum using Moot. Not only is the desktop version of the site entirely responsive, it also has a mobile version using JetPack.

My posts vary in their subject matter, but I tend to focus more on electronics, Computer Science and hacks. JHACK was never intended to be a personal blog - many posts (mainly about gaming) are written by Tarik Suday, a University buddy of mine.
Between February 2013 and February 2014 the site received over 511,000 pageviews.

![JHACK post page]({{ site.url }}/assets/img/jhack-post.png)

I'm generally not a fan of Google, particularly their analytics. Subsequently I use my own Piwik installation to monitor visits to all sites I administer. Managing this data 'in-house' allows more control and enhanced security.

![JHACK gtmetrix score card]({{ site.url }}/assets/img/jhack-gtmetrix.jpg)

Optimising and stress-testing websites is something that interests me greatly. Using services like GTmetrix I was able to get the homepage to less than 600KB in total size and load times to less than one second. I'm also a big fan of Apache JMeter, a tool for stress testing websites and web applications; it's basically LOIC with a Java interface. Using JMeter I was able to tune MySQL and Apache's memory usage to minimise instability under heavy load. This is something I learnt to do with this site and I now follow a similar procedure with every new site I design before it enters a production environment.