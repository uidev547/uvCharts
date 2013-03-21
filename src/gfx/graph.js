/**
 * uv is the namespace, which holds everything else related to the library
 * @type {Object}
 */
var uv = {};

/**
 * uv.Graph is an abstract class of sorts which serves as the base for all other graphs.
 * id					- unique id corresponding to the graph, created using current timestamp
 * graphdef		- definition of the graph, containing data on which the visualization is built
 * config			- configuration of the graph, affecting the visual styling of the graph
 * frame			- <svg> element acting as the parent graph container
 * panel			- <g> element containing everything else, making it easier to move all elements across the svg
 * bg					- <rect> element which acts as the background for the graph
 * effects		- object containing functions which cause the various interactions on the graph
 * labels			- labels from the dataset provided
 * categories	- categories from the dataset provided
 * axes				- object containing axes related stuff: group, func, scale, axis, line, label
 *
 */
uv.Graph = function () {
	var self = this;
	self.id = uv.util.getUniqueId();
	self.graphdef = null;
	self.config = null;

	self.frame = null;
	self.panel = null;
	self.bg = null;
	self.effects = {};
	self.axes = {
		hor : { group: null, scale : null, func: null, axis : null, line : null, label : null },
		ver : { group: null, scale : null, func: null, axis : null, line : null, label : null }
	};

	self.labels = null;
	self.categories = null;

	return this;
};

/**
 * As the name suggests, this function initializes graph object construction based on the config and graphdef
 * @param  {Object} graphdef Definition of the graph, take a look at constants.js for complete documentation
 * @param  {Object} config   Configuration of the graph, take a look at config.js for complete documentation
 * @return {Object}          The graph object itself, to support method chaining
 */
uv.Graph.prototype.init = function (graphdef, config) {
	var self = this;
	self.graphdef = graphdef;
	self.config = $.extend(true, {}, uv.config, config);
	self.max(self.graphdef.stepup)
		.position(self.config.meta.position || 'body')
		.setDimensions()
		.setFrame()
		.setPanel()
		.setBackground()
		.setCaption()
		.setSubCaption()
		.setMetadata()
		.setHorizontalAxis()
		.setVerticalAxis()
		.setEffectsObject();
		
	return this;
};

/**
 * Sets the dimensions of the graphs, namely height, width and margins: left, right, top and bottom
 * @return {Object}				The graph object itself, to support method chaining
 */
uv.Graph.prototype.setDimensions = function () {
	var self = this;
	self.height(self.config.dimension.height)
		.width(self.config.dimension.width)
		.top(self.config.margin.top)
		.bottom(self.config.margin.bottom)
		.left(self.config.margin.left)
		.right(self.config.margin.right);
	
	return this;
};

/**
 * Sets the main <svg> element which contains rest of the graph elements
 * @return {Object}				The graph object itself, to support method chaining
 */
uv.Graph.prototype.setFrame = function () {
	var self = this;
	if (!self.frame) {
		self.frame = d3.select(self.position() || 'body').append('svg');
	}

	self.frame.attr('id', uv.constants.name.frame + '_' + self.id)
		.classed(uv.constants.name.frame, true)
		.attr('width', self.width() + self.left() + self.right())
		.attr('height', self.height() + self.top() + self.bottom());

	self.frame.append('rect').classed('r3_frame_bg', true)
		.attr('width', self.width() + self.left() + self.right())
		.attr('height', self.height() + self.top() + self.bottom())
		.style('fill', self.config.frame.bgcolor);

	self.$ = $('svg#' + uv.constants.name.frame + '_' + self.id);

	return this;
};

/**
 * Sets the <g> element which serves as the base position for the graph elements
 * @return {Object}				The graph object itself, to support method chaining
 */
uv.Graph.prototype.setPanel = function () {
	var self = this;
	if (!self.panel) {
		self.panel = self.frame.append('g');
	}

	self.panel.attr('id', uv.constants.name.panel + '_' + self.id)
		.classed(uv.constants.name.panel, true)
		.attr('transform', 'translate(' + self.left() + ',' + self.top() + ')');

	return this;
};

/**
 * Sets the <rect> element which serves as the background for the chart
 * @param {String} color Color code for the background, set to config value if not specified
 * @return {Object}			The graph object itself, to support method chaining
 */
uv.Graph.prototype.setBackground = function (color) {
	var self = this;
	if (!self.bg) {
		self.bg = self.panel.append('rect').attr('class', uv.constants.name.background)
						.attr('height', self.height())
						.attr('width', self.width());
	}

	self.bg.style('fill', color || self.config.graph.background);
	return this;
};

