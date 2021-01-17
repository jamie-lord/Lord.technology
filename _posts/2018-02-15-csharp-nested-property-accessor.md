---
title: C# nested property accessor
date: 2018-02-15 06:00:00 +00:00
---

I recently had the need to access a property in another property in C#. Accessing a property value is trivial using `PropertyInfo` but it's only capable of accessing properties on the current object and cannot go any deeper. Such was my need that I created some recursive extension methods to help set/get properties at any depth as well as copy a value from one object to another. Whilst not a perfect solution, this does seem to work well for my needs and hasn't caused any side-effects.

```csharp
public static void CopyPropertyValues<T>(T x, T y, string[] propertyNames)
{
    foreach (var name in propertyNames)
    {
        try
        {
            SetPropertyValue(name, x, GetPropertyValue(name, y));
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}

public static object GetPropertyValue<T>(string name, T obj)
{
    try
    {
        var parts = name.Split('.').ToList();
        var currentPart = parts[0];
        PropertyInfo propertyInfo = obj.GetType().GetProperty(currentPart);
        if (propertyInfo == null)
        {
            return null;
        }
        if (name.IndexOf(".") > -1)
        {
            parts.Remove(currentPart);
            return GetPropertyValue(string.Join(".", parts), propertyInfo.GetValue(obj));
        }
        else
        {
            return propertyInfo.GetValue(obj);
        }
    }
    catch (Exception e)
    {
        Console.WriteLine(e);
        throw;
    }
}

public static void SetPropertyValue<T>(string name, T obj, object value)
{
    try
    {
        var parts = name.Split('.').ToList();
        var currentPart = parts[0];
        PropertyInfo propertyInfo = obj.GetType().GetProperty(currentPart);
        if (propertyInfo == null)
        {
            return;
        }
        if (name.IndexOf(".") > -1)
        {
            parts.Remove(currentPart);
            SetPropertyValue(string.Join(".", parts), propertyInfo.GetValue(obj), value);
        }
        else
        {
            propertyInfo.SetValue(obj, value);
        }
    }
    catch (Exception e)
    {
        Console.WriteLine(e);
        throw;
    }
}
```
