r3.stepup_bargraph = function (graphdef) {
	r3.graph.apply(this, [graphdef]);
	graphdef.stepup = true;
	this.init(graphdef);
	
	this.bargroups = {};

	var bargroup, bars,
		domainData = this._labels
		csum = domainData.map( function(d) {return 0;});
		tsum = domainData.map( function(d) {return 0;});

	this.axes[this.graphdef.orientation === 'hor'?'ver':'hor'].scale.domain(domainData);
	
	for(var idx=0, len=this._categories.length; idx<len; idx++){
		bargroup = this.panel.append('g').attr('class','r3_bargroup');
		bars = bargroup.selectAll('g').data(this.graphdef.dataset[this._categories[idx]]).enter().append('g').attr('class','stepupbar_' + this._categories[idx]);

		this['drawStepUp' + r3.util.getPascalCasedName(this.graphdef.orientation) + 'Bars'](bars, len, csum, idx);
		if(this.graphdef.orientation === 'hor') {
			bargroup.attr('transform','translate(0,' + idx*this.axes.ver.scale.rangeBand()/len + ')');
		} else {
			bargroup.attr('transform','translate(' + idx*this.axes.hor.scale.rangeBand()/len + ',' + 2*this.height() + ') scale(1,-1)');
		}

		this.bargroups[this._categories[idx]] = bargroup;
	}

	this.finalize();
};

r3.stepup_bargraph.prototype = r3.util.extend(r3.graph);

r3.stepup_bargraph.prototype.drawStepUpHorBars = function (bars, len, csum, idx) {
	var axes = this.axes, color = r3.util.getColorBand(this.config, idx);
	bars.append('rect')
		.attr('height', axes.ver.scale.rangeBand()/len)
		.attr('width', 0)
		.attr('x', function (d, i) { var value = axes.hor.scale(csum[i]); csum[i] += d.value; return value;})
		.attr('y', function (d) {return axes.ver.scale(d.name);})
		.style('stroke','white')
		.style('fill', color)
		.on('mouseover', function(){ d3.select(this.parentNode.parentNode).selectAll('rect').style('fill',r3.config.effects.hovercolor);})
		.on('mouseout',  function(){ d3.select(this.parentNode.parentNode).selectAll('rect').style('fill',color);})
		.transition().duration(r3.config.effects.duration).delay(idx*r3.config.effects.duration).attr('width', function (d) { return axes.hor.scale(d.value);});

/*	bars.append('text')
		.attr('class', 'value')
		.attr('x', function(d, i) { tsum[i] += d.value; return axes.hor.scale(tsum[i]); })
		.attr('y', function(d) { return axes.ver.scale(d.name) + (axes.ver.scale.rangeBand()/len)/2; })
		.attr('dx', -4)
		.attr('dy', '.35em')
		.attr('text-anchor', 'end')
		.text(function(d) { return String(d.value); })
		.style('fill','white');*/
};

r3.stepup_bargraph.prototype.drawStepUpVerBars = function (bars, len, csum, idx) {
	var height = this.height(), axes = this.axes, color = r3.util.getColorBand(this.config, idx), max = this.max;
	
	bars.append('rect')
		.attr('height', 0)
		.attr('width', axes.hor.scale.rangeBand()/len)
		.attr('x', function (d) { return axes.hor.scale(d.name);})
		.attr('y', function (d, i) { value = axes.ver.scale(csum[i]); csum[i] -= d.value; return value;})
		.style('stroke','white')
		.style('fill', color)
		.on('mouseover', function(){ d3.select(this.parentNode.parentNode).selectAll('rect').style('fill',r3.config.effects.hovercolor);})
		.on('mouseout',  function(){ d3.select(this.parentNode.parentNode).selectAll('rect').style('fill',color);})
		.transition().duration(r3.config.effects.duration).delay(idx*r3.config.effects.duration).attr('height', function (d) { return height - axes.ver.scale(d.value);});
};