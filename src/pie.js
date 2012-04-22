r3.piegraph = function (graphdef) {
	r3.graph.apply(this, [graphdef]);
	this.init(graphdef);

	this.outerRadius = Math.min(this.dimension.height, this.dimension.width)*2/5;
	this.innerRadius = 0;
	this.transition = Math.min(this.dimension.height, this.dimension.width)/2;
	
	this.category = graphdef.categories[0];
	this.data = r3.util.getCategoryData(this.graphdef, [this.category]);

	color = d3.scale.category20();

	this.layout = d3.layout.pie();
	this.arcfunc = d3.svg.arc().innerRadius(this.innerRadius).outerRadius(this.outerRadius);

	this.panel.data(this.data);

	this.arcs = this.panel.selectAll('g.arc')
					.data(this.layout).enter()
					.append('g').attr('class','arc')
					.attr('transform', 'translate(' + this.transition + ',' + this.transition + ')');

	this.arcpath = this.arcs.append("path")
	    .attr("fill", function(d, i) { return color(i); }).attr('d',this.arcfunc);
	
/*	this.arcpath.transition()
		.ease("bounce")
		.duration(2000)
		.attrTween("d", this.tweenPie);
*/
	var arc = this.arcfunc;
	this.arcs.append("text")
	    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	    .attr("dy", ".35em")
	    .attr("text-anchor", "middle")
	    .attr("display", function(d) { return d.value > .15 ? null : "none"; })
	    .text(function(d, i) { return d.value; });

	console.log(this);
};

r3.piegraph.prototype = r3.util.extend(r3.graph);

r3.piegraph.prototype.tweenPie = function (d) {
	d.innerRadius = 0;
	var i = d3.interpolate({startAngle: 0, endAngle: 0}, d), arc = this.arcfunc;
	console.log(this.arcfunc);
	return function(t) {
		return arc(i(t));
	};
};