/**
 * Sets the caption for the graph
 * @return {Object}			The graph object itself, to support method chaining
 */
uv.Graph.prototype.setCaption = function () {
	var self = this;
	self.caption = self.panel.append('g').attr('class', 'r3_caption');
	
	self.caption.append('text').attr('class', 'r3_captiontext')
		.text(self.config.meta.caption)
		.attr('y', -self.config.margin.top / 2)
		.attr('x', self.config.dimension.width / 2)
		.attr('text-anchor', self.config.caption.textanchor)
		.style('font-family', self.config.caption.fontfamily)
		.style('font-size', self.config.caption.fontsize)
		.style('font-weight', self.config.caption.fontweight)
		.style('font-variant', self.config.caption.fontvariant)
		.style('text-decoration', self.config.caption.textdecoration)
		.on('mouseover', uv.effects.caption.mouseover(self.config))
		.on('mouseout', uv.effects.caption.mouseout(self.config));

	return this;
};


/**
 * Sets the subcaption for the graph
 * @return {Object}			The graph object itself, to support method chaining
 */
uv.Graph.prototype.setSubCaption = function () {
	var self = this;
	self.subCaption = self.panel.append('g').attr('class', 'r3_subCaption');
	
	self.subCaption.append('text').attr('class', 'r3_subcaptiontext')
		.text(self.config.meta.subcaption)
		.attr('y', -self.config.margin.top / 2 + 1*self.config.caption.fontsize)
		.attr('x', self.config.dimension.width / 2)
		.attr('text-anchor', self.config.caption.textanchor)
		.style('font-family', self.config.subCaption.fontfamily)
		.style('font-size', self.config.subCaption.fontsize)
		.style('font-weight', self.config.subCaption.fontweight)
		.style('font-variant', self.config.subCaption.fontvariant)
		.style('text-decoration', self.config.subCaption.textdecoration);

	return this;
};


/**
 * Sets the metadata for the graph, this includes the labels and the categories
 * @return {Object}			The graph object itself, to support method chaining
 */
uv.Graph.prototype.setMetadata = function () {
	var self = this;
	self.labels = uv.util.getLabelArray(self.graphdef);
	self.categories = uv.util.getCategoryArray(self.graphdef);
	return this;
};

/**
 * Sets the Horizontal Axis functions but doesnt render it yet
 * return {Object}			The graph object itself, to support method chaining
 */
