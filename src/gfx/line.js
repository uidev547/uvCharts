r3.linegraph = function (graphdef) {
	var self = this;
	r3.graph.apply(self);
	graphdef.stepup = false;
	self.init(graphdef);

	self.linegroups = {};
	self.dataset = r3.util.getDataArray(self.graphdef);

	var linegroup, linepath, linefunc, idx, len, color,
		domainData = self.labels;

	self.axes[self.graphdef.orientation === 'hor' ? 'ver' : 'hor'].scale.domain(domainData);

	for (idx = 0, len = self.categories.length; idx < len; idx = idx + 1) {
		color = r3.util.getColorBand(self.config, idx);

		linepath = self.panel.append('g').attr('class', 'line_' + self.categories[idx]).datum(self.dataset[idx]);
		linegroup = {
			path: linepath,
			func: undefined
		};

		self['draw' + r3.util.getPascalCasedName(self.graphdef.orientation) + 'Lines'](linegroup, idx, color);
		self.linegroups[self.categories[idx]] = linegroup;
	}

	self.finalize();
};

r3.linegraph.prototype = r3.util.extend(r3.graph);

r3.linegraph.prototype.drawHorLines = function (linegroup, idx, color) {
	var self = this,
		axes = self.axes,
		config = self.config;

	linegroup.func = d3.svg.line()
				.x(function (d) { return axes.hor.scale(d.value); })
				.y(function (d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand() / 2; })
				.interpolate(r3.config.line.interpolation);

	linegroup.path.append('path')
				.attr('class', 'linepath_' + self.categories[idx])
				.attr('d', linegroup.func)
				.style('fill', 'none')
				.style('stroke', color)
				.style('stroke-width', 1.5)
				.style('stroke-opacity', 0.01)
				.on('mouseover', r3.effects.line.mouseover(config))
				.on('mouseout', r3.effects.line.mouseout(config, color))
				.transition()
					.duration(3 * self.config.effects.duration)
					.delay(2 * idx * self.config.effects.duration)
					.style('stroke-opacity', 1);

	linegroup.path.selectAll('circle')
				.data(self.dataset[idx])
				.enter().append('circle')
				.attr('class', 'dot_' + self.categories[idx])
				.attr('cx', linegroup.func.x())
				.attr('cy', linegroup.func.y())
				.attr('r', 3.5)
				.style('fill', color)
				.style('fill-opacity', 0.6)
				.style('stroke', color)
				.on('mouseover', r3.effects.line.mouseover(config))
				.on('mouseout', r3.effects.line.mouseout(config, color))
					.append('svg:title')
					.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + ']: ' + d.value;});
	
	linegroup.path.selectAll('text')
				.data(self.dataset[idx])
				.enter().append('text')
				.attr('x', function (d) { return axes.hor.scale(d.value); })
				.attr('y', function(d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand()/2; })
				.attr('dx', 10)
				.attr('dy', '.35em')
				.attr('text-anchor', 'start')
				.style('fill', 'none')
				.style('font-family', self.config.bar.fontfamily)
				.style('font-size', self.config.bar.fontsize)
				.style('font-weight', self.config.bar.fontweight)
				.text(function(d) { return String(d.value); });
					
};

r3.linegraph.prototype.drawVerLines = function (linegroup, idx, color) {
	var self = this,
		axes = self.axes,
		height = self.height(),
		config = self.config;

	linegroup.func = d3.svg.line()
				.x(function (d) { return axes.hor.scale(d.name) + axes.hor.scale.rangeBand() / 2; })
				.y(function (d) { return axes.ver.scale(d.value); })
				.interpolate(r3.config.line.interpolation);

	linegroup.path.append('path')
				.attr('class', 'linepath_' + self.categories[idx])
				.attr('d', linegroup.func)
				.style('fill', 'none')
				.style('stroke', color)
				.style('stroke-width', 1.5)
				.style('stroke-opacity', 0.01)
				.on('mouseover', r3.effects.line.mouseover(config))
				.on('mouseout', r3.effects.line.mouseout(config, color))
				.transition()
					.duration(self.config.effects.duration)
					.delay(2 * idx * self.config.effects.duration)
					.style('stroke-opacity', 1);

	linegroup.path.selectAll('circle')
				.data(self.dataset[idx])
				.enter().append('circle')
				.attr('class', 'dot_' + self.categories[idx])
				.attr('cx', linegroup.func.x())
				.attr('cy', linegroup.func.y())
				.attr('r', 3.5)
				.style('fill', color)
				.style('fill-opacity', 0.2)
				.style('stroke', color)
				.on('mouseover', r3.effects.line.mouseover(config))
				.on('mouseout', r3.effects.line.mouseout(config, color))
					.append('svg:title')
					.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + ']: ' + d.value;});
	
	linegroup.path.selectAll('text')
				.data(self.dataset[idx])
				.enter().append('text')
				.attr('x', function (d) { return axes.hor.scale(d.name) + axes.hor.scale.rangeBand() / 2; })
				.attr('y', function (d) { return axes.ver.scale(d.value) - 20; })
				.attr('dx', 0)
				.attr('dy', '.71em')
				.attr('text-anchor', 'middle')
				.style('fill', 'none')
				.style('font-family', self.config.bar.fontfamily)
				.style('font-size', self.config.bar.fontsize)
				.style('font-weight', self.config.bar.fontweight)
				.text(function(d) { return String(d.value); });
};