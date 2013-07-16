uv.StackedBarGraph = function (graphdef, config) {
	var self = this;
	uv.Graph.call(self).setDefaults(graphdef, config).init(graphdef, config);

	self.bargroups = {};

	var bargroup, bars, idx, len, color,
		domainData = self.labels,
		csum = domainData.map(function (d) {return 0; }),
		tsum = domainData.map(function (d) {return 0; });

	self.axes[self.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(domainData);

	for (idx = 0, len = self.categories.length; idx < len; idx = idx + 1) {
		self.bargroups[self.categories[idx]] = self.panel.append('g').classed('cg-' + uv.util.formatClassName(self.categories[idx]), true);
		self['draw' + self.config.graph.orientation + 'Bars'](idx, csum, tsum);
	}

	self.finalize();
};

uv.StackedBarGraph.prototype = uv.util.extend(uv.Graph);

uv.StackedBarGraph.prototype.setDefaults = function (graphdef, config) {
	graphdef.stepup = true;
	return this;
};

uv.StackedBarGraph.prototype.drawHorizontalBars = function (idx, csum, tsum) {
	var self = this,
		axes = this.axes,
		color = uv.util.getColorBand(this.config, idx),
		config = this.config,
		bargroup = this.bargroups[this.categories[idx]];
	
	bars = bargroup.selectAll('g').data(this.graphdef.dataset[self.categories[idx]])
				.enter().append('g').classed('cge-' + uv.util.formatClassName(self.categories[idx]), true);
	
	bars.append('rect')
		.attr('height', axes.ver.scale.rangeBand())
		.attr('width', 0)
		.attr('x', function (d, i) { var value = axes.hor.scale(csum[i]); csum[i] += d.value; return value; })
		.attr('y', function (d) {return axes.ver.scale(d.name); })
		.classed('cr_' + uv.util.formatClassName(self.categories[idx]), true)
		.style('stroke', 'none')
		.style('fill', color)
		.transition()
			.duration(uv.config.effects.duration)
			.delay(idx * uv.config.effects.duration)
			.attr('width', function (d,i) { return axes.hor.scale(csum[i]) - axes.hor.scale(csum[i]-d.value); })
			.each("end", function (d,i){
				d3.select(this).on('mouseover', uv.effects.bar.mouseover(self, idx, self.config.effects.textcolor));
				d3.select(this).on('mouseout', uv.effects.bar.mouseout(self, idx, self.config.effects.textcolor));
			});


	bars.append('text')
		.attr('y', function(d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand()/2; })
		.attr('dx', 0)
		.attr('dy', '.35em')
		.attr('text-anchor', 'end')
		.classed('cr_' + uv.util.formatClassName(self.categories[idx]), true)
		.style('fill', self.config.label.showlabel ? self.config.effects.textcolor : 'none')
		.style('font-family', config.bar.fontfamily)
		.style('font-size', config.bar.fontsize)
		.style('font-weight', config.bar.fontweight)
		.text(function(d) { return ( axes.hor.scale(d.value) > 15 ) ? String(d.value) : null; })
		.transition()
			.duration(uv.config.effects.duration)
			.delay(idx * uv.config.effects.duration)
			.attr('x', function (d, i) { tsum[i] += d.value; return axes.hor.scale(tsum[i]) - 5; });
	
	bars.append('svg:title')
		.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + '] : ' + d.value;});
};

uv.StackedBarGraph.prototype.drawVerticalBars = function (idx, csum, tsum) {
	var self = this,
		height = this.height(),
		axes = this.axes,
		color = uv.util.getColorBand(this.config, idx),
		config = this.config,
		bargroup = this.bargroups[self.categories[idx]];
	
	bars = bargroup.selectAll('g').data(this.graphdef.dataset[self.categories[idx]])
				.enter().append('g').classed('cge-' + uv.util.formatClassName(self.categories[idx]), true);
	
	bars.append('rect')
		.attr('height', 0)
		.attr('width', axes.hor.scale.rangeBand())
		.attr('x', function (d) { return axes.hor.scale(d.name); })
		.attr('y', function (d, i) { var value = axes.ver.scale(csum[i]); csum[i] -= d.value; return value; })
		.classed('cr_' + uv.util.formatClassName(self.categories[idx]), true)
		.style('stroke', 'none')
		.style('fill', color)
		.transition()
			.duration(uv.config.effects.duration)
			.delay(idx * uv.config.effects.duration)
			.attr('height', function (d,i) { return -(axes.ver.scale(-csum[i]) - axes.ver.scale(-csum[i]-d.value)); })
			.each("end", function (d,i){
				d3.select(this).on('mouseover', uv.effects.bar.mouseover(self, idx, self.config.effects.textcolor));
				d3.select(this).on('mouseout', uv.effects.bar.mouseout(self, idx, self.config.effects.textcolor));
			});

	
	bars.append('text').attr('transform','scale(1,-1)')
		.attr('x', function(d) { return axes.hor.scale(d.name) + axes.hor.scale.rangeBand()/2; })
		.attr('y', -height + 5)
		.attr('dy', '.71em')
		.attr('text-anchor', 'middle')
		.classed('cr_' + uv.util.formatClassName(self.categories[idx]), true)
		.style('fill', self.config.label.showlabel ? self.config.effects.textcolor : 'none')
		.style('font-family', config.bar.fontfamily)
		.style('font-size', config.bar.fontsize)
		.style('font-weight', config.bar.fontweight)
		.text(function(d) { return ( height - axes.ver.scale(d.value) > 15) ? String(d.value) : null; })
		.transition()
			.duration(uv.config.effects.duration)
			.delay(idx * uv.config.effects.duration)
			.attr('y', function (d, i) { tsum[i] += d.value; return -(2*height - axes.ver.scale(tsum[i])) + 5; });
	
	bars.append('svg:title')
		.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + '] : ' + d.value;});
	
	bargroup.attr('transform', 'translate(0,' + 2 * this.height() + ') scale(1,-1)');
};