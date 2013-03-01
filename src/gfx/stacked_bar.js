r3.StackedBarGraph = function (graphdef, config) {
	var self = this;
	r3.Graph.call(self).setDefaults(graphdef, config).init(graphdef, config);

	self.bargroups = {};

	var bargroup, bars, idx, len, color,
		domainData = self.labels,
		csum = domainData.map(function (d) {return 0; }),
		tsum = domainData.map(function (d) {return 0; });

	self.axes[self.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(domainData);

	for (idx = 0, len = self.categories.length; idx < len; idx = idx + 1) {
		self.bargroups[self.categories[idx]] = self.panel.append('g').attr('class', 'cge_' + self.categories[idx]);
		self['draw' + self.config.graph.orientation + 'Bars'](idx, csum, tsum);
	}

	self.finalize();
};

r3.StackedBarGraph.prototype = r3.util.extend(r3.Graph);

r3.StackedBarGraph.prototype.setDefaults = function (graphdef, config) {
	graphdef.stepup = true;
	return this;
};

r3.StackedBarGraph.prototype.drawHorizontalBars = function (idx, csum, tsum) {
	var self = this,
		axes = this.axes,
		color = r3.util.getColorBand(this.config, idx),
		config = this.config,
		bargroup = this.bargroups[this.categories[idx]];
	
	bars = bargroup.selectAll('g').data(this.graphdef.dataset[this.categories[idx]])
				.enter().append('g').attr('class', 'cge_' + this.categories[idx]);
	
	bars.append('rect')
		.attr('height', axes.ver.scale.rangeBand())
		.attr('width', 0)
		.attr('x', function (d, i) { var value = axes.hor.scale(csum[i]); csum[i] += d.value; return value; })
		.attr('y', function (d) {return axes.ver.scale(d.name); })
		.classed('cr_' + self.categories[idx], true)
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(self, idx))
		.on('mouseout', r3.effects.bar.mouseout(self, idx))
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('width', function (d) { return axes.hor.scale(d.value); });

	bars.append('text')
		.attr('y', function(d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand()/2; })
		.attr('dx', 0)
		.attr('dy', '.35em')
		.attr('text-anchor', 'end')
		.classed('cr_' + self.categories[idx], true)
		.style('fill', 'none')
		.style('font-family', config.bar.fontfamily)
		.style('font-size', config.bar.fontsize)
		.style('font-weight', config.bar.fontweight)
		.text(function(d) { return ( axes.hor.scale(d.value) > 15 ) ? String(d.value) : null; })
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('x', function (d, i) { tsum[i] += d.value; return axes.hor.scale(tsum[i]) - 5; });
	
	bars.append('svg:title')
		.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + '] : ' + d.value;});
};

r3.StackedBarGraph.prototype.drawVerticalBars = function (idx, csum, tsum) {
	var self = this,
		height = this.height(),
		axes = this.axes,
		color = r3.util.getColorBand(this.config, idx),
		config = this.config,
		bargroup = this.bargroups[this.categories[idx]];
	
	bars = bargroup.selectAll('g').data(this.graphdef.dataset[this.categories[idx]])
				.enter().append('g').attr('class', 'r3_stackedbar_' + this.categories[idx]);
	
	bars.append('rect')
		.attr('height', 0)
		.attr('width', axes.hor.scale.rangeBand())
		.attr('x', function (d) { return axes.hor.scale(d.name); })
		.attr('y', function (d, i) { var value = axes.ver.scale(csum[i]); csum[i] -= d.value; return value; })
		.classed('cr_' + self.categories[idx], true)
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(self, idx))
		.on('mouseout', r3.effects.bar.mouseout(self, idx))
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('height', function (d) { return height - axes.ver.scale(d.value); });
	
	bars.append('text').attr('transform','scale(1,-1)')
		.attr('x', function(d) { return axes.hor.scale(d.name) + axes.hor.scale.rangeBand()/2; })
		.attr('y', -height + 5)
		.attr('dy', '.71em')
		.attr('text-anchor', 'middle')
		.classed('cr_' + self.categories[idx], true)
		.style('fill', 'none')
		.style('font-family', config.bar.fontfamily)
		.style('font-size', config.bar.fontsize)
		.style('font-weight', config.bar.fontweight)
		.text(function(d) { return ( height - axes.ver.scale(d.value) > 15) ? String(d.value) : null; })
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('y', function (d, i) { tsum[i] += d.value; return -(2*height - axes.ver.scale(tsum[i])) + 5; });
	
	bars.append('svg:title')
		.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + '] : ' + d.value;});
	
	bargroup.attr('transform', 'translate(0,' + 2 * this.height() + ') scale(1,-1)');
};