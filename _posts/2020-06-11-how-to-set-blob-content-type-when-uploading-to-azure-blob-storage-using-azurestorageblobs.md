---
title: How to set blob content type when uploading to Azure Blob storage using Azure.Storage.Blobs
date: 2020-06-11 16:15:00 +01:00
---

I recently wanted to upload something to an Azure Storage Blob Container and specify the content type without having to make another request, sadly there's currently no documentation that I could find on how to do this common operation. Here's how to do it with the current version of [Azure.Storage.Blobs](https://www.nuget.org/packages/Azure.Storage.Blobs/) (12.4.4)...

```csharp
blobClient.Upload(stream, httpHeaders: new BlobHttpHeaders { ContentType = "text/html; charset=utf-8" }, conditions: null);
```

In this case I'm using the storage account to host some static HTML directly so I needed to set the content type to `text/html; charset=utf-8` but this will also need adjusting with images or videos too.

Setting `conditions` to `null` will mean if the blob already exists it will get overwritten, other outcomes can be set by passing a new instance of `BlobRequestConditions`.
