PromotionDiscountRule = {
	grid: 30,
	repositories: [
		{
			group: 'promotionconditions',
			title: 'Promotion Conditions',
			description: 'Create condition nodes in order to define, what discount is granted to users of the specified target group.',
			types: [
				{
					title: 'Item Condition',
					description: 'Item Inclutions/Exclutions',
					class: 'jsc-node-promotion-condition',
					config: [
						{
							"type": "jsCow.res.components.nodeinput",
							"title": "Config Input 1",
							"value": 1
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
					"type": "jsCow.res.components.nodebuttons",
					"title": "Inclutions",
					"value": 1
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
				left: 500,
				top: 150
			},
			config: [
				{
					"type": "jsCow.res.components.nodeinput",
					"value": "19.95"
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
				node: 'itemdiscount1',
				in: 'in1'
			}
		}
	]
};
