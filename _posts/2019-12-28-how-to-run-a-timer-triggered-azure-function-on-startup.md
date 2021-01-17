---
title: How to run a timer triggered Azure Function instantly when developing
date: 2019-12-28 16:00:00 +00:00
---

You can set a timer triggered Azure Function to run on startup when built for development like this:

```csharp
[FunctionName("FantasticFunction")]
        public static async Task RunAsync(
            [TimerTrigger("0 */5 * * * *"
#if DEBUG
            , RunOnStartup=true
#endif
            )]TimerInfo timer, ILogger log)
        {
            //...
        }
```

It may not be pretty, but it's super useful when running locally.
