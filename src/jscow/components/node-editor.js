
jsCow.res.components.nodeeditor = function() { };
jsCow.res.components.nodeeditor.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.nodeeditor);
		this.addModel(jsCow.res.model.nodeeditor);
		this.addView(jsCow.res.view.nodeeditor);
		
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

jsCow.res.model.nodeeditor = function() {
	
	this.data = {
		enabled: true,
		visible: true
	};
	
};
jsCow.res.model.nodeeditor.prototype = {

	init: function() {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.nodeeditor = function() {
	
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jsc-nodeeditor clearfix');
	this.dom.content = $('<div/>').addClass('jsc-nodeeditor-content clearfix').appendTo(this.dom.main);

};
jsCow.res.view.nodeeditor.prototype = {
	
	init: function(e) {

		// Create the base svg canvas element by "D3.js"
		this.dom.svg = d3.select(this.dom.content[0]).append("svg:svg").attr("width", "100%").attr("height", "100%");

		this.trigger("view.update", e.data);

	},
	
	update: function(e) {	
		
		if (e.data.enabled) {
			
			this.dom.main.removeClass('jsc-nodeeditor-disabled').addClass('jsc-nodeeditor');
			
			this.dom.svg.append("path").attr("d","M 0 60 L 50 110 L 90 70 L 140 100");


			if (e.data.visible) {
				this.dom.main.show();
			}else{
				this.dom.main.hide();
			}
			
		}else{
			
			this.dom.main.removeClass('jsc-nodeeditor').addClass('jsc-nodeeditor-disabled');
			
		}
	}
	
};

jsCow.res.controller.nodeeditor = function() {};
jsCow.res.controller.nodeeditor.prototype = {
	
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
