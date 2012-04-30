var r3 = {};

r3.graph = function () {
	this.graphdef = undefined;
	this.config = r3.config;

	this.frame = undefined;
	this.panel = undefined;
	this.bg = undefined;

	this.max = undefined;

	this.labels = undefined;
	this.categories = undefined;

	this.axes = {
		hor : { group: undefined, scale : undefined, func: undefined, axis : undefined, line : undefined, label : undefined },
		ver : { group: undefined, scale : undefined, func: undefined, axis : undefined, line : undefined, label : undefined }
	};
};

r3.graph.prototype.init = function (graphdef) {
	this.graphdef = graphdef;
	this.Max(this.graphdef.stepup ? r3.util.getStepMaxValue(this.graphdef) : r3.util.getMaxValue(this.graphdef))
		.position(this.config.meta.position || ('#' + r3.constants.name.pos) || 'body');

	this.setDimensions().setFrame().setPanel().setBackground().setCaption().setMetadata().setHorAxis().setVerAxis();
};

r3.graph.prototype.setDimensions = function () {
	return this.height(this.config.dimension.height).width(this.config.dimension.width).top(this.config.margin.top)
			.bottom(this.config.margin.bottom).left(this.config.margin.left).right(this.config.margin.right);
};

r3.graph.prototype.setFrame = function (className) {
	if (this.frame === undefined) {
		this.frame = d3.select(this.position() || 'body').append('svg');
	}

	this.frame.attr('class', className || r3.constants.name.frame)
		.attr('width', this.width() + this.left() + this.right())
		.attr('height', this.height() + this.top() + this.bottom());

	return this;
};

r3.graph.prototype.setPanel = function (className) {
	if (this.panel === undefined) {
		this.panel = this.frame.append('g');
	}

	this.panel.attr('class', className || r3.constants.name.panel)
		.attr('transform', 'translate(' + this.left() + ',' + this.top() + ')');

	return this;
};

r3.graph.prototype.setBackground = function (color) {
	if (this.bg === undefined) {
		this.bg = this.panel.append('rect').attr('class', r3.constants.name.background).attr('height', this.height()).attr('width', this.width());
	}

	this.bg.style('fill', color || this.config.graph.background);
	return this;
};

r3.graph.prototype.setHorAxis = function () {
	var graphdef = this.graphdef;
	this.axes.hor.group = this.panel.append('g').attr('class', r3.constants.name.horaxis)
								.attr('transform', 'translate(0,' + this.height() + ')');

	if (graphdef.orientation === 'hor') {
		this.axes.hor.scale	= d3.scale.linear().domain([0, this.max + 1]).range([0, this.width()]).nice();
		this.axes.hor.func = d3.svg.axis().scale(this.axes.hor.scale).ticks(this.config.axis.ticks).tickSize(-this.width(), this.config.axis.minor, 0)
			.tickPadding(this.config.axis.padding).tickSubdivide(this.config.axis.subticks).orient('bottom');
	} else {
		this.axes.hor.scale = d3.scale.ordinal().rangeRoundBands([0, this.width()], this.config.scale.ordinality);
		this.axes.hor.func = d3.svg.axis().scale(this.axes.hor.scale).tickPadding(this.config.axis.padding).orient('bottom');
	}

	return this;
};

r3.graph.prototype.setVerAxis = function () {
	var graphdef = this.graphdef;
	this.axes.ver.group = this.panel.append('g').attr('class', r3.constants.name.veraxis);

	if (graphdef.orientation === 'ver') {
		this.axes.ver.scale	= d3.scale.linear().domain([this.max + 1, 0]).range([0, this.height()]).nice();
		this.axes.ver.func = d3.svg.axis().scale(this.axes.ver.scale).ticks(this.config.axis.ticks).tickSize(-this.height(), this.config.axis.minor, 0)
			.tickPadding(this.config.axis.padding).tickSubdivide(this.config.axis.subticks).orient('left');
	} else {
		this.axes.ver.scale = d3.scale.ordinal().rangeRoundBands([0, this.height()], this.config.scale.ordinality);
		this.axes.ver.func = d3.svg.axis().scale(this.axes.ver.scale).tickPadding(this.config.axis.padding).orient('left');
	}

	return this;
};

r3.graph.prototype.drawHorAxis = function () {
	this.axes.hor.axis = this.axes.hor.group.append('g')
								.style('font-family', this.config.axis.fontfamily)
								.style('font-size', this.config.axis.fontsize)
								.style('font-weight', this.config.axis.fontweight)
								.call(this.axes.hor.func);
	
	this.axes.hor.axis.selectAll('line').style('stroke', this.config.axis.strokecolor);
	
	this.axes.hor.line = this.panel.append('line')
								.attr('class', r3.constants.name.horaxis)
								.attr('y1', this.height())
								.attr('y2', this.height())
								.attr('x1', '0')
								.attr('x2', this.width())
								.style('stroke', this.config.axis.strokecolor);
	/*
	this.axes.hor.label = this.axes.hor.group.append('text').attr('display','block')
								.attr('x', this.width()/2)
								.attr('y', this.config.margin.bottom/2)
								.attr('text-anchor','middle')
								.text('Horizontal Axis Label');
	*/
	return this;
};

