r3.PieGraph = function (graphdef) {
	var self = this;
	r3.Graph.apply(self);
	self.init(graphdef);

	self.radius = Math.min(self.height(), self.width()) * 2 / 5;
	self.center = {
		x : self.width() / 2,
		y : self.height() / 2
	};
	
	self.category = graphdef.categories[0];

	var data = r3.util.getCategoryData(self.graphdef, [self.category]),
		arcfunc = d3.svg.arc().innerRadius(0).outerRadius(self.radius),
		layout = d3.layout.pie();

	self.panel.data(data);
	self.arcs = self.panel.selectAll('g.arc')
					.data(layout).enter()
					.append('g').attr('class', 'r3_arc' + self.category)
					.attr('transform', 'translate(' + self.center.x + ',' + self.center.y + ')');

	self.arcs.append('path')
			.attr('d', arcfunc)
			.style('fill', function (d, i) { return r3.util.getColorBand(self.config, i); })
			.style('stroke', self.config.pie.strokecolor)
			.style('stroke-width', self.config.pie.strokewidth)
		.on('mouseover', r3.effects.pie.mouseover(self.center, arcfunc, self.config))
		.on('mouseout', r3.effects.pie.mouseout(self.center, self.config));

	self.arcs.append('text')
			.attr('transform', function (d) { return 'translate(' + arcfunc.centroid(d) + ')'; })
			.attr('dy', '.35em')
			.attr('text-anchor', 'middle')
			.style('fill', self.config.pie.fontfill)
			.style('font-family', self.config.pie.fontfamily)
			.style('font-size', self.config.pie.fontsize)
			.style('font-weight', self.config.pie.fontweight)
			.style('font-variant', self.config.pie.fontvariant)
			.text(function (d) { return String(d.value); });
	
	self.arcs.append('svg:title')
		.text(function (d, i) { return self.labels[i] + ' : ' + d.value;});
};

r3.PieGraph.prototype = r3.util.extend(r3.Graph);