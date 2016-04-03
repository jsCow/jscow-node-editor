$(function() {

	//jsCow.debug.events = true;

	console.time('all');



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
	


	
	$('<button>Example Repo</button>').click(function() {
		jsCow.find('node-editor-1').addNodesRepository({
			group: 'general',
			title: 'General Nodes',
			description: 'General repository of node types.',
			types: [
				{
					title: 'Node 1',
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
					title: 'Node 2',
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
					]
				}
			]
		});
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