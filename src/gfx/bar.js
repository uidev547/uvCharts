r3.bargraph = function (graphdef) {
	r3.graph.call(this);
	this.init(graphdef);

	this.bargroups = {};
	var bargroup, idx, length, domainData = this.labels;

	this.axes[this.graphdef.orientation === 'hor' ? 'ver' : 'hor'].scale.domain(this.labels);

	for (idx = 0, length = this.categories.length; idx < length; idx = idx + 1) {
		bargroup = this.panel.append('g').attr('class', 'r3_bargroup ' + this.categories[idx]);
		this.bargroups[this.categories[idx]] = bargroup;		
		this['draw' + this.graphdef.orientation + 'Bars'](idx, length);
		if (this.graphdef.orientation === 'hor') {
			bargroup.attr('transform', 'translate(0,' + idx * this.axes.ver.scale.rangeBand() / length + ')');
		} else {
			bargroup.attr('transform', 'translate(' + idx * this.axes.hor.scale.rangeBand() / length + ',' + this.height() + ') scale(1,-1)');
		}
	}

	this.finalize();
};

r3.bargraph.prototype = r3.util.extend(r3.graph);

r3.bargraph.prototype.drawhorBars = function (idx, len) {
	var axes = this.axes, color = r3.util.getColorBand(this.config, idx), config = this.config;
	bars = this.bargroups[this.categories[idx]].selectAll('g').data(this.graphdef.dataset[this.categories[idx]]).enter().append('g').attr('class', 'bar_' + this.categories[idx]);
	bars.append('rect')
		.attr('height', axes.ver.scale.rangeBand() / len)
		.attr('x', function (d) {return 0; })
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
		.attr('dx', 20)
		.attr('dy', '.35em')
		.attr('text-anchor', 'end')
		.style('fill', 'none')
		.style('font-family', this.config.bar.fontfamily)
		.style('font-size', this.config.bar.fontsize)
		.style('font-weight', this.config.bar.fontweight)
		.text(function(d) { return String(d.value); })
		.transition()
			.duration(r3.config.effects.duration)
			.delay(function (d, i) { return i * r3.config.effects.duration; })
			.attr('x', function (d) { return axes.hor.scale(d.value); });
};

r3.bargraph.prototype.drawverBars = function (idx, len) {
	var height = this.height(), axes = this.axes, color = r3.util.getColorBand(this.config, idx), config = this.config;
	
	bars = this.bargroups[this.categories[idx]].selectAll('g').data(this.graphdef.dataset[this.categories[idx]]).enter().append('g').attr('class', 'bar_' + this.categories[idx]);
	bars.append('rect')
			.attr('height', 0).attr('width', axes.hor.scale.rangeBand() / len)
			.attr('x', function (d) {return axes.hor.scale(d.name); }).attr('y', 0)
			.style('stroke', this.config.bar.strokecolor).style('fill', color)
			.on('mouseover', r3.effects.bar.mouseover(config))
			.on('mouseout', r3.effects.bar.mouseout(config, color))
			.transition().duration(r3.config.effects.duration).delay(idx * r3.config.effects.duration).attr('height', function (d) { return height - axes.ver.scale(d.value); });
};