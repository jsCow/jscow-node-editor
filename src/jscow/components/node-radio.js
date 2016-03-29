
jsCow.res.components.noderadio = function() { };
jsCow.res.components.noderadio.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.noderadio);
		this.addModel(jsCow.res.model.noderadio);
		this.addView(jsCow.res.view.noderadio);
		
		return this;
	}

};

jsCow.res.model.noderadio = function() {
	
	this.data = {
		enabled: true,
		visible: true,
		value: []
	};
	
};
jsCow.res.model.noderadio.prototype = {

	init: function() {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.noderadio = function() {
	
	this.dom = {};
	this.dom.main = $('<div/>')
		.addClass('jsc-node-radio');
	this.dom.content = $('<div/>')
		.addClass('jsc-node-radio-buttons')
		.appendTo(this.dom.main);

};
jsCow.res.view.noderadio.prototype = {
	
	init: function(e) {
		var self = this;

		var clickHandler = (function(i) {
			return function(e) {
				if ($(this).hasClass('jsc-node-radio-active')) {
					self.trigger('state', {
						index: i,
						selected: false
					});
					$(this).removeClass('jsc-node-radio-active');
				}else{
					self.trigger('state', {
						index: i,
						selected: true
					});
					$(this).addClass('jsc-node-radio-active');
				}
			};
		});

		for (var r=0; r < e.data.value.length; r++) {
			var i = r;
			
			var btn = $('<div/>').text(e.data.value[r].title).on('click', clickHandler(i));
			
			if (e.data.value[r].selected) {
				btn.addClass('jsc-node-radio-active');
			}else{
				btn.removeClass('jsc-node-radio-active');
			}

			this.dom.content.append(btn);

		}

		this.trigger("view.update", e.data);
		
	},
	
	update: function(e) {	
		var self = this;

		if (e.data.enabled) {
			
			this.dom.main.removeClass('jsc-node-radio-disabled').addClass('jsc-node-radio');
			
			if (e.data.visible) {
				this.dom.main.show();
			}else{
				this.dom.main.hide();
			}
			
		}else{
			
			this.dom.main.removeClass('jsc-node-radio').addClass('jsc-node-radio-disabled');
			
		}
	}
	
};

jsCow.res.controller.noderadio = function() {};
jsCow.res.controller.noderadio.prototype = {
	
	init: function() {
		this.on("model.ready", this.isModelReady);
		this.on("state", this.state);
	},
	
	isModelReady: function() {
		this.trigger("view.init", this.cmp().config());
	},
	
	state: function(e) {
		var cfg = this.cmp().config().value;
		
		cfg[e.data.index].selected = e.data.selected;
		
		this.cmp().config({
			value: cfg
		});

		this.trigger('node.config.changed');
	}

};
