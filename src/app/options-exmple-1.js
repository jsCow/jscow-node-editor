NodeEditorOptions1 = {
	grid: 30,
	repositories: [
		{
			group: 'general',
			title: 'General Nodes',
			description: 'General repository of node types.',
			types: [
				{
					title: 'Node 1/1',
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
					title: 'Muh Node',
					inputs: [],
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
					title: 'Test Node',
					inputs: [
						{
							"type": false,
							"id": "in1",
							"title": "Input Port 1",
							"value": 1
						}
					],
					outputs: []
				}
			]
		}
	],
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


Test = {
	grid: 20,
	nodes: [
		{
			id: 'node1',
			title: 'Example - Typical node',
			description: 'Standard node with an input and output port.',
			pos: {
				top: 20,
				left: 20
			},
			inputs: [
				
			],
			outputs: [
				{
					"id": "out1",
					"title": "Output Port 1"
				}
			]
		},
		{
			id: 'node2',
			title: 'Example - Multiple Ports',
			description: 'Node with more then one input and output port.',
			pos: {
				top: 20,
				left: 400
			},
			inputs: [
				{
					"id": "in1",
					"title": "Input Port 1"
				},
				{
					"id": "in2",
					"type": "jsCow.res.components.nodecheckbox",
					"value": [
						{ title: 'Enabled', value: true, selected: true}
					]
				},
				{
					"id": "in3",
					"type": "jsCow.res.components.nodecheckbox",
					"value": [
						{ title: 'Check 1', value: true},
						{ title: 'Check 2', value: true, selected: true},
						{ title: 'Check 3', value: true}
					]
				},
				{
					"type": "jsCow.res.components.nodecheckbox",
					"value": [
						{ title: 'Check 1', value: true},
						{ title: 'Check 2', value: true, selected: true},
						{ title: 'Check 3', value: true}
					]
				},
				{
				    "id": "in4",
					"type": "jsCow.res.components.nodedropdown",
				    "title": "Select Page",
				    "value": [
				        { title: 'Homepage', value: 1, selected: true},
				        { title: 'Category 1', value: 2},
				        { title: 'Category 2', value: 3}
				    ]
				},
				{
					"id": "in5",
					"title": "Input Port 1"
				},
				{
					"id": "in6",
					"title": "Input Port 1"
				}
			],
			outputs: []
		}
	],
	connections: [
		{
			from: {
				node: 'node1_',
				out: 'out1'
			},
			to: {
				node: 'node2',
				in: 'in1'
			}
		}
	]
};
