r3.stepup_bargraph = function (graphdef) {
	var self = this;
	r3.graph.apply(self);
	graphdef.stepup = true;
	self.init(graphdef);

	this.bargroups = {};

	var idx, length,
		csum = self.labels.map(function (d) {return 0; }),
		tsum = self.labels.map(function (d) {return 0; });

	self.axes[this.graphdef.orientation === 'hor' ? 'ver' : 'hor'].scale.domain(this.labels);

	for (idx = 0, length = self.categories.length; idx < length; idx = idx + 1) {
		self.bargroups[self.categories[idx]] = this.panel.append('g').attr('class', 'r3_bargroup_' + self.categories[idx]);
		self['drawStepUp' + self.graphdef.orientation + 'Bars'](idx, length, csum, tsum);	
	}

	self.finalize();
};

r3.stepup_bargraph.prototype = r3.util.extend(r3.graph);

r3.stepup_bargraph.prototype.drawStepUphorBars = function (idx, len, csum, tsum) {
	var self = this,
		color = r3.util.getColorBand(self.config, idx),
		bargroup = self.bargroups[self.categories[idx]];

	bars = bargroup.selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter().append('g').attr('class', 'stepupbar_' + self.categories[idx]);
	bars.append('rect')
		.attr('height', self.axes.ver.scale.rangeBand() / len)
		.attr('width', 0)
		.attr('x', function (d, i) { var value = self.axes.hor.scale(csum[i]); csum[i] += d.value; return value; })
		.attr('y', function (d) {return self.axes.ver.scale(d.name); })
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(self.config))
		.on('mouseout',  r3.effects.bar.mouseout(self.config, color))
		.transition()
			.duration(self.config.effects.duration)
			.delay(idx * self.config.effects.duration)
			.attr('width', function (d) { return self.axes.hor.scale(d.value); });

	bars.append('text')
		.attr('y', function(d) { return self.axes.ver.scale(d.name) + (self.axes.ver.scale.rangeBand()/len)/2; })
		.attr('dx', 4)
		.attr('dy', '.35em')
		.attr('text-anchor', 'start')
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

r3.stepup_bargraph.prototype.drawStepUpverBars = function (idx, len, csum, tsum) {
	var self = this, 
		color = r3.util.getColorBand(self.config, idx),
		bargroup = self.bargroups[self.categories[idx]];

	bars = bargroup.selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter().append('g').attr('class', 'stepupbar_' + self.categories[idx]);
	bars.append('rect')
		.attr('height', 0)
		.attr('width', self.axes.hor.scale.rangeBand() / len)
		.attr('x', function (d) { return self.axes.hor.scale(d.name); })
		.attr('y', function (d, i) { var value = self.axes.ver.scale(csum[i]); csum[i] -= d.value; return value; })
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(self.config))
		.on('mouseout', r3.effects.bar.mouseout(self.config, color))
		.transition()
			.duration(self.config.effects.duration)
			.delay(idx * self.config.effects.duration)
			.attr('height', function (d) { return self.height() - self.axes.ver.scale(d.value); });
	
	bars.append('text').attr('transform','scale(1,-1)')
		.attr('x', function(d) { return self.axes.hor.scale(d.name) + (self.axes.hor.scale.rangeBand()/len)/2; })
		.attr('y', -self.height() - 10)
		.attr('dy', '.71em')
		.attr('text-anchor', 'middle')
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