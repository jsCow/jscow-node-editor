
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
			this.trigger('editor.options', {
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

	},

	addConnection: function(options) {

		var list = [];
		
		if (options instanceof Array ) {
			list = options;
		} else {
			list.push(options);
		}
		
		this.trigger('connection.add', {
			connections: list
		});
		
		return this;

	},

	removeConnection: function(options) {

		var list = [];
		
		if (options instanceof Array ) {
			list = options;
		} else {
			list.push(options);
		}
		
		this.trigger('connection.remove', {
			connections: list
		});
		
		return this;

	},

	removeNode: function(id) {
		
		if (typeof options === "String" ) {
			this.trigger('node.remove', {
				id: id
			});
		}

		return this;

	},

	addNodesRepository: function(repo) {
		
		if (typeof repo === 'object') {
			
			this.trigger('editor.repository.add', {
				repository: repo
			});

		}

		return this;

	},

	reset: function() {
		
		this.trigger('editor.reset.all');

		return this;

	},

	save: function() {
		
		this.trigger('editor.save', {
			save: true
		});

		return this;

	},

	processId: function(id) {

		if (typeof id === 'string') {
			
			this.trigger('editor.process.id', {
				processId: id
			});

			return this;

		}else{

			return this.config().processId;

		}

	}

};