uv.Graph.prototype.setHorizontalAxis = function () {
	var self = this;
	var graphdef = self.graphdef;
	if (!self.axes.hor.group) {
		self.axes.hor.group = self.panel.append('g').attr('class', uv.constants.name.horaxis)
									.attr('transform', 'translate(0,' + self.height() + ')')
									.style('sharp-rendering','crispEdges');
	}

	if (self.config.graph.orientation === 'Horizontal') {
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

/**
 * Sets the Vertical axis functions, but doesnt render it yet
 * @return {Object}				The graph object itself, to support method chaining
 */
uv.Graph.prototype.setVerticalAxis = function () {
	var self = this;
	var graphdef = self.graphdef;
	if (!self.axes.ver.group) {
		self.axes.ver.group = self.panel.append('g').attr('class', uv.constants.name.veraxis)
															.style('sharp-rendering','crispEdges');
	}

	if (self.config.graph.orientation === 'Vertical') {
		self.axes.ver.scale	= d3.scale.linear()
								.domain([self.max(), 0])
								.range([0, self.height()])
								.nice();
		
		self.axes.ver.func = d3.svg.axis()
								.scale(self.axes.ver.scale)
								.ticks(self.config.axis.ticks)
								.tickSize(-self.width(), self.config.axis.minor, 0)
								.tickPadding(self.config.axis.padding)
								.tickSubdivide(self.config.axis.subticks)
								.orient('left');
	} else {
		self.axes.ver.scale = d3.scale.ordinal()
								.rangeRoundBands([0, self.width()], self.config.scale.ordinality);
		
		self.axes.ver.func = d3.svg.axis()
								.scale(self.axes.ver.scale)
								.tickPadding(self.config.axis.padding)
								.orient('left');
	}

	return this;
};

/**
 * Creates placeholders for functions which cause the various animations across the graph to be able invoke it from other places
 * @return {Object}				The graph object itself, to support method chaining
 */
uv.Graph.prototype.setEffectsObject = function () {
	var self = this;
	for (var i = 0; i < self.categories.length ; i++) {
		self.effects[self.categories[i]] = {};
	}
	return self;
};

/**
 * Draws the horizontal axis within the frame based on the orientation and functions already created
 * @return {Object} The graph object itself, to support method chaining
 */
uv.Graph.prototype.drawHorizontalAxis = function () {
	var self = this;
	self.axes.hor.axis = self.axes.hor.group.append('g')
								.style('font-family', self.config.label.fontfamily)
								.style('font-size', self.config.label.fontsize)
								.style('font-weight', self.config.label.fontweight)
								.call(self.axes.hor.func);

	self.axes.hor.axis.selectAll('line').style('stroke', self.config.axis.strokecolor);
	self.axes.hor.axis.selectAll('path').style('fill','none');

	self.axes.hor.line = self.panel.append('line')
								.attr('class', uv.constants.name.horaxis)
								.attr('y1', self.height())
								.attr('y2', self.height())
								.attr('x1', '0')
								.attr('x2', self.width())
								.style('stroke', self.config.axis.strokecolor);
	
	self.axes.hor.label = self.axes.hor.group.append('g')
														.classed('r3_axeslabelgroup', true)
														.attr('transform', 'translate(' + self.width()/2 + ',' + (self.config.margin.bottom/2 + 1*self.config.label.fontsize) + ')');
								
	self.axes.hor.label.append('text')
								.attr('display','block')
								.attr('class','r3_axeslabel').classed('cal', true)
								.attr('text-anchor','middle')
								.style('font-size', self.config.axis.fontsize)
								.style('font-family', self.config.axis.fontfamily)
								.text(self.config.meta.hlabel);

	self.axes.hor.label.append('text')
								.attr('display','block')
								.attr('y', 1*self.config.axis.fontsize)
								.attr('class','r3_axessublabel').classed('casl', true)
								.attr('text-anchor','middle')
								.style('font-size', self.config.axis.fontsize - 2)
								.style('font-family', self.config.axis.fontfamily)
								.text(self.config.meta.hsublabel);
	
	return this;
};

/**
 * Draws the vertical axis within the frame based on the orientation and functions already created
 * @return {Object} The graph object itself, to support method chaining
 */
uv.Graph.prototype.drawVerticalAxis = function () {
	var self = this;
	self.axes.ver.axis = self.axes.ver.group.append('g')
								.style('font-family', self.config.label.fontfamily)
								.style('font-size', self.config.label.fontsize)
								.style('font-weight', self.config.label.fontweight)
								.call(self.axes.ver.func);

	self.axes.ver.axis.selectAll('line').style('stroke', self.config.axis.strokecolor);
	self.axes.ver.axis.selectAll('path').style('fill','none');

	self.axes.ver.line = self.panel.append('line')
								.attr('class', uv.constants.name.veraxis)
								.attr('y1', 0)
								.attr('y2', self.height())
								.style('stroke', self.config.axis.strokecolor);
	
	self.axes.ver.label = self.axes.ver.group.append('g')
								.attr('transform', 'translate(' + -4*self.config.margin.left/5 + ',' + self.height()/2 + ')rotate(270)');
								
	self.axes.ver.label.append('text').attr('class','r3_axeslabel')
								.attr('text-anchor', 'middle')
								.classed('cal', true)
								.style('font-family', self.config.axis.fontfamily)
								.style('font-size', self.config.axis.fontsize)
								.text(self.config.meta.vlabel);

	self.axes.ver.label.append('text').attr('class', 'r3_axessublabel')
								.attr('text-anchor', 'middle')
								.attr('y', +self.config.axis.fontsize)
								.classed('casl', true)
								.style('font-family', self.config.axis.fontfamily)
								.style('font-size', self.config.axis.fontsize - 2)
								.text(self.config.meta.vsublabel);
	
	return this;
};

/**
 * Sets the legend and related interactions for the graph based on the configuration
 * @return {Object}	The graph object itself, to support method chaining
 */
uv.Graph.prototype.setLegend = function () {
	var self = this;

	var legendgroup = self.panel.append('g').attr('class', 'r3_legend')
						.attr('transform', 'translate(' + self.width() + ',' + 10 + ')');

	self.legends = legendgroup.selectAll('g').data(self.categories).enter().append('g')
						.attr('transform', function (d, i) { return 'translate(10,' + 10 * (2 * i - 1) + ')'; })
						.attr('class', function (d, i) { return 'cl_' + self.categories[i]; })
						.attr('disabled', 'false')
						.on('mouseover', function (d, i) {
							self.effects[d].mouseover();
						})
						.on('mouseout', function (d, i) {
							self.effects[d].mouseout();
						})
						.on('click', function (d, i) {
							uv.effects.legend.click(i, this, self);
						});

	self.legends.append('rect').attr('class', 'r3_legendsign')
				.attr('height', self.config.legend.symbolsize)
				.attr('width', self.config.legend.symbolsize)
				.style('fill', function (d, i) { return uv.util.getColorBand(self.config, i); })
				.style('stroke', 'none');

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

/**
 * Finalizes stuff related to graph, used in conjuction with init to setup all the generic graph stuff
 * @param  {Boolean} isLoggable Specifies whether the graph object should be logged or not, for debug purpose only
 * @return {Object}             The graph object itself, to support method chaining
 */
uv.Graph.prototype.finalize = function (isLoggable) {
	var self = this;
	self.drawHorizontalAxis()
		.drawVerticalAxis()
		.setLegend();
	
	if (isLoggable) { console.log(self); }
	return this;
};

/*
 * Functions to remove individual elements of an graph
 */

/**
 * Removes the entire graph object
 * @return {Object} The graph object itself, to support method chaining
 */
uv.Graph.prototype.remove = function () {
	this.frame.remove();
	return this;
};

/**
 * Removes the caption component of the graph
 * @return {Object} The graph object itself, to support method chaining
 */
uv.Graph.prototype.removeCaption = function () {
	this.caption.remove();
	return this;
};

/**
 * Removes the legend component of the graph
 * @return {Object} The graph object itself, to support method chaining
 */
uv.Graph.prototype.removeLegend = function () {
	if (this.legends[0]) {
		this.legends[0].parentNode.remove();
	}
	
	return this;
};

uv.Graph.prototype.removePanel = function () {
	this.panel.remove();
	return this;
};

uv.Graph.prototype.removeHorAxis = function () {
	this.panel.selectAll('g.' + uv.constants.name.horaxis + " > *").remove();
	this.panel.selectAll('line.' + uv.constants.name.horaxis).remove();
	return this;
};

uv.Graph.prototype.removeVerAxis = function () {
	this.panel.selectAll('g.' + uv.constants.name.veraxis + " > *").remove();
	this.panel.selectAll('line.' + uv.constants.name.veraxis).remove();
	return this;
};

/*
 * Setters and getters for various common properties of the graph
 */

uv.Graph.prototype.width = function (w) {
	if (w) {
		this.config.dimension.width = w;
		return this;
	}

	return this.config.dimension.width;
};

uv.Graph.prototype.height = function (h) {
	if (h) {
		this.config.dimension.height = h;
		return this;
	}

	return this.config.dimension.height;
};

uv.Graph.prototype.top = function (t) {
	if (t) {
		this.config.margin.top = t;
		return this;
	}

	return this.config.margin.top;
};

uv.Graph.prototype.bottom = function (b) {
	if (b) {
		this.config.margin.bottom = b;
		return this;
	}

	return this.config.margin.bottom;
};

uv.Graph.prototype.left = function (l) {
	if (l) {
		this.config.margin.left = l;
		return this;
	}

	return this.config.margin.left;
};

uv.Graph.prototype.right = function (r) {
	if (r) {
		this.config.margin.right = r;
		return this;
	}

	return this.config.margin.right;
};

uv.Graph.prototype.position = function (pos) {
	if (pos) {
		this.config.meta.position = pos;
		return this;
	}

	return this.config.meta.position;
};

uv.Graph.prototype.caption = function (caption) {
	if (caption) {
		this.config.meta.caption = caption;
		return this;
	}

	return this.config.meta.caption;
};

uv.Graph.prototype.subCaption = function(subCaption){
	if(subCaption){
		this.config.meta.subCaption = subCaption;
		return this;
	}

	return this.config.meta.caption;
};

uv.Graph.prototype.max = function (stepup) {
	if (stepup === true) {
		this.config.graph.max = uv.util.getStepMaxValue(this.graphdef);
		return this;
	} else if (stepup === false) {
		this.config.graph.max = uv.util.getMaxValue(this.graphdef);
		return this;
	} else if (stepup === 'percent') {
		this.config.graph.max = 100;
		return this;
	}

	return this.config.graph.max;
};

/* Additional Graph functions */
uv.Graph.prototype.toggleGraphGroup = function (i) {
	var self = this, category = self.categories[i],
			state = self.frame.select('g.cge_' + category).style('display'),
			color = uv.util.getColorBand(self.config, i);

	self.frame.selectAll('g.cge_' + category).style('display', (state === 'none')? null : 'none');
	return this;
};