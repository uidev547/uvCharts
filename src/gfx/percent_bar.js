r3.percent_bargraph = function (graphdef) {
	r3.graph.call(this);
	graphdef.stepup = 'percent';
	this.config.scale.ordinality = 0;
	this.init(graphdef);

	this.bargroups = [];

	var bargroup, bars, idx, len, color,
		domainData = this.labels,
		csum = domainData.map(function (d) {return 0; }),
		tsum = domainData.map(function (d) {return 0; });

	this.axes[this.graphdef.orientation === 'hor' ? 'ver' : 'hor'].scale.domain(domainData);

	for (idx = 0, len = this.categories.length; idx < len; idx = idx + 1) {
		color = r3.util.getColorBand(this.config, idx);

		bargroup = this.panel.append('g').attr('class', 'r3_bargroup');
		bars = bargroup.selectAll('g').data(this.graphdef.dataset[this.categories[idx]]).enter().append('g').attr('class', 'percentbar_' + this.categories[idx]);

		this['drawStack' + r3.util.getPascalCasedName(this.graphdef.orientation) + 'Bars'](bars, csum, tsum, idx);

		if (this.graphdef.orientation === 'ver') {
			bargroup.attr('transform', 'translate(0,' + 2 * this.height() + ') scale(1,-1)');
		}

		this.bargroups.push(bargroup);
	}

	this.finalize();
};

r3.percent_bargraph.prototype = r3.util.extend(r3.graph);

r3.percent_bargraph.prototype.drawStackHorBars = function (bars, csum, tsum, idx) {
	var axes = this.axes,
		color = r3.util.getColorBand(this.config, idx),
		config = this.config,
		sumMap = r3.util.getSumUpArray(this.graphdef);
	
	bars.append('rect')
		.attr('height', axes.ver.scale.rangeBand())
		.attr('width', 0)
		.attr('x', function (d, i) { var value = axes.hor.scale(r3.util.getPercentage(csum[i], sumMap[i])); csum[i] += d.value; return value; })
		.attr('y', function (d) {return axes.ver.scale(d.name); })
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(config))
		.on('mouseout',  r3.effects.bar.mouseout(config, color))
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('width', function (d, i) { return axes.hor.scale(r3.util.getPercentage(d.value, sumMap[i]));});

	bars.append('text')
		.attr('y', function(d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand()/2; })
		.attr('dx', 0)
		.attr('dy', '.35em')
		.attr('text-anchor', 'end')
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

r3.percent_bargraph.prototype.drawStackVerBars = function (bars, csum, tsum, idx) {
	var height = this.height(),
		axes = this.axes,
		color = r3.util.getColorBand(this.config, idx),
		config = this.config,
		sumMap = r3.util.getSumUpArray(this.graphdef);
	
	bars.append('rect')
		.attr('height', 0)
		.attr('width', axes.hor.scale.rangeBand())
		.attr('x', function (d) { return axes.hor.scale(d.name); })
		.attr('y', function (d, i) { var value = axes.ver.scale(r3.util.getPercentage(csum[i], sumMap[i])); csum[i] -= d.value; return value; })
		.style('stroke', 'none')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(config))
		.on('mouseout',  r3.effects.bar.mouseout(config, color))
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('height', function (d, i) { return height - axes.ver.scale(r3.util.getPercentage(d.value, sumMap[i])); });
	
	bars.append('text').attr('transform','scale(1,-1)')
		.attr('x', function(d) { return axes.hor.scale(d.name) + axes.hor.scale.rangeBand()/2; })
		.attr('y', -height + 5)
		.attr('dy', '.71em')
		.attr('text-anchor', 'middle')
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