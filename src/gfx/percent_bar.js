r3.PercentBarGraph = function (graphdef, config) {
	var self = this;
	r3.Graph.call(self).setDefaults(graphdef, config).init(graphdef, config);

	self.bargroups = [];

	var bargroup, bars, idx, len, color,
		domainData = self.labels,
		csum = domainData.map(function (d) {return 0; }),
		tsum = domainData.map(function (d) {return 0; });

	self.axes[self.graphdef.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(domainData);

	for (idx = 0, len = self.categories.length; idx < len; idx = idx + 1) {
		color = r3.util.getColorBand(self.config, idx);

		bargroup = self.panel.append('g').attr('class', 'r3_bargroup');
		bars = bargroup.selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter().append('g').attr('class', 'percentbar_' + self.categories[idx]);

		self['draw' + r3.util.getPascalCasedName(self.graphdef.orientation) + 'Bars'](bars, csum, tsum, idx);

		if (self.graphdef.orientation === 'Vertical') {
			bargroup.attr('transform', 'translate(0,' + 2 * self.height() + ') scale(1,-1)');
		}

		self.bargroups.push(bargroup);
	}

	self.finalize();
};

r3.PercentBarGraph.prototype = r3.util.extend(r3.Graph);

r3.PercentBarGraph.prototype.setDefaults = function (graphdef, config) {
	graphdef.stepup = 'percent';
	config.scale.ordinality = 0;
	return this;
};

r3.PercentBarGraph.prototype.drawHorizontalBars = function (bars, csum, tsum, idx) {
	var self = this,
		axes = this.axes,
		color = r3.util.getColorBand(this.config, idx),
		config = this.config,
		sumMap = r3.util.getSumUpArray(this.graphdef);
	
	bars.append('rect')
		.attr('height', axes.ver.scale.rangeBand())
		.attr('width', 0)
		.attr('x', function (d, i) { var value = axes.hor.scale(r3.util.getPercentage(csum[i], sumMap[i])); csum[i] += d.value; return value; })
		.attr('y', function (d) {return axes.ver.scale(d.name); })
		.classed('cr_' + self.categories[idx], true)
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(self, idx))
		.on('mouseout', r3.effects.bar.mouseout(self, idx))
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('width', function (d, i) { return axes.hor.scale(r3.util.getPercentage(d.value, sumMap[i]));});

	bars.append('text')
		.attr('y', function(d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand()/2; })
		.attr('dx', 0)
		.attr('dy', '.35em')
		.attr('text-anchor', 'end')
		.classed('cr_' + self.categories[idx], true)
		.style('fill', 'none')
		.style('font-family', this.config.bar.fontfamily)
		.style('font-size', this.config.bar.fontsize)
		.style('font-weight', this.config.bar.fontweight)
		.text(function(d, i) { return ( axes.hor.scale(r3.util.getPercentage(csum[i], sumMap[i])) > 15 ) ? String(Math.round(r3.util.getPercentage(d.value, sumMap[i]))) : null; })
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('x', function (d, i) { tsum[i] += d.value; return axes.hor.scale(r3.util.getPercentage(tsum[i], sumMap[i])) - 5; });
};

r3.PercentBarGraph.prototype.drawVerticalBars = function (bars, csum, tsum, idx) {
	var self = this,
		height = this.height(),
		axes = this.axes,
		color = r3.util.getColorBand(this.config, idx),
		config = this.config,
		sumMap = r3.util.getSumUpArray(this.graphdef);
	
	bars.append('rect')
		.attr('height', 0)
		.attr('width', axes.hor.scale.rangeBand())
		.attr('x', function (d) { return axes.hor.scale(d.name); })
		.attr('y', function (d, i) { var value = axes.ver.scale(r3.util.getPercentage(csum[i], sumMap[i])); csum[i] -= d.value; return value; })
		.classed('cr_' + self.categories[idx], true)
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(self, idx))
		.on('mouseout', r3.effects.bar.mouseout(self, idx))
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('height', function (d, i) { return height - axes.ver.scale(r3.util.getPercentage(d.value, sumMap[i])); });
	
	bars.append('text').attr('transform','scale(1,-1)')
		.attr('x', function(d) { return axes.hor.scale(d.name) + axes.hor.scale.rangeBand()/2; })
		.attr('y', -height + 5)
		.attr('dy', '.71em')
		.attr('text-anchor', 'middle')
		.classed('cr_' + self.categories[idx], true)
		.style('fill', 'none')
		.style('font-family', this.config.bar.fontfamily)
		.style('font-size', this.config.bar.fontsize)
		.style('font-weight', this.config.bar.fontweight)
		.text(function(d, i) { return ( height - axes.ver.scale(r3.util.getPercentage(d.value, sumMap[i])) > 15) ? String(Math.round(r3.util.getPercentage(d.value, sumMap[i]))) : null; })
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('y', function (d, i) { tsum[i] += d.value; return -(2*height - axes.ver.scale(r3.util.getPercentage(tsum[i], sumMap[i]))) + 5; });
};