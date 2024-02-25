---
title: Publishing blog posts from Notion to Jekyll
date: 2021-06-26 22:24:00 +01:00
categories:
- programming
tags:
- notion
- writing
last_modified_at: 2021-06-29 20:29:00 +01:00
notion_id: 257993ef-c789-488b-99de-cfc0b9348dd2
---

I use Notion as my personal knowledgebase and normally write blog posts in temporary pages and then manually publish them to my Jekyll site using SiteLeaf. With the Notion API now operational I'd been meaning to build a little tool to take blog posts inside a Notion database and convert them to markdown and push them to GitHub. I've now done that as this very post has been published using [the little program](https://github.com/jamie-lord/NotionToJekyll) I've created.

Currently the program is just a console application that can be run on demand and operates like this:

1. Get all existing blog posts in the GitHub repo
2. Get the full content of each post and deserialise the Front Matter to get the Notion ID for the post
3. Get all posts in the Notion database
4. Create new Front Matter for each post
5. Create markdown for each post (this is simple to do but verbose code to write)
6. Update existing published posts on GitHub
7. Create new published posts on GitHub
8. Delete posts that have either been deleted in Notion or changed to unpublished

My code supports paragraph, heading, unordered and ordered lists, and todo blocks. It also supports links, **bold**, *italic*, <u>underline</u> and ~~strikethrough~~ text within a block.

For now I've not added support for different coloured blocks, mentions, equations, toggles or child pages. None of these are things I'd personally use in a blog post but they should be easy to add.

The only limiting factor for me right now is the lack of code block support in the Notion API. It also doesn't support images at the moment but that's not important to me as I almost never include images on my site. However I do use code blocks fairly frequently so for now I'll have to use inline code and not write anything with too much code in.

I've used the fantastic [Notion SDK for .Net](https://github.com/notion-dotnet/notion-sdk-net) as an API client rather than roll my own. It works perfectly and seems to support everything the Notion API does with a pretty good interface and clean repository - to my surprise I appear the be the first GitHub user to star the repo, where are all the .Net-Notion devs?!

I'd like to wrap my tiny project in an API so I can call it on demand when I'd like things to sync again between Notion and my Jekyll site. This should be easy to do with a single Azure Function and can remain completely stateless. If it can be initiated with a single GET request then I can also include a magic link to the service from within Notion, allowing me to click a link to kick the process off. Until the Notion API supports webhooks, there's no way to have my site update when I update a post in Notion automatically. That will come, but for now clicking one link will do and is much better then constantly polling Notion for changes when they're infrequent.

Hopefully this will lower the barrier for me to create posts on this site and should lead to more content.

