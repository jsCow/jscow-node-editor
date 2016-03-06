
jsCow.res.components.nodetypeinput = function() { };
jsCow.res.components.nodetypeinput.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.nodetypeinput);
		this.addModel(jsCow.res.model.nodetypeinput);
		this.addView(jsCow.res.view.nodetypeinput);
		
		return this;
	}

};

jsCow.res.model.nodetypeinput = function() {
	
	this.data = {
		enabled: true,
		visible: true
	};
	
};
jsCow.res.model.nodetypeinput.prototype = {

	init: function() {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.nodetypeinput = function() {
	
	this.dom = {};
	this.dom.main = $('<div/>')
		.addClass('jsc-node-type-input clearfix');
	this.dom.content = $('<input type="text" value="" />')
		.addClass('jsc-node-type-input-content clearfix')
		.appendTo(this.dom.main);
	
};
jsCow.res.view.nodetypeinput.prototype = {
	
	init: function(e) {
		var self = this;

		this.dom.content
			.on('click', function(e) {
				
				e.stopPropagation();
				e.preventDefault();

			}).on('change', function(e) {

				var value = {
					value: self.dom.content.val()
				};

				self.cmp().config(value);
				self.trigger('node.port.changed', value);

			});

		this.trigger("view.update", e.data);
		
	},
	
	update: function(e) {	
		
		if (e.data.enabled) {
			
			this.dom.main.removeClass('jsc-node-type-input-disabled').addClass('jsc-node-type-input');
			
			if (e.data.visible) {
				this.dom.main.show();
			}else{
				this.dom.main.hide();
			}
			
		}else{
			
			this.dom.main.removeClass('jsc-node-type-input').addClass('jsc-node-type-input-disabled');
			
		}
	}
	
};

jsCow.res.controller.nodetypeinput = function() {};
jsCow.res.controller.nodetypeinput.prototype = {
	
	init: function() {
		this.on("model.ready", this.isModelReady);
		this.on("title", this.title);
	},
	
	isModelReady: function() {
		this.trigger("view.init", this.cmp().config());
	}

};
