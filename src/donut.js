r3.donutgraph = function (graphdef) {
	r3.graph.apply(this, [graphdef]);
	this.init(graphdef);

	this.outerRadius = Math.min(this.dimension.height, this.dimension.width)*2/5;
	this.innerRadius = this.outerRadius * 0.4;
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

	var arc = this.arcfunc;
	this.arcs.append("path")
	    .attr("fill", function(d, i) { return color(i); })
	    .attr("d", this.arcfunc)
		.on('mouseover', function(){d3.select(this).style('stroke','red'); })
		.on('mouseout', function(){d3.select(this).style('stroke', null);});
	
	this.arcs.append("text")
	    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	    .attr("dy", ".35em")
	    .attr("text-anchor", "middle")
	    .attr("display", function(d) { return d.value > .15 ? null : "none"; })
	    .text(function(d, i) { return d.value; });

	console.log(this);
};

r3.donutgraph.prototype = r3.util.extend(r3.graph);