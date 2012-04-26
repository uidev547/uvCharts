r3.areagraph = function (graphdef) {
	r3.graph.apply(this, [graphdef]);
	graphdef.stepup = false;
	this.init(graphdef);

	this.areagroups = [];
	this.dataset = r3.util.getDataArray(this.graphdef);

	var areagroup, areapath, areafunc, idx, len,
		domainData = this.graphdef.dataset[this.graphdef.categories[0]];

	this.axes[this.graphdef.orientation === 'hor' ? 'ver' : 'hor'].scale.domain(domainData.map(function (d) { return d.name; }));

	for (idx = 0, len = this.dataset.length; idx < len; idx = idx + 1) {
		areapath = this.panel.append('g').attr('class', 'area_' + idx).datum(this.dataset[idx]);
		areagroup = { path: areapath, linefunc: undefined, areafunc: undefined, line: undefined, area: undefined };
		this['draw' + r3.util.getPascalCasedName(this.graphdef.orientation) + 'Area'](areagroup, idx);
		this.areagroups.push(areagroup);
	}

	this.finalize();
};

r3.areagraph.prototype = r3.util.extend(r3.graph);

r3.areagraph.prototype.drawHorArea = function (areagroup, idx) {
	var axes = this.axes, color = r3.util.getColorBand(this.config, idx);
	axes.ver.scale.rangePoints([0, this.height()]);

	areagroup.linefunc = d3.svg.line()
				.x(function (d) { return axes.hor.scale(d.value); })
				.y(function (d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand() / 2; })
				.interpolate('linear');

	areagroup.areafunc = d3.svg.area()
				.x0(axes.hor.scale(0))
				.x1(areagroup.linefunc.x())
				.y(areagroup.linefunc.y());

	areagroup.area = areagroup.path.append('svg:path')
				.attr('class', 'areapath_' + idx)
				.attr('d', areagroup.areafunc).style('opacity', 0.2).style('-moz-opacity', 0.2).style('fill', color);

	areagroup.line = areagroup.path.append('svg:path')
				.attr('class', 'linepath_' + idx)
				.attr('d', areagroup.linefunc).style('stroke', 'white').style('fill', 'none');

	areagroup.path.selectAll('.dot')
				.data(this.dataset[idx])
				.enter()
				.append('circle')
				.attr('class', 'dot')
				.attr('cx', areagroup.linefunc.x())
				.attr('cy', areagroup.linefunc.y())
				.attr('r', 3.5).style('fill', 'white');
};

r3.areagraph.prototype.drawVerArea = function (areagroup, idx) {
	var axes = this.axes, color = r3.util.getColorBand(this.config, idx);
	axes.hor.scale.rangePoints([0, this.width()]);

	areagroup.linefunc = d3.svg.line()
				.x(function (d) { return axes.hor.scale(d.name) + axes.hor.scale.rangeBand() / 2; })
				.y(function (d) { return axes.ver.scale(d.value); })
				.interpolate('linear');

	areagroup.areafunc = d3.svg.area()
				.x(areagroup.linefunc.x())
				.y0(areagroup.linefunc.y())
				.y1(axes.ver.scale(0));

	areagroup.area = areagroup.path.append('svg:path')
				.attr('class', 'areapath_' + idx)
				.attr('d', areagroup.areafunc).style('opacity', 0.2).style('-moz-opacity', 0.2).style('fill', color);

	areagroup.line = areagroup.path.append('svg:path')
				.attr('class', 'linepath_' + idx)
				.attr('d', areagroup.linefunc).style('stroke', 'white').style('fill', 'none');

	areagroup.path.selectAll('.dot')
				.data(this.dataset[idx])
				.enter()
				.append('circle')
				.attr('class', 'dot')
				.attr('cx', areagroup.linefunc.x())
				.attr('cy', areagroup.linefunc.y())
				.attr('r', 3.5).style('fill', 'white');
};