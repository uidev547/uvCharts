r3.donutgraph = function (graphdef) {
	r3.graph.apply(this, [graphdef]);
	this.init(graphdef);

	this.outerRadius = Math.min(this.dimension.height, this.dimension.width)/2;
	this.innerRadius = this.outerRadius * 0.6;

	this.category = graphdef.categories[0];
	this.data = r3.util.getCategoryData(this.graphdef, [this.category]);

	color = d3.scale.category20();

	this.donutfunc = d3.layout.pie();
	this.arcfunc = d3.svg.arc().innerRadius(this.innerRadius).outerRadius(this.outerRadius);

	this.panel.data(this.data);

	this.arcs = this.panel.selectAll('g.arc')
					.data(this.donutfunc).enter()
					.append('g').attr('class','arc')
					.attr('transform', 'translate(' + this.outerRadius + ',' + this.outerRadius + ')');

	this.arcs.append("path")
	    .attr("fill", function(d, i) { return color(i); })
	    .attr("d", this.arcfunc);

	var arc = this.arcfunc;
	this.arcs.append("text")
	    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	    .attr("dy", ".35em")
	    .attr("text-anchor", "middle")
	    .attr("display", function(d) { return d.value > .15 ? null : "none"; })
	    .text(function(d, i) { return d.value; });

	console.log(this);
};

r3.donutgraph.prototype = r3.extend(r3.graph);