cv.linegraph = function (graphdef) {
	cv.graph.apply(this, [graphdef]);
	graphdef.stepup = false;
	this.init(graphdef);

	this.linegroups = [];
	this.dataset = r3.util.getDataArray(this.graphdef.dataset);

	var linegroup, linepath, linefunc,
		domainData = this.graphdef.dataset[0].data;

	this.axes[this.graphdef.orientation === 'hor'?'ver':'hor'].scale.domain(domainData.map(function(d){ return d.name;}));

	for(var idx=0, len=this.dataset.length; idx<len; idx++){		
		linepath = this.panel.append('g').attr('class','line_' + idx).datum(this.dataset[idx]);
		linegroup = { path: linepath, func: undefined };
		this['draw' + r3.util.getPascalCasedName(this.graphdef.orientation) + 'Lines'](linepath, idx, linegroup);
		this.linegroups.push(linegroup);
	}

	this.finalize();
};

cv.linegraph.prototype = cv.extend(cv.graph);

cv.linegraph.prototype.drawHorLines = function (linepath, idx, linegroup) {
	var axes = this.axes;

	linegroup.func = d3.svg.line()
				.x(function(d) { return axes.hor.scale(d.value); })
				.y(function(d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand()/2; })
				.interpolate("linear");

	var path = linepath.append("svg:path")
				.attr("class", "linepath_" + idx)
				.attr("d", linegroup.func);

	linepath.selectAll(".dot")
				.data(this.dataset[idx])
				.enter()
				.append("circle")
				.attr("class", "dot")
				.attr("cx", linegroup.func.x())
				.attr("cy", linegroup.func.y())
				.attr("r", 3.5).style("fill","white");
};

cv.linegraph.prototype.drawVerLines = function (linepath, idx, linegroup) {
	var axes = this.axes, height = this.dimension.height;

	linegroup.func = d3.svg.line()
				.x(function(d) { return axes.hor.scale(d.name) + axes.hor.scale.rangeBand()/2; })
				.y(function(d) { return axes.ver.scale(d.value); })
				.interpolate("linear");

	var path = linepath.append("svg:path")
				.attr("class", "linepath_" + idx)
				.attr("d", linegroup.func);

	linepath.selectAll(".dot")
				.data(this.dataset[idx])
				.enter()
				.append("circle")
				.attr("class", "dot")
				.attr("cx", linegroup.func.x())
				.attr("cy", linegroup.func.y())
				.attr("r", 3.5).style("fill","white");
};