r3.graph.prototype.drawVerAxis = function () {
	this.axes.ver.axis = this.axes.ver.group.append('g')
								.style('font-family', this.config.axis.fontfamily)
								.style('font-size', this.config.axis.fontsize)
								.style('font-weight', this.config.axis.fontweight)
								.call(this.axes.ver.func);
	
	this.axes.ver.axis.selectAll('line').style('stroke', this.config.axis.strokecolor);
	
	this.axes.ver.line = this.panel.append('line')
								.attr('class', r3.constants.name.veraxis)
								.attr('y1', 0)
								.attr('y2', this.height())
								.style('stroke', this.config.axis.strokecolor);
	/*
	this.axes.ver.label = this.axes.ver.group.append('text')
								.attr('x', -4*this.config.margin.left/5)
								.attr('y', this.height()/2)
								.attr('transform','rotate(90deg)')
								.style('writing-mode','tb-rl')
								.style('-o-tranform','rotate(270deg)')
								.style('-moz-tranform','rotate(270deg)')
								.style('-webkit-tranform','rotate(270deg)')
								.style('tranform','rotate(270deg)')
								.attr('text-anchor', 'middle')
								.text('Vertical Axis Label');
	*/
	return this;
};

r3.graph.prototype.drawLegends = function () {
	var xorg = this.config.dimension.width,
		yorg = 10,
		categories = this.categories,
		config = this.config;
		
	this.legendgroup = this.panel.append('g').attr('class','r3_legends')
						.attr('transform', 'translate(' + xorg + ',' + yorg + ')');
	
	this.legends = this.legendgroup.selectAll('g').data(categories).enter().append('g')
						.attr('transform', function (d,i) { return 'translate(10,' + 10*(2*i-1) + ')'; });
	
	this.legends.attr('class', function (d, i) { return 'r3_legend_' + categories[i]; })
				.append('rect').attr('class','r3_legendsign')
				.attr('height', this.config.legend.symbolsize)
				.attr('width', this.config.legend.symbolsize)
				.style('fill', function (d, i) { return r3.util.getColorBand(config, i);})
				.style('stroke', 'none');
	
	this.legends.append('text').attr('class','r3_legendtext')
				.text( function (d,i) { return categories[i]; })
				.attr('dx', this.config.legend.textmargin)
				.attr('dy', '.71em')
				.attr('text-anchor', 'start')
				.style('font-family', this.config.legend.fontfamily)
				.style('font-size', this.config.legend.fontsize)
				.style('font-weight', this.config.legend.fontweight);
	
	return this;
};

r3.graph.prototype.setCaption = function () {
	var config = this.config;
	
	this.panel.append('g').attr('class', 'r3_caption').append('text').attr('class', 'r3_captiontext')
		.text(this.config.meta.caption)
		.attr('y', - this.config.margin.top / 2)
		.attr('x', this.config.dimension.width / 2)
		.attr('text-anchor', 'middle')
		.style('font-family', this.config.caption.fontfamily)
		.style('font-size', this.config.caption.fontsize)
		.style('font-weight', this.config.caption.fontweight)
		.style('font-variant', this.config.caption.fontvariant)
		.style('text-decoration', this.config.caption.textdecoration)
		.on('mouseover', function () {
			d3.select(this.parentNode.parentNode).select('.' + r3.constants.name.background).style('fill', config.caption.hovercolor);
		})
		.on('mouseout', function () {
			d3.select(this.parentNode.parentNode).select('.' + r3.constants.name.background).style('fill', config.graph.background);
		});
	
	return this;
};

r3.graph.prototype.finalize = function () {
	this.drawHorAxis().drawVerAxis().drawLegends();
	return this;
};

r3.graph.prototype.setMetadata = function () {
	this.labels = r3.util.getLabelArray(this.graphdef);
	this.categories = r3.util.getCategoryArray(this.graphdef);
	return this;
};

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

r3.graph.prototype.maxim = function (max) {
	if (max) {
		this.max = max;
		return this;
	}

	return this.max;
};

r3.graph.prototype.caption = function (caption) {
	if (caption) {
		this.config.meta.caption = caption;
		return this;
	}

	return this.config.meta.caption;
};

r3.graph.prototype.Max = function (value) {
	if (value) {
		this.max = value;
		return this;
	}

	return this.max;
};



