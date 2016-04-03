CheckoutProcess = {
	grid: 30,
	repositories: [],
	nodes: [
		{
			title: 'Addresses',
			id : 'stepAddress',
			class: 'node-checkout-step',
			description: 'Defines the addresses step in the checkout process.',
			pos: {
				left: 50,
				top: 50
			},
			config: [],
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
			title: 'Shipping Methods',
			id : 'stepShipping',
			class: 'node-checkout-step',
			description: 'Defines the shipping methods step in the checkout process.',
			pos: {
				left: 350,
				top: 50
			},
			config: [],
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
			title: 'Payment Methods',
			id : 'stepPayment',
			class: 'node-checkout-step',
			description: 'Defines the payment methods step in the checkout process.',
			pos: {
				left: 650,
				top: 50
			},
			config: [],
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
			title: 'Review',
			id : 'stepReview',
			class: 'node-checkout-step',
			description: 'Defines the review step in the checkout process.',
			pos: {
				left: 950,
				top: 200
			},
			config: [
				{
				    "type": "jsCow.res.components.nodecheckbox",
				    "value": [
				        { title: 'Confirm AGB', value: 1, selected: true}
				    ]
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
			title: 'Order Confirmation',
			id : 'stepOrderConfirm',
			class: 'node-checkout-step',
			description: 'Defines the order confirmation step in the checkout process.',
			pos: {
				left: 1250,
				top: 200
			},
			config: [
				{
				    "type": "jsCow.res.components.nodecheckbox",
				    "value": [
				        { title: 'Email', value: 1, selected: true},
				        { title: 'Archiv', value: 2, selected: true},
				        { title: 'Auto-Redirect', value: 3}
				    ]
				},
				{
				    "type": "jsCow.res.components.nodeinput",
				    "title": "Auto-Redirect after",
				    "value": "7 sec"
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
			title: 'Link to page',
			id : 'linkToPage',
			class: 'node-checkout-step',
			description: 'Defines a target page after the checkout process.',
			pos: {
				left: 1550,
				top: 200
			},
			config: [
				{
				    "type": "jsCow.res.components.nodedropdown",
				    "title": "Select Page",
				    "value": [
				        { title: 'Homepage', value: 1, selected: true},
				        { title: 'Category 1', value: 2},
				        { title: 'Category 2', value: 3}
				    ]
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
		}
	],
	connections: [
		{
			from: {
				node: 'stepAddress',
				out: 'out1'
			},
			to: {
				node: 'stepShipping',
				in: 'in1'
			}
		},
		{
			from: {
				node: 'stepShipping',
				out: 'out1'
			},
			to: {
				node: 'stepPayment',
				in: 'in1'
			}
		},
		{
			from: {
				node: 'stepPayment',
				out: 'out1'
			},
			to: {
				node: 'stepReview',
				in: 'in1'
			}
		},
		{
			from: {
				node: 'stepReview',
				out: 'out1'
			},
			to: {
				node: 'stepOrderConfirm',
				in: 'in1'
			}
		},
		{
			from: {
				node: 'stepOrderConfirm',
				out: 'out1'
			},
			to: {
				node: 'linkToPage',
				in: 'in1'
			}
		}
	]
};
