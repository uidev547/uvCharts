/*! r3vis - v0.1.0 - 2013-02-04
* http://github.com/hashd 
* Copyright (c) 2013 ; Licensed MIT */

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
		type : undefined,
		orientation : 'Horizontal',
		max : 0
	},

	meta : {
		position : '#r3_div',
		caption : 'Usage of browsers by the years'
	},

	dimension : {
		width : 400,
		height : 400
	},

	margin : {
		top : 40,
		bottom : 90,
		left : 100,
		right : 100
	},

	axis : {
		ticks : 8,
		subticks : 1,
		padding : 5,
		minor : -10,
		strokecolor : '#000',
		fontfamily : 'Ubuntu',
		fontsize : '11',
		fontweight : 'normal'
	},

	scale : {
		ordinality : 0.2
	},

	table : {
		tableclass : 'r3_table',
		headerclass : 'r3_header',
		bodyclass : 'r3_body',
		footerclass : 'r3_footer'
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
		opacity : 0.2
	},
	
	pie : {
		fontfamily : 'Ubuntu',
		fontsize : '14',
		fontweight : 'normal',
		fontvariant : 'small-caps',
		fontfill : 'white',
		strokecolor : 'none',
		strokewidth : 2
	},
	
	donut : {
		fontfamily : 'ubuntu',
		fontsize : '14',
		fontweight : 'normal',
		fontvariant : 'small-caps',
		fontfill : 'white',
		factor : 0.4,
		strokecolor : 'none',
		strokewidth : 2
	},
	
	caption : {
		fontfamily : 'Cambria',
		fontsize : '14',
		fontweight : 'bold',
		fontvariant : 'small-caps',
		textdecoration : 'underline',
		hovercolor : 'dimgrey'
	},
	
	legend : {
		fontfamily : 'Ubuntu',
		fontsize : '12',
		fontweight : 'normal',
		textmargin : 15,
		symbolsize : 10
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

r3.constants.defaultHorGraphdef = {
	pos : '#r3_div',
	orientation : 'hor',
	stepup : false,
	charttype : undefined,

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

r3.constants.defaultVerGraphdef = {
	pos : '#r3_div',
	orientation : 'ver',
	stepup : false,
	charttype : undefined,

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
	veraxis : 'r3_veraxis'
};
r3.effects = {};

r3.effects.bar = {};
r3.effects.bar.mouseover = function (config, legend) {
	var effect = function () {
		d3.select(this.parentNode.parentNode).selectAll('rect')
			.transition().duration(config.effects.hover)
				.style('fill', config.effects.hovercolor)
				.style('stroke', config.effects.strokecolor);
	
		d3.select(this.parentNode.parentNode).selectAll('text')
			.transition().duration(config.effects.hover)
				.style('fill', config.effects.textcolor)
				.style('opacity', 1);
	};
	
	if(legend) {
		legend.on('mouseover',effect);
	}
	
	return effect;
};

r3.effects.bar.mouseout = function (config, color) {
	return function () {
		d3.select(this.parentNode.parentNode).selectAll('rect')
			.transition().duration(config.effects.hover)
				.style('fill', color)
				.style('stroke', 'none');
	
		d3.select(this.parentNode.parentNode).selectAll('text')
			.transition().duration(config.effects.hover)
				.style('fill', 'none');
	};
};

r3.effects.area = {};
r3.effects.area.mouseover = function (config) {
	return function () {
		d3.select(this)
			.transition().duration(config.effects.hover)
				.style('fill', config.effects.hovercolor);
	};
};

r3.effects.area.mouseout = function (config) {
	return function (d, i) {
		d3.select(this)
			.transition().duration(config.effects.hover)
				.style('fill', r3.util.getColorBand(config, i)); 
	};
};

r3.effects.line = {};
r3.effects.line.mouseover = function (config) {
	return function () {
		d3.select(this.parentNode).selectAll('circle')
			.transition().duration(config.effects.hover)
				.style('fill', config.effects.hovercolor)
				.style('fill-opacity', 1)
				.style('stroke', config.effects.hovercolor);
				
		d3.select(this.parentNode).select('path')
			.transition().duration(config.effects.hover)
				.style('stroke', config.effects.hovercolor);
				
		d3.select(this.parentNode).selectAll('text')
			.transition().duration(config.effects.hover)
				.style('fill', config.effects.textcolor);
	};
};

r3.effects.line.mouseout = function (config, color) {
	return function () {
		d3.select(this.parentNode).selectAll('circle')
			.transition().duration(config.effects.hover)
				.style('fill', color)
				.style('fill-opacity', 0.6)
				.style('stroke', color);
				
		d3.select(this.parentNode).select('path')
			.transition().duration(config.effects.hover)
				.style('stroke', color);
				
		d3.select(this.parentNode).selectAll('text')
			.transition().duration(config.effects.hover)
				.style('fill', 'none');
	};
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
r3.effects.legend.mouseover = function (self) {
	return function (d, i) {
		self.$.find('.' + self.id + '_' + self.categories[i] + ':first').trigger('mouseover');
	};
};

r3.effects.legend.mouseout = function (self) {
	return function (d, i) {
		self.$.find('.' + self.id + '_' + self.categories[i] + ':first').trigger('mouseout');
	};
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
r3.areagraph = function (graphdef) {
	var self = this;
	r3.graph.apply(self, [graphdef]);
	graphdef.stepup = false;
	self.init(graphdef);

	self.areagroups = [];
	self.dataset = r3.util.getDataArray(self.graphdef);

	var areagroup, areapath, areafunc, idx, len,
		domainData = self.graphdef.dataset[self.graphdef.categories[0]];

	self.axes[self.graphdef.orientation === 'hor' ? 'ver' : 'hor'].scale.domain(domainData.map(function (d) { return d.name; }));

	for (idx = 0, len = self.dataset.length; idx < len; idx = idx + 1) {
		areapath = self.panel.append('g').attr('class', 'area_' + idx).datum(self.dataset[idx]);
		areagroup = { path: areapath, linefunc: undefined, areafunc: undefined, line: undefined, area: undefined };
		self['draw' + r3.util.getPascalCasedName(self.graphdef.orientation) + 'Area'](areagroup, idx);
		self.areagroups.push(areagroup);
	}

	self.finalize();
};

r3.areagraph.prototype = r3.util.extend(r3.graph);

r3.areagraph.prototype.drawHorArea = function (areagroup, idx) {
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

r3.areagraph.prototype.drawVerArea = function (areagroup, idx) {
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
r3.bargraph = function (graphdef) {
	var self = this;
	r3.graph.call(self);
	self.init(graphdef);

	self.bargroups = {};
	var idx, length;

	self.axes[self.graphdef.orientation === 'hor' ? 'ver' : 'hor'].scale.domain(self.labels);

	for (idx = 0, length = self.categories.length; idx < length; idx = idx + 1) {
		self.bargroups[self.categories[idx]] = self.panel.append('g').attr('class', 'r3_bargroup ' + self.categories[idx]);
		self['draw' + self.graphdef.orientation + 'Bars'](idx, length);
	}

	self.finalize();
};

r3.bargraph.prototype = r3.util.extend(r3.graph);

r3.bargraph.prototype.drawhorBars = function (idx, len) {
	var self = this,
		color = r3.util.getColorBand(this.config, idx);
	
	bars = self.bargroups[self.categories[idx]].selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter()
				.append('g').attr('class', 'bar_' + self.categories[idx]);
	
	bars.append('rect')
		.attr('class', self.id + '_' + self.categories[idx])
		.attr('height', self.axes.ver.scale.rangeBand() / len)
		.attr('x', 0)
		.attr('y', function (d) {return self.axes.ver.scale(d.name); })
		.style('stroke', self.config.bar.strokecolor)
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(self.config))
		.on('mouseout', r3.effects.bar.mouseout(self.config, color))
		.transition()
			.duration(self.config.effects.duration)
			.delay(function (d, i) { return i * self.config.effects.duration; })
			.attr('width', function (d) { return self.axes.hor.scale(d.value); });

	bars.append('text')
		.attr('y', function(d) { return self.axes.ver.scale(d.name) + (self.axes.ver.scale.rangeBand()/len)/2; })
		.attr('dx', 4)
		.attr('dy', '.35em')
		.attr('text-anchor', 'start')
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

r3.bargraph.prototype.drawverBars = function (idx, len) {
	var self = this,
		color = r3.util.getColorBand(this.config, idx);
	
	bars = self.bargroups[self.categories[idx]].selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter()
			.append('g').attr('class', 'bar_' + self.categories[idx]);
	
	bars.append('rect')
			.attr('class', self.id + '_' + self.categories[idx])
			.attr('height', 0)
			.attr('width', self.axes.hor.scale.rangeBand() / len)
			.attr('x', function (d) {return self.axes.hor.scale(d.name); })
			.attr('y', 0)
			.style('stroke', self.config.bar.strokecolor).style('fill', color)
			.on('mouseover', r3.effects.bar.mouseover(self.config))
			.on('mouseout', r3.effects.bar.mouseout(self.config, color))
			.transition()
				.duration(self.config.effects.duration)
				.delay(idx * self.config.effects.duration)
				.attr('height', function (d) { return self.height() - self.axes.ver.scale(d.value); });
	
	bars.append('text').attr('transform','scale(1,-1)')
			.attr('x', function(d) { return self.axes.hor.scale(d.name) + (self.axes.hor.scale.rangeBand()/len)/2; })
			.attr('y', -10)
			.attr('dx', 0)
			.attr('dy', '.35em')
			.attr('text-anchor', 'middle')
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
r3.donutgraph = function (graphdef) {
	var self = this;
	r3.graph.apply(self);
	self.init(graphdef);

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

r3.donutgraph.prototype = r3.util.extend(r3.graph);
r3.linegraph = function (graphdef) {
	var self = this;
	r3.graph.apply(self);
	graphdef.stepup = false;
	self.init(graphdef);

	self.linegroups = {};
	self.dataset = r3.util.getDataArray(self.graphdef);

	var linegroup, linepath, linefunc, idx, len, color,
		domainData = self.labels;

	self.axes[self.graphdef.orientation === 'hor' ? 'ver' : 'hor'].scale.domain(domainData);

	for (idx = 0, len = self.categories.length; idx < len; idx = idx + 1) {
		color = r3.util.getColorBand(self.config, idx);

		linepath = self.panel.append('g').attr('class', 'line_' + self.categories[idx]).datum(self.dataset[idx]);
		linegroup = {
			path: linepath,
			func: undefined
		};

		self['draw' + r3.util.getPascalCasedName(self.graphdef.orientation) + 'Lines'](linegroup, idx, color);
		self.linegroups[self.categories[idx]] = linegroup;
	}

	self.finalize();
};

r3.linegraph.prototype = r3.util.extend(r3.graph);

r3.linegraph.prototype.drawHorLines = function (linegroup, idx, color) {
	var self = this,
		axes = self.axes,
		config = self.config;

	linegroup.func = d3.svg.line()
				.x(function (d) { return axes.hor.scale(d.value); })
				.y(function (d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand() / 2; })
				.interpolate(r3.config.line.interpolation);

	linegroup.path.append('path')
				.attr('class', 'linepath_' + self.categories[idx])
				.attr('d', linegroup.func)
				.style('fill', 'none')
				.style('stroke', color)
				.style('stroke-width', 1.5)
				.style('stroke-opacity', 0.01)
				.on('mouseover', r3.effects.line.mouseover(config))
				.on('mouseout', r3.effects.line.mouseout(config, color))
				.transition()
					.duration(3 * self.config.effects.duration)
					.delay(2 * idx * self.config.effects.duration)
					.style('stroke-opacity', 1);

	linegroup.path.selectAll('circle')
				.data(self.dataset[idx])
				.enter().append('circle')
				.attr('class', 'dot_' + self.categories[idx])
				.attr('cx', linegroup.func.x())
				.attr('cy', linegroup.func.y())
				.attr('r', 3.5)
				.style('fill', color)
				.style('fill-opacity', 0.6)
				.style('stroke', color)
				.on('mouseover', r3.effects.line.mouseover(config))
				.on('mouseout', r3.effects.line.mouseout(config, color))
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
				.style('fill', 'none')
				.style('font-family', self.config.bar.fontfamily)
				.style('font-size', self.config.bar.fontsize)
				.style('font-weight', self.config.bar.fontweight)
				.text(function(d) { return String(d.value); });
					
};

r3.linegraph.prototype.drawVerLines = function (linegroup, idx, color) {
	var self = this,
		axes = self.axes,
		height = self.height(),
		config = self.config;

	linegroup.func = d3.svg.line()
				.x(function (d) { return axes.hor.scale(d.name) + axes.hor.scale.rangeBand() / 2; })
				.y(function (d) { return axes.ver.scale(d.value); })
				.interpolate(r3.config.line.interpolation);

	linegroup.path.append('path')
				.attr('class', 'linepath_' + self.categories[idx])
				.attr('d', linegroup.func)
				.style('fill', 'none')
				.style('stroke', color)
				.style('stroke-width', 1.5)
				.style('stroke-opacity', 0.01)
				.on('mouseover', r3.effects.line.mouseover(config))
				.on('mouseout', r3.effects.line.mouseout(config, color))
				.transition()
					.duration(self.config.effects.duration)
					.delay(2 * idx * self.config.effects.duration)
					.style('stroke-opacity', 1);

	linegroup.path.selectAll('circle')
				.data(self.dataset[idx])
				.enter().append('circle')
				.attr('class', 'dot_' + self.categories[idx])
				.attr('cx', linegroup.func.x())
				.attr('cy', linegroup.func.y())
				.attr('r', 3.5)
				.style('fill', color)
				.style('fill-opacity', 0.2)
				.style('stroke', color)
				.on('mouseover', r3.effects.line.mouseover(config))
				.on('mouseout', r3.effects.line.mouseout(config, color))
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
				.style('fill', 'none')
				.style('font-family', self.config.bar.fontfamily)
				.style('font-size', self.config.bar.fontsize)
				.style('font-weight', self.config.bar.fontweight)
				.text(function(d) { return String(d.value); });
};
r3.percent_areagraph = function (graphdef) {
	r3.graph.call(this, graphdef);
	graphdef.stepup = 'percent';
	this.init(graphdef);

	stacklayout = d3.layout.stack().offset('zero')(
		this.categories.map(function (d) {
			return graphdef.dataset[d].map(function (d) {
				return {x: d.name, y: +d.value};
			});
		})
	);

	var areagroup, areapath, areafunc,
		domainData = this.labels, 
		categories = this.categories;

	this.axes[this.graphdef.orientation === 'hor' ? 'ver' : 'hor'].scale.domain(domainData);
	this.areagroup = this.panel.selectAll('g.areagroup').data(stacklayout).enter().append('g').attr('class', 'areagroup');
	this['draw' + this.graphdef.orientation + 'StackArea']();

	this.finalize();
};

r3.percent_areagraph.prototype = r3.util.extend(r3.graph);

r3.percent_areagraph.prototype.drawhorStackArea = function () {
	var axes = this.axes,
		categories = this.categories,
		config = this.config,
		sumMap = r3.util.getSumUpArray(this.graphdef);
	
	axes.ver.scale.rangePoints([0, this.height()]);

	this.areagroup.append('path')
	    .attr('class', function (d, i) { return 'area_' + categories[i]; })
	    .style('fill', function (d, i) { return r3.util.getColorBand(config, i); })
	    .attr('d', d3.svg.area()
		    .y(function (d) { return axes.ver.scale(d.x) + axes.ver.scale.rangeBand() / 2; })
		    .x0(function (d, i) { return axes.hor.scale(r3.util.getPercentage(d.y0, sumMap[i])); })
		    .x1(function (d, i) { return axes.hor.scale(r3.util.getPercentage(d.y0 + d.y, sumMap[i])); })
		    .interpolate(this.config.area.interpolation)
		)
		.on('mouseover', r3.effects.area.mouseover(this.config))
		.on('mouseout', r3.effects.area.mouseout(this.config));

	this.areagroup.append('path')
		.attr('class', function (d, i) { return 'line_' + categories[i]; })
		.style('stroke', 'white')
		.style('fill', 'none')
		.style('stroke-width', 2)
		.attr('d', d3.svg.line()
		    .y(function (d) { return axes.ver.scale(d.x) + axes.ver.scale.rangeBand() / 2; })
		    .x(function (d, i) { return axes.hor.scale(r3.util.getPercentage(d.y0 + d.y, sumMap[i])); })
		    .interpolate(this.config.area.interpolation)
		);
};

r3.percent_areagraph.prototype.drawverStackArea = function () {
	var axes = this.axes,
		categories = this.categories,
		config = this.config,
		sumMap = r3.util.getSumUpArray(this.graphdef);
	
	axes.hor.scale.rangePoints([0, this.width()]);

	this.areagroup.append('path')
	    .attr('class', function (d, i) { return 'area_' + categories[i]; })
	    .style('fill', function (d, i) { return r3.util.getColorBand(config, i); })
	    .attr('d', d3.svg.area()
		    .x(function (d) { return axes.hor.scale(d.x) + axes.hor.scale.rangeBand() / 2; })
		    .y0(function (d, i) { return axes.ver.scale(r3.util.getPercentage(d.y0, sumMap[i])); })
		    .y1(function (d, i) { return axes.ver.scale(r3.util.getPercentage(d.y0 + d.y, sumMap[i])); })
		    .interpolate(this.config.area.interpolation)
	    )
		.on('mouseover', r3.effects.area.mouseover(this.config))
		.on('mouseout', r3.effects.area.mouseout(this.config));

	this.areagroup.append('path')
	    .attr('class', function (d, i) { return 'line_' + categories[i]; })
	    .style('stroke', 'white')
	    .style('fill', 'none')
	    .style('stroke-width', 2)
	    .attr('d', d3.svg.line()
		    .x(function (d, i) { return axes.hor.scale(d.x) + axes.hor.scale.rangeBand() / 2; })
		    .y(function (d, i) { return axes.ver.scale(r3.util.getPercentage(d.y0 + d.y, sumMap[i])); })
		    .interpolate(this.config.area.interpolation)
	    );
};
r3.percent_bargraph = function (graphdef) {
	r3.graph.call(this);
	graphdef.stepup = 'percent';
	this.config.scale.ordinality = 0;
	this.init(graphdef);

	this.bargroups = [];

	var bargroup, bars, idx, len, color,
		domainData = this.labels,
		csum = domainData.map(function (d) {return 0; }),
		tsum = domainData.map(function (d) {return 0; });

	this.axes[this.graphdef.orientation === 'hor' ? 'ver' : 'hor'].scale.domain(domainData);

	for (idx = 0, len = this.categories.length; idx < len; idx = idx + 1) {
		color = r3.util.getColorBand(this.config, idx);

		bargroup = this.panel.append('g').attr('class', 'r3_bargroup');
		bars = bargroup.selectAll('g').data(this.graphdef.dataset[this.categories[idx]]).enter().append('g').attr('class', 'percentbar_' + this.categories[idx]);

		this['drawStack' + r3.util.getPascalCasedName(this.graphdef.orientation) + 'Bars'](bars, csum, tsum, idx);

		if (this.graphdef.orientation === 'ver') {
			bargroup.attr('transform', 'translate(0,' + 2 * this.height() + ') scale(1,-1)');
		}

		this.bargroups.push(bargroup);
	}

	this.finalize();
};

r3.percent_bargraph.prototype = r3.util.extend(r3.graph);

r3.percent_bargraph.prototype.drawStackHorBars = function (bars, csum, tsum, idx) {
	var axes = this.axes,
		color = r3.util.getColorBand(this.config, idx),
		config = this.config,
		sumMap = r3.util.getSumUpArray(this.graphdef);
	
	bars.append('rect')
		.attr('height', axes.ver.scale.rangeBand())
		.attr('width', 0)
		.attr('x', function (d, i) { var value = axes.hor.scale(r3.util.getPercentage(csum[i], sumMap[i])); csum[i] += d.value; return value; })
		.attr('y', function (d) {return axes.ver.scale(d.name); })
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(config))
		.on('mouseout',  r3.effects.bar.mouseout(config, color))
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('width', function (d, i) { return axes.hor.scale(r3.util.getPercentage(d.value, sumMap[i]));});

	bars.append('text')
		.attr('y', function(d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand()/2; })
		.attr('dx', 0)
		.attr('dy', '.35em')
		.attr('text-anchor', 'end')
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

r3.percent_bargraph.prototype.drawStackVerBars = function (bars, csum, tsum, idx) {
	var height = this.height(),
		axes = this.axes,
		color = r3.util.getColorBand(this.config, idx),
		config = this.config,
		sumMap = r3.util.getSumUpArray(this.graphdef);
	
	bars.append('rect')
		.attr('height', 0)
		.attr('width', axes.hor.scale.rangeBand())
		.attr('x', function (d) { return axes.hor.scale(d.name); })
		.attr('y', function (d, i) { var value = axes.ver.scale(r3.util.getPercentage(csum[i], sumMap[i])); csum[i] -= d.value; return value; })
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(config))
		.on('mouseout',  r3.effects.bar.mouseout(config, color))
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('height', function (d, i) { return height - axes.ver.scale(r3.util.getPercentage(d.value, sumMap[i])); });
	
	bars.append('text').attr('transform','scale(1,-1)')
		.attr('x', function(d) { return axes.hor.scale(d.name) + axes.hor.scale.rangeBand()/2; })
		.attr('y', -height + 5)
		.attr('dy', '.71em')
		.attr('text-anchor', 'middle')
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
r3.piegraph = function (graphdef) {
	var self = this;
	r3.graph.apply(self);
	self.init(graphdef);

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

r3.piegraph.prototype = r3.util.extend(r3.graph);
r3.stacked_areagraph = function (graphdef) {
	r3.graph.call(this, graphdef);
	graphdef.stepup = true;
	this.init(graphdef);

	stacklayout = d3.layout.stack().offset('zero')(this.categories.map(function (d) {
	    return graphdef.dataset[d].map(function (d) { return {x: d.name, y: +d.value}; });
	}));

	var areagroup, areapath, areafunc,
		domainData = this.labels, 
		categories = this.categories;

	this.axes[this.graphdef.orientation === 'hor' ? 'ver' : 'hor'].scale.domain(domainData.map(function (d) { return d; }));
	this.areagroup = this.panel.selectAll('g.areagroup').data(stacklayout).enter().append('g').attr('class', 'areagroup');
	this['draw' + this.graphdef.orientation + 'StackArea']();

	this.finalize();
};

r3.stacked_areagraph.prototype = r3.util.extend(r3.graph);

r3.stacked_areagraph.prototype.drawhorStackArea = function () {
	var axes = this.axes,
		categories = this.categories,
		config = this.config;
	
	axes.ver.scale.rangePoints([0, this.height()]);

	this.areagroup.append('path')
	    .attr('class', function (d, i) { return 'area_' + categories[i]; })
	    .style('fill', function (d, i) { return r3.util.getColorBand(config, i); })
	    .attr('d', d3.svg.area()
		    .y(function (d) { return axes.ver.scale(d.x) + axes.ver.scale.rangeBand() / 2; })
		    .x0(function (d) { return axes.hor.scale(d.y0); })
		    .x1(function (d) { return axes.hor.scale(d.y0 + d.y); })
		    .interpolate(this.config.area.interpolation)
		)
		.on('mouseover', r3.effects.area.mouseover(this.config))
		.on('mouseout',  r3.effects.area.mouseout(this.config));

	this.areagroup.append('path')
		.attr('class', function (d, i) { return 'line_' + categories[i]; })
		.style('stroke', 'white')
		.style('fill', 'none')
		.style('stroke-width', 2)
		.attr('d', d3.svg.line()
		    .y(function (d) { return axes.ver.scale(d.x) + axes.ver.scale.rangeBand() / 2; })
		    .x(function (d) { return axes.hor.scale(d.y0 + d.y); })
		    .interpolate(this.config.area.interpolation)
		);
};

r3.stacked_areagraph.prototype.drawverStackArea = function () {
	var axes = this.axes,
		categories = this.categories,
		config = this.config;
	
	axes.hor.scale.rangePoints([0, this.width()]);

	this.areagroup.append('path')
	    .attr('class', function (d, i) { return 'area_' + categories[i]; })
	    .style('fill', function (d, i) { return r3.util.getColorBand(config, i); })
	    .attr('d', d3.svg.area()
		    .x(function (d) { return axes.hor.scale(d.x) + axes.hor.scale.rangeBand() / 2; })
		    .y0(function (d) { return axes.ver.scale(d.y0); })
		    .y1(function (d) { return axes.ver.scale(d.y0 + d.y); })
		    .interpolate(this.config.area.interpolation)
	    )
		.on('mouseover', r3.effects.area.mouseover(this.config))
		.on('mouseout',  r3.effects.area.mouseout(this.config));

	this.areagroup.append('path')
	    .attr('class', function (d, i) { return 'line_' + categories[i]; })
	    .style('stroke', 'white')
	    .style('fill', 'none')
	    .style('stroke-width', 2)
	    .attr('d', d3.svg.line()
		    .x(function (d) { return axes.hor.scale(d.x) + axes.hor.scale.rangeBand() / 2; })
		    .y(function (d) { return axes.ver.scale(d.y0 + d.y); })
		    .interpolate(this.config.area.interpolation)
	    );
};
r3.stacked_bargraph = function (graphdef) {
	r3.graph.call(this);
	graphdef.stepup = true;
	this.init(graphdef);

	this.bargroups = {};

	var bargroup, bars, idx, len, color,
		domainData = this.labels,
		csum = domainData.map(function (d) {return 0; }),
		tsum = domainData.map(function (d) {return 0; });

	this.axes[this.graphdef.orientation === 'hor' ? 'ver' : 'hor'].scale.domain(domainData);

	for (idx = 0, len = this.categories.length; idx < len; idx = idx + 1) {
		this.bargroups[this.categories[idx]] = this.panel.append('g').attr('class', 'r3_stackedbargroup_' + this.categories[idx]);
		this['drawStack' + r3.util.getPascalCasedName(this.graphdef.orientation) + 'Bars'](idx, csum, tsum);
	}

	this.finalize();
};

r3.stacked_bargraph.prototype = r3.util.extend(r3.graph);

r3.stacked_bargraph.prototype.drawStackHorBars = function (idx, csum, tsum) {
	var self = this,
		axes = this.axes,
		color = r3.util.getColorBand(this.config, idx),
		config = this.config,
		bargroup = this.bargroups[this.categories[idx]];
	
	bars = bargroup.selectAll('g').data(this.graphdef.dataset[this.categories[idx]])
				.enter().append('g').attr('class', 'r3_stackedbar_' + this.categories[idx]);
	
	bars.append('rect')
		.attr('height', axes.ver.scale.rangeBand())
		.attr('width', 0)
		.attr('x', function (d, i) { var value = axes.hor.scale(csum[i]); csum[i] += d.value; return value; })
		.attr('y', function (d) {return axes.ver.scale(d.name); })
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(config))
		.on('mouseout',  r3.effects.bar.mouseout(config, color))
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('width', function (d) { return axes.hor.scale(d.value); });

	bars.append('text')
		.attr('y', function(d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand()/2; })
		.attr('dx', 0)
		.attr('dy', '.35em')
		.attr('text-anchor', 'end')
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

r3.stacked_bargraph.prototype.drawStackVerBars = function (idx, csum, tsum) {
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
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(config))
		.on('mouseout',  r3.effects.bar.mouseout(config, color))
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('height', function (d) { return height - axes.ver.scale(d.value); });
	
	bars.append('text').attr('transform','scale(1,-1)')
		.attr('x', function(d) { return axes.hor.scale(d.name) + axes.hor.scale.rangeBand()/2; })
		.attr('y', -height + 5)
		.attr('dy', '.71em')
		.attr('text-anchor', 'middle')
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
r3.stepup_bargraph = function (graphdef) {
	var self = this;
	r3.graph.apply(self);
	graphdef.stepup = true;
	self.init(graphdef);

	this.bargroups = {};

	var idx, length,
		csum = self.labels.map(function (d) {return 0; }),
		tsum = self.labels.map(function (d) {return 0; });

	self.axes[this.graphdef.orientation === 'hor' ? 'ver' : 'hor'].scale.domain(this.labels);

	for (idx = 0, length = self.categories.length; idx < length; idx = idx + 1) {
		self.bargroups[self.categories[idx]] = this.panel.append('g').attr('class', 'r3_bargroup_' + self.categories[idx]);
		self['drawStepUp' + self.graphdef.orientation + 'Bars'](idx, length, csum, tsum);	
	}

	self.finalize();
};

r3.stepup_bargraph.prototype = r3.util.extend(r3.graph);

r3.stepup_bargraph.prototype.drawStepUphorBars = function (idx, len, csum, tsum) {
	var self = this,
		color = r3.util.getColorBand(self.config, idx),
		bargroup = self.bargroups[self.categories[idx]];

	bars = bargroup.selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter().append('g').attr('class', 'stepupbar_' + self.categories[idx]);
	bars.append('rect')
		.attr('height', self.axes.ver.scale.rangeBand() / len)
		.attr('width', 0)
		.attr('x', function (d, i) { var value = self.axes.hor.scale(csum[i]); csum[i] += d.value; return value; })
		.attr('y', function (d) {return self.axes.ver.scale(d.name); })
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(self.config))
		.on('mouseout',  r3.effects.bar.mouseout(self.config, color))
		.transition()
			.duration(self.config.effects.duration)
			.delay(idx * self.config.effects.duration)
			.attr('width', function (d) { return self.axes.hor.scale(d.value); });

	bars.append('text')
		.attr('y', function(d) { return self.axes.ver.scale(d.name) + (self.axes.ver.scale.rangeBand()/len)/2; })
		.attr('dx', 4)
		.attr('dy', '.35em')
		.attr('text-anchor', 'start')
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

r3.stepup_bargraph.prototype.drawStepUpverBars = function (idx, len, csum, tsum) {
	var self = this, 
		color = r3.util.getColorBand(self.config, idx),
		bargroup = self.bargroups[self.categories[idx]];

	bars = bargroup.selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter().append('g').attr('class', 'stepupbar_' + self.categories[idx]);
	bars.append('rect')
		.attr('height', 0)
		.attr('width', self.axes.hor.scale.rangeBand() / len)
		.attr('x', function (d) { return self.axes.hor.scale(d.name); })
		.attr('y', function (d, i) { var value = self.axes.ver.scale(csum[i]); csum[i] -= d.value; return value; })
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(self.config))
		.on('mouseout', r3.effects.bar.mouseout(self.config, color))
		.transition()
			.duration(self.config.effects.duration)
			.delay(idx * self.config.effects.duration)
			.attr('height', function (d) { return self.height() - self.axes.ver.scale(d.value); });
	
	bars.append('text').attr('transform','scale(1,-1)')
		.attr('x', function(d) { return self.axes.hor.scale(d.name) + (self.axes.hor.scale.rangeBand()/len)/2; })
		.attr('y', -self.height() - 10)
		.attr('dy', '.71em')
		.attr('text-anchor', 'middle')
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
r3.table = function () {
	this.caption = undefined;
	this.position = undefined;
	this.graphdef = undefined;

	this.table = undefined;
	this.header = undefined;
	this.body = undefined;
	this.bodyrows = {};
};

r3.table.prototype.init = function (graphdef) {
	this.graphdef = graphdef;
	this.position = this.graphdef.pos || '#chart3rdiv' || 'body';

	this.table = d3.select(this.position).append('table').attr('class', r3.config.table.tableclass);
	this.header = this.table.append('thead').attr('class', r3.config.table.headerclass);
	this.body = this.table.append('tbody').attr('class', r3.config.table.bodyclass);
};

r3.table.prototype.finalize = function () {
	//console.log(this);
};
r3.tablegraph = function (graphdef) {
	r3.table.apply(this, [graphdef]);
	this.init(graphdef);

	if (this.graphdef.orientation === 'hor') {
		this.setHorTable();
	} else {
		this.setVerTable();
	}

	this.finalize();
};

r3.tablegraph.prototype = r3.util.extend(r3.table);

r3.tablegraph.prototype.setHorTable = function () {
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

r3.tablegraph.prototype.setVerTable = function () {
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