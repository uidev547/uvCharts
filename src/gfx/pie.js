r3.piegraph = function (graphdef) {
	r3.graph.apply(this, [graphdef]);
	this.init(graphdef);

	this.radius = Math.min(this.height(), this.width()) * 2 / 5;
	this.center = {
		x : this.width() / 2,
		y : this.height() / 2
	};
	this.category = graphdef.categories[0];

	var data = r3.util.getCategoryData(this.graphdef, [this.category]),
		arcfunc = d3.svg.arc().innerRadius(0).outerRadius(this.radius),
		config = this.config,
		center = this.center,
		layout = d3.layout.pie();

	this.panel.data(data);
	this.arcs = this.panel.selectAll('g.arc')
					.data(layout).enter()
					.append('g').attr('class', 'r3_arc' + this.category)
					.attr('transform', 'translate(' + this.center.x + ',' + this.center.y + ')');

	this.arcs.append('path')
	    .attr('d', arcfunc)
	    .style('fill', function (d, i) { return r3.util.getColorBand(config, i); })
	    .style('stroke', this.config.pie.strokecolor)
	    .style('stroke-width', this.config.pie.strokewidth)
		.on('mouseover', r3.effects.pie.mouseover(center, arcfunc))
		.on('mouseout', r3.effects.pie.mouseout(center));

	this.arcs.append('text')
	    .attr('transform', function (d) { return 'translate(' + arcfunc.centroid(d) + ')'; })
	    .attr('dy', '.35em')
	    .attr('text-anchor', 'middle')
//	    .attr('display', function (d) { return d.value > 15 ? null : 'none'; })
	    .style('fill', this.config.pie.fontfill)
	    .style('font-family', this.config.pie.fontfamily)
	    .style('font-size', this.config.pie.fontsize)
	    .style('font-weight', this.config.pie.fontweight)
	    .style('font-variant', this.config.pie.fontvariant)
	    .text(function (d) { return d.value; });
};

r3.piegraph.prototype = r3.util.extend(r3.graph);