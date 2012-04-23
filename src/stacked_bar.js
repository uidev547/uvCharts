r3.stacked_bargraph = function (graphdef) {
	r3.graph.apply(this, [graphdef]);
	graphdef.stepup = true;
	this.init(graphdef);
	
	this.bargroups = [];

	var bargroup, bars,
		domainData = this._labels,
		csum = domainData.map( function(d) {return 0;});
		tsum = domainData.map( function(d) {return 0;});

	this.axes[this.graphdef.orientation === 'hor'?'ver':'hor'].scale.domain(domainData);

	for(var idx=0, len=this._categories.length; idx<len; idx++){
		var color = r3.util.getColorBand(this.config, idx);
		
		bargroup = this.panel.append('g').attr('class','r3_bargroup');
		bars = bargroup.selectAll('g').data(this.graphdef.dataset[this._categories[idx]]).enter().append('g').attr('class','stepupbar_' + this._categories[idx]);

		this['drawStack' + r3.util.getPascalCasedName(this.graphdef.orientation) + 'Bars'](bars, csum, tsum, color);
		this.bargroups.push(bargroup);
	}

	this.finalize();
};

r3.stacked_bargraph.prototype = r3.util.extend(r3.graph);

r3.stacked_bargraph.prototype.drawStackHorBars = function (bars, csum, tsum, color) {
	var width = this.dimension.width, height = this.dimension.height, axes = this.axes;
	bars.append('rect')
		.attr('height', axes.ver.scale.rangeBand())
		.attr('width', function (d) { return axes.hor.scale(d.value);})
		.attr('x', function (d, i) { var value = axes.hor.scale(csum[i]); csum[i] += d.value; return value;})
		.attr('y', function (d) {return axes.ver.scale(d.name);})
		.style('stroke','white')
		.style('fill', color)
		.on('mouseover', function(){d3.select(this).style('fill','red');})
		.on('mouseout', function(){d3.select(this).style('fill', color);});

/*	bars.append('text')
		.attr('class', 'value')
		.attr('x', function(d, i) { tsum[i] += d.value; return axes.hor.scale(tsum[i]); })
		.attr('y', function(d) { return axes.ver.scale(d.name) + (axes.ver.scale.rangeBand())/2; })
		.attr('dx', -4)
		.attr('dy', '.35em')
		.attr('text-anchor', 'end')
		.text(function(d) { return String(d.value); })
		.style('fill','white');*/
};

r3.stacked_bargraph.prototype.drawStackVerBars = function (bars, csum, tsum, color) {
	var width = this.dimension.width, height = this.dimension.height, axes = this.axes;
	bars.append('rect')
			.attr('height', function (d) { return height - axes.ver.scale(d.value);})
			.attr('width', axes.hor.scale.rangeBand())
			.attr('x', function (d) { return axes.hor.scale(d.name);})
			.attr('y', function (d, i) {  csum[i] += d.value; return axes.ver.scale(csum[i]);})
			.style('stroke','white')
			.style('fill', color)
			.on('mouseover', function(){d3.select(this).style('fill','red');})
			.on('mouseout', function(){d3.select(this).style('fill', color);});

};