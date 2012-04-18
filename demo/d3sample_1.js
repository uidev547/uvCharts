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
	graphdef = cv.constants.defaultGraphdef;
	test = new cv.bargraph(graphdef);

	/*xdscale = d3.scale.ordinal().domain(testData).rangeRoundBands([0, test.dimension.width - test.margin.left - test.margin.right], .2);
	test.bar = test.panel.selectAll("g.bar").data(testData).enter().append("rect")
				.attr("height", function (d) { return test.dimension.height - test.margin.top - test.margin.bottom - test.yScale(d);})
				.attr("width", xdscale.rangeBand())
				.attr("y", function (d) { return test.yScale(d);})
				.attr("x", function (d) { return xdscale(d);})
				.style("fill", "#eee").style("stroke","#111");*/
//	test.axes.ver.scale.domain(graphdef.data.map( function(d) { return d.name;}));

/*
	test.bargroup = test.panel.append('g');
	console.log(test.bargroup.selectAll('g').data(graphdef.data).enter());
	test.bar = test.bargroup.selectAll('g').data(graphdef.data).enter().append('g');

	test.bar.append("rect")
		.attr("height", test.axes.ver.scale.rangeBand())
		.attr("width", function (d) { return test.axes.hor.scale(d.value);})
		.attr("x", function (d) {return 0;})
		.attr("y", function (d) {return test.axes.ver.scale(d.name);})
		.style("fill", "#e23").style("stroke","#eff");

	test.bar.append("text")
      .attr("class", "value")
      .attr("x", function(d) { return test.axes.hor.scale(d.value - 2); })
      .attr("y", function(d) { return test.axes.ver.scale(d.name) + test.axes.ver.scale.rangeBand()/2; })
      .attr("dx", -6)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .text(function(d) { return String(d.value); })
      .style('fill','white');
   */

    test.finalize();
	console.log(test);
}
