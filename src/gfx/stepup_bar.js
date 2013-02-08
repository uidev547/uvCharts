r3.StepUpBarGraph = function (graphdef, config) {
	var self = this;
	r3.Graph.call(self).setDefaults(graphdef).init(graphdef, config);

	this.bargroups = {};

	var idx, length = self.categories.length,
		csum = self.labels.map(function (d) {return 0; }),
		tsum = self.labels.map(function (d) {return 0; });

	self.axes[this.graphdef.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(this.labels);

	for (idx = 0; idx < length; idx = idx + 1) {
		self.bargroups[self.categories[idx]] = this.panel.append('g').attr('class', 'cg_' + self.categories[idx]);
		self['draw' + self.graphdef.orientation + 'Bars'](idx, csum, tsum);
	}

	self.finalize();
};

r3.StepUpBarGraph.prototype = r3.util.extend(r3.Graph);

r3.StepUpBarGraph.prototype.setDefaults = function (graphdef) {
	graphdef.stepup = true;
	return this;
};

r3.StepUpBarGraph.prototype.drawHorizontalBars = function (idx, csum, tsum) {
	var self = this, len = self.categories.length;
		color = r3.util.getColorBand(self.config, idx),
		bargroup = self.bargroups[self.categories[idx]];

	bars = bargroup.selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter().append('g').attr('class', 'cge_' + self.categories[idx]);
	bars.append('rect')
		.attr('height', self.axes.ver.scale.rangeBand() / len)
		.attr('width', 0)
		.attr('x', function (d, i) { var value = self.axes.hor.scale(csum[i]); csum[i] += d.value; return value; })
		.attr('y', function (d) {return self.axes.ver.scale(d.name); })
		.classed('cr_' + self.categories[idx], true)
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(self, idx))
		.on('mouseout', r3.effects.bar.mouseout(self, idx, color))
		.transition()
			.duration(self.config.effects.duration)
			.delay(idx * self.config.effects.duration)
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
			.delay(idx * self.config.effects.duration)
			.attr('x', function (d, i) { tsum[i] += d.value; return self.axes.hor.scale(tsum[i]); });
			
	bars.append('svg:title')
		.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + '] : ' + d.value;});
	
	bargroup.attr('transform', 'translate(0,' + idx * self.axes.ver.scale.rangeBand() / len + ')');
};

r3.StepUpBarGraph.prototype.drawVerticalBars = function (idx, csum, tsum) {
	var self = this, len = self.categories.length,
		color = r3.util.getColorBand(self.config, idx),
		bargroup = self.bargroups[self.categories[idx]];

	bars = bargroup.selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter().append('g').attr('class', 'cge_' + self.categories[idx]);
	bars.append('rect')
		.attr('height', 0)
		.attr('width', self.axes.hor.scale.rangeBand() / len)
		.attr('x', function (d) { return self.axes.hor.scale(d.name); })
		.attr('y', function (d, i) { var value = self.axes.ver.scale(csum[i]); csum[i] -= d.value; return value; })
		.classed('cr_' + self.categories[idx], true)
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(self, idx))
		.on('mouseout', r3.effects.bar.mouseout(self, idx, color))
		.transition()
			.duration(self.config.effects.duration)
			.delay(idx * self.config.effects.duration)
			.attr('height', function (d) { return self.height() - self.axes.ver.scale(d.value); });
	
	bars.append('text').attr('transform','scale(1,-1)')
		.attr('x', function(d) { return self.axes.hor.scale(d.name) + (self.axes.hor.scale.rangeBand()/len)/2; })
		.attr('y', -self.height() - 10)
		.attr('dy', '.71em')
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
			.attr('y', function (d, i) { tsum[i] += d.value; return -(2*self.height() - self.axes.ver.scale(tsum[i])) - 10; });
			
	bars.append('svg:title')
		.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + '] : ' + d.value;});
	
	bargroup.attr('transform', 'translate(' + idx * self.axes.hor.scale.rangeBand() / len + ',' + 2 * self.height() + ') scale(1,-1)');
};