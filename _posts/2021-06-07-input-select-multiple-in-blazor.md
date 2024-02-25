---
title: Input select multiple in Blazor
date: 2021-06-07 21:46:00 +01:00
categories:
- Blazor
---

There's no built-in multiple select in Blazor but it's pretty easy to get one working without any libraries.

Firstly the HTML in your component. Do **not** add the normal `@bind-Value` to this select, it will break initial rendering and I couldn't find a way around that. Fortunately as the underlying model value is updated programmatically, 2-way binding isn't required.

`AllOptions` is just the list of options you'd like to appear, this could just be strings or something fancier if you need.

```html
<select @ref="_selectReference" @onchange="OnSelectionChanged" multiple>
	@foreach (var option in AllOptions)
	{
		<option value="@option" selected="@Model.SelectedOptions.Contains(option)">@option</option>
	}
</select>
```

In your component's `code` section we need to get the selected values and then update the model. In my example I'm using a `HashSet` because I expect all values to be unique, you could also us a `List` if you prefer.

```csharp
private async Task OnSelectionChanged(ChangeEventArgs eventArgs)
{
	var selection = await GetSelections(_selectReference);
	Model.SelectedOptions = selection;
}

private ElementReference _selectReference;

public async Task<HashSet<string>> GetSelections(ElementReference elementReference)
{
	return (await JS.InvokeAsync<List<string>>("getSelectedValues", _selectReference)).ToHashSet();
}
```

And finally a tiny bit of JavaScript is required sadly that returns all the selected values for C# to update your model.

```jsx
window.getSelectedValues = function(sel) {
	var results = [];
	var i;
	for (i = 0; i < sel.options.length; i++) {
		if (sel.options[i].selected) {
			results[results.length] = sel.options[i].value;
		}
	}
	return results;
};
```

And that's it, add some styling and you should have a working multi select in your Blazor form.