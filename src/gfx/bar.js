r3.bargraph = function (graphdef) {
	r3.graph.call(this);
	this.init(graphdef);

	this.bargroups = {};
	var idx, length;

	this.axes[this.graphdef.orientation === 'hor' ? 'ver' : 'hor'].scale.domain(this.labels);

	for (idx = 0, length = this.categories.length; idx < length; idx = idx + 1) {
		this.bargroups[this.categories[idx]] = this.panel.append('g').attr('class', 'r3_bargroup ' + this.categories[idx]);
		this['draw' + this.graphdef.orientation + 'Bars'](idx, length);
	}

	this.finalize();
};

r3.bargraph.prototype = r3.util.extend(r3.graph);

r3.bargraph.prototype.drawhorBars = function (idx, len) {
	var axes = this.axes,
		color = r3.util.getColorBand(this.config, idx),
		config = this.config,
		labels = this.labels,
		categories = this.categories,
		self = this;
	
	bars = this.bargroups[this.categories[idx]].selectAll('g').data(this.graphdef.dataset[this.categories[idx]]).enter().append('g').attr('class', 'bar_' + this.categories[idx]);
	bars.append('rect')
		.attr('height', axes.ver.scale.rangeBand() / len)
		.attr('x', 0)
		.attr('y', function (d) {return axes.ver.scale(d.name); })
		.style('stroke', this.config.bar.strokecolor)
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(config))
		.on('mouseout', r3.effects.bar.mouseout(config, color))
		.transition()
			.duration(r3.config.effects.duration)
			.delay(function (d, i) { return i * r3.config.effects.duration; })
			.attr('width', function (d) { return axes.hor.scale(d.value); });

	bars.append('text')
		.attr('y', function(d) { return axes.ver.scale(d.name) + (axes.ver.scale.rangeBand()/len)/2; })
		.attr('dx', 4)
		.attr('dy', '.35em')
		.attr('text-anchor', 'start')
		.style('fill', 'none')
		.style('font-family', this.config.bar.fontfamily)
		.style('font-size', this.config.bar.fontsize)
		.style('font-weight', this.config.bar.fontweight)
		.text(function(d) { return String(d.value); })
		.transition()
			.duration(r3.config.effects.duration)
			.delay(function (d, i) { return i * r3.config.effects.duration; })
			.attr('x', function (d) { return axes.hor.scale(d.value); });
	
	bars.append('svg:title')
		.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + '] : ' + d.value;});
	
	this.bargroups[this.categories[idx]].attr('transform', 'translate(0,' + idx * axes.ver.scale.rangeBand() / len + ')');
};

r3.bargraph.prototype.drawverBars = function (idx, len) {
	var height = this.height(),
		axes = this.axes,
		color = r3.util.getColorBand(this.config, idx),
		config = this.config,
		self = this;
	
	bars = this.bargroups[this.categories[idx]].selectAll('g').data(this.graphdef.dataset[this.categories[idx]]).enter().append('g').attr('class', 'bar_' + this.categories[idx]);
	
	bars.append('rect')
			.attr('height', 0)
			.attr('width', axes.hor.scale.rangeBand() / len)
			.attr('x', function (d) {return axes.hor.scale(d.name); })
			.attr('y', 0)
			.style('stroke', this.config.bar.strokecolor).style('fill', color)
			.on('mouseover', r3.effects.bar.mouseover(config))
			.on('mouseout', r3.effects.bar.mouseout(config, color))
			.transition()
				.duration(r3.config.effects.duration)
				.delay(idx * r3.config.effects.duration)
				.attr('height', function (d) { return height - axes.ver.scale(d.value); });
	
	bars.append('text').attr('transform','scale(1,-1)')
			.attr('x', function(d) { return axes.hor.scale(d.name) + (axes.hor.scale.rangeBand()/len)/2; })
			.attr('y', -10)
			.attr('dx', 0)
			.attr('dy', '.35em')
			.attr('text-anchor', 'middle')
			.style('fill', 'none')
			.style('font-family', this.config.bar.fontfamily)
			.style('font-size', this.config.bar.fontsize)
			.style('font-weight', this.config.bar.fontweight)
			.text(function(d) { return String(d.value); })
			.transition()
				.duration(r3.config.effects.duration)
				.delay(idx * r3.config.effects.duration)
				.attr('y', function (d) { return -(height - axes.ver.scale(d.value)) - 10; });
	
	bars.append('svg:title')
		.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + '] : ' + d.value;});
	
	this.bargroups[this.categories[idx]].attr('transform', 'translate(' + idx * axes.hor.scale.rangeBand() / len + ',' + this.height() + ') scale(1,-1)');
};