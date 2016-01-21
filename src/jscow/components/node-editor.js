
jsCow.res.components.nodeeditor = function() { };
jsCow.res.components.nodeeditor.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.nodeeditor);
		this.addModel(jsCow.res.model.nodeeditor);
		this.addView(jsCow.res.view.nodeeditor);
		
		return this;
	}

};

jsCow.res.model.nodeeditor = function() {
	
	this.data = {
		enabled: true,
		visible: true,
		options: {
			nodes: [

			]
		}
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
	this.dom.grid = $('<div/>').addClass('jsc-nodeeditor-grid clearfix').appendTo(this.dom.main);
	this.dom.content = $('<div/>').addClass('jsc-nodeeditor-content clearfix').appendTo(this.dom.grid);

	this.config = {
		options: {
			nodes: {
				test: 123
			}
		}
	};

};
jsCow.res.view.nodeeditor.prototype = {
	
	init: function(e) {

		this.on("view.nodes.render", this.viewNodesRender);

		this.dom.grid.kinetic();

		// Create the base svg canvas element by "D3.js"
		this.dom.svg = d3.select(this.dom.content[0])
			.append("svg:svg")
			.attr("width", "100%")
			.attr("height", "100%");
			
		this.trigger("view.update", e.data);

	},
	
	update: function(e) {
		
		if (e.data.enabled) {
			
			this.dom.main.removeClass('jsc-nodeeditor-disabled').addClass('jsc-nodeeditor');

			// Render all nodes
			this.trigger("view.nodes.render", e.data);

			if (this.dom.svg && this.dom.svg.append !== 'undefined') {
				this.dom.svg.append("path").attr("d","M 0 60 L 50 110 L 90 70 L 140 100");
			}
			
			if (e.data.visible) {
				this.dom.main.show();
			}else{
				this.dom.main.hide();
			}
			
		}else{
			
			this.dom.main.removeClass('jsc-nodeeditor').addClass('jsc-nodeeditor-disabled');
			
		}
	},

	viewNodesRender: function(e) {
		
		$.each(e.data.options.nodes, (function(that) {
			return function(i, nodeOptions) {

				if (!that.config.options.nodes[nodeOptions.id]) {
					that.config.options.nodes[nodeOptions.id] = that.cmp().append(
						jsCow.get(jsCow.res.components.node, {
							model: nodeOptions
						})
					);
				}

			};
		})(this));

	}
		
};

jsCow.res.controller.nodeeditor = function() {};
jsCow.res.controller.nodeeditor.prototype = {
	
	init: function() {
		this.on("model.ready", this.isModelReady);
	},
	
	isModelReady: function() {
		this.trigger("view.init", this.cmp().config());
	}

};
