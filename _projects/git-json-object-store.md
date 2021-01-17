---
title: C# object and file storage in Git
date: 2018-02-04 16:33:00 +00:00
---

I recently wrote a small class library to serialise and store objects as JSON files in a local or remote Git repository. The library has a simple interface to get and store objects or collections of objects. The objects are then simply serialised and saved to files named based on the property `Id` and in a directory named using the object type. Files are also supported and simply saved based on a provided file name.

To save something...
{% highlight c# %}
GitStore.SaveObject<MyObjectType>(myObject);
{% endhighlight %}

And to get it back...
{% highlight c# %}
var myObject = GitStore.GetObject<MyObjectType>(myObjectId);
{% endhighlight %}

Whilst this approach to storing objects will always be slower than a dedicated database, the performance is still very good and it offers some great benefits such as including a complete log of all changes, making undoing mistakes easier and manual changes are also simple. Additionally as the files are just JSON, they're human readable and work with complex types, as long as the serialiser is up to the task.

The library is also thread-safe as all writes happen inside a lock:

{% highlight c# %}
private static readonly Object _writeLock = new Object();

private void ExecuteWrite(Action action)
{
    var task = new Task(action);
    lock (_writeLock)
    {
        task.RunSynchronously();
    }
}
{% endhighlight %}

You can find all the code [here](https://github.com/jamie-lord/GitStore).