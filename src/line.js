r3.linegraph = function (graphdef) {
	r3.graph.apply(this, [graphdef]);
	graphdef.stepup = false;
	this.init(graphdef);

	this.linegroups = {};
	this.dataset = r3.util.getDataArray(this.graphdef);

	var linegroup, linepath, linefunc,
		domainData = this._labels;

	this.axes[this.graphdef.orientation === 'hor'?'ver':'hor'].scale.domain(domainData);

	for(var idx=0, len=this._categories.length; idx<len; idx++){
		var color = r3.util.getColorBand(this.config, idx);
		
		linepath = this.panel.append('g').attr('class','line_' + this._categories[idx]).datum(this.dataset[idx]);
		linegroup = { 
			path: linepath, 
			func: undefined 
		};
		
		this['draw' + r3.util.getPascalCasedName(this.graphdef.orientation) + 'Lines'](linegroup, idx, color);
		this.linegroups[this._categories[idx]] = linegroup;
	}

	this.finalize();
};

r3.linegraph.prototype = r3.util.extend(r3.graph);

r3.linegraph.prototype.drawHorLines = function (linegroup, idx, color) {
	var axes = this.axes;

	linegroup.func = d3.svg.line()
				.x(function(d) { return axes.hor.scale(d.value); })
				.y(function(d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand()/2; })
				.interpolate(r3.config.line.interpolation);

	linegroup.path.append('path')
				.attr('class', 'linepath_' + this._categories[idx])				
				.on('mouseover', function(){ d3.select(this).style('stroke','red');})
				.on('mouseout', function() { d3.select(this).style('stroke', color);})
				.style('fill','none').style('stroke', color)
				.attr('d', linegroup.func);

	linegroup.path.selectAll('.dot')
				.data(this.dataset[idx])
				.enter().append('circle')
				.attr('class', 'dot_' + this._categories[idx])
				.attr('cx', linegroup.func.x())
				.attr('cy', linegroup.func.y())
				.attr('r', 3.5).style('fill','none').style('stroke', color)
				.on('mouseover', function(){ d3.selectAll('.' + d3.select(this).attr('class')).style('fill','red');})
				.on('mouseout', function() { d3.selectAll('.' + d3.select(this).attr('class')).style('fill','none');});
};

r3.linegraph.prototype.drawVerLines = function (linegroup, idx, color) {
	var axes = this.axes, height = this.dimension.height;

	linegroup.func = d3.svg.line()
				.x(function(d) { return axes.hor.scale(d.name) + axes.hor.scale.rangeBand()/2; })
				.y(function(d) { return axes.ver.scale(d.value); })
				.interpolate(r3.config.line.interpolation);

	linegroup.path.append('path')
				.attr('class', 'linepath_' + this._categories[idx])
				.attr('d', linegroup.func).style('fill','none').style('stroke', color)
				.on('mouseover', function(){ d3.select(this).style('stroke','red');})
				.on('mouseout', function() { d3.select(this).style('stroke', color);});

	linegroup.path.selectAll('.dot')
				.data(this.dataset[idx])
				.enter().append('circle')
				.attr('class', 'dot_' + this._categories[idx])
				.attr('cx', linegroup.func.x())
				.attr('cy', linegroup.func.y())
				.attr('r', 3.5).style('fill','none').style('stroke', color)
				.on('mouseover', function(){ d3.select(this.parentNode).selectAll('.' + d3.select(this).attr('class')).style('fill','red');})
				.on('mouseout', function() { d3.select(this.parentNode).selectAll('.' + d3.select(this).attr('class')).style('fill','none');});
};