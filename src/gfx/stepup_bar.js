r3.stepup_bargraph = function (graphdef) {
	r3.graph.apply(this, [graphdef]);
	graphdef.stepup = true;
	this.init(graphdef);

	this.bargroups = {};

	var bargroup, bars, idx, length,
		csum = this.labels.map(function (d) {return 0; }),
		tsum = this.labels.map(function (d) {return 0; });

	this.axes[this.graphdef.orientation === 'hor' ? 'ver' : 'hor'].scale.domain(this.labels);

	for (idx = 0, length = this.categories.length; idx < length; idx = idx + 1) {
		bargroup = this.panel.append('g').attr('class', 'r3_bargroup');
		this.bargroups[this.categories[idx]] = bargroup;
		
		bars = bargroup.selectAll('g').data(this.graphdef.dataset[this.categories[idx]]).enter().append('g').attr('class', 'stepupbar_' + this.categories[idx]);

		this['drawStepUp' + r3.util.getPascalCasedName(this.graphdef.orientation) + 'Bars'](bars, length, csum, tsum, idx);
		if (this.graphdef.orientation === 'hor') {
			bargroup.attr('transform', 'translate(0,' + idx * this.axes.ver.scale.rangeBand() / length + ')');
		} else {
			bargroup.attr('transform', 'translate(' + idx * this.axes.hor.scale.rangeBand() / length + ',' + 2 * this.height() + ') scale(1,-1)');
		}		
	}

	this.finalize();
};

r3.stepup_bargraph.prototype = r3.util.extend(r3.graph);

r3.stepup_bargraph.prototype.drawStepUpHorBars = function (bars, len, csum, tsum, idx) {
	var axes = this.axes, color = r3.util.getColorBand(this.config, idx), config = this.config;
	bars.append('rect')
		.attr('height', axes.ver.scale.rangeBand() / len)
		.attr('width', 0)
		.attr('x', function (d, i) { var value = axes.hor.scale(csum[i]); csum[i] += d.value; return value; })
		.attr('y', function (d) {return axes.ver.scale(d.name); })
		.style('stroke', 'white')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(config))
		.on('mouseout',  r3.effects.bar.mouseout(config, color))
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
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
			.delay(idx * r3.config.effects.duration)
			.attr('x', function (d, i) { tsum[i] += d.value; return axes.hor.scale(tsum[i]); });
};

r3.stepup_bargraph.prototype.drawStepUpVerBars = function (bars, len, csum, tsum, idx) {
	var height = this.height(),
		axes = this.axes,
		color = r3.util.getColorBand(this.config, idx),
		max = this.max,
		config = this.config;

	bars.append('rect')
		.attr('height', 0)
		.attr('width', axes.hor.scale.rangeBand() / len)
		.attr('x', function (d) { return axes.hor.scale(d.name); })
		.attr('y', function (d, i) { var value = axes.ver.scale(csum[i]); csum[i] -= d.value; return value; })
		.style('stroke', 'white')
		.style('fill', color)
		.on('mouseover', r3.effects.bar.mouseover(config))
		.on('mouseout', r3.effects.bar.mouseout(config, color))
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('height', function (d) { return height - axes.ver.scale(d.value); });
	
	bars.append('text').attr('transform','scale(1,-1)')
		.attr('x', function(d) { return axes.hor.scale(d.name) + (axes.hor.scale.rangeBand()/len)/2; })
		.attr('y', -height - 10)
		.attr('dy', '.71em')
		.attr('text-anchor', 'middle')
		.style('fill', 'none')
		.style('font-family', this.config.bar.fontfamily)
		.style('font-size', this.config.bar.fontsize)
		.style('font-weight', this.config.bar.fontweight)
		.text(function(d) { return String(d.value); })
		.transition()
			.duration(r3.config.effects.duration)
			.delay(idx * r3.config.effects.duration)
			.attr('y', function (d, i) { tsum[i] += d.value; return -(2*height - axes.ver.scale(tsum[i])) - 10; });
};