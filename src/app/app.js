$(function(){

	//jsCow.debug.events = true;

	NodeEditorOptions1 = {
		nodes: [
			{
				id: 'node1',
				title: 'Node 1',
				pos: {
					left: 20,
					top: 50
				},
				inputs: [
					
				],
				outputs: [
					{
						"type": false,
						"title": "Output Port 1",
						"value": 1
					},
					{
						"type": false,
						"title": "Output Port 2",
						"value": 2
					}
				]
			},
			{
				id: 'node2',
				title: 'Node 2',
				pos: {
					left: 420,
					top: 50
				},
				inputs: [
					{
						"type": "input",
						"title": "Input Port 1",
						"value": 1
					}
				],
				outputs: [
					{
						"type": false,
						"title": "Output Port 1",
						"value": 1
					},
					{
						"type": false,
						"title": "Output Port 2",
						"value": 2
					},
					{
						"type": false,
						"title": "Output Port 2",
						"value": 2
					},
					{
						"type": false,
						"title": "Output Port 2",
						"value": 2
					},
					{
						"type": false,
						"title": "Output Port 2",
						"value": 2
					},
					{
						"type": false,
						"title": "Output Port 2",
						"value": 2
					}
				]
			},
			{
				id: 'node3',
				title: 'Node 3',
				pos: {
					left: 600,
					top: 240
				},
				inputs: [
					{
						"type": false,
						"title": "Input Port 1",
						"value": 1
					},
					{
						"type": false,
						"title": "Input Port 2",
						"value": 2
					}
				],
				outputs: [
				]
			}
		]
	};

	NodeEditorOptions2 = {
		nodes: [
			{
				id: 'node1',
				title: 'Node 1',
				pos: {
					left: 20,
					top: 50
				},
				inputs: [
					
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
					left: 220,
					top: 250
				},
				inputs: [
					{
						"type": "input",
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
					left: 120,
					top: 550
				},
				inputs: [
					{
						"type": "input",
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
				id: 'node4',
				title: 'Node 4',
				pos: {
					left: 420,
					top: 840
				},
				inputs: [
					{
						"type": "input",
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
				id: 'node5',
				title: 'Node 5',
				pos: {
					left: 820,
					top: 440
				},
				inputs: [
					{
						"type": "input",
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

	






	nodeeditor1 = jsCow.get(jsCow.res.components.nodeeditor, {
		id: 'node-editor-1'
	}).target('#node-editor-1').run();
	
	nodeeditor2 = jsCow.get(jsCow.res.components.nodeeditor, {
		id: 'node-editor-2'
	}).target('#node-editor-2').run();


	




	$('body').append('<button>Set Options</button>');
	$('button').click(function() {

		console.clear();
		console.log('>>> set options');

		jsCow.find('node-editor-1').options(NodeEditorOptions1);
		jsCow.find('node-editor-2').options(NodeEditorOptions2);

	});
	
});	