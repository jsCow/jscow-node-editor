ConnectorExample = {
	grid: 30,
	repositories: [],
	nodes: [
		{
			title: 'Source - CSV',
			id : 'source',
			description: 'Shows all columns of the CSV file.',
			pos: {
				left: 50,
				top: 50
			},
			config: [],
			inputs: [],
			outputs: [
				{ id: "out1", title: "column1"},
				{ id: "out2", title: "column2"},
				{ id: "out3", title: "column3"},
				{ id: "out4", title: "column4"},
				{ id: "out5", title: "column5"},
				{ id: "out6", title: "column6"},
				{ id: "out7", title: "column7"},
				{ id: "out8", title: "column8"}
			]
		},
		{
			title: 'Target - Database',
			id : 'target',
			description: 'Shows all columns of the target.',
			pos: {
				left: 800,
				top: 50
			},
			config: [],
			inputs: [
				{ id: "in1", title: "target column1"},
				{ id: "in2", title: "target column2"},
				{ id: "in3", title: "target column3"},
				{ id: "in4", title: "target column4"},
				{ id: "in5", title: "target column5"},
				{ id: "in6", title: "target column6"},
				{ id: "in7", title: "target column7"},
				{ id: "in8", title: "target column8"},
				{ id: "in9", title: "target column9"},
				{ id: "in10", title: "target column10"},
				{ id: "in11", title: "target column11"},
				{ id: "in12", title: "target column12"}
			],
			outputs: []
		}
	],
	connections: [
		{
			from: {
				node: 'source',
				out: 'out1'
			},
			to: {
				node: 'target',
				in: 'in1'
			}
		},
		{
			from: {
				node: 'source',
				out: 'out2'
			},
			to: {
				node: 'target',
				in: 'in2'
			}
		},
		{
			from: {
				node: 'source',
				out: 'out3'
			},
			to: {
				node: 'target',
				in: 'in3'
			}
		},
		{
			from: {
				node: 'source',
				out: 'out4'
			},
			to: {
				node: 'target',
				in: 'in7'
			}
		},
		{
			from: {
				node: 'source',
				out: 'out5'
			},
			to: {
				node: 'target',
				in: 'in10'
			}
		},
		{
			from: {
				node: 'source',
				out: 'out6'
			},
			to: {
				node: 'target',
				in: 'in5'
			}
		},
		{
			from: {
				node: 'source',
				out: 'out7'
			},
			to: {
				node: 'target',
				in: 'in11'
			}
		},
		{
			from: {
				node: 'source',
				out: 'out8'
			},
			to: {
				node: 'target',
				in: 'in9'
			}
		}
	]
};
