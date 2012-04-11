var cv = {};

cv.graph = function () {

	this.dimension = {
		height: 400,
		width: 400
	};

	this.margin = {
		left: 60,		//x
		right: 20,		//dx
		top: 20,		//y
		bottom: 60		//dy
	};

	this.graphDef 		= undefined;
	this.pos			= undefined;
	this.caption		= undefined;
	this.horAxisLabel	= undefined;
	this.verAxisLabel	= undefined;

	this.frame			= undefined;
	this.panel			= undefined;
	this.group			= undefined;
	this.horAxis 		= undefined;
	this.verAxis 		= undefined;	
	this.horGrid		= undefined;
	this.verGrid		= undefined;
};

cv.graph.properties = ["width", "height", "caption", "xAxisName", "yAxisName"];

cv.graph.prototype.init = function(graphDef) {

	if(graphDef){
		if(graphDef.dimension){
			if(graphDef.dimension.height) this.dimension.height = graphDef.dimension.height;
			if(graphDef.dimension.width) this.dimension.width = graphDef.dimension.width;
		}

		if(graphDef.margin){
			if(graphDef.margin.left) this.margin.left = graphDef.margin.left;
			if(graphDef.margin.right) this.margin.right = graphDef.margin.right;
			if(graphDef.margin.top) this.margin.top = graphDef.margin.top;
			if(graphDef.margin.bottom) this.margin.bottom = graphDef.margin.bottom;
		}

		if(graphDef.pos) this.pos = graphDef.pos;
	}

	var height 	= this.dimension.height - this.margin.top - this.margin.bottom,
		width	= this.dimension.width - this.margin.left - this.margin.right;

	this.frame = d3.selectAll(this.pos || "body").append("svg")
					.attr("class","chartrframe")
					.attr("width", this.dimension.width)
					.attr("height", this.dimension.height);

	this.panel = d3.selectAll(".chartrframe").append("svg")
					.attr("class","chartrpanel")
				    .attr("x", this.margin.left-20).attr("y", this.margin.top)
					.attr("width", this.dimension.width)
					.attr("height", this.dimension.height);

	this.group = d3.selectAll(".chartrpanel").append("g").attr("class", "chartrgroup");

	this.xScale 	= d3.scale.linear().domain([0,100]).range([0, width]);
	this.xAxis 		= d3.svg.axis().scale(this.xScale).tickSize(height).tickSubdivide(true).orient("bottom");
	this.horGrid 	= this.group.append("g").attr("class", "x axis")
						 // .attr("transform", "translate(0," + height + ")")				      
					      .call(this.xAxis);

	this.yScale		= d3.scale.linear().domain([0,100]).range([height, 0]);
	this.yAxis 		= d3.svg.axis().scale(this.yScale).ticks(4).tickSize(width).orient("left");
	this.verGrid 	= this.group.append("g").attr("class", "y axis")
					      .attr("transform", "translate(" + width + ",0)")
					      .call(this.yAxis);

/*	for(var property in cv.graph.properties){
		if( graphDef[property] ) {
			this["set" + cv.utility.getPascalCasedName(property)](graphDef[property]);
		}	
	}

	for (style in graphDef.style) {
		if (styles.hasOwnProperty(style)) {
			this["set" + cv.utility.getPascalCasedName(style)](graphDef.style[style]);
		}
	}
*/


};	