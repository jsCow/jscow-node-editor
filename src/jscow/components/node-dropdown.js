
jsCow.res.components.nodedropdown = function() { };
jsCow.res.components.nodedropdown.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.nodedropdown);
		this.addModel(jsCow.res.model.nodedropdown);
		this.addView(jsCow.res.view.nodedropdown);
		
		return this;
	}

};

jsCow.res.model.nodedropdown = function() {
	
	this.data = {
		enabled: true,
		visible: true,
		value: null,
		click: null
	};
	
};
jsCow.res.model.nodedropdown.prototype = {

	init: function() {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.nodedropdown = function() {
	
	this.dom = {};
	this.dom.main = $('<div/>')
		.addClass('jsc-node-dropdown');
	this.dom.title = $('<div/>')
		.addClass('jsc-node-dropdown-title')
		.appendTo(this.dom.main);
	this.dom.dropdown = $('<select/>')
		.addClass('jsc-node-dropdown-field')
		.appendTo(this.dom.main);
	
	/*this.dom.content = $('<div/>')
		.addClass('jsc-node-dropdown-content')
		.appendTo(this.dom.main);
	*/

};
jsCow.res.view.nodedropdown.prototype = {
	
	init: function(e) {
		var self = this;

		for (var o=0; o < e.data.value.length; o++) {
			var option = $('<option value="'+e.data.value[o].value+'">'+e.data.value[o].title+'</option>');
			if (e.data.value[o].selected) {
				option.prop('selected', true);
			}
			
			this.dom.dropdown.append(option);
		}

		this.dom.dropdown.on('change', function(e) {
			self.trigger('state', {
				index: $(this).find("option:selected").index()
			});
		});
		
		this.trigger("view.update", e.data);
		
	},
	
	update: function(e) {
		
		if (e.data.enabled) {
			
			this.dom.main.removeClass('jsc-node-dropdown-disabled').addClass('jsc-node-dropdown');

			if (e.data.title) {
				this.dom.title.html(e.data.title);
			}

			if (e.data.visible) {
				this.dom.main.show();
			}else{
				this.dom.main.hide();
			}
			
		}else{
			
			this.dom.main.removeClass('jsc-node-dropdown').addClass('jsc-node-dropdown-disabled');
			
		}
	}
	
};

jsCow.res.controller.nodedropdown = function() {};
jsCow.res.controller.nodedropdown.prototype = {
	
	init: function() {
		this.on("model.ready", this.isModelReady);
		this.on("state", this.state);
	},
	
	isModelReady: function() {
		this.trigger("view.init", this.cmp().config());
	},
	
	state: function(e) {
		
		var cfg = this.cmp().config().value;
		console.log(e.data.index);

		for (var o=0; o < cfg.length; o++) {
			if (o === e.data.index) {
				cfg[o].selected = true;
			}else{
				cfg[o].selected = false;
			}
		}

		this.cmp().config({
			value: cfg
		});

		this.trigger('node.config.changed');
	}

};
