
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
		value: null,
		checked: false
	};
	
};
jsCow.res.model.nodecheckbox.prototype = {

	init: function() {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.nodecheckbox = function() {
	
	this.dom = {};
	this.dom.main = $('<label/>')
		.addClass('jsc-node-checkbox');
	this.dom.content = $('<i class="fa"></i>')
		.addClass('jsc-node-checkbox-icon')
		.appendTo(this.dom.main);
	this.dom.title = $('<span/>')
		.addClass('jsc-node-checkbox-title')
		.appendTo(this.dom.main);

};
jsCow.res.view.nodecheckbox.prototype = {
	
	init: function(e) {
		var self = this;
		
		this.on('state', this.state);
		
		this.dom.main
			.on('click', function(e) {
				e.preventDefault();

				if (self.cmp().config().checked) {
					
					self.trigger('state', {
						checked: false
					});

				}else{
					
					self.trigger('state', {
						checked: true
					});

				}

				self.trigger('node.config.changed');

			});
		
		this.trigger('state', {
			checked: e.data.checked
		});

		this.trigger("view.update", e.data);
		
	},
	
	update: function(e) {	
		
		if (e.data.enabled) {
			
			this.dom.main.removeClass('jsc-node-checkbox-disabled').addClass('jsc-node-checkbox');
			
			if (e.data.value) {
				this.dom.content.val(e.data.value);
			}

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
	},

	state: function(e) {
		if (e.data.checked) {
			this.dom.content.removeClass('fa fa-check-square-o').addClass('fa fa-square-o');
		}else{
			this.dom.content.removeClass('fa fa-square-o').addClass('fa fa-check-square-o');
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
		this.cmp().config({
			checked: e.data.checked
		});
	}

};
