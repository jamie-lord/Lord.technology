---
title: Navigating the Wild West of Web Components
date: 2023-10-25 20:30:00 +01:00
categories:
- web
tags:
- webcomponents
---

Web components have garnered a lot of attention as a way to encapsulate and reuse HTML, CSS, and JavaScript. Despite their promise for modular development, they aren't without their challenges. Let's delve into some key considerations that developers need to keep in mind when using web components for building applications.

State management in web components is largely uncharted territory. Unlike popular frameworks like React, where state management solutions and patterns are well-established, web components leave you to figure out state management on your own. This means a hybrid approach involving attributes, custom events, and direct calls to class functions is often necessary. On the upside, this affords a great deal of flexibility and innovation. On the downside, it can be a daunting task without the presence of a wrapper framework to provide some structure.

The assumption that web components offer better performance isn't necessarily valid. Contrary to expectations, their instantiation cost can be high, especially when dealing with large numbers of atomic elements, such as icons. Developers have even reverted away from using web components for static elements due to the performance concerns. Web components may not be the most efficient choice for fully client-rendered pages. However, browser technologies are continually improving, which could mean that web components become more performant in the future.

One of the shining advantages of web components is their ability to function across different frameworks and stacks. They offer a high level of modularity, making it incredibly straightforward to include them in new pages regardless of the underlying technology. This makes them extremely versatile when building auxiliary sites, like API documentation pages, where different components from the main application can be effortlessly reused.

The use of shadow DOM in web components is excellent for style encapsulation. This helps prevent unintended side effects when modifying the styles of a particular component, thus reducing the need for visual diff frameworks. The lean package sizes of web components are another win, there’s nothing extra to load; it's all baked in. This makes it very efficient to keep package sizes minimal, further improving performance.

Although building an entire application in vanilla web components may be an ambitious undertaking, there are libraries such as [Lit](https://lit.dev) that offer a superb developer experience for a small cost in package size. These libraries can provide some of the missing pieces, integrating better with existing tooling and making the development process more seamless.

The problem of state management in web components could possibly take a cue from desktop development. One approach could be to have a window-level message bus to which all components subscribe. State changes could then be published on this message bus, providing a centralised mechanism for state management.

Web components are an exciting frontier with both challenges and opportunities. While they offer a compelling combination of modularity, style isolation, and lean package sizes, they lack in the areas of state management and performance. However, with ongoing improvements in browser technologies and the advent of supplementary libraries, web components could well be the building blocks of the web’s future.