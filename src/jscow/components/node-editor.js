
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

	},

	addNode: function(options) {

		var list = [];
		
		if (options instanceof Array ) {
			list = options;
		} else {
			list.push(options);
		}
		
		this.trigger('nodes.add', {
			nodes: list
		});
		
		return this;

	}

};



jsCow.res.model.nodeeditor = function() {
	
	this.data = {
		enabled: true,
		visible: true,
		options: {
			grid: 20,
			snapToGrid: true
		},
		nodes: {},
		connections: []
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
		},
		jsPlumbInstance: null
	};
	
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jsc-nodeeditor clearfix');
	this.dom.grid = $('<div/>').addClass('jsc-nodeeditor-grid clearfix').appendTo(this.dom.main);
	this.dom.content = $('<div/>').addClass('jsc-nodeeditor-content clearfix').appendTo(this.dom.grid);

};
jsCow.res.view.nodeeditor.prototype = {
	
	init: function(e) {

		// Register all event listener
		this.on('editor.node.added', this.editorNodeAdded);
		this.on('editor.node.updated', this.editorNodeUpdated);
		//this.on("editor.options.updated", this.updateNodes);
		//this.on("update.editor.grid", this.updateGrid);
		//this.on('update.content.size', this.updateContentSize);
		//this.on('update.connectors', this.updateConnectors);
		

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

		// Create jsPlumb instance
		// Set the container
		jsPlumb.ready((function(self) {
			return function() {
				self.config.jsPlumbInstance = jsPlumb.getInstance();
				self.config.jsPlumbInstance.setContainer(self.dom.content);
			};
		})(this));

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
	 *
	 */
	editorNodeAdded: function(e) {

		var self = this;

		var cfg = this.cmp().config();
		var nodeOptions = e.data;

		nodeOptions.grid = cfg.options.grid;
		nodeOptions.snapToGrid = cfg.options.snapToGrid;
		nodeOptions.jsPlumbInstance = this.cfg.jsPlumbInstance;

		// ===== Node Structure =====

		var main = $('<div/>').attr('id', this.cmp().id()+'-'+nodeOptions.id).addClass('jsc-node clearfix').css({
			top: nodeOptions.pos.top, 
			left: nodeOptions.pos.left
		});
		var content = $('<div/>').addClass('jsc-node-content clearfix').appendTo(main);

		// Node Title
		var titlebar = $('<div/>').addClass('jsc-node-titlebar').append(
			$('<span/>').html(nodeOptions.title)
		);
		main.prepend( titlebar );
		
		// Remove button
		var remove = $('<i/>').addClass('jsc-node-remove fa fa-times').appendTo( titlebar );
		
		var outputs = $('<div/>').addClass('jsc-node-outputs').appendTo(content);
		var preview = $('<div/>').addClass('jsc-node-preview').appendTo(content);

		// Standard Image Preview
		var typePreviewImage = $('<div/>').appendTo(preview);
			//$('<img src="http://image.shutterstock.com/display_pic_with_logo/2904091/292004621/stock-photo--d-sphere-on-white-background-with-word-cloud-texture-imprint-this-ball-with-tag-cloud-text-are-in-292004621.jpg" alt="" />').appendTo(typePreviewImage);

		/*
		var config = $('<div/>').addClass('jsc-node-config').appendTo(content);
			
			// Standard Input
			var typeInput = $('<div/>').appendTo(config);
				$('<input type="text" value="" />').appendTo(typeInput);

			// Standard Dropdown
			var typeSelect = $('<div/>').appendTo(config);
				var typeSelectField = $('<select/>').appendTo(typeSelect);
					typeSelectField.append("<option>Muh</option>");
					typeSelectField.append("<option>Kuh</option>");
			
			// Standard Radio
			var typeRadio = $('<div/>').appendTo(config);
				var typeRadioLabel = $('<label/>').appendTo(typeRadio);
					$('<input type="radio" name="test" value="1" />').appendTo(typeRadioLabel);
					$('<span/>').text("Aktiv").appendTo(typeRadioLabel);
			
			// Standard Checkbo
			var typeChekbox = $('<div/>').appendTo(config);
				var typeChekboxLabel = $('<label/>').appendTo(typeChekbox);
				$('<input type="checkbox" name="test1" value="1" />').appendTo(typeChekboxLabel);
				$('<span/>').text("Aktiv").appendTo(typeChekboxLabel);
		
		*/

		
		var inputs = $('<div/>').addClass('jsc-node-inputs').appendTo(content);

		$.each(nodeOptions.outputs, function(i, output) {

			var port = $('<div/>')
				.addClass('jsc-node-port jsc-node-port-out')
				.attr("id", self.cmp().id()+'-'+nodeOptions.id+'-'+output.id);
			$('<div/>').appendTo(port).append(
				$('<span/>').text(output.title)
			);
			
			outputs.append(port);
			
		});
		
		$.each(nodeOptions.inputs, function(i, input) {

			var port = $('<div/>')
				.addClass('jsc-node-port jsc-node-port-in')
				.attr("id", self.cmp().id()+'-'+nodeOptions.id+'-'+input.id);
			$('<div/>').appendTo(port).append(
				$('<span/>').text(input.title)
			);
			
			inputs.append(port);
			
		});
		
		this.dom.content.append(main);

		this.config.jsPlumbInstance.draggable(this.cmp().id()+'-'+nodeOptions.id, {
			grid:[nodeOptions.grid, nodeOptions.grid]
		});
		
		// end ===== Node Structure =====

	},

	/*
	 * Update Node
	 */
	editorNodeUpdated: function(e) {

		var self = this;
		var nodeOptions = e.data;

		console.log("UPDATE", nodeOptions);

	},

	/*
	 * Render all node components
	 */
	updateNodes: function(e) {
		
		var self = this;

		$(this.cmp().children()).each((function(that) {
			return function(i, c) {
				c.del();
			};
		})(this));
		
		var nodesCount = e.data.options.nodes.length;		
		var renderedNodes = 0;

		$(e.data.options.nodes).each((function(that, e) {
			return function(i, nodeOptions) {

				nodeOptions.grid = e.data.options.grid;
				nodeOptions.snapToGrid = e.data.options.snapToGrid;
				nodeOptions.jsPlumbInstance = that.config.jsPlumbInstance;
				
				



				// ========================= TEST ========================================================
				
				var main = $('<div/>').attr('id', self.cmp().id()+'-'+nodeOptions.id).addClass('jsc-node clearfix').css({
					top: nodeOptions.pos.top, 
					left: nodeOptions.pos.left
				});
				var content = $('<div/>').addClass('jsc-node-content clearfix').appendTo(main);
				
				var titlebar = $('<div/>').addClass('jsc-node-titlebar');
				var title = $('<span/>').html(nodeOptions.title).appendTo( titlebar );
				var remove = $('<i/>').addClass('jsc-node-remove fa fa-times').appendTo( titlebar );
				main.prepend( titlebar );

				var outputs = $('<div/>').addClass('jsc-node-outputs').appendTo(content);
				var preview = $('<div/>').addClass('jsc-node-preview').appendTo(content);

					// Standard Image Preview
					var typePreviewImage = $('<div/>').appendTo(preview);
						$('<img src="http://image.shutterstock.com/display_pic_with_logo/2904091/292004621/stock-photo--d-sphere-on-white-background-with-word-cloud-texture-imprint-this-ball-with-tag-cloud-text-are-in-292004621.jpg" alt="" />').appendTo(typePreviewImage);
				
				var config = $('<div/>').addClass('jsc-node-config').appendTo(content);
					
					// Standard Input
					var typeInput = $('<div/>').appendTo(config);
						$('<input type="text" value="" />').appendTo(typeInput);

					// Standard Dropdown
					var typeSelect = $('<div/>').appendTo(config);
						var typeSelectField = $('<select/>').appendTo(typeSelect);
							typeSelectField.append("<option>Muh</option>");
							typeSelectField.append("<option>Kuh</option>");
					
					// Standard Radio
					var typeRadio = $('<div/>').appendTo(config);
						var typeRadioLabel = $('<label/>').appendTo(typeRadio);
							$('<input type="radio" name="test" value="1" />').appendTo(typeRadioLabel);
							$('<span/>').text("Aktiv").appendTo(typeRadioLabel);
					
					// Standard Checkbo
					var typeChekbox = $('<div/>').appendTo(config);
						var typeChekboxLabel = $('<label/>').appendTo(typeChekbox);
						$('<input type="checkbox" name="test1" value="1" />').appendTo(typeChekboxLabel);
						$('<span/>').text("Aktiv").appendTo(typeChekboxLabel);

				var inputs = $('<div/>').addClass('jsc-node-inputs').appendTo(content);

				$.each(nodeOptions.outputs, function(i, output) {

					var port = $('<div/>')
						.addClass('jsc-node-port jsc-node-port-out')
						.attr("id", self.cmp().id()+'-'+nodeOptions.id+'-'+output.id);
					$('<div/>').appendTo(port).append(
						$('<span/>').text(output.title)
					);
					
					outputs.append(port);
					
				});
				
				$.each(nodeOptions.inputs, function(i, input) {

					var port = $('<div/>')
						.addClass('jsc-node-port jsc-node-port-in')
						.attr("id", self.cmp().id()+'-'+nodeOptions.id+'-'+input.id);
					$('<div/>').appendTo(port).append(
						$('<span/>').text(input.title)
					);
					
					inputs.append(port);
					
				});
				

				that.dom.content.append(main);

				self.config.jsPlumbInstance.draggable(self.cmp().id()+'-'+nodeOptions.id, {
					grid:[nodeOptions.grid, nodeOptions.grid]
				});
				

				// end ========================= TEST ========================================================





				/*
				that.cmp().append(
					jsCow.get(jsCow.res.components.node, {
						id: that.cmp().id() + "-" + nodeOptions.id,
						model: nodeOptions
					}).on('updated', function(e) {
						that.trigger('node.updated', e.data);
					}).on('removed', function(e) {
						that.trigger('node.removed');
					}).on('view.ready', function(e) {
						
						renderedNodes++;
						
						if (renderedNodes === nodesCount) {
							
							
						}

					})
				);
				*/

			};
		})(this, e)).promise().done(function() {
			
			// Update content size
			self.trigger('update.content.size');

			// Update visual connectors
			self.trigger('update.connectors');

		});

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
			
			this.dom.svggrid.selectAll('.jsc-nodeeditor-grid-group-x').remove();
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
			
			this.dom.svggrid.selectAll('.jsc-nodeeditor-grid-group-y').remove();
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

	},

	/*
	 * Update all connectors
	 */
	updateConnectors: function(e) {
		
		//console.log("");
		//console.log(e.data);
		
		var self = this;

		$(e.data.options.connections).each(function(i, c) {
				
			jsPlumb.ready(function() {

				/** connector options */
				var connectorOptions = {
					connector:["Bezier", { curviness: 150 }, {
						cssClass: "jsc-connector-bezier"
					}],
					endpoint: ["Dot", {radius: 5}],
					anchor: [ 'LeftMiddle', 'RightMiddle'],
					overlays: [
						/*[ "Arrow", { foldback: 0.1 }, {
							cssClass: "jsc-connector-arrow",
							width: 5,
							height: 5,
							length: 20,
							location: 0.75
						}],*/
						[ "Label", { 
							cssClass: "jsc-connector-label",
							label: c.color,
							id: "conMuhId",
							location: 0.25,
						}]
					]
				};

				if (c.color) {
					connectorOptions.paintStyle = { 
						strokeStyle: c.color
					};
				}else{
					connectorOptions.cssClass = 'jsc-connector-path';
				}

				var source = self.cmp().id()+"-"+c.from.node+"-"+c.from.out;
				var target = self.cmp().id()+"-"+c.to.node+"-"+c.to.in;
				
				self.config.jsPlumbInstance.connect({
					source: source,
					target: target
				}, connectorOptions);

			});

		}).promise().done(function() {
			
			// Trigger to update grid 
			self.trigger('update.editor.grid');

		});

	}
};



jsCow.res.controller.nodeeditor = function() {};
jsCow.res.controller.nodeeditor.prototype = {
	
	init: function() {
		this.on("model.ready", this.isModelReady);
		this.on("options", this.options);
		this.on('nodes.add', this.addNode);
		this.on('node.updated', this.nodeUpdated);
		this.on('node.removed', this.nodeRemoved);
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
		this.trigger("editor.options.updated", e.data.options);
		
	},
	
	addNode: function(e) {
		
		var newNodesList = e.data.nodes;
		var nodes = this.cmp().config().nodes;
		
		if ($.isEmptyObject(nodes)) {
				
			// No nodes available yet
			for (i=0; i < newNodesList.length; i++) {
				
				// ADD
				nodes[newNodesList[i].id] = newNodesList[i];
				this.trigger("editor.node.added", newNodesList[i]);
				
			}
			
		}else{

			// Nodes are already available in editor
			for (var nn=0; nn < newNodesList.length; nn++) {
				
				nodes = this.cmp().config().nodes;
				
				var updateNode = {};
				updateNode[newNodesList[nn].id] = newNodesList[nn];
				
				if (typeof nodes[newNodesList[nn].id] === 'undefined') {
					
					// ADD
					nodes[newNodesList[nn].id] = {};
					nodes[newNodesList[nn].id] = updateNode;
					
					this.trigger("editor.node.added", newNodesList[nn]);
					
				}else{
					
					// UPDATE
					nodes[newNodesList[nn].id] = updateNode;
					
					this.trigger("editor.node.updated", newNodesList[nn]);
					
				}
				
				
			}

		}

	},

	/*
	 * Update node options and trigger the event 'editor.options.updated'.
	 * Internal the content size will updatet after update the options.
	 */
	/*nodeUpdated: function(e) {
		
		var nodes = this.cmp().config().options.nodes;
		for (var  i=0; i < nodes.length; i++) {
			if (nodes[i].id === e.data.id) {
				$.extend(true, nodes[i], e.data);
			}
		}

		// Update content size
		this.trigger('update.content.size');
		
		// Trigger the event 'editor.options.updated' and send the current editor options
		this.trigger('editor.options.updated', this.cmp().config().options);

	},*/

	/*
	 * Will be triggered when a node has been removed
	 */
	/*nodeRemoved: function(e) {
		
		// Update content size
		this.trigger('update.content.size');

		// Trigger the event 'editor.options.updated' and send the current editor options
		this.trigger('editor.options.updated', this.cmp().config().options);

	}*/

};
