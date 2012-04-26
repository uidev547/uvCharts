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
		hor : { group: undefined, scale : undefined, func: undefined, axis : undefined, line : undefined },
		ver : { group: undefined, scale : undefined, func: undefined, axis : undefined, line : undefined }
	};
};

r3.graph.prototype.init = function (graphdef) {
	this.graphdef = graphdef;
	this.Max(this.graphdef.stepup ? r3.util.getStepMaxValue(this.graphdef) : r3.util.getMaxValue(this.graphdef))
		.position(r3.config.meta.position || ('#' + r3.constants.name.pos) || 'body');

	this.setDimensions().setFrame().setPanel().setBackground().setMetadata().setHorAxis().setVerAxis();
};

r3.graph.prototype.setDimensions = function () {
	return this.height(r3.config.dimension.height).width(r3.config.dimension.width).top(r3.config.margin.top)
			.bottom(r3.config.margin.bottom).left(r3.config.margin.left).right(r3.config.margin.right);
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

	this.bg.style('fill', color || 'white');
	return this;
};

r3.graph.prototype.setHorAxis = function () {
	var graphdef = this.graphdef;
	this.axes.hor.group = this.panel.append('g').attr('class', r3.constants.name.horaxis).attr('transform', 'translate(0,' + this.height() + ')');

	if (graphdef.orientation === 'hor') {
		this.axes.hor.scale	= d3.scale.linear().domain([0, this.max + 1]).range([0, this.width()]).nice();
		this.axes.hor.func = d3.svg.axis().scale(this.axes.hor.scale).ticks(r3.config.axis.ticks).tickSize(-this.width(), r3.config.axis.minor, 0)
			.tickPadding(r3.config.axis.padding).tickSubdivide(r3.config.axis.subticks).orient('bottom');
	} else {
		this.axes.hor.scale = d3.scale.ordinal().rangeRoundBands([0, this.width()], r3.config.scale.ordinality);
		this.axes.hor.func = d3.svg.axis().scale(this.axes.hor.scale).tickPadding(r3.config.axis.padding).orient('bottom');
	}

	return this;
};

r3.graph.prototype.setVerAxis = function () {
	var graphdef = this.graphdef;
	this.axes.ver.group = this.panel.append('g').attr('class', r3.constants.name.veraxis);

	if (graphdef.orientation === 'ver') {
		this.axes.ver.scale	= d3.scale.linear().domain([this.max + 1, 0]).range([0, this.height()]).nice();
		this.axes.ver.func = d3.svg.axis().scale(this.axes.ver.scale).ticks(r3.config.axis.ticks).tickSize(-this.height(), r3.config.axis.minor, 0)
			.tickPadding(r3.config.axis.padding).tickSubdivide(r3.config.axis.subticks).orient('left');
	} else {
		this.axes.ver.scale = d3.scale.ordinal().rangeRoundBands([0, this.height()], r3.config.scale.ordinality);
		this.axes.ver.func = d3.svg.axis().scale(this.axes.ver.scale).tickPadding(r3.config.axis.padding).orient('left');
	}

	return this;
};

r3.graph.prototype.drawHorAxis = function () {
	this.axes.hor.axis = this.axes.hor.group.append('g').call(this.axes.hor.func);
	this.axes.hor.axis.selectAll('line').style('stroke', 'black');
	this.axes.hor.line = this.axes.hor.group.append('line').attr('x1', '0').attr('x2', this.width());
};

r3.graph.prototype.drawVerAxis = function () {
	this.axes.ver.axis = this.axes.ver.group.append('g').call(this.axes.ver.func);
	this.axes.ver.axis.selectAll('line').style('stroke', 'black');
	this.axes.ver.line = this.axes.ver.group.append('line').attr('y1', 0).attr('y2', this.height());
};

r3.graph.prototype.finalize = function () {
	this.drawHorAxis();
	this.drawVerAxis();
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



