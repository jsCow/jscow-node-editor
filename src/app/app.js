$(function() {

	console.time('all');

	/*
	 * Init your editor component instance
	 */
	jsCow.get(jsCow.res.components.nodeeditor, {
		id: 'myEditorInstanceId',
		options: NodeEditorOptionsExample,
		model: {
			options: {
				autosave: true
			}
		}
	}).on('editor.options.changed', function(e) {
		console.log(e.sender.id()+" >>> changed >>>", e.data);
	}).target('#myEditor').run();
	
	/*
	 * Actions and Examples
	 */
	$('<button>Set Node Definitions</button>').click(function() {
		jsCow.find('myEditorInstanceId').addNodesRepository(NodeDefinitionExamples);
	}).appendTo('body');

	$('<button>Promo Rule</button>').click(function() {
		jsCow.find('myEditorInstanceId').options(PromotionDiscountRuleExample);
	}).appendTo('body');
	
	$('<button>Checkout Process</button>').click(function() {
		jsCow.find('myEditorInstanceId').options(CheckoutProcessExample);
	}).appendTo('body');
	
	$('<button>Connector</button>').click(function() {
		jsCow.find('myEditorInstanceId').options(ConnectorExample);
	}).appendTo('body');
	
	$('<button>Reset</button>').click(function() {
		jsCow.find('myEditorInstanceId').reset();
	}).appendTo('body');
	

	console.timeEnd('all');
	console.log(jsCow.componentsObjectList.length, "components created...");
	
});