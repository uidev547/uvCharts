/**
 * r3 is the namespace, which holds everything else related to the library
 * @type {Object}
 */
var r3 = {};

/**
 * r3.Graph is an abstract class of sorts which serves as the base for all other graphs.
 * id					- unique id corresponding to the graph, created using the timestamp
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
 *
 */
r3.Graph = function () {
	var self = this;
	self.id = r3.util.getUniqueId();
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
r3.Graph.prototype.init = function (graphdef, config) {
	var self = this;
	self.graphdef = graphdef;
	self.config = $.extend(true, {}, r3.config, config);
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
r3.Graph.prototype.setDimensions = function () {
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
r3.Graph.prototype.setFrame = function () {
	var self = this;
	if (!self.frame) {
		self.frame = d3.select(self.position() || 'body').append('svg');
	}

	self.frame.attr('id', r3.constants.name.frame + '_' + self.id)
		.classed(r3.constants.name.frame, true)
		.attr('width', self.width() + self.left() + self.right())
		.attr('height', self.height() + self.top() + self.bottom());

	self.frame.append('rect').classed('r3_frame_bg', true)
		.attr('width', self.width() + self.left() + self.right())
		.attr('height', self.height() + self.top() + self.bottom())
		.style('fill', self.config.frame.bgcolor);

	self.$ = $('svg#' + r3.constants.name.frame + '_' + self.id);

	return this;
};

/**
 * Sets the <g> element which serves as the base position for the graph elements
 * @return {Object}				The graph object itself, to support method chaining
 */
r3.Graph.prototype.setPanel = function () {
	var self = this;
	if (!self.panel) {
		self.panel = self.frame.append('g');
	}

	self.panel.attr('id', r3.constants.name.panel + '_' + self.id)
		.classed(r3.constants.name.panel, true)
		.attr('transform', 'translate(' + self.left() + ',' + self.top() + ')');

	return this;
};

/**
 * Sets the <rect> element which serves as the background for the chart
 * @param {String} color Color code for the background, set to config value if not specified
 * @return {Object}			The graph object itself, to support method chaining
 */
r3.Graph.prototype.setBackground = function (color) {
	var self = this;
	if (!self.bg) {
		self.bg = self.panel.append('rect').attr('class', r3.constants.name.background)
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
r3.Graph.prototype.setCaption = function () {
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
		.on('mouseover', r3.effects.caption.mouseover(self.config))
		.on('mouseout', r3.effects.caption.mouseout(self.config));

	return this;
};


/**
 * Sets the subcaption for the graph
 * @return {Object}			The graph object itself, to support method chaining
 */
r3.Graph.prototype.setSubCaption = function () {
	var self = this;
	self.subCaption = self.panel.append('g').attr('class', 'r3_subCaption');
	
	self.subCaption.append('text').attr('class', 'r3_subcaptiontext')
		.text(self.config.meta.subCaption)
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
r3.Graph.prototype.setMetadata = function () {
	var self = this;
	self.labels = r3.util.getLabelArray(self.graphdef);
	self.categories = r3.util.getCategoryArray(self.graphdef);
	return this;
};

/**
 * Sets the Horizontal Axis functions but doesnt render it yet
 * return {Object}			The graph object itself, to support method chaining
 */
r3.Graph.prototype.setHorizontalAxis = function () {
	var self = this;
	var graphdef = self.graphdef;
	if (!self.axes.hor.group) {
		self.axes.hor.group = self.panel.append('g').attr('class', r3.constants.name.horaxis)
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
r3.Graph.prototype.setVerticalAxis = function () {
	var self = this;
	var graphdef = self.graphdef;
	if (!self.axes.ver.group) {
		self.axes.ver.group = self.panel.append('g').attr('class', r3.constants.name.veraxis)
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
r3.Graph.prototype.setEffectsObject = function () {
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
r3.Graph.prototype.drawHorizontalAxis = function () {
	var self = this;
	self.axes.hor.axis = self.axes.hor.group.append('g')
								.style('font-family', self.config.label.fontfamily)
								.style('font-size', self.config.label.fontsize)
								.style('font-weight', self.config.label.fontweight)
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
	
	self.axes.hor.label = self.axes.hor.group.append('g')
														.classed('r3_axeslabelgroup', true)
														.attr('transform', 'translate(' + self.width()/2 + ',' + (self.config.margin.bottom/2 + 1*self.config.label.fontsize) + ')');
								
	self.axes.hor.label.append('text')
								.attr('display','block')
								.attr('class','r3_axeslabel').classed('cal', true)
								.attr('text-anchor','middle')
								.style('font-size', self.config.axis.fontsize)
								.style('font-family', self.config.axis.fontfamily)
								.text(self.config.axis.hlabel);

	self.axes.hor.label.append('text')
								.attr('display','block')
								.attr('y', 1*self.config.axis.fontsize)
								.attr('class','r3_axessublabel').classed('casl', true)
								.attr('text-anchor','middle')
								.style('font-size', self.config.axis.fontsize - 2)
								.style('font-family', self.config.axis.fontfamily)
								.text(self.config.axis.hsublabel);
	
	return this;
};

/**
 * Draws the vertical axis within the frame based on the orientation and functions already created
 * @return {Object} The graph object itself, to support method chaining
 */
r3.Graph.prototype.drawVerticalAxis = function () {
	var self = this;
	self.axes.ver.axis = self.axes.ver.group.append('g')
								.style('font-family', self.config.label.fontfamily)
								.style('font-size', self.config.label.fontsize)
								.style('font-weight', self.config.label.fontweight)
								.call(self.axes.ver.func);

	self.axes.ver.axis.selectAll('line').style('stroke', self.config.axis.strokecolor);
	self.axes.ver.axis.selectAll('path').style('fill','none');

	self.axes.ver.line = self.panel.append('line')
								.attr('class', r3.constants.name.veraxis)
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
								.text(self.config.axis.vlabel);

	self.axes.ver.label.append('text').attr('class', 'r3_axessublabel')
								.attr('text-anchor', 'middle')
								.attr('y', +self.config.axis.fontsize)
								.classed('casl', true)
								.style('font-family', self.config.axis.fontfamily)
								.style('font-size', self.config.axis.fontsize - 2)
								.text(self.config.axis.vsublabel);
	
	return this;
};

/**
 * Sets the legend and related interactions for the graph based on the configuration
 * @return {Object}	The graph object itself, to support method chaining
 */
r3.Graph.prototype.setLegend = function () {
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
							r3.effects.legend.click(i, this, self);
						});

	self.legends.append('rect').attr('class', 'r3_legendsign')
				.attr('height', self.config.legend.symbolsize)
				.attr('width', self.config.legend.symbolsize)
				.style('fill', function (d, i) { return r3.util.getColorBand(self.config, i); })
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
r3.Graph.prototype.finalize = function (isLoggable) {
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
r3.Graph.prototype.remove = function () {
	this.frame.remove();
	return this;
};

/**
 * Removes the caption component of the graph
 * @return {Object} The graph object itself, to support method chaining
 */
r3.Graph.prototype.removeCaption = function () {
	this.caption.remove();
	return this;
};

/**
 * Removes the legend component of the graph
 * @return {Object} The graph object itself, to support method chaining
 */
r3.Graph.prototype.removeLegend = function () {
	if (this.legends[0]) {
		this.legends[0].parentNode.remove();
	}
	
	return this;
};

r3.Graph.prototype.removePanel = function () {
	this.panel.remove();
	return this;
};

r3.Graph.prototype.removeHorAxis = function () {
	this.panel.selectAll('g.' + r3.constants.name.horaxis + " > *").remove();
	this.panel.selectAll('line.' + r3.constants.name.horaxis).remove();
	return this;
};

r3.Graph.prototype.removeVerAxis = function () {
	this.panel.selectAll('g.' + r3.constants.name.veraxis + " > *").remove();
	this.panel.selectAll('line.' + r3.constants.name.veraxis).remove();
	return this;
};

/*
 * Setters and getters for various common properties of the graph
 */

r3.Graph.prototype.width = function (w) {
	if (w) {
		this.config.dimension.width = w;
		return this;
	}

	return this.config.dimension.width;
};

r3.Graph.prototype.height = function (h) {
	if (h) {
		this.config.dimension.height = h;
		return this;
	}

	return this.config.dimension.height;
};

r3.Graph.prototype.top = function (t) {
	if (t) {
		this.config.margin.top = t;
		return this;
	}

	return this.config.margin.top;
};

r3.Graph.prototype.bottom = function (b) {
	if (b) {
		this.config.margin.bottom = b;
		return this;
	}

	return this.config.margin.bottom;
};

r3.Graph.prototype.left = function (l) {
	if (l) {
		this.config.margin.left = l;
		return this;
	}

	return this.config.margin.left;
};

r3.Graph.prototype.right = function (r) {
	if (r) {
		this.config.margin.right = r;
		return this;
	}

	return this.config.margin.right;
};

r3.Graph.prototype.position = function (pos) {
	if (pos) {
		this.config.meta.position = pos;
		return this;
	}

	return this.config.meta.position;
};

r3.Graph.prototype.caption = function (caption) {
	if (caption) {
		this.config.meta.caption = caption;
		return this;
	}

	return this.config.meta.caption;
};

r3.Graph.prototype.subCaption = function(subCaption){
	if(subCaption){
		this.config.meta.subCaption = subCaption;
		return this;
	}

	return this.config.meta.caption;
};

r3.Graph.prototype.max = function (stepup) {
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

/* Additional Graph functions */
r3.Graph.prototype.toggleGraphGroup = function (i) {
	var self = this, category = self.categories[i],
			state = self.frame.select('g.cge_' + category).style('display'),
			color = r3.util.getColorBand(self.config, i);

	self.frame.selectAll('g.cge_' + category).style('display', (state === 'none')? null : 'none');
	return this;
};
r3.util = {};

r3.util.extend = function (f) {
	function G() {}
	G.prototype = f.prototype || f;
	return new G();
};

r3.util.getUniqueId = function () {
	return new Date().getTime();
};

r3.util.getMaxValue = function (graphdef) {
	return d3.max(graphdef.categories.map(function (d) {
		return d3.max(graphdef.dataset[d].map(function (d) {
			return d.value;
		}));
	}));
};

r3.util.getStepMaxValue = function (graphdef) {
	var sumMap = graphdef.dataset[graphdef.categories[0]].map(function () {return 0; });
	graphdef.categories.map(function (d) {
		graphdef.dataset[d].map(function (d, i) {
			sumMap[i] += d.value;
		});
	});

	return d3.max(sumMap);
};

r3.util.getSumUpArray = function (graphdef) {
	var sumMap = graphdef.dataset[graphdef.categories[0]].map(function () {return 0; });
	graphdef.categories.map(function (d) {
		graphdef.dataset[d].map(function (d, i) {
			sumMap[i] += d.value;
		});
	});
	
	return sumMap;
};

r3.util.getPercentage = function (value, total) {
	return value * 100 / total;
};

r3.util.getDataArray = function (graphdef) {
	return graphdef.categories.map(function (d) { return graphdef.dataset[d]; });
};

r3.util.getTabularArray = function (graphdef) {
	var table = [], i, j, catlen, len, arr = [];
	for (i = 0, len = graphdef.dataset[graphdef.categories[0]].length; i < len; i = i + 1) {
		arr = [];
		arr.push(graphdef.dataset[graphdef.categories[0]][i].name);
		for (j = 0, catlen = graphdef.categories.length; j < catlen; j = j + 1) {
			arr.push(graphdef.dataset[graphdef.categories[j]][i].value);
		}
		table.push(arr);
	}
	return table;
};

r3.util.getLabelArray = function (graphdef) {
	return graphdef.dataset[graphdef.categories[0]].map(function (d) { return d.name; });
};

r3.util.getCategoryArray = function (graphdef) {
	return graphdef.categories.map(function (d) { return d; });
};

r3.util.getCategoryData = function (graphdef, categories) {
	return categories.map(function (d) {
		return graphdef.dataset[d].map(function (d) {
			return d.value;
		});
	});
};

r3.util.transposeData = function (graphdef) {
	var dataset = {}, i, j, length, jlength,
		name, label, value, categories = graphdef.dataset[graphdef.categories[0]].map(function (d) { return d.name; });

	for (i = 0, length = categories.length; i < length; i = i + 1) { dataset[categories[i]] = []; }

	for (i = 0, length = graphdef.categories.length; i < length; i = i + 1) {
		name = graphdef.categories[i];
		for (j = 0, jlength = graphdef.dataset[name].length; j < jlength; j = j + 1) {
			label = graphdef.dataset[name][j].name;
			value = graphdef.dataset[name][j].value;
			dataset[label].push({ 'name' : name, 'value' : value });
		}
	}

	graphdef.categories = categories;
	graphdef.dataset = dataset;
};

r3.util.getPascalCasedName = function (name) {
	return name.substring(0, 1).toUpperCase() + name.substring(1);
};

r3.util.getColorBand = function (config, index) {
	var len = r3.palette[config.graph.palette].length;
	return r3.palette[config.graph.palette][index % len];
};
r3.config = {
	graph : {
		palette : 'Brink',
		background : 'white',
		orientation : 'Horizontal',
		max : 0
	},

	meta : {
		position : '.r3_div',
		caption : 'Usage of browsers by the years',
		subCaption : 'Among major vendors'
	},

	dimension : {
		width : 400,
		height : 400
	},

	margin : {
		top : 50,
		bottom : 90,
		left : 100,
		right : 100
	},

	frame : {
		bgcolor : '#fff'
	},

	axis : {
		ticks : 8,
		subticks : 2,
		padding : 5,
		minor : -10,
		strokecolor : '#000',
		fontfamily : 'Arial',
		fontsize : '14',
		fontweight : 'bold',
		hlabel : 'Horizontal Axis Label',
		vlabel : 'Vertical Axis Label',
		hsublabel : 'h sublabel',
		vsublabel : 'v sublabel'
	},

	label : {
		fontfamily : 'Arial',
		fontsize : '11',
		fontweight : 'normal',
		strokecolor : '#000'
	},

	scale : {
		ordinality : 0.2
	},

	bar : {
		strokecolor : 'none',
		fontfamily : 'Arial',
		fontsize : '10',
		fontweight : 'bold',
		textcolor : 'black'
	},

	line : {
		interpolation : 'linear'
	},

	area : {
		interpolation : 'cardinal',
		offset : 'zero',
		opacity : 0.2
	},

	pie : {
		fontfamily : 'Arial',
		fontsize : '14',
		fontweight : 'normal',
		fontvariant : 'small-caps',
		fontfill : 'white',
		strokecolor : 'none',
		strokewidth : 2
	},
	
	donut : {
		fontfamily : 'Arial',
		fontsize : '14',
		fontweight : 'normal',
		fontvariant : 'small-caps',
		fontfill : 'white',
		factor : 0.4,
		strokecolor : 'none',
		strokewidth : 2
	},
	
	caption : {
		fontfamily : 'Arial',
		fontsize : '14',
		fontweight : 'bold',
		fontvariant : 'small-caps',
		textdecoration : 'none',
		hovercolor : 'dimgrey',
		textanchor : 'middle'
	},

	subCaption : {
		fontfamily : 'Arial',
		fontsize : '9',
		fontweight : 'normal',
		fontvariant : 'normal',
		textdecoration : 'none',
		textanchor : 'middle'
	},

	legend : {
		fontfamily : 'Arial',
		fontsize : '11',
		fontweight : 'normal',
		textmargin : 15,
		symbolsize : 10,
		inactive_color : '#DDD'
	},

	effects : {
		hovercolor : 'red',
		strokecolor : 'none',
		textcolor : 'black',
		duration : 800,
		hover : 400
	}
};
r3.constants = {};

r3.constants.graphdef = {
	categories : ['IE', 'Chrome', 'Firefox', 'Opera', 'Safari'],
	dataset : {
		'IE' : [
			{name: '2001', value: 60 },
			{name: '2002', value: 70 },
			{name: '2003', value: 80 },
			{name: '2004', value: 90 },
			{name: '2005', value: 20 }
		],
		'Chrome' : [
			{name: '2001', value: 10},
			{name: '2002', value: 30},
			{name: '2003', value: 50},
			{name: '2004', value: 90},
			{name: '2005', value: 70}
		],
		'Firefox': [
			{name: '2001', value: 50},
			{name: '2002', value: 150},
			{name: '2003', value: 20},
			{name: '2004', value: 80},
			{name: '2005', value: 40}
		],
		'Opera': [
			{name: '2001', value: 90},
			{name: '2002', value: 60},
			{name: '2003', value: 30},
			{name: '2004', value: 10},
			{name: '2005', value: 70}
		],
		'Safari' : [
			{name: '2001', value: 30},
			{name: '2002', value: 10},
			{name: '2003', value: 60},
			{name: '2004', value: 90},
			{name: '2005', value: 40}
		]
	}
};

r3.constants.name = {
	pos : 'r3_div',
	frame : 'r3_frame',
	panel : 'r3_panel',
	background : 'r3_bg',
	horaxis : 'r3_horaxis',
	veraxis : 'r3_veraxis',
	table : {
			tableclass : 'r3_table',
			headerclass : 'r3_header',
			bodyclass : 'r3_body',
			footerclass : 'r3_footer'
	}
};

r3.types = {};

r3.registerGraph = function (type, functionName) {
  r3.types[type] = functionName;
};

r3.registerGraph('Bar','BarGraph');
r3.registerGraph('Line','LineGraph');
r3.registerGraph('StackedBar','StackedBarGraph');
r3.registerGraph('StepUpBar','StepUpBarGraph');
r3.registerGraph('Area','AreaGraph');
r3.registerGraph('StackedArea','StackedAreaGraph');
r3.registerGraph('PercentBar','PercentBarGraph');
r3.registerGraph('PercentArea','PercentAreaGraph');
r3.registerGraph('Pie','PieGraph');
r3.registerGraph('Donut','DonutGraph');

r3.buildGraph = function (type, graphdef, config) {
  if (r3.types[type] !== undefined) {
    return new r3[r3.types[type]](graphdef, config);
  }
};
r3.effects = {};

r3.effects.bar = {};
r3.effects.bar.mouseover = function (graph, idx) {
	var config = graph.config,
		category = graph.categories[idx];

	var effect = function () {
		graph.frame.selectAll('rect.cr_' + category)
			.transition().duration(config.effects.hover)
				.style('fill', config.effects.hovercolor)
				.style('stroke', config.effects.strokecolor);
	
		graph.frame.selectAll('text.cr_' + category)
			.transition().duration(config.effects.hover)
				.style('fill', config.effects.textcolor)
				.style('opacity', 1);
	};

	graph.effects[category]['mouseover'] = effect;
	return effect;
};

r3.effects.bar.mouseout = function (graph, idx, color) {
	var config = graph.config,
		category = graph.categories[idx];
		color = color || r3.util.getColorBand(graph.config, idx);

	var effect = function () {
		graph.frame.selectAll('rect.cr_' + category)
			.transition().duration(config.effects.hover)
				.style('fill', color)
				.style('stroke', 'none');
	
		graph.frame.selectAll('text.cr_' + category)
			.transition().duration(config.effects.hover)
				.style('fill', 'none');
	};

	graph.effects[category]['mouseout'] = effect;
	return effect;
};

r3.effects.area = {};
r3.effects.area.mouseover = function (graph, idx) {
	var config = graph.config,
		category = graph.categories[idx];

	var effect = function () {
		graph.frame.selectAll('.cge_' + category).select('path.area_'+category)
		.transition().duration(config.effects.hover)
		.style('fill',config.effects.hovercolor);
	};

	graph.effects[category]['mouseover'] = effect;
	return effect;
};

r3.effects.area.mouseout = function (graph, idx) {
	var config = graph.config,
		category = graph.categories[idx];

	var effect = function () {
		graph.frame.selectAll('.cge_'+category).select('path.area_'+category)
		.transition().duration(config.effects.hover)
		.style('fill',r3.util.getColorBand(config,idx));
	};
	
	graph.effects[category]['mouseout'] = effect;
	return effect;
};

r3.effects.line = {};
r3.effects.line.mouseover = function (graph, idx) {
	var config = graph.config,
		category = graph.categories[idx];

	var effect = function () {
		graph.frame.selectAll('.cge_' + category).selectAll('circle')
			.transition().duration(config.effects.hover)
				.style('fill', config.effects.hovercolor)
				.style('fill-opacity', 1)
				.style('stroke', config.effects.hovercolor);

		graph.frame.selectAll('.cge_' + category).select('path')
			.transition().duration(config.effects.hover)
				.style('stroke', config.effects.hovercolor);

		graph.frame.selectAll('.cge_' + category).selectAll('text')
			.transition().duration(config.effects.hover)
				.style('fill', config.effects.textcolor);
	};
	graph.effects[category]['mouseover'] = effect;

	return effect;
};

r3.effects.line.mouseout = function (graph, idx, color) {
	var config = graph.config,
		category = graph.categories[idx],
		color = color || r3.util.getColorBand(graph.config, idx);

	var effect = function () {
		graph.frame.selectAll('.cge_' + category).selectAll('circle')
			.transition().duration(config.effects.hover)
				.style('fill', color)
				.style('fill-opacity', 0.6)
				.style('stroke', color);

		graph.frame.selectAll('.cge_' + category).select('path')
			.transition().duration(config.effects.hover)
				.style('stroke', color);

		graph.frame.selectAll('.cge_' + category).selectAll('text')
			.transition().duration(config.effects.hover)
				.style('fill', 'none');

	};	
	graph.effects[category]['mouseout'] = effect;
	return effect;
};

r3.effects.caption = {};
r3.effects.caption.mouseover = function (config) {
	return function () {
		d3.select(this.parentNode.parentNode).select('.' + r3.constants.name.background)
			.transition().duration(config.effects.duration)
				.style('fill', config.caption.hovercolor);
	};
};

r3.effects.caption.mouseout = function (config) {
	return function () {
		d3.select(this.parentNode.parentNode).select('.' + r3.constants.name.background)
			.transition().duration(config.effects.duration)
				.style('fill', config.graph.background);
	};
};

r3.effects.donut = {};
r3.effects.donut.mouseover = function (center, arcfunc, config, d) {
	return function (d) {
		var dev = {
				x : arcfunc.centroid(d)[0] / 5,
				y : arcfunc.centroid(d)[1] / 5
			};

		d3.select(this.parentNode)
			.transition().duration(config.effects.duration)
				.attr('transform', 'translate(' + (center.x + dev.x) + ',' + (center.y + dev.y) + ')');
	};
};

r3.effects.donut.mouseout = function (center, config) {
	return function () {
		d3.select(this.parentNode)
			.transition().duration(config.effects.duration)
				.attr('transform', 'translate(' + center.x + ',' + center.y + ')');
	};
};

r3.effects.pie = {};
r3.effects.pie.mouseover = function (center, arcfunc, config, d) {
	return function (d) {
		var dev = {
				x : arcfunc.centroid(d)[0] / 5,
				y : arcfunc.centroid(d)[1] / 5
			};

		d3.select(this.parentNode)
			.transition().duration(config.effects.duration)
				.attr('transform', 'translate(' + (center.x + dev.x) + ',' + (center.y + dev.y) + ')');
	};
};

r3.effects.pie.mouseout = function (center, config) {
	return function () {
		d3.select(this.parentNode)
			.transition().duration(config.effects.duration)
				.attr('transform', 'translate(' + center.x + ',' + center.y + ')');
	};
};

r3.effects.legend = {};
r3.effects.legend.mouseover = function (self, idx) {
	return self.effects.group[self.categories[idx]].mouseover;
};

r3.effects.legend.mouseout = function (self, idx) {
	return self.effects.group[self.categories[idx]].mouseout;
};

r3.effects.legend.click = function (i, ctx, graph) {
	var disabled = (d3.select(ctx).attr('disabled') === 'false') ? false : true;
	graph.toggleGraphGroup(i);
	d3.select(ctx).select('rect').style('fill', disabled ? r3.util.getColorBand(graph.config, i) : r3.config.legend.inactive_color);
	d3.select(ctx).select('text').style('fill', disabled ? null : r3.config.legend.inactive_color);
	d3.select(ctx).attr('disabled', disabled ? 'false' : 'true');
};

r3.palette = {
	'Plain' : [ '#1F77B4' ],
	'Simple' : [ '#d42f3c', '#85b1e6', '#FD6D16', '#dfe617' ],
	'RGB' : [ '#bb2211', '#2222bb', '#22aa22', '#9999aa', '#223322' ],
	'Olive' : [ '#B4AF91', '#787746', '#40411E', '#32331D' ],
	'Soil and Sky' : [ '#928174', '#AA9788', '#BDE4E9', '#A8E1E9', '#90D1DA' ],
	'Candid' : [ '#EADEA1', '#808355', '#4E493D', '#3A301C', '#3F7696' ],
	'Sulphide' : [ '#949993', '#615952', '#343640', '#A15026', '#C7B091' ],
	'New Moon' : [ '#EEE6AB', '#C5BC8E', '#696758', '#45484B', '#36393B' ],
	'Nature' : [ '#EEEFD8', '#BECD8A', '#73880A', '#CCCC33', '#E2EAA3' ],
	'Earth' : [ '#862424', '#D8D1B4', '#B3AB8E', '#F1F0E9', '#353535' ],
	'Sea' : [ '#334433', '#6699aa', '#88aaaa', '#aacccc', '#447799' ],
	'Lemon' : [ '#eebb00', '#ddaa00', '#eecc00', '#ffee11' ],
	'Water' : [ '#2266bb', '#3388dd', '#55aaee', '#bbddee', '#113355' ],
	'Grass' : [ '#00AF64', '#36D729', '#61D7A4', '#007241' ],
	'Hash' : [ 'tomato', 'yellowgreen', 'midnightblue', 'lightseagreen', 'gold'],
	'Soft' : ['#f1b2e1', '#b1ddf3', '#ffde89', '#e3675c', '#c2d985'],
	'Brink' : ['#01243b', '#5288d8', '#9da7b2', '#c5c5c5', '#71c42b'],
	'Bright' : ['#ef597b', '#ff6d31', '#73b66b', '#ffcb18', '#29a2c6'],
	'Lint' : ['#667b99', '#afbbd2', '#ccd5e6', '#e9eef6', '#ff6637']
};
r3.AreaGraph = function (graphdef, config) {
	var self = this;
	r3.Graph.call(self).setDefaults(graphdef, config).init(graphdef, config);

	self.areagroups = [];
	self.dataset = r3.util.getDataArray(self.graphdef);

	var areagroup, areapath, areafunc, idx, len,
		domainData = self.graphdef.dataset[self.graphdef.categories[0]];

	self.axes[self.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(domainData.map(function (d) { return d.name; }));

	for (idx = 0, len = self.dataset.length; idx < len; idx = idx + 1) {
		areapath = self.panel.append('g').attr('class', 'cg_' + self.categories[idx])
												.append('g').attr('class', 'cge_' + self.categories[idx]).datum(self.dataset[idx]);
		areagroup = { path: areapath, linefunc: undefined, areafunc: undefined, line: undefined, area: undefined };
		self['draw' + self.config.graph.orientation + 'Area'](areagroup, idx);
		self.areagroups.push(areagroup);
	}

	self.finalize();
};

r3.AreaGraph.prototype = r3.util.extend(r3.Graph);

r3.AreaGraph.prototype.setDefaults = function (graphdef, config) {
	graphdef.stepup = false;
	return this;
};

r3.AreaGraph.prototype.drawHorizontalArea = function (areagroup, idx) {
	var self = this,
		color = r3.util.getColorBand(self.config, idx);
		
	self.axes.ver.scale.rangePoints([0, self.height()]);

	areagroup.linefunc = d3.svg.line()
				.x(function (d) { return self.axes.hor.scale(d.value); })
				.y(function (d) { return self.axes.ver.scale(d.name) + self.axes.ver.scale.rangeBand() / 2; })
				.interpolate(self.config.area.interpolation);

	areagroup.areafunc = d3.svg.area()
				.x0(self.axes.hor.scale(0))
				.x1(areagroup.linefunc.x())
				.y(areagroup.linefunc.y())
				.interpolate(self.config.area.interpolation);

	areagroup.area = areagroup.path.append('svg:path')
				.attr('class', 'areapath_' + idx)
				.attr('d', areagroup.areafunc)
				.style('opacity', self.config.area.opacity)
				.style('-moz-opacity', self.config.area.opacity)
				.style('fill', color);

	areagroup.line = areagroup.path.append('svg:path')
				.attr('class', 'linepath_' + idx)
				.attr('d', areagroup.linefunc)
				.style('stroke', 'white')
				.style('fill', 'none');

	areagroup.path.selectAll('.dot')
				.data(self.dataset[idx])
				.enter().append('circle')
				.attr('class', 'dot')
				.attr('cx', areagroup.linefunc.x())
				.attr('cy', areagroup.linefunc.y())
				.attr('r', 3.5)
				.style('fill', 'white');
};

r3.AreaGraph.prototype.drawVerticalArea = function (areagroup, idx) {
	var self = this,
		color = r3.util.getColorBand(self.config, idx);
	
	self.axes.hor.scale.rangePoints([0, self.width()]);

	areagroup.linefunc = d3.svg.line()
				.x(function (d) { return self.axes.hor.scale(d.name) + self.axes.hor.scale.rangeBand() / 2; })
				.y(function (d) { return self.axes.ver.scale(d.value); })
				.interpolate(self.config.area.interpolation);

	areagroup.areafunc = d3.svg.area()
				.x(areagroup.linefunc.x())
				.y0(areagroup.linefunc.y())
				.y1(self.axes.ver.scale(0))
				.interpolate(self.config.area.interpolation);

	areagroup.area = areagroup.path.append('svg:path')
				.attr('class', 'areapath_' + idx)
				.attr('d', areagroup.areafunc)
				.style('opacity', self.config.area.opacity)
				.style('-moz-opacity', self.config.area.opacity)
				.style('fill', color);

	areagroup.line = areagroup.path.append('svg:path')
				.attr('class', 'linepath_' + idx)
				.attr('d', areagroup.linefunc)
				.style('stroke', 'white')
				.style('fill', 'none');

	areagroup.path.selectAll('.dot')
				.data(self.dataset[idx])
				.enter().append('circle')
				.attr('class', 'dot')
				.attr('cx', areagroup.linefunc.x())
				.attr('cy', areagroup.linefunc.y())
				.attr('r', 3.5)
				.style('fill', 'white');
};
/**
 * A normal 2d bar chart capable of being rendered in horizontal and vertical manner
 * @param {Object} graphdef Definition of the graph being rendered
 * @param {Object} config   Configuration of the graph being rendered
 */
r3.BarGraph = function (graphdef, config) {
	var self = this;
	r3.Graph.call(self).setDefaults(graphdef, config).init(graphdef, config);

	self.bargroups = {};

	self.axes[self.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(self.labels);

	var idx, length = self.categories.length, category;
	for (idx = 0; idx < length; idx = idx + 1) {
		category = self.categories[idx];
		self.bargroups[category] = self.panel.append('g').attr('class', 'r3_bargroup').classed('cg_' + category, true);
		self['draw' + self.config.graph.orientation + 'Bars'](idx);
	}

	self.finalize();
};

r3.BarGraph.prototype = r3.util.extend(r3.Graph);

r3.BarGraph.prototype.setDefaults = function (graphdef, config) {
	graphdef.stepup = false;
	return this;
};

r3.BarGraph.prototype.drawHorizontalBars = function (idx) {
	var self = this,
		color = r3.util.getColorBand(this.config, idx),
		len = self.categories.length;
	
	bars = self.bargroups[self.categories[idx]].selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter()
				.append('g').attr('class', 'cge_' + self.categories[idx]);
	
	bars.append('rect')
		.attr('class', self.id + '_' + self.categories[idx])
		.classed('cr_' + self.categories[idx], true)
		.attr('height', self.axes.ver.scale.rangeBand() / len)
		.attr('x', 0)
		.attr('y', function (d) {return self.axes.ver.scale(d.name); })
		.style('stroke', self.config.bar.strokecolor)
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(self, idx))
		.on('mouseout', r3.effects.bar.mouseout(self, idx))
		.transition()
			.duration(self.config.effects.duration)
			.delay(function (d, i) { return i * self.config.effects.duration; })
			.attr('width', function (d) { return self.axes.hor.scale(d.value); });

	bars.append('text')
		.attr('y', function(d) { return self.axes.ver.scale(d.name) + (self.axes.ver.scale.rangeBand()/len)/2; })
		.attr('dx', 4)
		.attr('dy', '.35em')
		.attr('text-anchor', 'start')
		.classed('cr_' + self.categories[idx], true)
		.style('fill', 'none')
		.style('font-family', self.config.bar.fontfamily)
		.style('font-size', self.config.bar.fontsize)
		.style('font-weight', self.config.bar.fontweight)
		.text(function(d) { return String(d.value); })
		.transition()
			.duration(self.config.effects.duration)
			.delay(function (d, i) { return i * self.config.effects.duration; })
			.attr('x', function (d) { return self.axes.hor.scale(d.value); });
	
	bars.append('svg:title')
		.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + '] : ' + d.value;});
	
	self.bargroups[self.categories[idx]].attr('transform', 'translate(0,' + idx * self.axes.ver.scale.rangeBand() / len + ')');
};

r3.BarGraph.prototype.drawVerticalBars = function (idx) {
	var self = this,
		color = r3.util.getColorBand(this.config, idx),
		len = self.categories.length;
	
	bars = self.bargroups[self.categories[idx]].selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter()
			.append('g').attr('class', 'cge_' + self.categories[idx]);
	
	bars.append('rect')
			.attr('class', self.id + '_' + self.categories[idx])
			.classed('cr_' + self.categories[idx], true)
			.attr('height', 0)
			.attr('width', 0)
			.attr('x', function (d) {return self.axes.hor.scale(d.name); })
			.attr('y', 0)
			.style('stroke', self.config.bar.strokecolor).style('fill', color)
			.on('mouseover', r3.effects.bar.mouseover(self, idx))
			.on('mouseout', r3.effects.bar.mouseout(self, idx))
			.transition()
				.duration(self.config.effects.duration)
				.delay(idx * self.config.effects.duration)
				.attr('height', function (d) { return self.height() - self.axes.ver.scale(d.value); })
				.attr('width', self.axes.hor.scale.rangeBand() / len);
	
	bars.append('text').attr('transform','scale(1,-1)')
			.attr('x', function(d) { return self.axes.hor.scale(d.name) + (self.axes.hor.scale.rangeBand()/len)/2; })
			.attr('y', -10)
			.attr('dx', 0)
			.attr('dy', '.35em')
			.attr('text-anchor', 'middle')
			.classed('cr_' + self.categories[idx], true)
			.style('fill', 'none')
			.style('font-family', self.config.bar.fontfamily)
			.style('font-size', self.config.bar.fontsize)
			.style('font-weight', self.config.bar.fontweight)
			.text(function(d) { return String(d.value); })
			.transition()
				.duration(self.config.effects.duration)
				.delay(idx * self.config.effects.duration)
				.attr('y', function (d) { return -(self.height() - self.axes.ver.scale(d.value)) - 10; });
	
	bars.append('svg:title')
		.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + '] : ' + d.value;});
	
	self.bargroups[self.categories[idx]].attr('transform', 'translate(' + idx * self.axes.hor.scale.rangeBand() / len + ',' + self.height() + ') scale(1,-1)');
};
r3.DonutGraph = function (graphdef, config) {
	var self = this;
	r3.Graph.call(self).init(graphdef, config);

	self.radius = Math.min(self.height(), self.width()) * 2 / 5;
	self.center = {
		x : self.width() / 2,
		y : self.height() / 2
	};
	
	self.category = graphdef.categories[0];
	
	var data = r3.util.getCategoryData(self.graphdef, [self.category]),
		arcfunc = d3.svg.arc().innerRadius(self.radius * self.config.donut.factor).outerRadius(self.radius),
		layout = d3.layout.pie();

	self.panel.data(data);
	self.arcs = self.panel.selectAll('g.arc')
					.data(layout).enter()
					.append('g').attr('class', 'r_arc_' + self.category)
					.attr('transform', 'translate(' + self.center.x + ',' + self.center.y + ')');

	self.arcs.append('path')
			.attr('d', arcfunc)
			.style('fill', function (d, i) { return r3.util.getColorBand(self.config, i); })
			.style('stroke', self.config.donut.strokecolor)
			.style('stroke-width', self.config.donut.strokewidth)
		.on('mouseover', r3.effects.donut.mouseover(self.center, arcfunc, self.config))
		.on('mouseout', r3.effects.donut.mouseout(self.center, self.config));

	self.arcs.append('text')
			.attr('transform', function (d) { return 'translate(' + arcfunc.centroid(d) + ')'; })
			.attr('dy', '.35em')
			.attr('text-anchor', 'middle')
			.style('fill', self.config.donut.fontfill)
			.style('font-family', self.config.donut.fontfamily)
			.style('font-size', self.config.donut.fontsize)
			.style('font-weight', self.config.donut.fontweight)
			.style('font-variant', self.config.donut.fontvariant)
			.text(function (d) { return String(d.value); });
		
	self.arcs.append('svg:title')
		.text(function (d, i) { return self.labels[i] + ' : ' + d.value;});
};

r3.DonutGraph.prototype = r3.util.extend(r3.Graph);
r3.LineGraph = function (graphdef, config) {
	var self = this;
	r3.Graph.call(self).setDefaults(graphdef, config).init(graphdef, config);

	self.linegroups = {};
	self.dataset = r3.util.getDataArray(self.graphdef);

	var linegroup, linepath, linefunc, idx, len = self.categories.length,
		domainData = self.labels;

	self.axes[self.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(domainData);

	for (idx = 0; idx < len; idx = idx + 1) {
		linepath = self.panel.append('g').attr('class', 'cg_' + self.categories[idx])
												.append('g').attr('class', 'cge_' + self.categories[idx]).datum(self.dataset[idx]);
		linegroup = {
			path: linepath,
			func: undefined
		};

		self['draw' + self.config.graph.orientation + 'Lines'](linegroup, idx, color);
		self.linegroups[self.categories[idx]] = linegroup;
	}

	self.finalize();
};

r3.LineGraph.prototype = r3.util.extend(r3.Graph);

r3.LineGraph.prototype.setDefaults = function (graphdef, config) {
	graphdef.stepup = false;
	config.scale.ordinality = 0;
	return this;
};

r3.LineGraph.prototype.drawHorizontalLines = function (linegroup, idx) {
	var self = this,
		axes = self.axes,
		config = self.config,
		color = r3.util.getColorBand(self.config, idx);

	linegroup.func = d3.svg.line()
				.x(function (d) { return axes.hor.scale(d.value); })
				.y(function (d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand() / 2; })
				.interpolate(r3.config.line.interpolation);

	linegroup.path.append('path')
				.classed('cr_' + self.categories[idx], true)
				.attr('d', linegroup.func)
				.style('fill', 'none')
				.style('stroke', color)
				.style('stroke-width', 1.5)
				.style('stroke-opacity', 0.01)
				.on('mouseover', r3.effects.line.mouseover(self,idx))
				.on('mouseout', r3.effects.line.mouseout(self, idx, color))
				.transition()
					.duration(3 * self.config.effects.duration)
					.delay(2 * idx * self.config.effects.duration)
					.style('stroke-opacity', 1);

	linegroup.path.selectAll('circle')
				.data(self.dataset[idx])
				.enter().append('circle')
				.classed('cr_' + self.categories[idx], true)
				.attr('cx', linegroup.func.x())
				.attr('cy', linegroup.func.y())
				.attr('r', 3.5)
				.style('fill', color)
				.style('fill-opacity', 0.6)
				.style('stroke', color)
				.on('mouseover', r3.effects.line.mouseover(self, idx))
				.on('mouseout', r3.effects.line.mouseout(self, idx, color))
					.append('svg:title')
					.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + ']: ' + d.value;});
	
	linegroup.path.selectAll('text')
				.data(self.dataset[idx])
				.enter().append('text')
				.attr('x', function (d) { return axes.hor.scale(d.value); })
				.attr('y', function(d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand()/2; })
				.attr('dx', 10)
				.attr('dy', '.35em')
				.attr('text-anchor', 'start')
				.classed('cr_' + self.categories[idx], true)
				.style('fill', 'none')
				.style('font-family', self.config.bar.fontfamily)
				.style('font-size', self.config.bar.fontsize)
				.style('font-weight', self.config.bar.fontweight)
				.text(function(d) { return String(d.value); });
	
	return this;
};

r3.LineGraph.prototype.drawVerticalLines = function (linegroup, idx) {
	var self = this,
		axes = self.axes,
		config = self.config,
		color = r3.util.getColorBand(self.config, idx);

	linegroup.func = d3.svg.line()
				.x(function (d) { return axes.hor.scale(d.name) + axes.hor.scale.rangeBand() / 2; })
				.y(function (d) { return axes.ver.scale(d.value); })
				.interpolate(r3.config.line.interpolation);

	linegroup.path.append('path')
				.attr('d', linegroup.func)
				.classed('cr_' + self.categories[idx], true)
				.style('fill', 'none')
				.style('stroke', color)
				.style('stroke-width', 1.5)
				.style('stroke-opacity', 0.01)
				.on('mouseover', r3.effects.line.mouseover(self, idx))
				.on('mouseout', r3.effects.line.mouseout(self, idx, color))
				.transition()
					.duration(self.config.effects.duration)
					.delay(2 * idx * self.config.effects.duration)
					.style('stroke-opacity', 1);

	linegroup.path.selectAll('circle')
				.data(self.dataset[idx])
				.enter().append('circle')
				.attr('cx', linegroup.func.x())
				.attr('cy', linegroup.func.y())
				.attr('r', 3.5)
				.classed('cr_' + self.categories[idx], true)
				.style('fill', color)
				.style('fill-opacity', 0.2)
				.style('stroke', color)
				.on('mouseover', r3.effects.line.mouseover(self, idx))
				.on('mouseout', r3.effects.line.mouseout(self, idx, color))
					.append('svg:title')
					.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + ']: ' + d.value;});
	
	linegroup.path.selectAll('text')
				.data(self.dataset[idx])
				.enter().append('text')
				.attr('x', function (d) { return axes.hor.scale(d.name) + axes.hor.scale.rangeBand() / 2; })
				.attr('y', function (d) { return axes.ver.scale(d.value) - 20; })
				.attr('dx', 0)
				.attr('dy', '.71em')
				.attr('text-anchor', 'middle')
				.classed('cr_' + self.categories[idx], true)
				.style('fill', 'none')
				.style('font-family', self.config.bar.fontfamily)
				.style('font-size', self.config.bar.fontsize)
				.style('font-weight', self.config.bar.fontweight)
				.text(function(d) { return String(d.value); });

	return this;
};
r3.PercentAreaGraph = function (graphdef, config) {
	var self = this;
	r3.Graph.call(self).setDefaults(graphdef, config).init(graphdef, config);

	stacklayout = d3.layout.stack().offset('zero')(
		self.categories.map(function (d) {
			return graphdef.dataset[d].map(function (d) {
				return {x: d.name, y: +d.value};
			});
		})
	);

	var areagroup, areapath, areafunc,
		domainData = self.labels,
		categories = self.categories;

	self.axes[self.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(domainData);
	self.areagroup = self.panel.selectAll('g.areagroup').data(stacklayout).enter().append('g').attr('class',function (d,i) { return 'cge_' + self.categories[i]; });
	self['draw' + self.config.graph.orientation + 'Area']();

	self.finalize(true);
};

r3.PercentAreaGraph.prototype = r3.util.extend(r3.Graph);

r3.PercentAreaGraph.prototype.setDefaults = function (graphdef, config) {
	graphdef.stepup = 'percent';
	return this;
};

r3.PercentAreaGraph.prototype.drawHorizontalArea = function () {
	var self = this, axes = self.axes,
		categories = self.categories,
		config = self.config,
		sumMap = r3.util.getSumUpArray(self.graphdef);
	
	axes.ver.scale.rangePoints([0, self.height()]);

	for(var i = 0; i < categories.length; i = i + 1){
		r3.effects.area.mouseover(self, i);
		r3.effects.area.mouseout(self,i);
	}

	self.areagroup.append('path')
			.attr('class', function (d, i) { return 'area_' + categories[i]; })
			.style('fill', function (d, i) { return r3.util.getColorBand(config, i); })
			.attr('d', d3.svg.area()
				.y(function (d) { return axes.ver.scale(d.x) + axes.ver.scale.rangeBand() / 2; })
				.x0(function (d, i) { return axes.hor.scale(r3.util.getPercentage(d.y0, sumMap[i])); })
				.x1(function (d, i) { return axes.hor.scale(r3.util.getPercentage(d.y0 + d.y, sumMap[i])); })
				.interpolate(self.config.area.interpolation)
		)
		.on('mouseover', function (d,i) { self.effects[categories[i]].mouseover(); })
		.on('mouseout', function (d,i) { self.effects[categories[i]].mouseout(); });

	self.areagroup.append('path')
		.attr('class', function (d, i) { return 'line_' + categories[i]; })
		.style('stroke', 'white')
		.style('fill', 'none')
		.style('stroke-width', 2)
		.attr('d', d3.svg.line()
				.y(function (d) { return axes.ver.scale(d.x) + axes.ver.scale.rangeBand() / 2; })
				.x(function (d, i) { return axes.hor.scale(r3.util.getPercentage(d.y0 + d.y, sumMap[i])); })
				.interpolate(self.config.area.interpolation)
		);
};

r3.PercentAreaGraph.prototype.drawVerticalArea = function () {
	var self = this, axes = self.axes,
		categories = self.categories,
		config = self.config,
		sumMap = r3.util.getSumUpArray(self.graphdef);
	
	axes.hor.scale.rangePoints([0, self.width()]);
	
	for(var i = 0; i < categories.length; i = i + 1){
		r3.effects.area.mouseover(self, i);
		r3.effects.area.mouseout(self,i);
	}

	self.areagroup.append('path')
			.attr('class', function (d, i) { return 'area_' + categories[i]; })
			.style('fill', function (d, i) { return r3.util.getColorBand(config, i); })
			.attr('d', d3.svg.area()
				.x(function (d) { return axes.hor.scale(d.x) + axes.hor.scale.rangeBand() / 2; })
				.y0(function (d, i) { return axes.ver.scale(r3.util.getPercentage(d.y0, sumMap[i])); })
				.y1(function (d, i) { return axes.ver.scale(r3.util.getPercentage(d.y0 + d.y, sumMap[i])); })
				.interpolate(self.config.area.interpolation)
			)
		.on('mouseover', function (d,i) {self.effects[categories[i]].mouseover(); })
		.on('mouseout', function (d,i) { self.effects[categories[i]].mouseout(); });

	self.areagroup.append('path')
			.attr('class', function (d, i) { return 'line_' + categories[i]; })
			.style('stroke', 'white')
			.style('fill', 'none')
			.style('stroke-width', 2)
			.attr('d', d3.svg.line()
				.x(function (d, i) { return axes.hor.scale(d.x) + axes.hor.scale.rangeBand() / 2; })
				.y(function (d, i) { return axes.ver.scale(r3.util.getPercentage(d.y0 + d.y, sumMap[i])); })
				.interpolate(self.config.area.interpolation)
			);
};
r3.PercentBarGraph = function (graphdef, config) {
	var self = this;
	r3.Graph.call(self).setDefaults(graphdef, config).init(graphdef, config);

	self.bargroups = [];

	var bargroup, bars, idx, len, color,
		domainData = self.labels,
		csum = domainData.map(function (d) {return 0; }),
		tsum = domainData.map(function (d) {return 0; });

	self.axes[self.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(domainData);

	for (idx = 0, len = self.categories.length; idx < len; idx = idx + 1) {
		color = r3.util.getColorBand(self.config, idx);

		bargroup = self.panel.append('g').attr('class', 'cg_' + self.categories[idx]);
		bars = bargroup.selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter().append('g').attr('class', 'cge_' + self.categories[idx]);

		self['draw' + r3.util.getPascalCasedName(self.config.graph.orientation) + 'Bars'](bars, csum, tsum, idx);

		if (self.config.graph.orientation === 'Vertical') {
			bargroup.attr('transform', 'translate(0,' + 2 * self.height() + ') scale(1,-1)');
		}

		self.bargroups.push(bargroup);
	}

	self.finalize();
};

r3.PercentBarGraph.prototype = r3.util.extend(r3.Graph);

r3.PercentBarGraph.prototype.setDefaults = function (graphdef, config) {
	graphdef.stepup = 'percent';
	config.scale.ordinality = 0;
	return this;
};

r3.PercentBarGraph.prototype.drawHorizontalBars = function (bars, csum, tsum, idx) {
	var self = this,
		axes = this.axes,
		color = r3.util.getColorBand(this.config, idx),
		config = this.config,
		sumMap = r3.util.getSumUpArray(this.graphdef);
	
	bars.append('rect')
		.attr('height', axes.ver.scale.rangeBand())
		.attr('width', 0)
		.attr('x', function (d, i) { var value = axes.hor.scale(r3.util.getPercentage(csum[i], sumMap[i])); csum[i] += d.value; return value; })
		.attr('y', function (d) {return axes.ver.scale(d.name); })
		.classed('cr_' + self.categories[idx], true)
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(self, idx))
		.on('mouseout', r3.effects.bar.mouseout(self, idx))
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('width', function (d, i) { return axes.hor.scale(r3.util.getPercentage(d.value, sumMap[i]));});

	bars.append('text')
		.attr('y', function(d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand()/2; })
		.attr('dx', 0)
		.attr('dy', '.35em')
		.attr('text-anchor', 'end')
		.classed('cr_' + self.categories[idx], true)
		.style('fill', 'none')
		.style('font-family', this.config.bar.fontfamily)
		.style('font-size', this.config.bar.fontsize)
		.style('font-weight', this.config.bar.fontweight)
		.text(function(d, i) { return ( axes.hor.scale(r3.util.getPercentage(csum[i], sumMap[i])) > 15 ) ? String(Math.round(r3.util.getPercentage(d.value, sumMap[i]))) : null; })
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('x', function (d, i) { tsum[i] += d.value; return axes.hor.scale(r3.util.getPercentage(tsum[i], sumMap[i])) - 5; });
};

r3.PercentBarGraph.prototype.drawVerticalBars = function (bars, csum, tsum, idx) {
	var self = this,
		height = this.height(),
		axes = this.axes,
		color = r3.util.getColorBand(this.config, idx),
		config = this.config,
		sumMap = r3.util.getSumUpArray(this.graphdef);
	
	bars.append('rect')
		.attr('height', 0)
		.attr('width', axes.hor.scale.rangeBand())
		.attr('x', function (d) { return axes.hor.scale(d.name); })
		.attr('y', function (d, i) { var value = axes.ver.scale(r3.util.getPercentage(csum[i], sumMap[i])); csum[i] -= d.value; return value; })
		.classed('cr_' + self.categories[idx], true)
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(self, idx))
		.on('mouseout', r3.effects.bar.mouseout(self, idx))
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('height', function (d, i) { return height - axes.ver.scale(r3.util.getPercentage(d.value, sumMap[i])); });
	
	bars.append('text').attr('transform','scale(1,-1)')
		.attr('x', function(d) { return axes.hor.scale(d.name) + axes.hor.scale.rangeBand()/2; })
		.attr('y', -height + 5)
		.attr('dy', '.71em')
		.attr('text-anchor', 'middle')
		.classed('cr_' + self.categories[idx], true)
		.style('fill', 'none')
		.style('font-family', this.config.bar.fontfamily)
		.style('font-size', this.config.bar.fontsize)
		.style('font-weight', this.config.bar.fontweight)
		.text(function(d, i) { return ( height - axes.ver.scale(r3.util.getPercentage(d.value, sumMap[i])) > 15) ? String(Math.round(r3.util.getPercentage(d.value, sumMap[i]))) : null; })
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('y', function (d, i) { tsum[i] += d.value; return -(2*height - axes.ver.scale(r3.util.getPercentage(tsum[i], sumMap[i]))) + 5; });
};
r3.PieGraph = function (graphdef, config) {
	var self = this;
	r3.Graph.call(self).init(graphdef, config);

	self.radius = Math.min(self.height(), self.width()) * 2 / 5;
	self.center = {
		x : self.width() / 2,
		y : self.height() / 2
	};
	
	self.category = graphdef.categories[0];

	var data = r3.util.getCategoryData(self.graphdef, [self.category]),
		arcfunc = d3.svg.arc().innerRadius(0).outerRadius(self.radius),
		layout = d3.layout.pie();

	self.panel.data(data);
	self.arcs = self.panel.selectAll('g.arc')
					.data(layout).enter()
					.append('g').attr('class', 'r3_arc' + self.category)
					.attr('transform', 'translate(' + self.center.x + ',' + self.center.y + ')');

	self.arcs.append('path')
			.attr('d', arcfunc)
			.style('fill', function (d, i) { return r3.util.getColorBand(self.config, i); })
			.style('stroke', self.config.pie.strokecolor)
			.style('stroke-width', self.config.pie.strokewidth)
		.on('mouseover', r3.effects.pie.mouseover(self.center, arcfunc, self.config))
		.on('mouseout', r3.effects.pie.mouseout(self.center, self.config));

	self.arcs.append('text')
			.attr('transform', function (d) { return 'translate(' + arcfunc.centroid(d) + ')'; })
			.attr('dy', '.35em')
			.attr('text-anchor', 'middle')
			.style('fill', self.config.pie.fontfill)
			.style('font-family', self.config.pie.fontfamily)
			.style('font-size', self.config.pie.fontsize)
			.style('font-weight', self.config.pie.fontweight)
			.style('font-variant', self.config.pie.fontvariant)
			.text(function (d) { return String(d.value); });
	
	self.arcs.append('svg:title')
		.text(function (d, i) { return self.labels[i] + ' : ' + d.value;});
};

r3.PieGraph.prototype = r3.util.extend(r3.Graph);
r3.StackedAreaGraph = function (graphdef, config) {
	var self = this;
	r3.Graph.call(self, graphdef).setDefaults(graphdef, config).init(graphdef, config);

	var stacklayout = d3.layout.stack().offset(self.config.area.offset)(self.categories.map(function (d) {
			return graphdef.dataset[d].map(function (d) { return {x: d.name, y: +d.value}; });
	}));

	self.axes[self.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(self.labels.map(function (d) { return d; }));
	self.areagroup = self.panel.append('g').selectAll('g')
											.data(stacklayout).enter().append('g').attr('class', function (d, i) { return 'cge_' + self.categories[i]; });
	self['draw' + self.config.graph.orientation + 'Area']();

	self.finalize();
};

r3.StackedAreaGraph.prototype = r3.util.extend(r3.Graph);

r3.StackedAreaGraph.prototype.setDefaults = function (graphdef, config) {
	graphdef.stepup = true;
	return this;
};

r3.StackedAreaGraph.prototype.drawHorizontalArea = function () {
	var self = this, axes = self.axes,
		categories = self.categories,
		config = self.config;
	
	axes.ver.scale.rangePoints([0, self.height()]);

	for(var i = 0; i < categories.length; i = i + 1){
		r3.effects.area.mouseover(self, i);
		r3.effects.area.mouseout(self, i);
	}

	self.areagroup.append('path')
			.attr('class', function (d, i) { return 'area_' + categories[i]; })
			.style('fill', function (d, i) { return r3.util.getColorBand(config, i); })
			.attr('d', d3.svg.area()
				.y(function (d) { return axes.ver.scale(d.x) + axes.ver.scale.rangeBand() / 2; })
				.x0(function (d) { return axes.hor.scale(d.y0); })
				.x1(function (d) { return axes.hor.scale(d.y0 + d.y); })
				.interpolate(self.config.area.interpolation)
			)
		.on('mouseover', function (d,i){ self.effects[categories[i]].mouseover(); })
		.on('mouseout',  function (d,i) { self.effects[categories[i]].mouseout(); });

	self.areagroup.append('path')
		.attr('class', function (d, i) { return 'line_' + categories[i]; })
		.style('stroke', 'white')
		.style('fill', 'none')
		.style('stroke-width', 2)
		.attr('d', d3.svg.line()
			.y(function (d) { return axes.ver.scale(d.x) + axes.ver.scale.rangeBand() / 2; })
			.x(function (d) { return axes.hor.scale(d.y0 + d.y); })
			.interpolate(self.config.area.interpolation)
		);

	return self;
};

r3.StackedAreaGraph.prototype.drawVerticalArea = function () {
	var self = this, axes = self.axes,
		categories = self.categories,
		config = self.config;
	
	axes.hor.scale.rangePoints([0, self.width()]);

	self.areagroup.append('path')
			.attr('class', 'r3_area');

	for(var i = 0; i < categories.length; i = i + 1){
		r3.effects.area.mouseover(self, i);
		r3.effects.area.mouseout(self,i);
	}

	self.areagroup.append('path')
			.attr('class', function (d, i) { return 'area_' + categories[i]; })
			.style('fill', function (d, i) { return r3.util.getColorBand(config, i); })
			.attr('d', d3.svg.area()
				.x(function (d) { return axes.hor.scale(d.x) + axes.hor.scale.rangeBand() / 2; })
				.y0(function (d) { return axes.ver.scale(d.y0); })
				.y1(function (d) { return axes.ver.scale(d.y0 + d.y); })
				.interpolate(self.config.area.interpolation)
			)
		.on('mouseover', function (d,i){ self.effects[categories[i]].mouseover(); })
		.on('mouseout',  function (d,i) { self.effects[categories[i]].mouseout(); });


	self.areagroup.append('path')
			.attr('class', function (d, i) { return 'line_' + categories[i]; })
			.style('stroke', 'white')
			.style('fill', 'none')
			.style('stroke-width', 2)
			.attr('d', d3.svg.line()
				.x(function (d) { return axes.hor.scale(d.x) + axes.hor.scale.rangeBand() / 2; })
				.y(function (d) { return axes.ver.scale(d.y0 + d.y); })
				.interpolate(self.config.area.interpolation)
			);

	return self;
};
r3.StackedBarGraph = function (graphdef, config) {
	var self = this;
	r3.Graph.call(self).setDefaults(graphdef, config).init(graphdef, config);

	self.bargroups = {};

	var bargroup, bars, idx, len, color,
		domainData = self.labels,
		csum = domainData.map(function (d) {return 0; }),
		tsum = domainData.map(function (d) {return 0; });

	self.axes[self.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(domainData);

	for (idx = 0, len = self.categories.length; idx < len; idx = idx + 1) {
		self.bargroups[self.categories[idx]] = self.panel.append('g').attr('class', 'cge_' + self.categories[idx]);
		self['draw' + self.config.graph.orientation + 'Bars'](idx, csum, tsum);
	}

	self.finalize();
};

r3.StackedBarGraph.prototype = r3.util.extend(r3.Graph);

r3.StackedBarGraph.prototype.setDefaults = function (graphdef, config) {
	graphdef.stepup = true;
	return this;
};

r3.StackedBarGraph.prototype.drawHorizontalBars = function (idx, csum, tsum) {
	var self = this,
		axes = this.axes,
		color = r3.util.getColorBand(this.config, idx),
		config = this.config,
		bargroup = this.bargroups[this.categories[idx]];
	
	bars = bargroup.selectAll('g').data(this.graphdef.dataset[this.categories[idx]])
				.enter().append('g').attr('class', 'cge_' + this.categories[idx]);
	
	bars.append('rect')
		.attr('height', axes.ver.scale.rangeBand())
		.attr('width', 0)
		.attr('x', function (d, i) { var value = axes.hor.scale(csum[i]); csum[i] += d.value; return value; })
		.attr('y', function (d) {return axes.ver.scale(d.name); })
		.classed('cr_' + self.categories[idx], true)
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(self, idx))
		.on('mouseout', r3.effects.bar.mouseout(self, idx))
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('width', function (d) { return axes.hor.scale(d.value); });

	bars.append('text')
		.attr('y', function(d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand()/2; })
		.attr('dx', 0)
		.attr('dy', '.35em')
		.attr('text-anchor', 'end')
		.classed('cr_' + self.categories[idx], true)
		.style('fill', 'none')
		.style('font-family', config.bar.fontfamily)
		.style('font-size', config.bar.fontsize)
		.style('font-weight', config.bar.fontweight)
		.text(function(d) { return ( axes.hor.scale(d.value) > 15 ) ? String(d.value) : null; })
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('x', function (d, i) { tsum[i] += d.value; return axes.hor.scale(tsum[i]) - 5; });
	
	bars.append('svg:title')
		.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + '] : ' + d.value;});
};

r3.StackedBarGraph.prototype.drawVerticalBars = function (idx, csum, tsum) {
	var self = this,
		height = this.height(),
		axes = this.axes,
		color = r3.util.getColorBand(this.config, idx),
		config = this.config,
		bargroup = this.bargroups[this.categories[idx]];
	
	bars = bargroup.selectAll('g').data(this.graphdef.dataset[this.categories[idx]])
				.enter().append('g').attr('class', 'r3_stackedbar_' + this.categories[idx]);
	
	bars.append('rect')
		.attr('height', 0)
		.attr('width', axes.hor.scale.rangeBand())
		.attr('x', function (d) { return axes.hor.scale(d.name); })
		.attr('y', function (d, i) { var value = axes.ver.scale(csum[i]); csum[i] -= d.value; return value; })
		.classed('cr_' + self.categories[idx], true)
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(self, idx))
		.on('mouseout', r3.effects.bar.mouseout(self, idx))
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('height', function (d) { return height - axes.ver.scale(d.value); });
	
	bars.append('text').attr('transform','scale(1,-1)')
		.attr('x', function(d) { return axes.hor.scale(d.name) + axes.hor.scale.rangeBand()/2; })
		.attr('y', -height + 5)
		.attr('dy', '.71em')
		.attr('text-anchor', 'middle')
		.classed('cr_' + self.categories[idx], true)
		.style('fill', 'none')
		.style('font-family', config.bar.fontfamily)
		.style('font-size', config.bar.fontsize)
		.style('font-weight', config.bar.fontweight)
		.text(function(d) { return ( height - axes.ver.scale(d.value) > 15) ? String(d.value) : null; })
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('y', function (d, i) { tsum[i] += d.value; return -(2*height - axes.ver.scale(tsum[i])) + 5; });
	
	bars.append('svg:title')
		.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + '] : ' + d.value;});
	
	bargroup.attr('transform', 'translate(0,' + 2 * this.height() + ') scale(1,-1)');
};
r3.StepUpBarGraph = function (graphdef, config) {
	var self = this;
	r3.Graph.call(self).setDefaults(graphdef, config).init(graphdef, config);

	this.bargroups = {};

	var idx, length = self.categories.length,
		csum = self.labels.map(function (d) {return 0; }),
		tsum = self.labels.map(function (d) {return 0; });

	self.axes[this.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(this.labels);

	for (idx = 0; idx < length; idx = idx + 1) {
		self.bargroups[self.categories[idx]] = this.panel.append('g').attr('class', 'cg_' + self.categories[idx]);
		self['draw' + self.config.graph.orientation + 'Bars'](idx, csum, tsum);
	}

	self.finalize();
};

r3.StepUpBarGraph.prototype = r3.util.extend(r3.Graph);

r3.StepUpBarGraph.prototype.setDefaults = function (graphdef, config) {
	graphdef.stepup = true;
	return this;
};

r3.StepUpBarGraph.prototype.drawHorizontalBars = function (idx, csum, tsum) {
	var self = this, len = self.categories.length;
		color = r3.util.getColorBand(self.config, idx),
		bargroup = self.bargroups[self.categories[idx]];

	bars = bargroup.selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter().append('g').attr('class', 'cge_' + self.categories[idx]);
	bars.append('rect')
		.attr('height', self.axes.ver.scale.rangeBand() / len)
		.attr('width', 0)
		.attr('x', function (d, i) { var value = self.axes.hor.scale(csum[i]); csum[i] += d.value; return value; })
		.attr('y', function (d) {return self.axes.ver.scale(d.name); })
		.classed('cr_' + self.categories[idx], true)
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(self, idx))
		.on('mouseout', r3.effects.bar.mouseout(self, idx, color))
		.transition()
			.duration(self.config.effects.duration)
			.delay(idx * self.config.effects.duration)
			.attr('width', function (d) { return self.axes.hor.scale(d.value); });

	bars.append('text')
		.attr('y', function(d) { return self.axes.ver.scale(d.name) + (self.axes.ver.scale.rangeBand()/len)/2; })
		.attr('dx', 4)
		.attr('dy', '.35em')
		.attr('text-anchor', 'start')
		.classed('cr_' + self.categories[idx], true)
		.style('fill', 'none')
		.style('font-family', self.config.bar.fontfamily)
		.style('font-size', self.config.bar.fontsize)
		.style('font-weight', self.config.bar.fontweight)
		.text(function(d) { return String(d.value); })
		.transition()
			.duration(self.config.effects.duration)
			.delay(idx * self.config.effects.duration)
			.attr('x', function (d, i) { tsum[i] += d.value; return self.axes.hor.scale(tsum[i]); });
			
	bars.append('svg:title')
		.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + '] : ' + d.value;});
	
	bargroup.attr('transform', 'translate(0,' + idx * self.axes.ver.scale.rangeBand() / len + ')');
};

