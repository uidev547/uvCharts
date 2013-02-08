/**
 * A normal 2d bar chart capable of being rendered in horizontal and vertical manner
 * @param {Graphdef Object} graphdef Definition of the graph being rendered
 * @param {Config Object} config   [description]
 */
r3.BarGraph = function (graphdef, config) {
	var self = this;
	r3.Graph.call(self).setDefaults(graphdef).init(graphdef, config);

	self.bargroups = {};

	self.axes[self.graphdef.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(self.labels);

	var idx, length = self.categories.length;
	for (idx = 0; idx < length; idx = idx + 1) {
		var category = self.categories[idx];
		self.bargroups[category] = self.panel.append('g').attr('class', 'r3_bargroup').classed('cg_' + category, true);
		self['draw' + self.graphdef.orientation + 'Bars'](idx);
	}

	self.finalize();
};

r3.BarGraph.prototype = r3.util.extend(r3.Graph);

r3.BarGraph.prototype.setDefaults = function (graphdef) {
	graphdef.stepup = false;
	return this;
};

r3.BarGraph.prototype.drawHorizontalBars = function (idx) {
	var self = this,
		color = r3.util.getColorBand(this.config, idx),
		len = self.categories.length;
	
	bars = self.bargroups[self.categories[idx]].selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter()
				.append('g').attr('class', 'cge_' + self.categories[idx]);
	
	bars.append('rect')
		.attr('class', self.id + '_' + self.categories[idx])
		.classed('cr_' + self.categories[idx], true)
		.attr('height', self.axes.ver.scale.rangeBand() / len)
		.attr('x', 0)
		.attr('y', function (d) {return self.axes.ver.scale(d.name); })
		.style('stroke', self.config.bar.strokecolor)
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(self, idx))
		.on('mouseout', r3.effects.bar.mouseout(self, idx))
		.transition()
			.duration(self.config.effects.duration)
			.delay(function (d, i) { return i * self.config.effects.duration; })
			.attr('width', function (d) { return self.axes.hor.scale(d.value); });

	bars.append('text')
		.attr('y', function(d) { return self.axes.ver.scale(d.name) + (self.axes.ver.scale.rangeBand()/len)/2; })
		.attr('dx', 4)
		.attr('dy', '.35em')
		.attr('text-anchor', 'start')
		.classed('cr_' + self.categories[idx], true)
		.style('fill', 'none')
		.style('font-family', self.config.bar.fontfamily)
		.style('font-size', self.config.bar.fontsize)
		.style('font-weight', self.config.bar.fontweight)
		.text(function(d) { return String(d.value); })
		.transition()
			.duration(self.config.effects.duration)
			.delay(function (d, i) { return i * self.config.effects.duration; })
			.attr('x', function (d) { return self.axes.hor.scale(d.value); });
	
	bars.append('svg:title')
		.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + '] : ' + d.value;});
	
	self.bargroups[self.categories[idx]].attr('transform', 'translate(0,' + idx * self.axes.ver.scale.rangeBand() / len + ')');
};

r3.BarGraph.prototype.drawVerticalBars = function (idx) {
	var self = this,
		color = r3.util.getColorBand(this.config, idx),
		len = self.categories.length;
	
	bars = self.bargroups[self.categories[idx]].selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter()
			.append('g').attr('class', 'cge_' + self.categories[idx]);
	
	bars.append('rect')
			.attr('class', self.id + '_' + self.categories[idx])
			.classed('cr_' + self.categories[idx], true)
			.attr('height', 0)
			.attr('width', self.axes.hor.scale.rangeBand() / len)
			.attr('x', function (d) {return self.axes.hor.scale(d.name); })
			.attr('y', 0)
			.style('stroke', self.config.bar.strokecolor).style('fill', color)
			.on('mouseover', r3.effects.bar.mouseover(self, idx))
			.on('mouseout', r3.effects.bar.mouseout(self, idx))
			.transition()
				.duration(self.config.effects.duration)
				.delay(idx * self.config.effects.duration)
				.attr('height', function (d) { return self.height() - self.axes.ver.scale(d.value); });
	
	bars.append('text').attr('transform','scale(1,-1)')
			.attr('x', function(d) { return self.axes.hor.scale(d.name) + (self.axes.hor.scale.rangeBand()/len)/2; })
			.attr('y', -10)
			.attr('dx', 0)
			.attr('dy', '.35em')
			.attr('text-anchor', 'middle')
			.classed('cr_' + self.categories[idx], true)
			.style('fill', 'none')
			.style('font-family', self.config.bar.fontfamily)
			.style('font-size', self.config.bar.fontsize)
			.style('font-weight', self.config.bar.fontweight)
			.text(function(d) { return String(d.value); })
			.transition()
				.duration(self.config.effects.duration)
				.delay(idx * self.config.effects.duration)
				.attr('y', function (d) { return -(self.height() - self.axes.ver.scale(d.value)) - 10; });
	
	bars.append('svg:title')
		.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + '] : ' + d.value;});
	
	self.bargroups[self.categories[idx]].attr('transform', 'translate(' + idx * self.axes.hor.scale.rangeBand() / len + ',' + self.height() + ') scale(1,-1)');
};

r3.BarGraph.prototype.toggleChartGroup = function (idx) {
	var self = this, category = self.categories[idx],
			state = self.bargroups[category].select('g.cge_' + category).style('display');

	self.bargroups[category].selectAll('g.cge_' + category).style('display', (state === 'none')? null : 'none');
	return this;
};