
jsCow.res.components.nodebuttons = function() { };
jsCow.res.components.nodebuttons.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.nodebuttons);
		this.addModel(jsCow.res.model.nodebuttons);
		this.addView(jsCow.res.view.nodebuttons);
		
		return this;
	}

};

jsCow.res.model.nodebuttons = function() {
	
	this.data = {
		enabled: true,
		visible: true,
		value: null
	};
	
};
jsCow.res.model.nodebuttons.prototype = {

	init: function() {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.nodebuttons = function() {
	
	this.dom = {};
	this.dom.main = $('<input type="button" value="" />')
		.addClass('jsc-node-type-button');
	
	/*this.dom.content = $('<div/>')
		.addClass('jsc-node-type-button-content')
		.appendTo(this.dom.main);
	*/

};
jsCow.res.view.nodebuttons.prototype = {
	
	init: function(e) {
		var self = this;

		/*
		this.dom.content
			.on('click', function(e) {
				
				e.stopPropagation();
				e.preventDefault();

			}).on('change', function(e) {
				
				self.cmp().config({
					value: self.dom.content.val()
				});
				self.trigger('node.config.changed');

			});
		*/

		this.trigger("view.update", e.data);
		
	},
	
	update: function(e) {	
		
		if (e.data.enabled) {
			
			this.dom.main.removeClass('jsc-node-type-button-disabled').addClass('jsc-node-type-button');
			
			// ...
			
			if (e.data.visible) {
				this.dom.main.show();
			}else{
				this.dom.main.hide();
			}
			
		}else{
			
			this.dom.main.removeClass('jsc-node-type-button').addClass('jsc-node-type-button-disabled');
			
		}
	}
	
};

jsCow.res.controller.nodebuttons = function() {};
jsCow.res.controller.nodebuttons.prototype = {
	
	init: function() {
		this.on("model.ready", this.isModelReady);
		this.on("title", this.title);
	},
	
	isModelReady: function() {
		this.trigger("view.init", this.cmp().config());
	}

};
