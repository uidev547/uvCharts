r3.linegraph = function (graphdef) {
	r3.graph.apply(this, [graphdef]);
	graphdef.stepup = false;
	this.init(graphdef);

	this.linegroups = {};
	this.dataset = r3.util.getDataArray(this.graphdef);

	var linegroup, linepath, linefunc, idx, len, color,
		domainData = this.labels;

	this.axes[this.graphdef.orientation === 'hor' ? 'ver' : 'hor'].scale.domain(domainData);

	for (idx = 0, len = this.categories.length; idx < len; idx = idx + 1) {
		color = r3.util.getColorBand(this.config, idx);

		linepath = this.panel.append('g').attr('class', 'line_' + this.categories[idx]).datum(this.dataset[idx]);
		linegroup = {
			path: linepath,
			func: undefined
		};

		this['draw' + r3.util.getPascalCasedName(this.graphdef.orientation) + 'Lines'](linegroup, idx, color);
		this.linegroups[this.categories[idx]] = linegroup;
	}

	this.finalize();
};

r3.linegraph.prototype = r3.util.extend(r3.graph);

r3.linegraph.prototype.drawHorLines = function (linegroup, idx, color) {
	var axes = this.axes;

	linegroup.func = d3.svg.line()
				.x(function (d) { return axes.hor.scale(d.value); })
				.y(function (d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand() / 2; })
				.interpolate(r3.config.line.interpolation);

	linegroup.path.append('path')
				.attr('class', 'linepath_' + this.categories[idx])
				.attr('d', linegroup.func).style('fill', 'none').style('stroke', color).style('stroke-width', 1.5).style('stroke-opacity', 0.001)
				.on('mouseover', function () { d3.select(this.parentNode).selectAll('circle').style('fill', r3.config.effects.hovercolor);
					d3.select(this.parentNode).select('path').style('stroke', r3.config.effects.hovercolor);
				})
				.on('mouseout', function () { d3.select(this.parentNode).selectAll('circle').style('fill', 'none');
					d3.select(this.parentNode).select('path').style('stroke', color);
				})
				.transition().duration(3 * r3.config.effects.duration).delay(2 * idx * r3.config.effects.duration).style('stroke-opacity', 1);

	linegroup.path.selectAll('circle')
				.data(this.dataset[idx])
				.enter().append('circle')
				.attr('class', 'dot_' + this.categories[idx])
				.attr('cx', linegroup.func.x())
				.attr('cy', linegroup.func.y())
				.attr('r', 3.5).style('fill', 'none').style('stroke', color)
				.on('mouseover', function () { d3.select(this.parentNode).selectAll('circle').style('fill', r3.config.effects.hovercolor);
					d3.select(this.parentNode).select('path').style('stroke', r3.config.effects.hovercolor);
				})
				.on('mouseout', function () { d3.select(this.parentNode).selectAll('circle').style('fill', 'none');
					d3.select(this.parentNode).select('path').style('stroke', color);
				});
};

r3.linegraph.prototype.drawVerLines = function (linegroup, idx, color) {
	var axes = this.axes, height = this.height();

	linegroup.func = d3.svg.line()
				.x(function (d) { return axes.hor.scale(d.name) + axes.hor.scale.rangeBand() / 2; })
				.y(function (d) { return axes.ver.scale(d.value); })
				.interpolate(r3.config.line.interpolation);

	linegroup.path.append('path')
				.attr('class', 'linepath_' + this.categories[idx])
				.attr('d', linegroup.func).style('fill', 'none').style('stroke', color).style('stroke-width', 1.5).style('stroke-opacity', 0.001)
				.on('mouseover', function () { d3.select(this.parentNode).selectAll('circle').style('fill', r3.config.effects.hovercolor);
					d3.select(this.parentNode).select('path').style('stroke', r3.config.effects.hovercolor);
				})
				.on('mouseout', function () { d3.select(this.parentNode).selectAll('circle').style('fill', 'none');
					d3.select(this.parentNode).select('path').style('stroke', color);
				})
				.transition().duration(r3.config.effects.duration).delay(2 * idx * r3.config.effects.duration).style('stroke-opacity', 1);

	linegroup.path.selectAll('circle')
				.data(this.dataset[idx])
				.enter().append('circle')
				.attr('class', 'dot_' + this.categories[idx])
				.attr('cx', linegroup.func.x())
				.attr('cy', linegroup.func.y())
				.attr('r', 3.5).style('fill', 'none').style('stroke', color)
				.on('mouseover', function () { d3.select(this.parentNode).selectAll('circle').style('fill', r3.config.effects.hovercolor).style('stroke', r3.config.effects.hovercolor);
					d3.select(this.parentNode).select('path').style('stroke', r3.config.effects.hovercolor);
				})
				.on('mouseout', function () { d3.select(this.parentNode).selectAll('circle').style('fill', 'none').style('stroke', color);
					d3.select(this.parentNode).select('path').style('stroke', color);
				});
};