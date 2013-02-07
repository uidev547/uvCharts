var r3 = {};

r3.graph = function () {
	this.id = r3.util.getUniqueId();
	this.graphdef = undefined;	/* Dataset definition for the graph */
	this.config = $.extend(true, {}, r3.config); /* Graph configuration */

	this.frame = undefined;		/* <svg> containing panel*/
	this.panel = undefined;		/* <g> containing all other elements*/
	this.bg = undefined;		/* <rect> acting as the background */

	this.labels = undefined;
	this.categories = undefined;

	this.axes = {
		hor : { group: undefined, scale : undefined, func: undefined, axis : undefined, line : undefined, label : undefined },
		ver : { group: undefined, scale : undefined, func: undefined, axis : undefined, line : undefined, label : undefined }
	};
	
	this.$ = undefined;
};

r3.graph.prototype.init = function (graphdef) {
	var self = this;
	self.graphdef = graphdef;
	self.max(self.graphdef.stepup)
		.position(self.config.meta.position || ('#' + r3.constants.name.pos) || 'body')
		.setDimensions()
		.setFrame()
		.setPanel()
		.setBackground()
		.setCaption()
		.setSubCaption()
		.setMetadata()
		.setHorAxis()
		.setVerAxis();
		
	return this;
};

r3.graph.prototype.setDimensions = function () {
	var self = this;
	self.height(self.config.dimension.height)
		.width(self.config.dimension.width)
		.top(self.config.margin.top)
		.bottom(self.config.margin.bottom)
		.left(self.config.margin.left)
		.right(self.config.margin.right);
	
	return this;
};

r3.graph.prototype.setFrame = function (className) {
	var self = this;
	if (self.frame === undefined) {
		self.frame = d3.select(self.position() || 'body').append('svg');
	}

	self.frame.attr('class', r3.constants.name.frame + '_' + self.id)
		.attr('width', self.width() + self.left() + self.right())
		.attr('height', self.height() + self.top() + self.bottom());
	
	self.$ = $('.' + r3.constants.name.frame + '_' + self.id);

	return this;
};

r3.graph.prototype.setPanel = function (className) {
	var self = this;
	if (self.panel === undefined) {
		self.panel = self.frame.append('g');
	}

	self.panel.attr('class', className || r3.constants.name.panel)
		.attr('transform', 'translate(' + self.left() + ',' + self.top() + ')');

	return this;
};

r3.graph.prototype.setBackground = function (color) {
	var self = this;
	if (self.bg === undefined) {
		self.bg = self.panel.append('rect').attr('class', r3.constants.name.background)
						.attr('height', self.height())
						.attr('width', self.width());
	}

	self.bg.style('fill', color || self.config.graph.background);
	return this;
};

r3.graph.prototype.setCaption = function () {
	var self = this;
	self.caption = self.panel.append('g').attr('class', 'r3_caption');
	
	self.caption.append('text').attr('class', 'r3_captiontext')
		.text(self.config.meta.caption)
		.attr('y', -self.config.margin.top / 2)
		.attr('x', self.config.dimension.width / 2)
		.attr('text-anchor', 'middle')
		.style('font-family', self.config.caption.fontfamily)
		.style('font-size', self.config.caption.fontsize)
		.style('font-weight', self.config.caption.fontweight)
		.style('font-variant', self.config.caption.fontvariant)
		.style('text-decoration', self.config.caption.textdecoration)
		.on('mouseover', r3.effects.caption.mouseover(self.config))
		.on('mouseout', r3.effects.caption.mouseout(self.config));

	return this;
};

r3.graph.prototype.setSubCaption = function () {
	var self = this;
	self.subCaption = self.panel.append('g').attr('class', 'r3_subCaption');
	
	self.subCaption.append('text').attr('class', 'r3_subcaptiontext')
		.text(self.config.meta.subCaption)
		.attr('y', -self.config.margin.top / 2 + 1*self.config.caption.fontsize)
		.attr('x', self.config.dimension.width / 2)
		.attr('text-anchor', 'middle')
		.style('font-family', self.config.subCaption.fontfamily)
		.style('font-size', self.config.subCaption.fontsize)
		.style('font-weight', self.config.subCaption.fontweight)
		.style('font-variant', self.config.subCaption.fontvariant)
		.style('text-decoration', self.config.subCaption.textdecoration);

	return this;
};

r3.graph.prototype.setMetadata = function () {
	var self = this;
	self.labels = r3.util.getLabelArray(self.graphdef);
	self.categories = r3.util.getCategoryArray(self.graphdef);
	return this;
};

