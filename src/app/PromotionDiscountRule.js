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
					description: 'Defines all included items or categories for these condition.',
					config: [
						{
							"type": "jsCow.res.components.nodecheckbox",
							"value": [
								{ title: 'Enabled', value: true, selected: true}
							]
						},
						{
							"type": "jsCow.res.components.nodebutton",
							"title": "Select Inclutions..."
						}
					],
					inputs: [
						{}
					],
					outputs: [
						{}
					]
				},
				{
					title: 'Item Exclusions',
					description: 'Defines all included items or categories for these condition.',
					config: [
						{
							"type": "jsCow.res.components.nodecheckbox",
							"value": [
								{ title: 'Enabled', value: true, selected: true}
							]
						},
						{
							"type": "jsCow.res.components.nodebutton",
							"title": "Select Exclusions..."
						}
					],
					inputs: [
						{}
					],
					outputs: [
						{}
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
					description: 'Defines a discount item value off action for these promotion rule.',
					inputs: [
						{}
					],
					config: [
						{
							"type": "jsCow.res.components.nodecheckbox",
							"value": [
								{ title: 'Enabled', value: true, selected: true}
							]
						},
						{
							"type": "jsCow.res.components.nodeinput",
							"title": "Value ($)",
							"value": "19.95"
						},
						{
							"type": "jsCow.res.components.nodeinput",
							"title": "with min price ($)",
							"value": "0.00"
						},
						{
							"type": "jsCow.res.components.nodecheckbox",
							"title": "Overwrite Application Level Exclusions",
							"value": [
								{ title: 'Overwrite', value: true, selected: false}
							]
						}
					]
				}
			]
		}
	],
	nodes: [
		{
			title: 'Item Inclutions',
			id : 'itemcondition1',
			description: 'Defines all included items or categories for these condition.',
			pos: {
				left: 50,
				top: 50
			},
			config: [
				{
					"type": "jsCow.res.components.nodecheckbox",
					"value": [
						{ title: 'Enabled', value: true, selected: true}
					]
				},
				{
					"type": "jsCow.res.components.nodebutton",
					"title": "Select Inclutions..."
				}
			],
			inputs: [
				{
					id: "in1"
				}
			],
			outputs: [
				{
					id: "out1"
				}
			]
		},
		{
			title: 'Item Exclusions',
			id : 'itemcondition2',
			description: 'Defines all excluded items or categories for these condition.',
			pos: {
				left: 300,
				top: 50
			},
			config: [
				{
					"type": "jsCow.res.components.nodecheckbox",
					"value": [
						{ title: 'Enabled', value: true, selected: true}
					]
				},
				{
					"type": "jsCow.res.components.nodebutton",
					"title": "Select Inclutions..."
				}
			],
			inputs: [
				{
					id: "in1"
				}
			],
			outputs: [
				{
					id: "out1"
				}
			]
		},
		{
			title: 'Discount - Item Value Off',
			id: 'itemdiscount1',
			description: 'Defines a discount item value off action for these promotion rule.',
			pos: {
				left: 700,
				top: 150
			},
			inputs: [
				{
					id: "in1"
				}
			],
			config: [
				{
					"type": "jsCow.res.components.nodecheckbox",
					"value": [
						{ title: 'Enabled', value: true, selected: true}
					]
				},
				{
					"type": "jsCow.res.components.nodeinput",
					"title": "Value ($)",
					"value": "19.95"
				},
				{
					"type": "jsCow.res.components.nodeinput",
					"title": "with min price ($)",
					"value": "0.00"
				},
				{
					"type": "jsCow.res.components.nodecheckbox",
					"value": [
						{ title: 'Overwrite Application Level Exclusions', value: true, selected: false}
					]
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
