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
