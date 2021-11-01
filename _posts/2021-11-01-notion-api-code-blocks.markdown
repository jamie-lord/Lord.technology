---
title: Notion API code blocks
date: 2021-11-01T10:47:00.0000000+00:00
last_modified_at: 2021-11-01T11:00:00.0000000+00:00
notion_id: 19e01e1b-a6b1-4a92-98d8-0a5931d40f23
categories:
- programming
tags:
- notion
---

The official Notion API finally supports code blocks with a recent update. I've updated [NotionToJekyll](https://github.com/jamie-lord/NotionToJekyll) to add this functionality. This post is just a test to see if code blocks with different languages work properly.

```bash
echo "Hello World"
```

```basic
PRINT "Hello, world!"
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

```vb.net
Module Module1
    Sub Main()
        Console.WriteLine("Hello, world!")
    End Sub
End Module
```

