$(function() {

	console.time('all');

	/*
	 * Init your editor component instance
	 */
	jsCow.get(jsCow.res.components.nodeeditor, {
		id: 'myEditorInstance',
		options: NodeEditorOptionsExample,
		model: {
			options: {
				autosave: true
			}
		}
	}).on('editor.options.changed', function(e) {
		console.log(e.sender.id()+" >>> changed >>>", e.data);
	}).target('#myEditorInstance').run();


	/*
	 * Actions and Examples
	 */
	$('<button>Set Node Definitions</button>').click(function() {
		jsCow.find('myEditorInstance').addNodesRepository(NodeDefinitionExamples);
	}).appendTo('body');

	$('<button>Promo Rule</button>').click(function() {
		jsCow.find('myEditorInstance').options(PromotionDiscountRuleExample);
	}).appendTo('body');
	
	$('<button>Checkout Process</button>').click(function() {
		jsCow.find('myEditorInstance').options(CheckoutProcessExample);
	}).appendTo('body');
	
	$('<button>Connector</button>').click(function() {
		jsCow.find('myEditorInstance').options(ConnectorExample);
	}).appendTo('body');
	
	$('<button>Reset</button>').click(function() {
		jsCow.find('myEditorInstance').reset();
	}).appendTo('body');
	

	console.timeEnd('all');
	console.log(jsCow.componentsObjectList.length, "components created...");
	
});