var r3 = {};

r3.graph = function () {
	this.dimension = {};
	this.margin = {};

	this.graphdef = undefined;
	this.position = undefined;
	this.caption = undefined;

	this.frame = undefined;
	this.panel = undefined;
	this.bg = undefined;

	this.max = undefined;

	this.axes = {
		hor : { group: undefined, scale : undefined, func: undefined, axis : undefined, line : undefined },
		ver : { group: undefined, scale : undefined, func: undefined, axis : undefined, line : undefined }
	};
};

r3.graph.prototype.init = function(graphdef) {
	this.graphdef = graphdef;
	this.position = this.graphdef.pos || ('#' + r3.constants.class.pos) || 'body';

	this.max = this.graphdef.stepup ? r3.util.getStepMaxValue(this.graphdef) : r3.util.getMaxValue(this.graphdef);

	this.setDimensions();	
	this.setFrame();
	this.setPanel();
	this.setBackground('grey');
	this.setHorAxis();
	this.setVerAxis();
};

r3.graph.prototype.setDimensions = function () {
	this.dimension.height = this.graphdef.dimension.height || r3.constants.defaultGraphdef.dimension.height;
	this.dimension.width = this.graphdef.dimension.width || r3.constants.defaultGraphdef.dimension.width;
	this.margin.left = this.graphdef.margin.left || r3.constants.defaultGraphdef.margin.left;
	this.margin.right = this.graphdef.margin.right || r3.constants.defaultGraphdef.margin.right;
	this.margin.top = this.graphdef.margin.top || r3.constants.defaultGraphdef.margin.top;
	this.margin.bottom = this.graphdef.margin.bottom || r3.constants.defaultGraphdef.margin.bottom;
};

r3.graph.prototype.setFrame = function (className){
	if(this.frame === undefined) {
		this.frame = d3.select(this.position || "body").append("svg");
	}

	this.frame.attr("class", className || r3.constants.class.frame)
			.attr("width", this.dimension.width + this.margin.left + this.margin.right)
			.attr("height", this.dimension.height + this.margin.top + this.margin.bottom);
};

r3.graph.prototype.setPanel = function (className) {
	if (this.panel === undefined) {
		this.panel = this.frame.append("g");
	}

	this.panel.attr("class", className || r3.constants.class.panel)
		.attr("transform", 'translate(' + this.margin.left + ',' + this.margin.top + ')');
};

r3.graph.prototype.setBackground = function (color) {
	if (this.bg === undefined) {
		this.bg = this.panel.append("rect").attr("class", r3.constants.class.background).attr("height", this.dimension.height).attr("width", this.dimension.width);
	}
	
	this.bg.style('fill',color);
};

r3.graph.prototype.setHorAxis = function () {
	var graphdef = this.graphdef;
	this.axes.hor.group = this.panel.append('g').attr('class',r3.constants.class.horaxis);

	if(graphdef.orientation === 'hor'){
		this.axes.hor.group.attr('transform','translate(0,' + this.dimension.height + ')');
		this.axes.hor.scale	= d3.scale.linear()
			.domain([0,this.max+1]).range([0, this.dimension.width]).nice();

		this.axes.hor.func = d3.svg.axis()
			.scale(this.axes.hor.scale)
			.ticks(r3.config.axis.ticks)
			.tickSize(-this.dimension.width, r3.config.axis.minor, 0)
			.tickPadding(r3.config.axis.padding)
			.tickSubdivide(r3.config.axis.subticks)
			.orient("bottom");
	} else {
		this.axes.hor.scale = d3.scale.ordinal().rangeRoundBands( [0, this.dimension.width], r3.config.scale.ordinality);
		this.axes.hor.func = undefined;
	}
};

r3.graph.prototype.setVerAxis = function () {
	var graphdef = this.graphdef;
	this.axes.ver.group = this.panel.append('g').attr('class',r3.constants.class.veraxis);

	if(graphdef.orientation === 'ver'){
		this.axes.ver.scale	= d3.scale.linear()
			.domain([this.max+1, 0])
			.range([0, this.dimension.height])
			.nice();
		
		this.axes.ver.func = d3.svg.axis()
			.scale(this.axes.ver.scale)
			.ticks(r3.config.axis.ticks)
			.tickSize(-this.dimension.height, r3.config.axis.minor, 0)
			.tickPadding(r3.config.axis.padding)
			.tickSubdivide(r3.config.axis.subticks)
			.orient("left");
	} else {
		this.axes.ver.scale = d3.scale.ordinal().rangeRoundBands( [0, this.dimension.height], r3.config.scale.ordinality);
		this.axes.ver.func = undefined;
	}
};

r3.graph.prototype.drawHorAxis = function () {	
	if(this.graphdef.orientation === 'hor') {
		this.axes.hor.axis = this.axes.hor.group.append('g')
			.call(this.axes.hor.func);
	}

	this.axes.hor.line = this.axes.hor.group.append('line')
							//.attr('y1', this.graphdef.orientation === 'hor'? 0 : this.dimension.height)
							//.attr('y2', this.graphdef.orientation === 'hor'? 0 : this.dimension.height)
							.attr('x1','0')
							.attr('x2', this.dimension.width);
};

r3.graph.prototype.drawVerAxis = function () {
	if(this.graphdef.orientation === 'ver') {
		this.axes.ver.axis = this.axes.ver.group.append('g').
			call(this.axes.ver.func);
	}

	this.axes.ver.line = this.axes.ver.group.append('line').attr('y1', 0).attr('y2', this.dimension.height);
};

r3.graph.prototype.finalize = function () { 
	this.drawHorAxis();
	this.drawVerAxis();
	console.log(this);
};