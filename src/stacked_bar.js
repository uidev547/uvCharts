r3.stacked_bargraph = function (graphdef) {
	r3.graph.apply(this, [graphdef]);
	graphdef.stepup = true;
	graphdef.stacked = true;
	this.init(graphdef);
	
	this.bargroups = [];
	this.dataset = r3.util.getDataArray(this.graphdef);

	var bargroup, bars,
		domainData = this.graphdef.dataset[this.graphdef.categories[0]];

	this.axes[this.graphdef.orientation === 'hor'?'ver':'hor'].scale.domain(domainData.map(function(d){ return d.name;}));

	if(this.graphdef.stepup) {
		var csum = graphdef.dataset[this.graphdef.categories[0]].map( function(d) {return 0;});
		var tsum = graphdef.dataset[this.graphdef.categories[0]].map( function(d) {return 0;});
	}

	for(var idx=0, len=this.dataset.length; idx<len; idx++){
		bargroup = this.panel.append('g').attr('class','chart3rbar');
		bars = bargroup.selectAll('g').data(this.dataset[idx]).enter().append('g').attr('class','bar_' + idx);

		this['drawStepUp' + r3.util.getPascalCasedName(this.graphdef.orientation) + 'Bars'](bars, len, csum, tsum);
		this.bargroups.push(bargroup);
	}

	this.finalize();
};

r3.stacked_bargraph.prototype = r3.util.extend(r3.graph);

r3.stacked_bargraph.prototype.drawStepUpHorBars = function (bars, len, csum, tsum) {
	var width = this.dimension.width, height = this.dimension.height, axes = this.axes;
	bars.append("rect")
		.attr("height", axes.ver.scale.rangeBand())
		.attr("width", function (d) { return axes.hor.scale(d.value);})
		.attr("x", function (d, i) { var value = axes.hor.scale(csum[i]); csum[i] += d.value; return value;})
		.attr("y", function (d) {return axes.ver.scale(d.name);});

/*	bars.append("text")
		.attr("class", "value")
		.attr("x", function(d, i) { tsum[i] += d.value; return axes.hor.scale(tsum[i]); })
		.attr("y", function(d) { return axes.ver.scale(d.name) + (axes.ver.scale.rangeBand())/2; })
		.attr("dx", -4)
		.attr("dy", ".35em")
		.attr("text-anchor", "end")
		.text(function(d) { return String(d.value); })
		.style('fill','white');*/
};

r3.stacked_bargraph.prototype.drawStepUpVerBars = function (bars, len, csum, tsum) {
	var width = this.dimension.width, height = this.dimension.height, axes = this.axes;
	bars.append("rect")
			.attr("height", function (d) { return height - axes.ver.scale(d.value);})
			.attr("width", axes.hor.scale.rangeBand())
			.attr("x", function (d) { return axes.hor.scale(d.name);})
			.attr("y", function (d, i) {  csum[i] += d.value; return axes.ver.scale(csum[i]);});

};