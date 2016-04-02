# jscow-node-editor
Provides a jscow application environment to implement your own jscow application.

## Install

```sh
npm install
```

## Build

```sh
grunt
```

## Watch
You can the grunt-contrib-watch plugin to call all grunt tasks automatically by change a **js** file or **less** file within the **src/** directory. To refresh your page automatically after calling the watch task you have to install the browser plugin **LiveReload**.

To using the watcher run the follow command in your nodejs command client:
```sh
grunt watch
```

## Create an editor instance
For using an editor you need to create an instance of the node editor.
You can use the following code snippet to create a new instance.
```sh
var editor = jsCow.get(jsCow.res.components.nodeeditor, {
	model: {
		options: {
			autosave: true
		}
	}
}).on('editor.options.changed', function(e) {
	console.log("Process data changed", e.data);
}).target('#node-editor-1').run();
```

## Describe a node
To use a node in your `jscow-node-editor` you needs the following json.

```sh
{
	id: 'node1',
	title: 'Node Title',
	class: 'customized-node',
	pos: {
		left: 300,
		top: 50
	},
	config: [],
	inputs: [],
	outputs: []
}
```

## Using a dropdown as a configuration field
Use this json snippet within node configurations for `config`, `inputs` or `outputs`.
```sh
{
	"type": "jsCow.res.components.nodedropdown",
	"title": "Select Option",
	"value": [
		{ title: 'Option 1', value: 1},
		{ title: 'Option 2', value: 2, selected: true},
		{ title: 'Option 3', value: 3},
		{ title: 'Option 4', value: 4}
	]
}
```

## Using a button as a configuration field
Use this json snippet within node configurations for `config`, `inputs` or `outputs`.
```sh
{
	"type": "jsCow.res.components.nodebutton",
	"title": "Button",
	"events": {
		"click": function(e) {
			console.log("button clicked...");
			// ...
			this.trigger('node.config.changed');
		}
	}
}
```

## Using a checkbox as a configuration field
Use this json snippet within node configurations for `config`, `inputs` or `outputs`.
```sh
{
	"type": "jsCow.res.components.nodecheckbox",
	"title": "Your field label",
	"value": [
		{ title: 'Checkbox 1', value: 1},
		{ title: 'Checkbox 2', value: 2},
		{ title: 'Checkbox 3', value: 3, selected: true}
	]
}
```

## Using a textfield as a configuration field
Use this json snippet within node configurations for `config`, `inputs` or `outputs`.
```sh
{
	"type": "jsCow.res.components.nodeinput",
	"title": "Value",
	"value": "19.95"
}
```
