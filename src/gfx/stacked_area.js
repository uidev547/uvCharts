r3.StackedAreaGraph = function (graphdef, config) {
	var self = this;
	r3.Graph.call(self, graphdef).setDefaults(graphdef, config).init(graphdef, config);

	stacklayout = d3.layout.stack().offset('zero')(self.categories.map(function (d) {
			return graphdef.dataset[d].map(function (d) { return {x: d.name, y: +d.value}; });
	}));

	var areagroup, areapath, areafunc,
		labels = self.labels,
		categories = self.categories;

	self.axes[self.graphdef.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(labels.map(function (d) { return d; }));
	self.areagroup = self.panel.append('g').selectAll('g')
											.data(stacklayout).enter().append('g').attr('class', function (d, i) { return 'cge_' + categories[i]; });
	self['draw' + self.graphdef.orientation + 'Area']();

	self.finalize();
};

r3.StackedAreaGraph.prototype = r3.util.extend(r3.Graph);

r3.StackedAreaGraph.prototype.setDefaults = function (graphdef, config) {
	graphdef.stepup = true;
	return this;
};

r3.StackedAreaGraph.prototype.drawHorizontalArea = function () {
	var self = this, axes = self.axes,
		categories = self.categories,
		config = self.config;
	
	axes.ver.scale.rangePoints([0, self.height()]);

	for(var i = 0; i < categories.length; i = i + 1){
		r3.effects.area.mouseover(self, i);
		r3.effects.area.mouseout(self,i);
	}

	self.areagroup.append('path')
			.attr('class', function (d, i) { return 'area_' + categories[i]; })
			.style('fill', function (d, i) { return r3.util.getColorBand(config, i); })
			.attr('d', d3.svg.area()
				.y(function (d) { return axes.ver.scale(d.x) + axes.ver.scale.rangeBand() / 2; })
				.x0(function (d) { return axes.hor.scale(d.y0); })
				.x1(function (d) { return axes.hor.scale(d.y0 + d.y); })
				.interpolate(self.config.area.interpolation)
			)
		.on('mouseover', function (d,i){ self.effects[categories[i]].mouseover(); })
		.on('mouseout',  function (d,i) { self.effects[categories[i]].mouseout(); });

	self.areagroup.append('path')
		.attr('class', function (d, i) { return 'line_' + categories[i]; })
		.style('stroke', 'white')
		.style('fill', 'none')
		.style('stroke-width', 2)
		.attr('d', d3.svg.line()
			.y(function (d) { return axes.ver.scale(d.x) + axes.ver.scale.rangeBand() / 2; })
			.x(function (d) { return axes.hor.scale(d.y0 + d.y); })
			.interpolate(self.config.area.interpolation)
		);
};

r3.StackedAreaGraph.prototype.drawVerticalArea = function () {
	var self = this, axes = self.axes,
		categories = self.categories,
		config = self.config;
	
	axes.hor.scale.rangePoints([0, self.width()]);

	for(var i = 0; i < categories.length; i = i + 1){
		r3.effects.area.mouseover(self, i);
		r3.effects.area.mouseout(self,i);
	}

	self.areagroup.append('path')
			.attr('class', function (d, i) { return 'area_' + categories[i]; })
			.style('fill', function (d, i) { return r3.util.getColorBand(config, i); })
			.attr('d', d3.svg.area()
				.x(function (d) { return axes.hor.scale(d.x) + axes.hor.scale.rangeBand() / 2; })
				.y0(function (d) { return axes.ver.scale(d.y0); })
				.y1(function (d) { return axes.ver.scale(d.y0 + d.y); })
				.interpolate(self.config.area.interpolation)
			)
		.on('mouseover', function (d,i){ self.effects[categories[i]].mouseover(); })
		.on('mouseout',  function (d,i) { self.effects[categories[i]].mouseout(); });


	self.areagroup.append('path')
			.attr('class', function (d, i) { return 'line_' + categories[i]; })
			.style('stroke', 'white')
			.style('fill', 'none')
			.style('stroke-width', 2)
			.attr('d', d3.svg.line()
				.x(function (d) { return axes.hor.scale(d.x) + axes.hor.scale.rangeBand() / 2; })
				.y(function (d) { return axes.ver.scale(d.y0 + d.y); })
				.interpolate(self.config.area.interpolation)
			);
};