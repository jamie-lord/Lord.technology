---
title: How to deploy server-side Blazor to an Azure App Service
date: 2019-05-31 17:01:00 +01:00
---

Sadly [Microsoft's documentation](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/blazor/server-side?view=aspnetcore-3.0) on this is non-existent at the moment and there are a couple of tricky parts that caught me out the first time I tried so I thought I'd provide instructions here for anyone trying to do the same thing.

The first thing to do is add `Microsoft.Extensions.Hosting` and `Microsoft.Extensions.Hosting.WindowsServices` packages from NuGet (you'll need to include pre-release versions when searching) to your Blazor project. Then add `.UseWindowsService()` to the `CreateHostBuilder` method in `program.cs`.

In my case, the solution built locally fine for me but when I tried to deploy to azure I got a number of errors regarding package version mismatches and needed to manually fix these before a release build would succeed. This simply involved explicitly adding a few packages to my Blazor UI project and a few others, but this step will be entirely personal depending on your projects and their dependencies.

Another thing to do to get a working deployment is to edit the publish settings in Visual Studio so that the deployment mode is set to 'Self-Contained', this can be found by right-clicking on the Blazor project, selecting 'Publish' and then editing the 'Deployment Mode' option. This change means that your application will be deployed with .Net Core included and not rely on Azure's versions. This is currently required as .Net Core 3 Preview is not currently available for Azure Web Services (I believe there may be other ways to get around this issue but this solution seems reasonable to me for the time being).

Finally, you'll want to enable web sockets for your app service in Azure, this setting can be found in Configuration -> General Settings -> Web sockets. This enables SignalR to communicate using sockets with connected clients.

And that's it, hopefully following this rough guide you should be able to deploy your lovely server-side Blazor application to Azure.
