r3.bargraph = function (graphdef) {
	r3.graph.apply(this, [graphdef]);
	this.init(graphdef);
	
	this.bargroups = {};

	var bargroup, bars,
		domainData = this._labels;

	this.axes[this.graphdef.orientation === 'hor'?'ver':'hor'].scale.domain(this._labels);

	for(var idx=0, len=this._categories.length; idx<len; idx++){
		bargroup = this.panel.append('g').attr('class','r3_bargroup');
		bars = bargroup.selectAll('g').data(this.graphdef.dataset[this._categories[idx]]).enter().append('g').attr('class','bar_' + this._categories[idx]);

		var color = r3.util.getColorBand(this.config, idx);
		this['draw' + r3.util.getPascalCasedName(this.graphdef.orientation) + 'Bars'](bars, len, color);
		if(this.graphdef.orientation === 'hor') {
			bargroup.attr('transform','translate(0,' + idx*this.axes.ver.scale.rangeBand()/len + ')');
		} else {
			bargroup.attr('transform','translate(' + idx*this.axes.hor.scale.rangeBand()/len + ',0)');
		}

		this.bargroups[this._categories[idx]] = bargroup;
	}

	this.finalize();
};

r3.bargraph.prototype = r3.util.extend(r3.graph);

r3.bargraph.prototype.drawHorBars = function (bars, len, color) {
	var axes = this.axes;
	bars.append('rect')
		.attr('height', axes.ver.scale.rangeBand()/len)
		.attr('width', 0)
		.attr('x', function (d) {return 0;})
		.attr('y', function (d) {return axes.ver.scale(d.name);})
		.style('stroke','white')
		.style('fill', color)
		.on('mouseover', function(){ d3.select(this.parentNode.parentNode).selectAll('rect').style('fill','red');})
		.on('mouseout',  function(){ d3.select(this.parentNode.parentNode).selectAll('rect').style('fill',color);})
		.transition().duration(2000).delay(function(d,i){ return i*200;}).attr('width', function (d) { return axes.hor.scale(d.value);});

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

r3.bargraph.prototype.drawVerBars = function (bars, len, color) {
	var height = this.height(), axes = this.axes;

	bars.append('rect')
			.attr('height', 0)
			.attr('width', axes.hor.scale.rangeBand()/len)
			.attr('x', function (d) {return axes.hor.scale(d.name);})
			.attr('y', function (d) {return axes.ver.scale(d.value);})
			.style('stroke','white')
			.style('fill', color)
			.on('mouseover', function(){ d3.select(this.parentNode.parentNode).selectAll('rect').style('fill','red');})
			.on('mouseout',  function(){ d3.select(this.parentNode.parentNode).selectAll('rect').style('fill',color);})
			.transition().duration(2000).attr('height', function (d) { return height - axes.ver.scale(d.value);});
};