r3.graph.prototype.setHorAxis = function () {
	var self = this;
	var graphdef = self.graphdef;
	if (self.axes.hor.group === undefined) {
		self.axes.hor.group = self.panel.append('g').attr('class', r3.constants.name.horaxis)
									.attr('transform', 'translate(0,' + self.height() + ')');
	}

	if (graphdef.orientation === 'hor') {
		self.axes.hor.scale	= d3.scale.linear()
								.domain([0, self.max()])
								.range([0, self.width()])
								.nice();
		
		self.axes.hor.func = d3.svg.axis()
								.scale(self.axes.hor.scale)
								.ticks(self.config.axis.ticks)
								.tickSize(-self.width(), self.config.axis.minor, 0)
								.tickPadding(self.config.axis.padding)
								.tickSubdivide(self.config.axis.subticks)
								.orient('bottom');
	} else {
		self.axes.hor.scale = d3.scale.ordinal()
								.rangeRoundBands([0, self.width()], self.config.scale.ordinality);
		
		self.axes.hor.func = d3.svg.axis()
								.scale(self.axes.hor.scale)
								.tickPadding(self.config.axis.padding)
								.orient('bottom');
	}

	return this;
};

r3.graph.prototype.setVerAxis = function () {
	var self = this;
	var graphdef = self.graphdef;
	if (self.axes.ver.group === undefined) {
		self.axes.ver.group = self.panel.append('g').attr('class', r3.constants.name.veraxis);
	}

	if (graphdef.orientation === 'ver') {
		self.axes.ver.scale	= d3.scale.linear()
								.domain([self.max(), 0])
								.range([0, self.height()])
								.nice();
		
		self.axes.ver.func = d3.svg.axis()
								.scale(self.axes.ver.scale)
								.ticks(self.config.axis.ticks)
								.tickSize(-self.height(), self.config.axis.minor, 0)
								.tickPadding(self.config.axis.padding)
								.tickSubdivide(self.config.axis.subticks)
								.orient('left');
	} else {
		self.axes.ver.scale = d3.scale.ordinal()
								.rangeRoundBands([0, self.height()], self.config.scale.ordinality);
		
		self.axes.ver.func = d3.svg.axis()
								.scale(self.axes.ver.scale)
								.tickPadding(self.config.axis.padding)
								.orient('left');
	}

	return this;
};

r3.graph.prototype.drawHorAxis = function () {
	var self = this;
	self.axes.hor.axis = self.axes.hor.group.append('g')
								.style('font-family', self.config.axis.fontfamily)
								.style('font-size', self.config.axis.fontsize)
								.style('font-weight', self.config.axis.fontweight)
								.call(self.axes.hor.func);

	self.axes.hor.axis.selectAll('line').style('stroke', self.config.axis.strokecolor);
	self.axes.hor.axis.selectAll('path').style('fill','none');

	self.axes.hor.line = self.panel.append('line')
								.attr('class', r3.constants.name.horaxis)
								.attr('y1', self.height())
								.attr('y2', self.height())
								.attr('x1', '0')
								.attr('x2', self.width())
								.style('stroke', self.config.axis.strokecolor);
	
	self.axes.hor.label = self.axes.hor.group.append('text')
								.attr('display','block')
								.attr('class','r3_axeslabel')
								.attr('x', self.width()/2)
								.attr('y', self.config.margin.bottom/2)
								.attr('text-anchor','middle')
								.text('Horizontal Axis Label');
	
	return this;
};

r3.graph.prototype.drawVerAxis = function () {
	var self = this;
	self.axes.ver.axis = self.axes.ver.group.append('g')
								.style('font-family', self.config.axis.fontfamily)
								.style('font-size', self.config.axis.fontsize)
								.style('font-weight', self.config.axis.fontweight)
								.call(self.axes.ver.func);

	self.axes.ver.axis.selectAll('line').style('stroke', self.config.axis.strokecolor);
	self.axes.ver.axis.selectAll('path').style('fill','none');

	self.axes.ver.line = self.panel.append('line')
								.attr('class', r3.constants.name.veraxis)
								.attr('y1', 0)
								.attr('y2', self.height())
								.style('stroke', self.config.axis.strokecolor);
	
	self.axes.ver.label = self.axes.ver.group.append('text').attr('class','r3_axeslabel')
								.attr('x', -4*self.config.margin.left/5)
								.attr('y', self.height()/2)
								//.style('transform','rotate(90deg)')
								.style('width','1em')
								.style('writing-mode','tb-rl')
								.style('filter','flipv fliph')
								.style('white-space','nowrap')
								.style('-o-tranform','rotate(270deg)')
								.style('-moz-tranform','rotate(270deg)')
								.style('-webkit-tranform','rotate(270deg)')
								.attr('text-anchor', 'middle')
								.text('Vertical Axis Label');
	
	return this;
};

