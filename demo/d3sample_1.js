/*
init = function() { 
	var data = [4, 8, 15, 16, 23, 42];

	var chart = d3.select("body").append("svg")
					.attr("class", "chart"). attr("width", 420)
					.attr("height", 20*data.length);

	var x = d3.scale.linear().domain([0, d3.max(data)]).range([0, 420]);

	chart.selectAll("rect").data(data)
		.enter().append("rect")
		.attr("y", function(d,i) { return i*20;})
		.attr("width", x)
		.attr("height", 20);
};
*/

init = function() {
	test = new cv.graph();
	test.init(cv.constants.defaultGraphdef);
	//test.xAxis.tickSubdivide(5); test.horGrid.call(test.xAxis);
	//test.remove();
	//test.removeHorAxis();
	//test.removeVerAxis();
	//test.removeHorGrid();
	testData = [ 60, 70, 80, 90 ];
	/*xdscale = d3.scale.ordinal().domain(testData).rangeRoundBands([0, test.dimension.width - test.margin.left - test.margin.right], .2);
	test.bar = test.panel.selectAll("g.bar").data(testData).enter().append("rect")
				.attr("height", function (d) { return test.dimension.height - test.margin.top - test.margin.bottom - test.yScale(d);})
				.attr("width", xdscale.rangeBand())
				.attr("y", function (d) { return test.yScale(d);})
				.attr("x", function (d) { return xdscale(d);})
				.style("fill", "#eee").style("stroke","#111");*/

	test.xScale 	= d3.scale.linear().domain([0,100]).range([0, test.dimension.width]);
	ydscale = d3.scale.ordinal().domain(testData).rangeRoundBands([0, test.dimension.height], .4);
	test.bar = test.panel.selectAll("g.bar").data(testData).enter().append("rect")
				.attr("height", ydscale.rangeBand())
				.attr("width", function (d) { return test.xScale(d);})
				.attr("x", function (d) {return 0;})
				.attr("y", function (d) {return ydscale(d);})
				.style("fill", "#eee").style("stroke","#111")
		//		.on("mouseover", function() { style('fill', '#ddd');});

	
	test.xAxis 		= d3.svg.axis().scale(test.xScale).ticks(2).tickSize(test.dimension.height, 10).tickSubdivide(4).orient("bottom");
	test.horAxis 	= test.panel.append("g").attr("class", "x axis")	      
					      .call(test.xAxis);

	test.yScale		= d3.scale.linear().domain([0,100]).range([test.dimension.height, 0]);
	test.yAxis 		= d3.svg.axis().scale(test.yScale).ticks(4).orient("left").tickSize(6, -width);
/*	test.verAxis 	= test.panel.append("g").attr("class", "y axis")	
					      .call(test.yAxis); */
	test.verAxis = test.panel.append('g').attr("class", "y axis").append('line').attr('y1', test.dimension.height).attr('y2', test.dimension.height).attr('x1','100%');

}
