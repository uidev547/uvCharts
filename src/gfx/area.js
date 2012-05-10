r3.areagraph = function (graphdef) {
	var self = this;
	r3.graph.apply(self, [graphdef]);
	graphdef.stepup = false;
	self.init(graphdef);

	self.areagroups = [];
	self.dataset = r3.util.getDataArray(self.graphdef);

	var areagroup, areapath, areafunc, idx, len,
		domainData = self.graphdef.dataset[self.graphdef.categories[0]];

	self.axes[self.graphdef.orientation === 'hor' ? 'ver' : 'hor'].scale.domain(domainData.map(function (d) { return d.name; }));

	for (idx = 0, len = self.dataset.length; idx < len; idx = idx + 1) {
		areapath = self.panel.append('g').attr('class', 'area_' + idx).datum(self.dataset[idx]);
		areagroup = { path: areapath, linefunc: undefined, areafunc: undefined, line: undefined, area: undefined };
		self['draw' + r3.util.getPascalCasedName(self.graphdef.orientation) + 'Area'](areagroup, idx);
		self.areagroups.push(areagroup);
	}

	self.finalize();
};

r3.areagraph.prototype = r3.util.extend(r3.graph);

r3.areagraph.prototype.drawHorArea = function (areagroup, idx) {
	var self = this,
		color = r3.util.getColorBand(self.config, idx);
		
	self.axes.ver.scale.rangePoints([0, self.height()]);

	areagroup.linefunc = d3.svg.line()
				.x(function (d) { return self.axes.hor.scale(d.value); })
				.y(function (d) { return self.axes.ver.scale(d.name) + self.axes.ver.scale.rangeBand() / 2; })
				.interpolate(self.config.area.interpolation);

	areagroup.areafunc = d3.svg.area()
				.x0(self.axes.hor.scale(0))
				.x1(areagroup.linefunc.x())
				.y(areagroup.linefunc.y())
				.interpolate(self.config.area.interpolation);

	areagroup.area = areagroup.path.append('svg:path')
				.attr('class', 'areapath_' + idx)
				.attr('d', areagroup.areafunc)
				.style('opacity', self.config.area.opacity)
				.style('-moz-opacity', self.config.area.opacity)
				.style('fill', color);

	areagroup.line = areagroup.path.append('svg:path')
				.attr('class', 'linepath_' + idx)
				.attr('d', areagroup.linefunc)
				.style('stroke', 'white')
				.style('fill', 'none');

	areagroup.path.selectAll('.dot')
				.data(self.dataset[idx])
				.enter().append('circle')
				.attr('class', 'dot')
				.attr('cx', areagroup.linefunc.x())
				.attr('cy', areagroup.linefunc.y())
				.attr('r', 3.5)
				.style('fill', 'white');
};

r3.areagraph.prototype.drawVerArea = function (areagroup, idx) {
	var self = this,
		color = r3.util.getColorBand(self.config, idx);
	
	self.axes.hor.scale.rangePoints([0, self.width()]);

	areagroup.linefunc = d3.svg.line()
				.x(function (d) { return self.axes.hor.scale(d.name) + self.axes.hor.scale.rangeBand() / 2; })
				.y(function (d) { return self.axes.ver.scale(d.value); })
				.interpolate(self.config.area.interpolation);

	areagroup.areafunc = d3.svg.area()
				.x(areagroup.linefunc.x())
				.y0(areagroup.linefunc.y())
				.y1(self.axes.ver.scale(0))
				.interpolate(self.config.area.interpolation);

	areagroup.area = areagroup.path.append('svg:path')
				.attr('class', 'areapath_' + idx)
				.attr('d', areagroup.areafunc)
				.style('opacity', self.config.area.opacity)
				.style('-moz-opacity', self.config.area.opacity)
				.style('fill', color);

	areagroup.line = areagroup.path.append('svg:path')
				.attr('class', 'linepath_' + idx)
				.attr('d', areagroup.linefunc)
				.style('stroke', 'white')
				.style('fill', 'none');

	areagroup.path.selectAll('.dot')
				.data(self.dataset[idx])
				.enter().append('circle')
				.attr('class', 'dot')
				.attr('cx', areagroup.linefunc.x())
				.attr('cy', areagroup.linefunc.y())
				.attr('r', 3.5)
				.style('fill', 'white');
};