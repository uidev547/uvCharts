r3.donutgraph = function (graphdef) {
	r3.graph.apply(this, [graphdef]);
	this.init(graphdef);

	this.radius = Math.min(this.height(), this.width()) * 2 / 5;
	this.center = {
		x : this.width() / 2,
		y : this.height() / 2
	};	
	this.category = graphdef.categories[0];
	
	var data = r3.util.getCategoryData(this.graphdef, [this.category]),
		arcfunc = d3.svg.arc().innerRadius(this.radius * this.config.donut.factor).outerRadius(this.radius),
		config = this.config,
		center = this.center,
		layout = d3.layout.pie();

	this.panel.data(data);	
	this.arcs = this.panel.selectAll('g.arc')
					.data(layout).enter()
					.append('g').attr('class', 'r_arc_' + this.category)
					.attr('transform', 'translate(' + this.center.x + ',' + this.center.y + ')');

	this.arcs.append('path')
    	.attr('d', arcfunc)
	    .style('fill', function (d, i) { return r3.util.getColorBand(config, i); })
	    .style('stroke', this.config.donut.strokecolor)
	    .style('stroke-width', this.config.donut.strokewidth)
		.on('mouseover', r3.effects.donut.mouseover(center, arcfunc, config))
		.on('mouseout', r3.effects.donut.mouseout(center, config));

	this.arcs.append('text')
	    .attr('transform', function (d) { return 'translate(' + arcfunc.centroid(d) + ')'; })
	    .attr('dy', '.35em')
	    .attr('text-anchor', 'middle')
//	    .attr('display', function (d) { return d.value > 0.15 ? null : 'none'; })
	    .style('fill', this.config.donut.fontfill)
	    .style('font-family', this.config.donut.fontfamily)
	    .style('font-size', this.config.donut.fontsize)
	    .style('font-weight', this.config.donut.fontweight)
	    .style('font-variant', this.config.donut.fontvariant)
	    .text(function (d) { return d.value; });
};

r3.donutgraph.prototype = r3.util.extend(r3.graph);