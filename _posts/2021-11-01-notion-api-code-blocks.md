---
title: Notion API code blocks
date: 2021-11-01 10:47:00 +00:00
categories:
- programming
tags:
- notion
last_modified_at: 2021-11-01 11:04:00 +00:00
notion_id: 19e01e1b-a6b1-4a92-98d8-0a5931d40f23
---

The official Notion API finally supports code blocks with a recent update. I've updated [NotionToJekyll](https://github.com/jamie-lord/NotionToJekyll) to add this functionality. This post is just a test to see if code blocks with different languages work properly.

```bash
echo "Hello World"
```

```c
#include 
 
int main(void)
{
    puts("Hello, world!");
}
```

```c#
using System;
class Program
{
    public static void Main(string[] args)
    {
        Console.WriteLine("Hello, world!");
    }
}
```