r3.StepUpBarGraph.prototype.drawVerticalBars = function (idx, csum, tsum) {
	var self = this, len = self.categories.length,
		color = r3.util.getColorBand(self.config, idx),
		bargroup = self.bargroups[self.categories[idx]];

	bars = bargroup.selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter().append('g').attr('class', 'cge_' + self.categories[idx]);
	bars.append('rect')
		.attr('height', 0)
		.attr('width', self.axes.hor.scale.rangeBand() / len)
		.attr('x', function (d) { return self.axes.hor.scale(d.name); })
		.attr('y', function (d, i) { var value = self.axes.ver.scale(csum[i]); csum[i] -= d.value; return value; })
		.classed('cr_' + self.categories[idx], true)
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(self, idx))
		.on('mouseout', r3.effects.bar.mouseout(self, idx, color))
		.transition()
			.duration(self.config.effects.duration)
			.delay(idx * self.config.effects.duration)
			.attr('height', function (d) { return self.height() - self.axes.ver.scale(d.value); });
	
	bars.append('text').attr('transform','scale(1,-1)')
		.attr('x', function(d) { return self.axes.hor.scale(d.name) + (self.axes.hor.scale.rangeBand()/len)/2; })
		.attr('y', -self.height() - 10)
		.attr('dy', '.71em')
		.attr('text-anchor', 'middle')
		.classed('cr_' + self.categories[idx], true)
		.style('fill', 'none')
		.style('font-family', self.config.bar.fontfamily)
		.style('font-size', self.config.bar.fontsize)
		.style('font-weight', self.config.bar.fontweight)
		.text(function(d) { return String(d.value); })
		.transition()
			.duration(self.config.effects.duration)
			.delay(idx * self.config.effects.duration)
			.attr('y', function (d, i) { tsum[i] += d.value; return -(2*self.height() - self.axes.ver.scale(tsum[i])) - 10; });
			
	bars.append('svg:title')
		.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + '] : ' + d.value;});
	
	bargroup.attr('transform', 'translate(' + idx * self.axes.hor.scale.rangeBand() / len + ',' + 2 * self.height() + ') scale(1,-1)');
};
r3.Table = function () {
	this.caption = undefined;
	this.position = undefined;
	this.graphdef = undefined;

	this.table = undefined;
	this.header = undefined;
	this.body = undefined;
	this.bodyrows = {};
};

