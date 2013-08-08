uv.PolarAreaGraph = function (graphdef, config) {
	var self = this;

	uv.Graph.call(self, graphdef, config).setDefaults().init();

	self.maxRadius = Math.min(self.height(), self.width()) * 2/5;
	self.center = {
		x : self.width() / 2,
		y : self.height() / 2
	};

	self.category = self.categories[0];

	var data = uv.util.getCategoryData(self.graphdef, [self.category]),
		layout = d3.layout.pie(),
		arcfuncs = data[0].map( function (d, i) {
			return d3.svg.arc().innerRadius(0)
					.outerRadius((d * self.maxRadius) / self.max());
		});

	self.chart.data(data);
	self.arcs = self.chart.selectAll('g.arc')
									.data(layout).enter()
									.append('g').classed(uv.constants.classes.arc + uv.util.formatClassName(self.category), true)
									.attr('transform', 'translate(' + self.center.x + ',' + self.center.y + ')');

	self.arcs.append('path')
		.attr('d', arcfuncs[0]) /*function (d, i) {
			arcfuncs[i](d, i);
		})*/
		.style('fill', function (d, i) { return uv.util.getColorBand(self.config, i);})
		.style('stroke', self.config.pie.strokecolor)
		.style('stroke-width', self.config.pie.strokewidth);

	self.arcs.append('text')
			.attr('transform', function (d, i) { return 'translate(' + arcfuncs[i].centroid(d) + ')'; })
			.attr('dy', '.35em')
			.attr('text-anchor', 'middle')
			.style('fill', self.config.pie.fontfill)
			.style('font-family', self.config.pie.fontfamily)
			.style('font-size', self.config.pie.fontsize)
			.style('font-weight', self.config.pie.fontweight)
			.style('font-variant', self.config.pie.fontvariant)
			.text(function (d) { return uv.util.getLabelValue(self, d); });
	
	self.arcs.append('svg:title')
		.text(function (d, i) { return uv.util.getTooltipText(self, self.category, self.labels[i], d);});
};

uv.PolarAreaGraph.prototype = uv.util.inherits(uv.Graph);

uv.PolarAreaGraph.prototype.setDefaults = function () {
	var self = this;
	self.graphdef.stepup = false;
	return this;
};