r3.bargraph = function (graphdef) {
	r3.graph.call(this);
	this.init(graphdef);

	this.bargroups = {};
	var bargroup, bars, idx, len, color, domainData = this.labels;

	this.axes[this.graphdef.orientation === 'hor' ? 'ver' : 'hor'].scale.domain(this.labels);

	for (idx = 0, len = this.categories.length; idx < len; idx = idx + 1) {
		bargroup = this.panel.append('g').attr('class', 'r3_bargroup');
		bars = bargroup.selectAll('g').data(this.graphdef.dataset[this.categories[idx]]).enter().append('g').attr('class', 'bar_' + this.categories[idx]);

		color = r3.util.getColorBand(this.config, idx);
		this['draw' + r3.util.getPascalCasedName(this.graphdef.orientation) + 'Bars'](bars, len, color, idx);

		if (this.graphdef.orientation === 'hor') {
			bargroup.attr('transform', 'translate(0,' + idx * this.axes.ver.scale.rangeBand() / len + ')');
		} else {
			bargroup.attr('transform', 'translate(' + idx * this.axes.hor.scale.rangeBand() / len + ',' + this.height() + ') scale(1,-1)');
		}

		this.bargroups[this.categories[idx]] = bargroup;
	}

	this.finalize();
};

r3.bargraph.prototype = r3.util.extend(r3.graph);

r3.bargraph.prototype.drawHorBars = function (bars, len, color, idx) {
	var axes = this.axes;
	bars.append('rect')
		.attr('height', axes.ver.scale.rangeBand() / len)
		.attr('width', 0)
		.attr('x', function (d) {return 0; })
		.attr('y', function (d) {return axes.ver.scale(d.name); })
		.style('stroke', 'white')
		.style('fill', color)
		.on('mouseover', function () { d3.select(this.parentNode.parentNode).selectAll('rect').style('fill', r3.config.effects.hovercolor); })
		.on('mouseout',  function () { d3.select(this.parentNode.parentNode).selectAll('rect').style('fill', color); })
		.transition().duration(r3.config.effects.duration).delay(function (d, i) { return i * r3.config.effects.duration; }).attr('width', function (d) { return axes.hor.scale(d.value); });

/*	bars.append('text')
		.attr('class', 'value')
		.attr('x', function(d) { return axes.hor.scale(d.value); })
		.attr('y', function(d) { return axes.ver.scale(d.name) + (axes.ver.scale.rangeBand()/len)/2; })
		.attr('dx', -4)
		.attr('dy', '.35em')
		.attr('text-anchor', 'end')
		.text(function(d) { return String(d.value); })
		.style('fill','white');*/
};

r3.bargraph.prototype.drawVerBars = function (bars, len, color, idx) {
	var height = this.height(), axes = this.axes;

	bars.append('rect')
			.attr('height', 0)
			.attr('width', axes.hor.scale.rangeBand() / len)
			.attr('x', function (d) {return axes.hor.scale(d.name); })
			.attr('y', 0) //.attr('y', function (d) {return axes.ver.scale(d.value);})
			.style('stroke', 'white')
			.style('fill', color)
			.on('mouseover', function () { d3.select(this.parentNode.parentNode).selectAll('rect').style('fill', r3.config.effects.hovercolor); })
			.on('mouseout',  function () { d3.select(this.parentNode.parentNode).selectAll('rect').style('fill', color); })
			.transition().duration(r3.config.effects.duration).delay(idx * r3.config.effects.duration).attr('height', function (d) { return height - axes.ver.scale(d.value); });
};