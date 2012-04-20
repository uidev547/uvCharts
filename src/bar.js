cv.bargraph = function (graphdef) {
	cv.graph.apply(this, [graphdef]);
	this.init(graphdef);
	
	this.bargroups = [];
	this.dataset = r3.util.getDataArray(this.graphdef.dataset);

	var bargroup, bars,
		domainData = this.graphdef.dataset[0].data;

	this.axes[this.graphdef.orientation === 'hor'?'ver':'hor'].scale.domain(domainData.map(function(d){ return d.name;}));

	for(var idx=0, len=this.dataset.length; idx<len; idx++){
		bargroup = this.panel.append('g').attr('class','chart3rbar');
		bars = bargroup.selectAll('g').data(this.dataset[idx]).enter().append('g').attr('class','bar_' + idx);

		this['draw' + r3.util.getPascalCasedName(this.graphdef.orientation) + 'Bars'](bars, len);
		if(this.graphdef.orientation === 'hor') {
			bargroup.attr("transform","translate(0," + idx*this.axes.ver.scale.rangeBand()/len + ")");
		} else {
			bargroup.attr("transform","translate(" + idx*this.axes.hor.scale.rangeBand()/len + ",0)");
		}

		this.bargroups.push(bargroup);
	}

	this.finalize();
};

cv.bargraph.prototype = cv.extend(cv.graph);

cv.bargraph.prototype.drawHorBars = function (bars, len) {
	var width = this.dimension.width, height = this.dimension.height, axes = this.axes;
	bars.append("rect")
		.attr("height", axes.ver.scale.rangeBand()/len)
		.attr("width", function (d) { return axes.hor.scale(d.value);})
		.attr("x", function (d) {return 0;})
		.attr("y", function (d) {return axes.ver.scale(d.name);});

/*	bars.append("text")
		.attr("class", "value")
		.attr("x", function(d) { return axes.hor.scale(d.value); })
		.attr("y", function(d) { return axes.ver.scale(d.name) + (axes.ver.scale.rangeBand()/len)/2; })
		.attr("dx", -4)
		.attr("dy", ".35em")
		.attr("text-anchor", "end")
		.text(function(d) { return String(d.value); })
		.style('fill','white');*/
};

cv.bargraph.prototype.drawVerBars = function (bars, len) {
	var width = this.dimension.width, height = this.dimension.height, axes = this.axes;
	bars.append("rect")
			.attr("height", function (d) { return height - axes.ver.scale(d.value);})
			.attr("width", axes.hor.scale.rangeBand()/len)
			.attr("x", function (d) {return axes.hor.scale(d.name);})
			.attr("y", function (d) {return axes.ver.scale(d.value);});

/*	bars.append("text")
			.attr("class", "value")
			.attr("x", function(d) { return axes.hor.scale(d.value); })
			.attr("y", function(d) { return axes.ver.scale(d.name) + axes.hor.scale.rangeBand()/2; })
			.attr("dx", -4)
			.attr("dy", ".35em")
			.attr("text-anchor", "end")
			.text(function(d) { return String(d.value); })
			.style('fill','white');*/
};