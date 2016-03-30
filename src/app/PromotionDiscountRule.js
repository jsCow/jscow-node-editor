PromotionDiscountRule = {
	grid: 30,
	repositories: [
		{
			group: 'promotionconditions',
			title: 'Promotion Conditions',
			description: 'Create condition nodes in order to define, what discount is granted to users of the specified target group.',
			types: [
				{
					title: 'Item Inclutions',
					class: 'jsc-node-promotion-condition',
					config: [
						{
							"type": "jsCow.res.components.nodebutton",
							"title": "Select Inclutions..."
						}
					],
					inputs: [
						{
							"type": false,
							"id": "in1",
							"value": 1
						}
					],
					outputs: [
						{
							"type": false,
							"id": "out1",
							"value": 1
						}
					]
				},
				{
					title: 'Item Exclusions',
					class: 'jsc-node-promotion-condition',
					config: [
						{
							"type": "jsCow.res.components.nodebutton",
							"title": "Select Exclusions..."
						}
					],
					inputs: [
						{
							"type": false,
							"id": "in1",
							"value": 1
						}
					],
					outputs: [
						{
							"type": false,
							"id": "out1",
							"value": 1
						}
					]
				}
			]
		},
		{
			group: 'promotionactions',
			title: 'Promotion Actions',
			description: 'Create actions in order to define, what discount is granted to users of the specified target group.',
			types: [
				{
					title: 'Discount - Item Value Off',
					class: 'jsc-node-promotion-action',
					inputs: [
						{
							"type": false,
							"id": "in1",
							"value": 1
						}
					]
				}
			]
		}
	],
	nodes: [
		{
			id: 'itemcondition1',
			title: 'Item Inclutions',
			class: 'jsc-node-promotion-condition',
			pos: {
				left: 50,
				top: 50
			},
			config: [
				{
					"type": "jsCow.res.components.nodebutton",
					"title": "Select Inclutions...",
					"events": {
						"click": function(e) {
							alert("click...");
							//this.trigger('node.config.changed');
						}
					}
				},
				{
					"type": "jsCow.res.components.noderadio",
					"title": "Radios",
					"value": [
						{ title: 'Radio 1', value: 1},
						{ title: 'Radio 2', value: 2},
						{ title: 'Radio 4', value: 4, selected: true}
					]
				},
				{
					"type": "jsCow.res.components.nodedropdown",
					"title": "Select Option",
					"value": [
						{ title: 'Option 1', value: 1},
						{ title: 'Option 2', value: 2, selected: true},
						{ title: 'Option 3', value: 3},
						{ title: 'Option 4', value: 4}
					]
				},
				{
					"type": "jsCow.res.components.nodecheckbox",
					"title": "Enable",
					"value": 1,
					"checked": true
				}
			],
			inputs: [
				{
					"type": false,
					"title": "Title",
					"id": "in1",
					"value": 1
				},
				{
					"type": "jsCow.res.components.noderadio",
					"value": [
						{ title: 'Radio 1', value: 1},
						{ title: 'Radio 2', value: 2, selected: true},
						{ title: 'Radio 3', value: 3}
					]
				},
				{
					"type": "jsCow.res.components.nodecheckbox",
					"title": "Enable",
					"value": 1,
					"checked": false
				}
			],
			outputs: [
				{
					"type": "jsCow.res.components.nodedropdown",
					"id": "out1",
					"value": [
						{ title: 'Option 1', value: 1},
						{ title: 'Option 2', value: 2, selected: true},
						{ title: 'Option 3', value: 3},
						{ title: 'Option 4', value: 4}
					]
				},
				{
					"type": "jsCow.res.components.noderadio",
					"title": "Radios",
					"value": [
						{ title: 'Radio 2', value: 2},
						{ title: 'Radio 3', value: 3, selected: true},
						{ title: 'Radio 4', value: 4}
					]
				},
				{
					"type": "jsCow.res.components.nodecheckbox",
					"title": "Enable",
					"value": 1,
					"checked": true
				}
			]
		},
		{
			id: 'itemcondition2',
			title: 'Item Exclusions',
			class: 'jsc-node-promotion-condition',
			pos: {
				left: 300,
				top: 50
			},
			config: [
				{
					"type": "jsCow.res.components.nodebutton",
					"title": "Select Exclusions..."
				}
			],
			inputs: [
				{
					"type": false,
					"id": "in1",
					"value": 1
				}
			],
			outputs: [
				{
					"type": false,
					"id": "out1",
					"value": 1
				}
			]
		},
		{
			id: 'itemdiscount1',
			title: 'Discount - Item Value Off',
			class: 'jsc-node-promotion-action',
			pos: {
				left: 700,
				top: 250
			},
			config: [
				{
					"type": "jsCow.res.components.nodeinput",
					"title": "Value ($)",
					"value": "19.95"
				},
				{
					"type": "jsCow.res.components.nodeinput",
					"title": "with min price ($)",
					"value": "0.00"
				}
			],
			inputs: [
				{
					"type": false,
					"id": "in1",
					"value": 1
				}
			]
		}
	],
	connections: [
		{
			from: {
				node: 'itemcondition1',
				out: 'out1'
			},
			to: {
				node: 'itemcondition2',
				in: 'in1'
			}
		},
		{
			from: {
				node: 'itemcondition2',
				out: 'out1'
			},
			to: {
				node: 'itemdiscount1',
				in: 'in1'
			}
		}
	]
};
