$(function(){

	//jsCow.debug.events =  true;

	nodeeditor = jsCow.get(jsCow.res.components.nodeeditor, {
		model: {
			options: {
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
			}
		}
	}).update().run();

	/*
	node1 = jsCow.get(jsCow.res.components.node, { 
		model: {
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
				}
			]
		}
	}).run();
	*/

});	