r3.Table.prototype.init = function (graphdef, config) {
	this.graphdef = graphdef;
	this.config = $.extend(true, {}, config);
	this.position = this.config.meta.pos || 'body';

	this.table = d3.select(this.position).append('table').attr('class', this.config.table.tableclass);
	this.header = this.table.append('thead').attr('class', this.config.table.headerclass);
	this.body = this.table.append('tbody').attr('class', this.config.table.bodyclass);
	this.footer = this.table.append('tfoot').attr('class', this.config.table.footerclass);
};

r3.Table.prototype.finalize = function () {
	//console.log(this);
};
r3.TableGraph = function (graphdef, config) {
	r3.Table.apply(this, [graphdef]);
	this.init(graphdef, config);

	if (this.config.graph.orientation === 'Horizontal') {
		this.setHorTable();
	} else {
		this.setVerTable();
	}

	this.finalize();
};

r3.TableGraph.prototype = r3.util.extend(r3.Table);

r3.TableGraph.prototype.setHorTable = function () {
	var categories = this.graphdef.categories, tableData = r3.util.getTabularArray(this.graphdef);

	categories.unshift('');
	this.header.append('tr').selectAll('td').data(categories).enter().append('td').text(function (d) { return d; });
	categories.shift();

	this.bodyrows = this.body.selectAll('tr').data(tableData)
					.enter().append('tr');

	this.bodyrows.selectAll('td').data(function (d, i) { return tableData[i]; })
					.enter().append('td')
					.attr('class', function (d, i) { return (i === 0) ? 'chart3rtablelabel' : 'chart3rtabledata'; })
					.text(function (d) {return d; });
};

r3.TableGraph.prototype.setVerTable = function () {
	var labels = r3.util.getLabelArray(this.graphdef), dataset = this.graphdef.dataset;

	labels.unshift('');
	this.header.append('tr').selectAll('td').data(labels).enter().append('td').text(function (d) { return d; });
	labels.shift();

	this.bodyrows = this.body.selectAll('tr').data(this.graphdef.categories)
					.enter().append('tr');

	this.bodyrows.selectAll('td')
		.data(function (d) {
			var arr = [], i, len;
			arr.push(d);
			for (i = 0, len = dataset[d].length; i < len; i = i + 1) { arr.push(dataset[d][i].value); }
			return arr;
		}).enter().append('td')
			.attr('class', function (d, i) { return (i === 0) ? 'chart3rtablelabel' : 'chart3rtabledata'; })
			.text(function (d) {return d; });
};