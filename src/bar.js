cv.bargraph = function (graphdef) {
	cv.graph.apply(this, [graphdef]);
	this.init(graphdef);
	
	this.bargroups = [];
	this.dataset = cv.utility.getDataArray(this.graphdef.data, this.graphdef.dataset);

	var bargroup, bars,
		domainData = this.graphdef.data || this.graphdef.dataset[0].data;

	this.axes[this.graphdef.orientation === 'hor'?'ver':'hor'].scale.domain(domainData.map(function(d){ return d.name;}));

	for(var i=0, len=this.dataset.length; i<len; i++){
		bargroup = this.panel.append('g');
		bars = bargroup.selectAll('g').data(this.dataset[i]).enter().append('g');		

		var axes = this.axes;
		if(this.graphdef.orientation === 'hor') {
			bars.append("rect")
					.attr("height", axes.ver.scale.rangeBand()/len)
					.attr("width", function (d) { return axes.hor.scale(d.value);})
					.attr("x", function (d) {return 0;})
					.attr("y", function (d) {return axes.ver.scale(d.name);})
					.style("fill", "#e23").style("stroke","#eff");

			bars.append("text")
				    .attr("class", "value")
				    .attr("x", function(d) { return axes.hor.scale(d.value - 2); })
				    .attr("y", function(d) { return axes.ver.scale(d.name) + (axes.ver.scale.rangeBand()/len)/2; })
				    .attr("dx", -6)
				    .attr("dy", ".35em")
				    .attr("text-anchor", "end")
				    .text(function(d) { return String(d.value); })
				    .style('fill','white');

			bargroup.attr("transform","translate(0," + i*axes.ver.scale.rangeBand()/len + ")");
		} else {
			bars.append("rect")
					.attr("height", function (d) { return axes.ver.scale(d.value);})
					.attr("width", axes.hor.scale.rangeBand()/len)
					.attr("x", function (d) {return axes.hor.scale(d.name);})
					.attr("y", this.dimension.height)
					.style("fill", "#e23").style("stroke","#eff");

			bars.append("text")
					.attr("class", "value")
					.attr("x", function(d) { return axes.hor.scale(d.value - 2); })
					.attr("y", function(d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand()/2; })
					.attr("dx", -6)
					.attr("dy", ".35em")
					.attr("text-anchor", "end")
					.text(function(d) { return String(d.value); })
					.style('fill','white');
		}

		this.bargroups.push(bargroup);
	}

	this.finalize();
};

cv.bargraph.prototype = cv.extend(cv.graph);
