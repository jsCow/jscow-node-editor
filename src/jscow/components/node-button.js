
jsCow.res.components.nodebutton = function() { };
jsCow.res.components.nodebutton.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.nodebutton);
		this.addModel(jsCow.res.model.nodebutton);
		this.addView(jsCow.res.view.nodebutton);
		
		return this;
	}

};

jsCow.res.model.nodebutton = function() {
	
	this.data = {
		enabled: true,
		visible: true,
		value: null,
		click: null
	};
	
};
jsCow.res.model.nodebutton.prototype = {

	init: function() {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.nodebutton = function() {
	
	this.dom = {};
	this.dom.main = $('<button/>')
		.addClass('jsc-node-button');
	
	/*this.dom.content = $('<div/>')
		.addClass('jsc-node-button-content')
		.appendTo(this.dom.main);
	*/

};
jsCow.res.view.nodebutton.prototype = {
	
	init: function(e) {
		var self = this;

		if (typeof e.data.events === 'object') {

			for (var event in e.data.events) {
				
				if (typeof e.data.events[event] === 'function') {
					
					//this.dom.main.on(event, e.data.events[event]);
					
					this.dom.main.on(event, (function(self, m){
						return function() {
							m.apply( self, arguments);
						};
					})(self.cmp(), e.data.events[event]));
					
				}

			}

		}

		this.trigger("view.update", e.data);
		
	},
	
	update: function(e) {
		
		if (e.data.enabled) {
			
			this.dom.main.removeClass('jsc-node-button-disabled').addClass('jsc-node-button');
			
			if (e.data.title) {
				this.dom.main.html(e.data.title);
			}

			if (e.data.visible) {
				this.dom.main.show();
			}else{
				this.dom.main.hide();
			}
			
		}else{
			
			this.dom.main.removeClass('jsc-node-button').addClass('jsc-node-button-disabled');
			
		}
	}
	
};

jsCow.res.controller.nodebutton = function() {};
jsCow.res.controller.nodebutton.prototype = {
	
	init: function() {
		this.on("model.ready", this.isModelReady);
		this.on("title", this.title);
		this.on("click", this.click);
	},
	
	isModelReady: function() {
		this.trigger("view.init", this.cmp().config());
	}

};
