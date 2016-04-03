
jsCow.res.components.nodecheckbox = function() { };
jsCow.res.components.nodecheckbox.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.nodecheckbox);
		this.addModel(jsCow.res.model.nodecheckbox);
		this.addView(jsCow.res.view.nodecheckbox);
		
		return this;
	}

};

jsCow.res.model.nodecheckbox = function() {
	
	this.data = {
		enabled: true,
		visible: true,
		value: []
	};
	
};
jsCow.res.model.nodecheckbox.prototype = {

	init: function() {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.nodecheckbox = function() {
	
	this.dom = {};
	this.dom.main = $('<div/>')
		.addClass('jsc-node-checkbox');
	this.dom.title = $('<div/>')
		.addClass('jsc-node-checkbox-title')
		.appendTo(this.dom.main);
	this.dom.content = $('<div/>')
		.addClass('jsc-node-checkbox-buttons')
		.appendTo(this.dom.main);

};
jsCow.res.view.nodecheckbox.prototype = {
	
	init: function(e) {
		var self = this;

		var clickHandler = (function(i) {
			return function(e) {
				if ($(this).hasClass('jsc-node-checkbox-active')) {
					self.trigger('state', {
						index: i,
						selected: false
					});
					$(this).removeClass('jsc-node-checkbox-active');
				}else{
					self.trigger('state', {
						index: i,
						selected: true
					});
					$(this).addClass('jsc-node-checkbox-active');
				}
			};
		});

		for (var r=0; r < e.data.value.length; r++) {
			var i = r;
			
			var btn = $('<div/>').text(e.data.value[r].title).on('click', clickHandler(i));
			
			if (e.data.value[r].selected) {
				btn.addClass('jsc-node-checkbox-active');
			}else{
				btn.removeClass('jsc-node-checkbox-active');
			}

			this.dom.content.append(btn);

		}

		this.trigger("view.update", e.data);
		
	},
	
	update: function(e) {	
		var self = this;

		if (e.data.enabled) {
			
			this.dom.main.removeClass('jsc-node-checkbox-disabled').addClass('jsc-node-checkbox');
			
			if (e.data.title) {
				this.dom.title.html(e.data.title);
			}

			if (e.data.visible) {
				this.dom.main.show();
			}else{
				this.dom.main.hide();
			}
			
		}else{
			
			this.dom.main.removeClass('jsc-node-checkbox').addClass('jsc-node-checkbox-disabled');
			
		}
	}
	
};

jsCow.res.controller.nodecheckbox = function() {};
jsCow.res.controller.nodecheckbox.prototype = {
	
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
