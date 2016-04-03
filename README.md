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

## Define a node port with only a title
Use this json snippet within node configurations for `config`, `inputs` or `outputs`. If you need you can set a specific `id` and `value` for these node port. The properties `id` and `value` are optional values for a simple port with only a title.
```sh
{
	"title": "Port Title",
	"id": "in1",
	"value": 1
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

## Add one or more nodes per javascript
To add one or more nodes at runtime you can use the editor method: addNode(<`object`|`array`>) 
After creating the new node the editor will update the configuration and triggers the event `node.config.changed`. The event data will be the current editor config.
```sh
editor.addNode([
	{
		id: 'myNode',
		title: 'Node Title',
		description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
		class: 'custom-style-class',
		pos: {
			left: 50,
			top: 50
		},
		inputs: [
			{
				"id": "in1",
				"title": "Input Port 1",
				"value": 1
			}
		],
		outputs: [
			{
				"id": "out1",
				"title": "Output Port 1",
				"value": 1
			}
		]
	}
]);
```

## Add a set of connections
It is possible to set node connections in a seperate step. Additional you can define a color for any connections that you like to set. For a connection color you can use the `color` property.
```sh
editor.addConnection([
	{
		from: {
			node: 'node1',
			out: 'out1'
		},
		to: {
			node: 'node2',
			in: 'in1'
		}
	},
	{
		color: '#A52A2A',
		from: {
			node: 'node2',
			out: 'out1'
		},
		to: {
			node: 'node3',
			in: 'in2'
		}
	}
]);
```