r3.graph.prototype.setLegend = function () {
	var self = this;

	var legendgroup = self.panel.append('g').attr('class', 'r3_legend')
						.attr('transform', 'translate(' + self.width() + ',' + 10 + ')');

	self.legends = legendgroup.selectAll('g').data(self.categories).enter().append('g')
						.attr('transform', function (d, i) { return 'translate(10,' + 10 * (2 * i - 1) + ')'; })
						.attr('class', function (d, i) { return 'r3_legend_' + self.categories[i]; });

	self.legends.append('rect').attr('class', 'r3_legendsign')
				.attr('height', self.config.legend.symbolsize)
				.attr('width', self.config.legend.symbolsize)
				.style('fill', function (d, i) { return r3.util.getColorBand(self.config, i); })
				.style('stroke', 'none')
				.on('mouseover', r3.effects.legend.mouseover(self))
				.on('mouseout', r3.effects.legend.mouseout(self));

	self.legends.append('text').attr('class', 'r3_legendtext')
				.text(function (d, i) { return self.categories[i]; })
				.attr('dx', self.config.legend.textmargin)
				.attr('dy', '.71em')
				.attr('text-anchor', 'start')
				.style('font-family', self.config.legend.fontfamily)
				.style('font-size', self.config.legend.fontsize)
				.style('font-weight', self.config.legend.fontweight);

	return this;
};

r3.graph.prototype.finalize = function () {
	var self = this;
	self.drawHorAxis()
		.drawVerAxis()
		.setLegend();
	
	//Uncomment to log graph objects
	//console.log(self);
	self.axes.hor.group.select('.r3_axeslabel').remove();
	self.axes.ver.group.select('.r3_axeslabel').remove();
	return self;
};

/*
 * Functions to remove individual elements of an graph
 */

r3.graph.prototype.remove = function () {
	this.frame.remove(); 
	return this;
};

r3.graph.prototype.removeCaption = function () {
	this.caption.remove(); 
	return this;
};

r3.graph.prototype.removeLegend = function () {
	if (this.legends[0]) {
		this.legends[0].parentNode.remove();
	}
	
	return this;
};

r3.graph.prototype.removePanel = function () {
	this.panel.remove(); 
	return this;
};

r3.graph.prototype.removeHorAxis = function () {
	this.panel.selectAll('g.' + r3.constants.name.horaxis + " > *").remove();
	this.panel.selectAll('line.' + r3.constants.name.horaxis).remove();
	return this;
};

r3.graph.prototype.removeVerAxis = function () {
	this.panel.selectAll('g.' + r3.constants.name.veraxis + " > *").remove();
	this.panel.selectAll('line.' + r3.constants.name.veraxis).remove();
	return this;
};

/*
 * Setters and getters for various common properties of the graph
 */

r3.graph.prototype.width = function (w) {
	if (w) {
		this.config.dimension.width = w;
		return this;
	}

	return this.config.dimension.width;
};

r3.graph.prototype.height = function (h) {
	if (h) {
		this.config.dimension.height = h;
		return this;
	}

	return this.config.dimension.height;
};

r3.graph.prototype.top = function (t) {
	if (t) {
		this.config.margin.top = t;
		return this;
	}

	return this.config.margin.top;
};

r3.graph.prototype.bottom = function (b) {
	if (b) {
		this.config.margin.bottom = b;
		return this;
	}

	return this.config.margin.bottom;
};

r3.graph.prototype.left = function (l) {
	if (l) {
		this.config.margin.left = l;
		return this;
	}

	return this.config.margin.left;
};

r3.graph.prototype.right = function (r) {
	if (r) {
		this.config.margin.right = r;
		return this;
	}

	return this.config.margin.right;
};

r3.graph.prototype.position = function (pos) {
	if (pos) {
		this.config.meta.position = pos;
		return this;
	}

	return this.config.meta.position;
};

r3.graph.prototype.caption = function (caption) {
	if (caption) {
		this.config.meta.caption = caption;
		return this;
	}

	return this.config.meta.caption;
};

r3.graph.prototype.subCaption = function(subCaption){
	if(subCaption){
		this.config.meta.subCaption = subCaption;
		return this;
	}

	return this.config.meta.caption;
}

r3.graph.prototype.max = function (stepup) {
	if (stepup === true) {
		this.config.graph.max = r3.util.getStepMaxValue(this.graphdef);
		return this;
	} else if (stepup === false) {
		this.config.graph.max = r3.util.getMaxValue(this.graphdef);
		return this;
	} else if (stepup === 'percent') {
		this.config.graph.max = 100;
		return this;
	}

	return this.config.graph.max;
};