$(function() {

	//jsCow.debug.events = true;

	console.time('all');

	NodeEditorOptions1 = {
		grid: 30,
		nodes: [
			{
				id: 'node1',
				title: 'Node 1',
				pos: {
					left: 30,
					top: 30
				},
				inputs: [
					{
						"type": false,
						"id": "in1",
						"title": "Input Port 1",
						"value": 1
					},
					{
						"type": false,
						"id": "in2",
						"title": "Input Port 2",
						"value": 1
					}
				],
				outputs: [
					{
						"type": false,
						"id": "out1",
						"title": "Output Port 1",
						"value": 1
					},
					{
						"type": false,
						"id": "out2",
						"title": "Output Port 2",
						"value": 1
					},
					{
						"type": false,
						"id": "out3",
						"title": "Output Port 3",
						"value": 1
					},
					{
						"type": false,
						"id": "out4",
						"title": "Output Port 4",
						"value": 1
					},
					{
						"type": false,
						"id": "out5",
						"title": "Output Port 5",
						"value": 1
					}
				]
			},
			{
				id: 'node2',
				title: 'Node 2',
				pos: {
					left: 580,
					top: 200
				},
				inputs: [
					{
						"type": false,
						"id": "in1",
						"title": "Input Port 1",
						"value": 1
					},
					{
						"type": false,
						"id": "in2",
						"title": "Input Port 2",
						"value": 1
					},
					{
						"type": false,
						"id": "in3",
						"title": "Input Port 3",
						"value": 1
					}
				],
				outputs: [
					{
						"type": false,
						"id": "out1",
						"title": "Output Port 1",
						"value": 1
					},
					{
						"type": false,
						"id": "out2",
						"title": "Output Port 2",
						"value": 1
					}
				]
			},
			{
				id: 'node3',
				title: 'Node 3',
				pos: {
					left: 1000,
					top: 150
				},
				inputs: [
					{
						"type": false,
						"id": "in1",
						"title": "Input Port 1",
						"value": 1
					}
				],
				outputs: [
					{
						"type": false,
						"id": "out1",
						"title": "Output Port 1",
						"value": 1
					}
				]
			}
		],
		connections: [
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
				color: '#f00',
				from: {
					node: 'node1',
					out: 'out1'
				},
				to: {
					node: 'node2',
					in: 'in2'
				}
			},
			{
				from: {
					node: 'node1',
					out: 'out4'
				},
				to: {
					node: 'node2',
					in: 'in3'
				}
			},
			{
				color: '#fc0',
				from: {
					node: 'node2',
					out: 'out2'
				},
				to: {
					node: 'node3',
					in: 'in1'
				}
			},
			{
				from: {
					node: 'node1',
					out: 'out2'
				},
				to: {
					node: 'node3',
					in: 'in1'
				}
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
					top: 20
				},
				inputs: [
					{
						"type": false,
						"id": "in1",
						"title": "Input Port 1",
						"value": 1
					},
					{
						"type": false,
						"id": "in2",
						"title": "Input Port 2",
						"value": 1
					}
				],
				outputs: [
					{
						"type": false,
						"id": "out1",
						"title": "Output Port 1",
						"value": 1
					},
					{
						"type": false,
						"id": "out2",
						"title": "Output Port 2",
						"value": 1
					}
				]
			},
			{
				id: 'node2',
				title: 'Node 2',
				pos: {
					left: 280,
					top: 50
				},
				inputs: [
					{
						"type": false,
						"id": "in1",
						"title": "Input Port 1",
						"value": 1
					},
					{
						"type": false,
						"id": "in2",
						"title": "Input Port 2",
						"value": 1
					}
				],
				outputs: [
					{
						"type": false,
						"id": "out1",
						"title": "Output Port 1",
						"value": 1
					},
					{
						"type": false,
						"id": "out2",
						"title": "Output Port 2",
						"value": 1
					}
				]
			},
			{
				id: 'node3',
				title: 'Node 3',
				pos: {
					left: 150,
					top: 200
				},
				inputs: [
					{
						"type": false,
						"id": "in1",
						"title": "Input Port 1",
						"value": 1
					},
					{
						"type": false,
						"id": "in2",
						"title": "Input Port 2",
						"value": 1
					}
				],
				outputs: [
					{
						"type": false,
						"id": "out1",
						"title": "Output Port 1",
						"value": 1
					},
					{
						"type": false,
						"id": "out2",
						"title": "Input Port 2",
						"value": 1
					}
				]
			}
		],
		connections: [
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
				from: {
					node: 'node1',
					out: 'out1'
				},
				to: {
					node: 'node2',
					in: 'in2'
				}
			}
		]
	};
	

	/*
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
		grid: 50,
		snapToGrid: true,
		nodes: (function() {
			var nodes = [];
			for (var i=0; i < Math.floor((Math.random() * 10)); i++) {
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
			for (var i=0; i < Math.floor((Math.random() * 10)); i++) {
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
	*/






	nodeeditor1 = jsCow.get(jsCow.res.components.nodeeditor, {
		id: 'node-editor-1'
	})
	.on('editor.options.updated', function(e) {
		//console.log("");
		//console.log(e.sender.id()+" geupdatet >>>", e.data.nodes[0].pos);
	})
	.target('#node-editor-1').run();


	$('body').append('<button id="setOptions">Set Options</button>');
	$('#setOptions').click(function() {
		jsCow.find('node-editor-1').options(NodeEditorOptions1);
	});
	
	$('body').append('<button id="addNodes">Add Nodes</button>');
	$('#addNodes').click(function() {
		jsCow.find('node-editor-1').addNode([
			{
				id: 'node100',
				title: 'Node 100',
				pos: {
					left: 150,
					top: 150
				},
				inputs: [
					{
						"type": false,
						"id": "in1",
						"title": "Input Port 1",
						"value": 1
					}
				],
				outputs: [
					{
						"type": false,
						"id": "out1",
						"title": "Output Port 1",
						"value": 1
					}
				]
			},
			{
				id: 'node2',
				title: 'Node 2',
				pos: {
					left: 180,
					top: 180
				},
				inputs: [
					{
						"type": false,
						"id": "in1",
						"title": "Input Port 1",
						"value": 1
					}
				],
				outputs: [
					{
						"type": false,
						"id": "out1",
						"title": "Output Port 1",
						"value": 1
					}
				]
			}
		]);
	});
	
	$('body').append('<button id="addSingleNode">Add Single Node</button>');
	$('#addSingleNode').click(function() {
		jsCow.find('node-editor-1').addNode({
			id: 'node200',
			title: 'Node 200',
			pos: {
				left: 250,
				top: 250
			},
			inputs: [
				{
					"type": false,
					"id": "in1",
					"title": "Input Port 1",
					"value": 1
				},
				{
					"type": false,
					"id": "in2",
					"title": "Input Port 2",
					"value": 1
				}
			],
			outputs: [
				{
					"type": false,
					"id": "out1",
					"title": "Output Port 1",
					"value": 1
				},
				{
					"type": false,
					"id": "out2",
					"title": "Output Port 2",
					"value": 1
				}
			]
		});
	});
	
	$('body').append('<button id="addConnections">Set Connection</button>');
	$('#addConnections').click(function() {
		jsCow.find('node-editor-1').addConnection([
			{
				from: {
					node: 'node1',
					out: 'out1'
				},
				to: {
					node: 'node100',
					in: 'in1'
				}
			},
			{
				from: {
					node: 'node2',
					out: 'out1'
				},
				to: {
					node: 'node200',
					in: 'in2'
				}
			}
		]);
	});
	
	console.timeEnd('all');
	console.log(jsCow.componentsObjectList.length, "components created...");
	
});