
jsCow.res.components.node = function() { };
jsCow.res.components.node.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.node);
		this.addModel(jsCow.res.model.node);
		this.addView(jsCow.res.view.node);
		
		return this;
	},
	
	title: function(title) {
		
		if (typeof title !== 'undefined' && typeof title === 'string') {
			this.trigger('title', {
				title: title
			});
		}
		
		return this;
	}

};

jsCow.res.model.node = function() {
	
	this.data = {
		enabled: true,
		visible: true,
		title: ""
	};
	
};
jsCow.res.model.node.prototype = {

	init: function() {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.node = function() {
	
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jsc-node clearfix');
	this.dom.content = $('<div/>').addClass('jsc-node-content clearfix').appendTo(this.dom.main);
	
};
jsCow.res.view.node.prototype = {
	
	init: function(e) {
		
		// Title with arrow
		this.dom.titlebar = $('<div/>').addClass('jsc-node-titlebar');
		this.dom.title = $('<span/>').appendTo( this.dom.titlebar );
		this.dom.main.prepend( this.dom.titlebar );
		
		this.trigger("view.update", e.data);
	},
	
	update: function(e) {	
		
		if (e.data.enabled) {
			
			this.dom.main.removeClass('jsc-node-disabled').addClass('jsc-node');
			
			this.dom.title.html(e.data.title);
			
			if (e.data.visible) {
				this.dom.main.show();
			}else{
				this.dom.main.hide();
			}
			
		}else{
			
			this.dom.main.removeClass('jsc-node').addClass('jsc-node-disabled');
			
		}
	}
	
};

jsCow.res.controller.node = function() {};
jsCow.res.controller.node.prototype = {
	
	init: function() {
		this.on("model.ready", this.isModelReady);
		this.on("title", this.title);
	},
	
	isModelReady: function() {
		this.trigger("view.init", this.cmp().config());
	},
	
	title: function(e) {
		this.cmp().config({
			title: e.data.title
		});
	}
	
};
