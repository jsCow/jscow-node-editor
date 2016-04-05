$(function() {

	//jsCow.debug.events = true;

	console.time('all');

	nodeDefinitionExamples = {
		group: 'examples',
		title: 'Nodes Examples',
		description: 'Example repository of node definitions.',
		types: [
			{
				title: 'Example - Typical node',
				description: 'Standard node with an input and output port.',
				inputs: [
					{
						"id": "in1",
						"title": "Input Port 1"
					}
				],
				outputs: [
					{
						"id": "out1",
						"title": "Output Port 1"
					}
				]
			},
			{
				title: 'Example - Multiple Ports',
				description: 'Node with more then one input and output port.',
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
					},
					{
						"id": "in4",
						"title": "Input Port 4"
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
				]
			},
			{
				title: 'Example - Node Configurations',
				description: 'Node with general configurations.',
				inputs: [
					{
						"id": "in1",
						"title": "Input Port 1"
					}
				],
				outputs: [
					{
						"id": "out1",
						"title": "Output Port 1"
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
					        { title: 'Homepage', value: 1, selected: true},
					        { title: 'Category 1', value: 2},
					        { title: 'Category 2', value: 3}
					    ]
					}
				]
			},
			{
				title: 'Example - Node Port Configurations',
				description: 'Node with port configurations.',
				inputs: [
					{
						"id": "in1",
						"title": "Input Port 1"
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
						"id": "in3",
						"title": "Input Port 3"
					}
				],
				outputs: [
					{
						"id": "out1",
						"title": "Output Port 1"
					},
					{
					    "type": "jsCow.res.components.nodeinput",
					    "title": "Output Port Title",
					    "value": "19.95"
					},
					{
						"id": "out3",
						"title": "Output Port 3"
					}
				]
			},
			{
				title: 'Example - Node All Configurations',
				description: 'Node with all possible configurations.',
				inputs: [
					{
						"id": "in1",
						"title": "Input Port 1"
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
						"id": "in3",
						"title": "Input Port 3"
					}
				],
				outputs: [
					{
						"id": "out1",
						"title": "Output Port 1"
					},
					{
					    "type": "jsCow.res.components.nodeinput",
					    "title": "Output Port Title",
					    "value": "19.95"
					},
					{
						"id": "out3",
						"title": "Output Port 3"
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
					        { title: 'Homepage', value: 1, selected: true},
					        { title: 'Category 1', value: 2},
					        { title: 'Category 2', value: 3}
					    ]
					}
				]
			}
		]
	};


	nodeeditor1 = jsCow.get(jsCow.res.components.nodeeditor, {
		id: 'node-editor-1',
		model: {
			options: {
				autosave: true
			}
		}
	}).on('editor.options.changed', function(e) {
		console.log(e.sender.id()+" >>> changed >>>", e.data);
	}).target('#node-editor-1').run();

	nodeeditor2 = jsCow.get(jsCow.res.components.nodeeditor, {
		id: 'node-editor-2'
	}).on('editor.options.changed', function(e) {
		console.log(e.sender.id()+" >>> changed >>>", e.data);
	}).target('#node-editor-2').run();


	$('<button>Promo Rule</button>').click(function() {
		jsCow.find('node-editor-1').options(PromotionDiscountRule);
	}).appendTo('body');
	
	$('<button>Checkout Process</button>').click(function() {
		jsCow.find('node-editor-1').options(CheckoutProcess);
	}).appendTo('body');
	
	$('<button>Connector</button>').click(function() {
		jsCow.find('node-editor-1').options(Connector);
	}).appendTo('body');
	


	
	$('<button>Example Repo (1)</button>').click(function() {
		jsCow.find('node-editor-1').addNodesRepository(nodeDefinitionExamples);
	}).appendTo('body');

	$('<button>Example Repo (2)</button>').click(function() {
		jsCow.find('node-editor-2').addNodesRepository(nodeDefinitionExamples);
	}).appendTo('body');





	

	$('<button>Reset (Editor 1)</button>').click(function() {
		jsCow.find('node-editor-1').reset();
	}).appendTo('body');

	$('<button>Reset (Editor 2)</button>').click(function() {
		jsCow.find('node-editor-2').reset();
	}).appendTo('body');
	

	console.timeEnd('all');
	console.log(jsCow.componentsObjectList.length, "components created...");
	
});