PromotionDiscountRule = {
	grid: 30,
	repositories: [
		{
			group: 'promotionrules',
			title: 'Promotion Rules',
			description: 'Create conditions in order to define, what discount is granted to users of the specified target group.',
			types: [
				{
					title: 'Item Condition',
					description: 'Item Inclutions/Exclutions',
					class: 'jsc-node-promotion-condition',
					config: [
						{
							"type": "jsCow.res.components.nodetypeinput",
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
				},
				{
					title: 'Item Discount',
					description: 'Item Value Off',
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
	nodes: [],
	connections: []
};
