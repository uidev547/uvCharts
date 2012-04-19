cv.stacked_bargraph = function (graphdef) {
	cv.graph.apply(this, [graphdef]);
	graphdef.stepup = true;
	graphdef.stacked = true;
	this.init(graphdef);
	
	this.bargroups = [];
	this.dataset = r3.util.getDataArray(this.graphdef.dataset);

	var bargroup, bars,
		domainData = this.graphdef.dataset[0].data;

	this.axes[this.graphdef.orientation === 'hor'?'ver':'hor'].scale.domain(domainData.map(function(d){ return d.name;}));

	if(this.graphdef.stepup) {
		var csum = graphdef.dataset[0].data.map( function(d) {return 0;});
		var tsum = graphdef.dataset[0].data.map( function(d) {return 0;});
	}

	for(var idx=0, len=this.dataset.length; idx<len; idx++){
		bargroup = this.panel.append('g').attr('class','chart3rbar');
		bars = bargroup.selectAll('g').data(this.dataset[idx]).enter().append('g').attr('class','bar_' + idx);

		this['drawStepUp' + r3.util.getPascalCasedName(this.graphdef.orientation) + 'Bars'](bars, len, csum, tsum);
		this.bargroups.push(bargroup);
	}

	this.finalize();
};

cv.stacked_bargraph.prototype = cv.extend(cv.graph);

cv.stacked_bargraph.prototype.drawStepUpHorBars = function (bars, len, csum, tsum) {
	var width = this.dimension.width, height = this.dimension.height, axes = this.axes;
	bars.append("rect")
		.attr("height", axes.ver.scale.rangeBand())
		.attr("width", function (d) { return axes.hor.scale(d.value);})
		.attr("x", function (d, i) { var value = axes.hor.scale(csum[i]); csum[i] += d.value; return value;})
		.attr("y", function (d) {return axes.ver.scale(d.name);});

	bars.append("text")
		.attr("class", "value")
		.attr("x", function(d, i) { tsum[i] += d.value; return axes.hor.scale(tsum[i]); })
		.attr("y", function(d) { return axes.ver.scale(d.name) + (axes.ver.scale.rangeBand())/2; })
		.attr("dx", -4)
		.attr("dy", ".35em")
		.attr("text-anchor", "end")
		.text(function(d) { return String(d.value); })
		.style('fill','white');
};