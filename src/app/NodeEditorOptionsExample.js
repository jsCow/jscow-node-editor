NodeEditorOptionsExample = {
	grid: 30,
	repositories: [
		{
			group: 'general',
			title: 'General Nodes',
			description: 'General repository of node types.',
			types: [
				{
					title: 'Node Example',
					inputs: [
						{
							"id": "in1",
							"title": "Input Port 1"
						},
						{
							"id": "in2",
							"title": "Input Port 2"
						}
					],
					outputs: [
						{
							"id": "out1",
							"title": "Output Port 1"
						},
						{
							"id": "out2",
							"title": "Output Port 2"
						}
					],
					config: [
						{
						    "type": "jsCow.res.components.nodecheckbox",
						    "value": [
						        { title: 'Enabled', value: 1, selected: true}
						    ]
						}
					]
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
					"id": "in1",
					"title": "Input Port 1",
					"value": 1
				},
				{
					"id": "in2",
					"title": "Input Port 2",
					"value": 1
				}
			],
			outputs: [
				{
					"id": "out1",
					"title": "Output Port 1",
					"value": 1
				},
				{
					"id": "out2",
					"title": "Output Port 2",
					"value": 1
				},
				{
					"id": "out3",
					"title": "Output Port 3",
					"value": 1
				},
				{
					"id": "out4",
					"title": "Output Port 4",
					"value": 1
				},
				{
					"id": "out5",
					"title": "Output Port 5",
					"value": 1
				}
			],
			config: [
				{
				    "type": "jsCow.res.components.nodecheckbox",
				    "value": [
				        { title: 'Enabled', value: 1, selected: true}
				    ]
				}
			]
		},
		{
			id: 'node2',
			title: 'Node 2',
			pos: {
				left: 400,
				top: 30
			},
			inputs: [
				{
					"id": "in1",
					"title": "Input Port 1",
					"value": 1
				},
				{
					"id": "in2",
					"title": "Input Port 2",
					"value": 1
				},
				{
					"id": "in3",
					"title": "Input Port 3",
					"value": 1
				}
			],
			outputs: [
				{
					"id": "out1",
					"title": "Output Port 1",
					"value": 1
				},
				{
					"id": "out2",
					"title": "Output Port 2",
					"value": 1
				}
			],
			config: [
				{
				    "type": "jsCow.res.components.nodecheckbox",
				    "value": [
				        { title: 'Enabled', value: 1, selected: true}
				    ]
				}
			]
		},
		{
			id: 'node3',
			title: 'Node 3',
			pos: {
				left: 400,
				top: 300
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
			],
			config: [
				{
				    "type": "jsCow.res.components.nodecheckbox",
				    "value": [
				        { title: 'Enabled', value: 1, selected: true}
				    ]
				}
			]
		},
		{
			id: 'node4',
			title: 'Node 4',
			pos: {
				left: 400,
				top: 600
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
			],
			config: [
				{
				    "type": "jsCow.res.components.nodecheckbox",
				    "value": [
				        { title: 'Enabled', value: 1, selected: true}
				    ]
				}
			]
		},
		{
			id: 'node5',
			title: 'Node 5',
			pos: {
				left: 900,
				top: 200
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
				},
				{
					"id": "out2",
					"title": "Output Port 2",
					"value": 1
				},
				{
					"id": "out3",
					"title": "Output Port 3",
					"value": 1
				},
				{
					"id": "out4",
					"title": "Output Port 4",
					"value": 1
				}
			],
			config: [
				{
				    "type": "jsCow.res.components.nodecheckbox",
				    "value": [
				        { title: 'Enabled', value: 1, selected: true}
				    ]
				}
			]
		},
		{
			id: 'node6',
			title: 'Node 6',
			pos: {
				left: 900,
				top: 450
			},
			inputs: [
				{
					"id": "in1",
					"title": "Input Port 1",
					"value": 1
				},
				{
					"id": "in2",
					"title": "Input Port 2",
					"value": 1
				}
			],
			outputs: [
				{
					"id": "out1",
					"title": "Output Port 1",
					"value": 1
				},
				{
					"id": "out2",
					"title": "Output Port 2",
					"value": 1
				}
			],
			config: [
				{
				    "type": "jsCow.res.components.nodecheckbox",
				    "value": [
				        { title: 'Enabled', value: 1, selected: true}
				    ]
				}
			]
		},
		{
			id: 'node7',
			title: 'Node 7',
			description: 'Node with an optional decription in the top of the node.',
			pos: {
				left: 1500,
				top: 250
			},
			inputs: [
				{
					"id": "in1",
					"title": "Input Port 1"
				},
				{
					"id": "in2",
					"title": "Input Port 2"
				},
				{
					"id": "in3",
					"title": "Input Port 3"
				}
			],
			outputs: [],
			config: [
				{
					"type": "jsCow.res.components.nodecheckbox",
					"value": [
						{ title: 'Enabled', value: true, selected: true}
					]
				},
				{
					"type": "jsCow.res.components.nodebutton",
					"title": "Button"
				},
				{
					"type": "jsCow.res.components.nodebutton",
					"title": "Button"
				},
				{
				    "type": "jsCow.res.components.nodeinput",
				    "title": "Your input field",
				    "value": "179.99"
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
				    "type": "jsCow.res.components.nodedropdown",
				    "title": "Select Page",
				    "value": [
				        { title: 'Option 1', value: 1, selected: true},
				        { title: 'Option 2', value: 2},
				        { title: 'Option 3', value: 3}
				    ]
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
				out: 'out3'
			},
			to: {
				node: 'node3',
				in: 'in1'
			}
		},
		{
			from: {
				node: 'node1',
				out: 'out4'
			},
			to: {
				node: 'node4',
				in: 'in1'
			}
		},
		{
			from: {
				node: 'node2',
				out: 'out2'
			},
			to: {
				node: 'node5',
				in: 'in1'
			}
		},
		{
			from: {
				node: 'node3',
				out: 'out1'
			},
			to: {
				node: 'node6',
				in: 'in1'
			}
		},
		{
			from: {
				node: 'node2',
				out: 'out2'
			},
			to: {
				node: 'node5',
				in: 'in1'
			}
		},
		{
			from: {
				node: 'node4',
				out: 'out1'
			},
			to: {
				node: 'node6',
				in: 'in2'
			}
		},
		{
			from: {
				node: 'node5',
				out: 'out1'
			},
			to: {
				node: 'node7',
				in: 'in1'
			}
		},
		{
			from: {
				node: 'node5',
				out: 'out2'
			},
			to: {
				node: 'node7',
				in: 'in2'
			}
		},
		{
			from: {
				node: 'node5',
				out: 'out3'
			},
			to: {
				node: 'node7',
				in: 'in3'
			}
		},
		{
			from: {
				node: 'node6',
				out: 'out1'
			},
			to: {
				node: 'node7',
				in: 'in1'
			}
		},
		{
			from: {
				node: 'node6',
				out: 'out2'
			},
			to: {
				node: 'node7',
				in: 'in2'
			}
		}
	]
};
