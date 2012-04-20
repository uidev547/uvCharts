var r3 = {};
var cv = {};

cv.graph = function () {
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

cv.graph.prototype.init = function(graphdef) {
	this.graphdef = graphdef;
	this.position = this.graphdef.pos || '#chart3rdiv' || 'body';

	this.max = this.graphdef.stepup ? r3.util.getStepMaxValue(this.graphdef) : r3.util.getMaxValue(this.graphdef);

	this.setDimensions();	
	this.setChart3rFrame();
	this.setChart3rPanel();
	this.setChart3rBackground('lavender');
	this.setHorAxis();
	this.setVerAxis();
};

cv.graph.prototype.setDimensions = function () {
	this.dimension.height = this.graphdef.dimension.height || cv.constants.defaultGraphdef.dimension.height;
	this.dimension.width = this.graphdef.dimension.width || cv.constants.defaultGraphdef.dimension.width;
	this.margin.left = this.graphdef.margin.left || cv.constants.defaultGraphdef.margin.left;
	this.margin.right = this.graphdef.margin.right || cv.constants.defaultGraphdef.margin.right;
	this.margin.top = this.graphdef.margin.top || cv.constants.defaultGraphdef.margin.top;
	this.margin.bottom = this.graphdef.margin.bottom || cv.constants.defaultGraphdef.margin.bottom;
};

cv.graph.prototype.setChart3rFrame = function (className){
	if(this.frame === undefined) {
		this.frame = d3.select(this.position || "body").append("svg");
	}

	this.frame.attr("class", className || "chart3rframe")
			.attr("width", this.dimension.width+this.margin.left+this.margin.right)
			.attr("height", this.dimension.height+this.margin.top+this.margin.bottom);
};

cv.graph.prototype.setChart3rPanel = function (className) {
	if (this.panel === undefined) {
		this.panel = this.frame.append("g");
	}

	this.panel.attr("class", className || "chart3rpanel")
		.attr("transform", 'translate(' + this.margin.left + ',' + this.margin.top + ')');
};

cv.graph.prototype.setChart3rBackground = function (color) {
	if (this.bg === undefined) {
		this.bg = this.panel.append("rect").attr("class", 'chart3rbg').attr("height", this.dimension.height).attr("width", this.dimension.width);
	}
	
	this.bg.style('fill',color);
};

cv.graph.prototype.setHorAxis = function () {
	var graphdef = this.graphdef;
	this.axes.hor.group = this.panel.append('g').attr('class','x axis');

	if(graphdef.orientation === 'hor'){
		this.axes.hor.group.attr('transform','translate(0,' + this.dimension.height + ')');
		this.axes.hor.scale	= d3.scale.linear()
			.domain([0,this.max+2])
			.range([0, this.dimension.width])
			.nice();

		this.axes.hor.func = d3.svg.axis()
			.scale(this.axes.hor.scale)
			.ticks(8)
			.tickSize(-this.dimension.height, -10, 0)
			.tickPadding(10)
			.tickSubdivide(1)
			.orient("bottom");
	} else {
		this.axes.hor.scale = d3.scale.ordinal().rangeRoundBands( [0, this.dimension.width], 0.2);
		this.axes.hor.func = undefined;
	}
};

cv.graph.prototype.setVerAxis = function () {
	var graphdef = this.graphdef;
	this.axes.ver.group = this.panel.append('g').attr('class','y axis');

	if(graphdef.orientation === 'ver'){
		this.axes.ver.scale	= d3.scale.linear()
			.domain([this.max+2, 0])
			.range([0, this.dimension.height])
			.nice();
		
		this.axes.ver.func = d3.svg.axis()
			.scale(this.axes.ver.scale)
			.ticks(8)
			.tickSize(-this.dimension.height, -10, 0)
			.tickPadding(10)
			.tickSubdivide(1)
			.orient("left");
	} else {
		this.axes.ver.scale = d3.scale.ordinal().rangeRoundBands( [0, this.dimension.height], 0.2);
		this.axes.ver.func = undefined;
	}
};

cv.graph.prototype.drawHorAxis = function () {	
	if(this.graphdef.orientation === 'hor') {
		this.axes.hor.axis = this.axes.hor.group.append('g')
			.call(this.axes.hor.func);
	}

	this.axes.hor.line = this.axes.hor.group.append('line')
							.attr('y1', this.graphdef.orientation === 'hor'? 0 : this.dimension.height)
							.attr('y2', this.graphdef.orientation === 'hor'? 0 : this.dimension.height)
							.attr('x1','0')
							.attr('x2', this.dimension.width);
};

cv.graph.prototype.drawVerAxis = function () {
	if(this.graphdef.orientation === 'ver') {
		this.axes.ver.axis = this.axes.ver.group.append('g').
			call(this.axes.ver.func);
	}

	this.axes.ver.line = this.axes.ver.group.append('line').attr('y1', 0).attr('y2', this.dimension.height);
};

cv.graph.prototype.finalize = function () { 
	this.drawHorAxis();
	this.drawVerAxis();
	console.log(this);
};