
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
	
	// Represents the view configuration
	this.config = {
		contentSize: {
			width: null,
			height: null
		},
		grid: {
			data: []
		}
	};
	
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jsc-nodeeditor clearfix');
	this.dom.grid = $('<div/>').addClass('jsc-nodeeditor-grid clearfix').appendTo(this.dom.main);
	this.dom.content = $('<div/>').addClass('jsc-nodeeditor-content clearfix').appendTo(this.dom.grid);

};
jsCow.res.view.nodeeditor.prototype = {
	
	init: function(e) {

		// Register all event listener
		this.on("update.editor.options", this.updateNodes);
		this.on("update.editor.grid", this.updateGrid);
		this.on('update.content.size', this.updateContentSize);
		this.on('update.node.options', this.updateNodeOptions);

		$(window).resize((function(self) {
			return function() {
				
				// Update content size
				self.trigger('update.content.size');

			};
		})(this));

		// Bind the jquery plugin 'kinetic' on the grid area
		this.dom.grid.kinetic();

		// Create the base svg canvas element by "D3.js"
		this.dom.svggrid = d3.select(this.dom.content[0])
			.append("svg:svg")
			.attr("width", "100%")
			.attr("height", "100%");

		// Trigger the view update event	
		this.trigger("view.update", e.data);
		
	},

	update: function(e) {
		
		if (e.data.enabled) {
			
			this.dom.main.removeClass('jsc-nodeeditor-disabled').addClass('jsc-nodeeditor');

			// ...
			
			if (e.data.visible) {
				this.dom.main.show();
			}else{
				this.dom.main.hide();
			}
			
		}else{
			
			this.dom.main.removeClass('jsc-nodeeditor').addClass('jsc-nodeeditor-disabled');
			
		}
	},

	/*
	 * Update node options
	 */
	updateNodeOptions: function(e) {

		var config = this.cmp().config();
		var nodes = config.options.nodes;
		for (var  i=0; i < nodes.length; i++) {
			if (nodes[i].id === e.data.id) {
				$.extend(true, nodes[i], e.data);
			}
		}

		// Update content size
		this.trigger('update.content.size');
		
		// Trigger the event 'editor.options.updated' and send the current editor options
		this.trigger('editor.options.updated');

	},

	/*
	 * Render all node components
	 */
	updateNodes: function(e) {
		
		$(this.cmp().children()).each((function(that) {
			return function(i, c) {
				c.del();
			};
		})(this));

		$(e.data.options.nodes).each((function(that, e) {
			return function(i, nodeOptions) {

				nodeOptions.grid = e.data.options.grid;
				nodeOptions.snapToGrid = e.data.options.snapToGrid;
				
				that.cmp().append(
					jsCow.get(jsCow.res.components.node, {
						model: nodeOptions
					}).on('drag.stop', function(e) {

						that.trigger('update.node.options', e.data);

					})
				);

			};
		})(this, e));
		
		// Update content size
		this.trigger('update.content.size');

	},

	updateContentSize: function(e) {
		
		this.config.contentSize.width = this.dom.main.outerWidth(true);
		this.config.contentSize.height = this.dom.main.outerHeight(true);
		
		var nodes = $(this.dom.content).find('.jsc-node');
		for (var i=0; i<nodes.length; i++) {
			
			var node = $(nodes[i]);
			var rightPos = node.position().left + node.outerWidth(true);
			var bottomPos = node.position().top + node.outerHeight(true);

			if (rightPos > this.config.contentSize.width) {
				this.config.contentSize.width = rightPos;
			}
			if (bottomPos > this.config.contentSize.height) {
				this.config.contentSize.height = bottomPos;
			}

		}

		this.dom.content.width(this.config.contentSize.width).height(this.config.contentSize.height);
		this.trigger('update.editor.grid');

	},

	// Update and draw the grid lines
	updateGrid: function(e) {
		
		if (this.dom.svggrid && this.dom.svggrid.append !== 'undefined') {
			
			var width = 0;
			var height = 0;

			if (this.config.contentSize.width && this.config.contentSize.height) {
				width = this.config.contentSize.width;
				height = this.config.contentSize.height;
			}else{
				width = $(this.dom.content).outerWidth(true);
				height = $(this.dom.content).outerHeight(true);
			}

			this.config.grid = {
				data: {
					x: (function() {
						var lines = [];
						for (var i=0; (i*e.data.options.grid) < width; i++) {
							lines.push(i*e.data.options.grid);
						}
						
						return lines;
					})(),
					y: (function() {
						var lines = [];
						for (var i=0; (i*e.data.options.grid) < height; i++) {
							lines.push(i*e.data.options.grid);
						}
						
						return lines;
					})()
				}
			};
			
			this.dom.svggrid.selectAll('line.jsc-nodeeditor-grid-x').remove();
			this.dom.svggrid.append("g").attr('class', 'jsc-nodeeditor-grid-group-x')
				.selectAll('line.jsc-nodeeditor-grid-x')
     			.data(this.config.grid.data.x)
     			.enter()
     			.append("line")
				.attr("x1", function(d) { return d; })
				.attr("y1", 0)
				.attr("x2", function(d) { return d; })
				.attr("y2", "100%")
				.attr("class", "jsc-nodeeditor-grid-x");
			
			this.dom.svggrid.selectAll('line.jsc-nodeeditor-grid-y').remove();
			this.dom.svggrid.append("g").attr('class', 'jsc-nodeeditor-grid-group-y')
				.selectAll('line.jsc-nodeeditor-grid-y')
     			.data(this.config.grid.data.y)
     			.enter()
     			.append("line")
				.attr("x1", 0)
				.attr("y1", function(d) { return d; })
				.attr("x2", "100%")
				.attr("y2", function(d) { return d; })
				.attr("class", "jsc-nodeeditor-grid-y");
			
		}

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
		this.trigger("update.editor.options");

	}

};
