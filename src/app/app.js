$(function() {

	//jsCow.debug.events = true;
	/*
	NodeEditorOptions1 = {
		grid: 100,
		nodes: [
			{
				id: 'node1',
				title: 'Node 1',
				pos: {
					left: 20,
					top: 50
				},
				inputs: [
					{
						"type": false,
						"title": "Input Port 1",
						"value": 1
					}
				],
				outputs: [
					{
						"type": false,
						"title": "Output Port 1",
						"value": 1
					}
				]
			},
			{
				id: 'node2',
				title: 'Node 2',
				pos: {
					left: 200,
					top: 150
				},
				inputs: [
					{
						"type": false,
						"title": "Input Port 1",
						"value": 1
					}
				],
				outputs: [
					{
						"type": false,
						"title": "Output Port 1",
						"value": 1
					}
				]
			}
		]
	};
	
	NodeEditorOptions2 = {
		grid: 20,
		nodes: [
			{
				id: 'node1',
				title: 'Node 1',
				pos: {
					left: 20,
					top: 50
				},
				inputs: [
					{
						"type": false,
						"title": "Input Port 1",
						"value": 1
					}
				],
				outputs: [
					{
						"type": false,
						"title": "Output Port 1",
						"value": 1
					}
				]
			},
			{
				id: 'node2',
				title: 'Node 2',
				pos: {
					left: 100,
					top: 150
				},
				inputs: [
					{
						"type": false,
						"title": "Input Port 1",
						"value": 1
					}
				],
				outputs: [
					{
						"type": false,
						"title": "Output Port 1",
						"value": 1
					}
				]
			},
			{
				id: 'node3',
				title: 'Node 3',
				pos: {
					left: 200,
					top: 300
				},
				inputs: [
					{
						"type": false,
						"title": "Input Port 1",
						"value": 1
					}
				],
				outputs: [
					{
						"type": false,
						"title": "Output Port 1",
						"value": 1
					}
				]
			}
		]
	};
	*/

	function getPorts() {
		var ports = [];
		for (var x=0; x < Math.floor((Math.random() * 20)); x++) {
			ports.push({
				"title": "Input Port "+x,
				"value": 1
			});
		}
		return ports;
	}

	NodeEditorOptions1 = {
		grid: 100,
		snapToGrid: true,
		nodes: (function() {
			var nodes = [];
			for (var i=0; i < Math.floor((Math.random() * 100)); i++) {
				nodes.push({
					id: 'node'+i,
					title: 'Node '+i,
					pos: {
						left: Math.floor((Math.random() * 500)),
						top: Math.floor((Math.random() * 500))
					},
					inputs: getPorts(),
					outputs: getPorts()
				});
			}
			return nodes;
		})()
	};

	NodeEditorOptions2 = {
		grid: 20,
		snapToGrid: false,
		nodes: (function() {
			var nodes = [];
			for (var i=0; i < Math.floor((Math.random() * 100)); i++) {
				nodes.push({
					id: 'node'+i,
					title: 'Node '+i,
					pos: {
						left: Math.floor((Math.random() * 500)),
						top: Math.floor((Math.random() * 500))
					},
					inputs: getPorts(),
					outputs: getPorts()
				});
			}
			return nodes;
		})()
	};







	nodeeditor1 = jsCow.get(jsCow.res.components.nodeeditor, {
		id: 'node-editor-1'
	}).target('#node-editor-1').run();

	nodeeditor2 = jsCow.get(jsCow.res.components.nodeeditor, {
		id: 'node-editor-2'
	}).target('#node-editor-2').run();






	$('body').append('<button>Set Options</button>');
	$('button').click(function() {
		console.log(NodeEditorOptions1.nodes.length);
		console.log(NodeEditorOptions2.nodes.length);
		jsCow.find('node-editor-1').options(NodeEditorOptions1);
		jsCow.find('node-editor-2').options(NodeEditorOptions2);
	});

});