
jsCow.res.components.nodeeditor = function() { };
jsCow.res.components.nodeeditor.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.nodeeditor);
		this.addModel(jsCow.res.model.nodeeditor);
		this.addView(jsCow.res.view.nodeeditor);
		
		return this;
	},

	options: function(options) {

		if (typeof options !== 'undefined' && typeof options === 'object') {
			this.trigger('options', {
				options: options
			});
		}
		
		return this;

	}

};

jsCow.res.model.nodeeditor = function() {
	
	this.data = {
		enabled: true,
		visible: true,
		options: {
			nodes: []
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
			nodes: []
		}
	};

	this.contentSize = {
		width: 0,
		height: 0
	};

};
jsCow.res.view.nodeeditor.prototype = {
	
	init: function(e) {

		// Register all event listener
		this.on("view.update.nodes", this.updateNodes);
		this.on('update.content.size', this.updateContentSize);

		// Bind the jquery plugin 'kinetic' on the grid area
		this.dom.grid.kinetic();

		// Create the base svg canvas element by "D3.js"
		this.dom.svg = d3.select(this.dom.content[0])
			.append("svg:svg")
			.attr("width", "100%")
			.attr("height", "100%");
		
		// Trigger the view update event	
		this.trigger("view.update", e.data);

	},
	
	update: function(e) {
		
		if (e.data.enabled) {
			
			this.dom.main.removeClass('jsc-nodeeditor-disabled').addClass('jsc-nodeeditor');

			/*
			if (this.dom.svg && this.dom.svg.append !== 'undefined') {
				this.dom.svg.append("path").attr("d","M 0 60 L 50 110 L 90 70 L 140 100");
			}
			*/
			
			if (e.data.visible) {
				this.dom.main.show();
			}else{
				this.dom.main.hide();
			}
			
		}else{
			
			this.dom.main.removeClass('jsc-nodeeditor').addClass('jsc-nodeeditor-disabled');
			
		}
	},

	updateNodes: function(e) {
		
		$(this.cmp().children()).each((function(that) {
			return function(i, c) {
				c.del();
			};
		})(this));
		
		this.config.options.nodes = [];
		
		$(e.data.options.nodes).each((function(that) {
			return function(i, nodeOptions) {

				if (!that.config.options.nodes[nodeOptions.id]) {
					
					// Render all nodes
					that.config.options.nodes[nodeOptions.id] = that.cmp().append(
						jsCow.get(jsCow.res.components.node, {
							//id: that.cmp().id() + '-' + nodeOptions.id,
							model: nodeOptions
						}).on('drag.stop', function(e) {
							
							// Update content size
							that.trigger(
								'update.content.size', 
								e.sender
							);

						})

					);

				}

			};
		})(this));

	},

	updateContentSize: function(e) {

		var node = e.sender;
		var nodePos = node.config().pos;
		
		if (nodePos.left > this.contentSize.width) {
			this.contentSize.width = parseInt(nodePos.left + 0);
		}
		
		if (nodePos.top > this.contentSize.height) {
			this.contentSize.height = parseInt(nodePos.top + 0);
		}

		this.dom.content.css({
			width: this.contentSize.width,
			height: this.contentSize.height
		});

	}
		
};

jsCow.res.controller.nodeeditor = function() {};
jsCow.res.controller.nodeeditor.prototype = {
	
	init: function() {
		this.on("model.ready", this.isModelReady);
		this.on("options", this.options);
	},
	
	isModelReady: function() {
		this.trigger(
			"view.init", 
			this.cmp().config()
		);
	},
	
	options: function(e) {
		
		this.cmp().config({
			options: e.data.options
		});

		// Render all nodes
		this.trigger("view.update.nodes", e.data);

	}

};