jsCow.res.model.nodeeditor = function() {
	
	this.data = {
		enabled: true,
		visible: true,
		processId: "process_" + Math.random().toString(16).slice(2),
		options: {
			grid: 20,
			snapToGrid: true,
			autosave: true
		},
		nodes: {},
		connections: [],
		repositories: {}
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
		jsPlumbInstance: null,
		newNodePos: {
			left: 0,
			top: 0
		}
	};
	
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jsc-nodeeditor');
	this.dom.grid = $('<div/>').addClass('jsc-nodeeditor-grid').appendTo(this.dom.main);
	
	this.dom.content = $('<div/>')
		.addClass('jsc-nodeeditor-content')
		.on('dblclick', (function(self) {
			return function(e) {
				
				self.config.newNodePos = {
					left: e.offsetX - 85,
					top: e.offsetY - 10
				};
				self.dom.nodeselector.slideDown().find('input').focus();

			};
		})(this))
		.appendTo(this.dom.grid);

	this.dom.nodeselector = $('<div/>')
		.addClass('jsc-nodeeditor-nodeselector')
		.attr('data-keyboard-focus-group', '')
		.hide()
		.appendTo(this.dom.main);
	this.dom.nodeselectorinputcontainer = $('<div/>').addClass('jsc-nodeeditor-nodeselectorinputcontainer').appendTo(this.dom.nodeselector);
	this.dom.nodeselectorinput = $('<input type="text" value="" placeholder="Search..." />')
		.attr('data-keyboard-focus', '')
		.appendTo(this.dom.nodeselectorinputcontainer);
	this.dom.nodeselectorresults = $('<ul/>').appendTo(this.dom.nodeselector);
	
};
jsCow.res.view.nodeeditor.prototype = {
	
	init: function(e) {

		var self = this;

		// Register all event listener
		this.on('editor.node.added', this.editorNodeAdded);
		this.on('editor.node.updated', this.editorNodeUpdated);
		this.on('editor.node.types.updated', this.onEditorNodeTypesUpdated);
		this.on('editor.node.types.reset', this.onEditorNodeTypesReset);
		this.on('editor.connection.added', this.editorConnectionAdded);
		this.on('node.remove', this.nodeRemove);
		this.on('editor.grid.update', this.updateGrid);

		/*$(window).resize((function(self) {
			return function() {
				
				// Update content size
				self.trigger('update.content.size');

			};
		})(this));*/

		// Bind the jquery plugin 'kinetic' on the grid area
		this.dom.grid.kinetic();
		
		// Create the base svg canvas element by "D3.js"
		/*this.dom.svggrid = d3.select(this.dom.content[0])
			.append("svg:svg")
			.attr("width", "100%")
			.attr("height", "100%");
		*/

		// Create jsPlumb instance
		// Set the container
		jsPlumb.ready((function(self) {
			return function() {
				self.config.jsPlumbInstance = jsPlumb.getInstance();
				self.config.jsPlumbInstance.setContainer(self.dom.content);
				self.config.jsPlumbInstance.bind("connectionDragStop", function (connection) {
					
					if (connection.source && connection.target) {
						
						var from = connection.sourceId.split('-');
						var to = connection.targetId.split('-');

						var con = {
							from: {
								node: from[from.length - 2],
								out: from[from.length - 1]
							},
							to: {
								node: to[to.length - 2],
								in: to[to.length - 1]
							}
						};

						self.cmp().addConnection(con);
						
						console.info("ADD CONNECTION", connection.id);
					}

				});

				// Fix -> Create double connections by drag and drop a new connection
				self.config.jsPlumbInstance.bind("beforeDrop", function(info){
					if(info.sourceId === info.targetId){
					    return false;
					}
				});

			};
		})(this));

		this.dom.nodeselectorinput.keyup((function(self) {
			return function(e) {
	    		
		        // Enter
		        if (e.keyCode === 27) {
		            self.dom.nodeselector.fadeOut();
		        }else if (e.keyCode === 40) {
		        	self.dom.nodeselector.find('div[data-keyboard-focus]:visible').eq(0).focus();
		        }else{
					var searchString = self.dom.nodeselectorinput.val();

		        	if (searchString !== '') {
						var foundItem = self.dom.nodeselectorresults.find('div').not(':contains("'+self.dom.nodeselectorinput.val()+'")');
						foundItem.hide();

						if (self.dom.nodeselectorresults.find('div:visible').length === 1) {
	            			self.dom.nodeselectorresults.find('div:visible').eq(0).focus();
						}
						
		        	}else{
		        		self.dom.nodeselectorresults.find('div').show();
		        	}
						
		        }
				
	    	};
		})(this));

		// Prerender the node seletion
		this.trigger('editor.node.types.updated', this.cmp().config().repositories);

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
		//nodeOptions.jsPlumbInstance = this.cfg.jsPlumbInstance;

		// ===== Node Structure =====
		
		var main = $('<div/>').attr('id', this.cmp().id()+'-'+nodeOptions.id).addClass('jsc-node clearfix').css({
			top: nodeOptions.pos.top, 
			left: nodeOptions.pos.left
		});

		if (nodeOptions.class) {
			main.addClass(nodeOptions.class);
		}

		var content = $('<div/>').addClass('jsc-node-content').appendTo(main);

		// Node Title
		var titlebar = $('<div/>').addClass('jsc-node-titlebar').append(
			$('<span/>').html(nodeOptions.title)
		);
		main.prepend( titlebar );
		
		// Node Description
		if (nodeOptions.description) {
			var description = $('<div/>').addClass('jsc-node-description').append(
				$('<span/>').html(nodeOptions.description)
			);
			description.appendTo( content );
		}
		
		// Remove button
		var remove = $('<i/>').addClass('jsc-node-remove fa fa-times').click(function(e) {
			self.trigger('node.remove', {
				id: nodeOptions.id
			});
		}).appendTo( titlebar );
		
		//var preview = $('<div/>').addClass('jsc-node-preview').appendTo(content);
		// Standard Image Preview
		//var typePreviewImage = $('<div/>').appendTo(preview);
			//$('<img src="http://image.shutterstock.com/display_pic_with_logo/2904091/292004621/stock-photo--d-sphere-on-white-background-with-word-cloud-texture-imprint-this-ball-with-tag-cloud-text-are-in-292004621.jpg" alt="" />').appendTo(typePreviewImage);
		

		var outputs = $('<div/>').addClass('jsc-node-outputs').appendTo(content);

		var inputs = $('<div/>').addClass('jsc-node-inputs').appendTo(content);

		$.each(nodeOptions.outputs, function(i, output) {

			if (typeof output.id === 'undefined') {
				output.id = "out" + Math.random().toString(16).slice(2);
			}
			
			var id = self.cmp().id()+'-'+nodeOptions.id+'-'+output.id;
			
			var port = $('<div/>')
				.addClass('jsc-node-port jsc-node-port-out')
				.attr("id", id);
			var portContent = $('<div/>').appendTo(port);
			if (output.title && !output.type) {
				portContent.append(
					$('<span/>').text(output.title)
				);
			}
			
			// Create all configuration components
			if (output.type) {

				jsCow.get(output.type, {
					model: output
				}).on('node.config.changed', function(e) {
					
					var ports = self.cmp().config().nodes[nodeOptions.id].outputs;
					for (var p=0; p < ports.length; p++) {
						if (output.id === ports[p].id) {
							self.cmp().config().nodes[nodeOptions.id].outputs[p] = e.data;
							self.trigger('editor.save');
						}
					}

				})
				.target(portContent)
				.run();
			}

			outputs.append(port);

			window.setTimeout(function() {

				self.config.jsPlumbInstance.makeSource(id, {
					anchor: ['RightMiddle'],
					isSource: true,
					sourceDetachable: true
				});

			},0);

		});
		
		$.each(nodeOptions.inputs, function(i, input) {

			if (typeof input.id === 'undefined') {
				input.id = "in" + Math.random().toString(16).slice(2);
			}

			var id = self.cmp().id()+'-'+nodeOptions.id+'-'+input.id;

			window.setTimeout(function() {
			
				var port = $('<div/>')
					.addClass('jsc-node-port jsc-node-port-in')
					.attr("id", id);
				var portContent = $('<div/>').appendTo(port);
				if (input.title && !input.type) {
					portContent.append(
						$('<span/>').text(input.title)
					);
				}
				
				// Create all configuration component
				if (input.type) {
					jsCow.get(input.type, {
						model: input
					}).on('node.config.changed', function(e) {
						
						var ports = self.cmp().config().nodes[nodeOptions.id].inputs;
						for (var p=0; p < ports.length; p++) {
							if (input.id === ports[p].id) {
								self.cmp().config().nodes[nodeOptions.id].inputs[p] = e.data;
								self.trigger('editor.save');
							}
						}

					})
					.target(portContent)
					.run();
				}

				inputs.append(port);

			},0);

			window.setTimeout(function() {
				console.log('makeTarget for ', id);
				var endpoint = self.config.jsPlumbInstance.makeTarget(id, {
					anchor: ['LeftMiddle'],
					isTarget: true,
					targetReattach: true
				});

				console.log(endpoint);

			},0);
						
		});
		
		// Create all node configuration components
		if (nodeOptions.config && nodeOptions.config.length) {
			var config = $('<div/>').addClass('jsc-node-config').appendTo(content);

			var onNodeConfigChanged = function(e) {
				
				var configs = self.cmp().config().nodes[nodeOptions.id].config;
				for (var c=0; c < configs.length; c++) {
					if (configs[c].id === e.data.id) {
						self.cmp().config().nodes[nodeOptions.id].config[c] = e.data;
						self.trigger('editor.save');
					}
				}

			};

			for (var c=0; c < nodeOptions.config.length; c++) {
				
				if (typeof nodeOptions.config[c].id === 'undefined') {
					nodeOptions.config[c].id = "c" + Math.random().toString(16).slice(2);
				}
				
				jsCow.get(nodeOptions.config[c].type, {
					model: nodeOptions.config[c]
				}).on('node.config.changed', onNodeConfigChanged).target(config).run();

			}
			
		}
		

		this.dom.content.append(main);

		this.config.jsPlumbInstance.draggable(this.cmp().id()+'-'+nodeOptions.id, {
			grid:[nodeOptions.grid, nodeOptions.grid],
			stop: function(e) {

				self.cmp().config().nodes[nodeOptions.id].pos = {
					left: e.pos[0],
					top: e.pos[1]
				};

				self.trigger('editor.save');

			}
		});

		// end ===== Node Structure =====
		
	},

	/*
	 * Update Node
	 */
	editorNodeUpdated: function(e) {

		var self = this;
		var nodeOptions = e.data;

		//console.info("UPDATE", nodeOptions);

	},

	/*
	 * Connection Added
	 */
	editorConnectionAdded: function(e) {

		var self = this;
		var c = e.data;
		
		jsPlumb.ready(function() {

			/** connector options */
			var connectorOptions = {
				connector:["Bezier", { curviness: 70 }, {
					cssClass: "jsc-connector-bezier"
				}],
				anchor: ['RightMiddle', 'LeftMiddle'],
				endpoint: ["Dot", {radius: 5}]
				
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
			
			var con = self.config.jsPlumbInstance.connect({
				source: source,
				target: target
			}, connectorOptions).bind("dblclick", function (connection, e) {
				e.stopPropagation();
   				e.preventDefault();

				var from = connection.sourceId.split('-');
				var to = connection.targetId.split('-');
				
				var c = {
					from: {
						node: from[from.length - 2],
						out: from[from.length - 1]
					},
					to: {
						node: to[to.length - 2],
						in: to[to.length - 1]
					}
				};
				
				self.config.jsPlumbInstance.detach(connection);
				self.cmp().removeConnection(c);
				
				console.info('REMOVED CONNECTION', c);

				return false;

			});

			// node-editor-1-itemcondition1
			
		});

	},

	
	/*
	 * Remove a node and all node connections
	 */
	nodeRemove: function(e) {

		var nodeId = e.data.id;
		var nodes = this.cmp().config().nodes;
		var connections = this.cmp().config().connections;
		
		// Remove the node elements from dom
		var nodeElementId = this.cmp().id() + "-" + nodeId;
		$('#' + nodeElementId).remove();

		// Remove all related node connections from jsPlumb
		/*var allJsPlumbConnections = this.config.jsPlumbInstance.getConnections();
		var searchId = "-" + nodeId + "-";
		for (var pc=0; pc < allJsPlumbConnections.length; pc++) {
			if (allJsPlumbConnections[pc].sourceId.indexOf(searchId) !== -1 || allJsPlumbConnections[pc].targetId.indexOf(searchId) !== -1) {
				this.config.jsPlumbInstance.detach(allJsPlumbConnections[pc]);
			}
		}*/
		this.config.jsPlumbInstance.deleteEveryEndpoint();

		// Remove all related connections data from node editor
		for (var c=0; c < connections.length; c++) {
			if (connections[c].from.node === nodeId || connections[c].to.node === nodeId) {
				this.cmp().removeConnection(connections[c]);
			}
		}

	},

	/*
	 * Update list of node types
	 */
	onEditorNodeTypesUpdated: function(e) {

		var nodeTypeGroups = e.data;
		
		this.dom.nodeselectorresults.find('*').remove();

		var typeHoverHandler = function(self, type) {
			return function (e) {
		        this.focus();
		    };
		};

		var typeClickHandler = function(self, type) {
			return function () {
		        
		        type.id = ('node'+Math.random()).replace('.', '');
				type.pos = {
					left: self.config.newNodePos.left,
					top: self.config.newNodePos.top
				};
				
				self.cmp().addNode(type);
	        	self.dom.nodeselector.fadeOut();

		    };
		};

		var typeKeyHandler = function(self, type) {
			return function (e) {

	        	var currentFocusElement,
	        		currentFocusGroupItems,
	        		prevIndex,
	        		nextIndex;

	        	// Escape
		        if (e.keyCode === 27) {
		        	self.dom.nodeselector.fadeOut();
		        }

	            if(e.which === 38) { // up
					
					currentFocusElement = $(':focus');
	                currentFocusGroupItems = currentFocusElement.closest('[data-keyboard-focus-group]').find('[data-keyboard-focus]:visible');
	                prevIndex = ( currentFocusGroupItems.index(currentFocusElement) - 1 );
	                
	                if (prevIndex < 0) { 
	                	self.dom.nodeselectorinput.focus();
	                }else{
	                	$(currentFocusGroupItems).eq(prevIndex).focus();
	                }
					
	            }
	            if(e.which === 40) { // down
					
					currentFocusElement = $(':focus');
	                currentFocusGroupItems = currentFocusElement.closest('[data-keyboard-focus-group]').find('[data-keyboard-focus]:visible');
	                nextIndex = ( currentFocusGroupItems.index(currentFocusElement) + 1 );
	                $(currentFocusGroupItems).eq(nextIndex).focus();

	            }
	        
	            if(e.which === 13) { // enter
	                $(':focus').click();
	            }
	        	
		    };
		};

		for (var key in nodeTypeGroups) {
			
			this.dom.nodeselectorresults.append('<li class="jsc-nodeeditor-nodegroup">'+nodeTypeGroups[key].title+'</li>');

			var item = $('<li/>');

			for(var t=0; t < nodeTypeGroups[key].types.length; t++) {
				
				var type = nodeTypeGroups[key].types[t];
				
				var typeButton = $('<div>'+type.title+'</div>').attr('data-keyboard-focus', '').attr('tabindex', '-1')
					.on('click', typeClickHandler(this, type))
					.on('keyup', typeKeyHandler(this, type))
					.on('mouseover', typeHoverHandler(this, type))
					.appendTo(item);

			}

			this.dom.nodeselectorresults.append(item);
			this.dom.nodeselectorresults.find('div').eq(0).focus();
				
		}

	},

	/*
	 * Reset all exists nody types
	 */
	onEditorNodeTypesReset: function(e) {

		this.dom.nodeselectorresults.find('*').remove();

	}

};



jsCow.res.controller.nodeeditor = function() {};
jsCow.res.controller.nodeeditor.prototype = {
	
	init: function() {
		this.on("model.ready", this.isModelReady);
		this.on("editor.options", this.onEditorOptions);
		this.on('nodes.add', this.addNode);
		this.on('node.remove', this.nodeRemove);
		this.on('connection.add', this.addConnection);
		this.on('connection.remove', this.removeConnection);
		this.on('editor.repository.add', this.addNodesRepository);
		this.on('editor.save', this.editorOptionsChanged);
		this.on('editor.reset.all', this.onEditorResetAll);
		this.on('editor.process.id', this.processId);
	},
	
	isModelReady: function() {
		this.trigger(
			"view.init", 
			this.cmp().config()
		);
	},
	
	editorOptionsChanged: function(e) {
		
		var options = this.cmp().config().options;
		if (options.autosave || e.data.save) {
			this.trigger("editor.options.changed", this.cmp().config());
		}
		
	},
	
	addNode: function(e) {
		
		var newNodesList = e.data.nodes;
		var nodes = this.cmp().config().nodes;
		
		// Generate id if not exists
		for (var node=0; node < newNodesList.length; node++) {

			var n = newNodesList[node];

			// Inputs
			if (typeof n.inputs !== 'undefined') {
				for (var nodeIn=0; nodeIn < n.inputs.length; nodeIn++) {
					if (typeof n.inputs[nodeIn].id === 'undefined') {
						n.inputs[nodeIn].id = "in" + Math.random().toString(16).slice(2);
					}
				}
			}
			
			// Outputs
			if (typeof n.outputs !== 'undefined') {
				for (var nodeOut=0; nodeOut < n.outputs.length; nodeOut++) {
					if (typeof n.outputs[nodeOut].id === 'undefined') {
						n.outputs[nodeOut].id = "out" + Math.random().toString(16).slice(2);
					}	
				}
			}
	
		}
		
		if ($.isEmptyObject(nodes)) {
			
			// No nodes available yet
			for (i=0; i < newNodesList.length; i++) {
				
				// ADD
				nodes[newNodesList[i].id] = $.extend(true, {}, newNodesList[i]);
				
				this.trigger("editor.node.added", newNodesList[i]);
				console.info("FIRST NODE ADDED", newNodesList[i]);

			}
			
		}else{

			// Nodes are already available in editor
			for (var nn=0; nn < newNodesList.length; nn++) {
				
				if (typeof nodes[newNodesList[nn].id] === 'undefined') {

					// ADD
					nodes[newNodesList[nn].id] = $.extend(true, {}, newNodesList[nn]);
					
					this.trigger("editor.node.added", newNodesList[nn]);
					console.info("NODE ADDED", newNodesList[nn]);

				}else{
					
					// UPDATE (Not implemented yet)
					$.extend(true, nodes[newNodesList[nn].id], $.extend(true, {}, newNodesList[nn]));
					
					this.trigger("editor.node.updated", newNodesList[nn]);
					console.info("NODE UPDATED", newNodesList[nn]);
					
				}
				
			}


		}

		this.trigger('editor.save');

	},

	addConnection: function(e) {

		var nodes = this.cmp().config().nodes;
		var connections = this.cmp().config().connections;
		var newConnections = e.data.connections;
		
		for (var i=0; i < newConnections.length; i++) {

			var nodeExists = false;
			var connectionExists = false;
			var portsInNodeExists = false;
			
			// If the port is exists in exists nodes
			if (nodes[newConnections[i].from.node]) {
				
				// Outputs
				var outputPortExists = false;
				if (nodes[newConnections[i].from.node].outputs) {
					for (var op=0; op < nodes[newConnections[i].from.node].outputs.length; op++) {
						
						if ( nodes[newConnections[i].from.node].outputs[op].id === newConnections[i].from.out ) {
							outputPortExists = true;
						}

					}
				}
				
				// Input
				var inputPortExists = false;
				if (nodes[newConnections[i].to.node].inputs) {
					for (var ip=0; ip < nodes[newConnections[i].to.node].inputs.length; ip++) {
						
						if ( nodes[newConnections[i].to.node].inputs[ip].id === newConnections[i].to.in ) {
							inputPortExists = true;
						}

					}
				}

				if (outputPortExists && inputPortExists) {
					portsInNodeExists = true;
				}

			}
			
			if (portsInNodeExists && nodes[newConnections[i].from.node] && nodes[newConnections[i].to.node]) {

				nodeExists = true;
				
				for (var c=0; c < connections.length; c++) {

					if (
						(connections[c].from.node === newConnections[i].from.node) && 
						(connections[c].from.out === newConnections[i].from.out) && 
						(connections[c].to.node === newConnections[i].to.node) && 
						(connections[c].to.in === newConnections[i].to.in)
					) {
						connectionExists = true;
					}

				}

			}

			if (!connectionExists && nodeExists) {
				
				this.cmp().config({
					connections: connections.concat(newConnections[i])
				});
				
				this.trigger("editor.connection.added", newConnections[i]);		
				connections = this.cmp().config().connections;

				console.info("CONNECTION ADDED", newConnections[i]);

				this.trigger('editor.save');

			}

		}

	},

	removeConnection: function(e) {

		var nodes = this.cmp().config().nodes;
		var connections = this.cmp().config().connections;
		var removeConnections = e.data.connections;
		
		for (var i=0; i < removeConnections.length; i++) {

			//if (nodes[removeConnections[i].from.node] && nodes[removeConnections[i].to.node]) {
				
				for (var c=0; c < connections.length; c++) {

					if (
						(connections[c].from.node === removeConnections[i].from.node) && 
						(connections[c].from.out === removeConnections[i].from.out) && 
						(connections[c].to.node === removeConnections[i].to.node) && 
						(connections[c].to.in === removeConnections[i].to.in)
					) {
						connections.splice(c,1);
						this.trigger('editor.save');
					}

				}

			//}

		}

	},

	nodeRemove: function(e) {
		
		var nodeId = e.data.id;
		var nodes = this.cmp().config().nodes;

		if (nodes[nodeId]) {

			delete this.cmp().config().nodes[nodeId];
			
			console.info("NODE DELETED", nodeId);
			
			this.trigger('editor.save');

		}

	},

	addNodesRepository: function (e) {
		
		var repositories = this.cmp().config().repositories;
		var newRepo = e.data.repository;

		if (repositories[newRepo.group]) {
			
			repositories[newRepo.group].types.push(newRepo.types);
			this.cmp().config({
				repositories: repositories
			});

		}else{
			
			repositories[newRepo.group] = newRepo;
			this.cmp().config({
				repositories: repositories
			});

		}

		this.trigger('editor.node.types.updated', this.cmp().config().repositories);

	},

	onEditorResetAll: function(e) {

		console.clear();

		var nodes = this.cmp().config().nodes;
		for (var key in nodes) {
			this.trigger('node.remove', {
				id: nodes[key].id
			});
		}

		this.cmp().config().repositories = {};
		this.cmp().config().processId = "process_" + Math.random().toString(16).slice(2);
		
		this.trigger('editor.node.types.reset');
		this.trigger('editor.save');

	},

	onEditorOptions: function(e) {

		var config = this.cmp().config();
		var options = e.data.options;

		// Set repositories with node types
		if (options.repositories && options.repositories instanceof Array ) {
			for (var r=0; r < options.repositories.length; r++ ) {
				this.trigger('editor.repository.add', {
					repository: options.repositories[r]
				});
			}
		}
		
		// Create nodes
		if (options.nodes && options.nodes instanceof Array ) {
			this.trigger('nodes.add', {
				nodes: options.nodes
			});
		}
		
		// Create connections
		if (options.connections && options.connections instanceof Array ) {
			this.trigger('connection.add', {
				connections: options.connections
			});
		}
		
	},

	processId: function(e) {

		this.cmp().config({
			processId: e.data.processId
		});

	}

};