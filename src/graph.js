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

	this.graphDef = undefined;
	this.position = undefined;
	this.caption = undefined;

	this.frame = undefined;
	this.panel = undefined;
	this.bg = undefined;

	this.horAxis = undefined;
	this.verAxis = undefined;
	this.horAxisLabel = undefined;
	this.verAxisLabel = undefined;
};

cv.graph.properties = ["width", "height", "caption", "xAxisName", "yAxisName"];

cv.graph.prototype.init = function(graphDef) {

	this.dimension.height = graphDef.dimension.height || 400;
	this.dimension.width = graphDef.dimension.width || 400;
	this.margin.left = graphDef.margin.left || 60;
	this.margin.right = graphDef.margin.right || 20;
	this.margin.top = graphDef.margin.top || 60;
	this.margin.bottom = graphDef.margin.bottom || 60;
	this.position = graphDef.pos || 'chart3rdiv';
	
	this.setChart3rFrame();
	this.setChart3rPanel();
	this.setChart3rBackground();

	var height 	= this.dimension.height;
		width	= this.dimension.width;

	this.xScale 	= d3.scale.linear().domain([0,100]).range([0, width]);
	this.xAxis 		= d3.svg.axis().scale(this.xScale).ticks(2).tickSize(height, -5).tickSubdivide(4).orient("bottom");
	this.horAxis 	= this.panel.append("g").attr("class", "x axis")	      
					      .call(this.xAxis);

	this.yScale		= d3.scale.linear().domain([0,100]).range([height, 0]);
	this.yAxis 		= d3.svg.axis().scale(this.yScale).ticks(4).orient("left").tickSize(6, -width);
/*	this.verAxis 	= this.panel.append("g").attr("class", "y axis")	
					      .call(this.yAxis); */
	this.verAxis = this.panel.append('g').attr("class", "y axis").append('line').attr('y1', this.dimension.height).attr('y2', this.dimension.height).attr('x1','100%');

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

cv.graph.prototype.setChart3rFrame = function (className, width, height){
	if(this.frame === undefined) {
		this.frame = d3.select(this.pos || "body").append("svg");
	}

	this.frame.attr("class", className || "chart3rframe")
			.attr("width", width || (this.dimension.width+this.margin.left+this.margin.right))
			.attr("height", height || (this.dimension.height+this.margin.top+this.margin.bottom));
}

cv.graph.prototype.setChart3rPanel = function (className) {
	if(this.panel === undefined) {
		this.panel = this.frame.append("g");
	}

	this.panel.attr("class", className || "chart3rpanel")
		.attr("transform", 'translate(' + this.margin.left + ',' + this.margin.right + ')');
}

cv.graph.prototype.setChart3rBackground = function () {
	this.bg = this.panel.append("rect")
				.attr("class", 'chart3rbg')
				.attr("height", this.dimension.height)
				.attr("width", this.dimension.width).style('fill','lavender');
}

cv.graph.prototype.removeHorGrid = function () {
	if(this.horAxis){
		this.xAxis.tickSize(0, 0, this.dimension.height - this.margin.top - this.margin.bottom);
		this.horAxis.call(this.xAxis);
	}

}

cv.graph.prototype.removeHorAxis = function () {
	if(this.horAxis){
		this.horAxis.remove();
		this.horAxis = undefined;
	}
}

cv.graph.prototype.removeVerGrid = function () {

}

cv.graph.prototype.removeVerAxis = function () {
	if(this.verAxis){
		this.verAxis.remove();
		this.verAxis = undefined;
	}
}
