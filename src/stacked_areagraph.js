r3.stacked_areagraph = function (graphdef) {
	r3.graph.apply(this, [graphdef]);
	graphdef.stepup = true;
	this.init(graphdef);

	this.stacklayout = d3.layout.stack()(this._categories.map(function(d) {
	    return graphdef.dataset[d].map(function(d) { return {x: d.name, y: +d.value}; }); 
	}));

	var areagroup, areapath, areafunc,
		domainData = this._labels, categories = this._categories;

	this.axes[this.graphdef.orientation === 'hor'?'ver':'hor'].scale.domain(domainData.map(function(d){ return d;}));	
	this.areagroup = this.panel.selectAll('g.areagroup').data(this.stacklayout).enter().append('g').attr('class', 'areagroup');
	this['draw' + r3.util.getPascalCasedName(this.graphdef.orientation) + 'StackArea']();

	this.finalize();
};

r3.stacked_areagraph.prototype = r3.util.extend(r3.graph);

r3.stacked_areagraph.prototype.drawHorStackArea = function () {
	var axes = this.axes, categories = this._categories, config = this.config;
	axes.ver.scale.rangePoints([0, this.dimension.height]);

	this.areapath = this.areagroup.append('path')
					    .attr('class', function(d, i) { return 'areapath_' + categories[i];})
					    .style('fill', function(d, i) { return r3.util.getColorBand(config, i); })
					    .attr('d', d3.svg.area()
						    .y(function(d) { return axes.ver.scale(d.x) + axes.ver.scale.rangeBand()/2; })
						    .x0(function(d) { return axes.hor.scale(d.y0); })
						    .x1(function(d) { return axes.hor.scale(d.y0 + d.y); })
						)					    
						.on('mouseover', function(){d3.select(this).style('fill','red');})
						.on('mouseout',  function(d, i){d3.select(this).style('fill', r3.util.getColorBand(config, i));});

	this.linepath = this.areagroup.append('path')
						.attr('class', function(d, i) { return 'linepath_' + categories[i];})
						.style('stroke', 'white').style('fill','none').style('stroke-width',2)
						.attr('d', d3.svg.line()
						    .y(function(d) { return axes.ver.scale(d.x) + axes.ver.scale.rangeBand()/2; })
						    .x(function(d) { return axes.hor.scale(d.y0 + d.y); })
						);
};

r3.stacked_areagraph.prototype.drawVerStackArea = function () {
	var axes = this.axes, categories = this._categories, config = this.config;
	axes.hor.scale.rangePoints([0, this.dimension.width]);
	
	this.areapath = this.areagroup.append('path')
					    .attr('class', function(d, i) { return 'areapath_' + categories[i];})
					    .style('fill', function(d, i) { return r3.util.getColorBand(config, i); })
					    .attr('d', d3.svg.area()
						    .x(function(d) { return axes.hor.scale(d.x) + axes.hor.scale.rangeBand()/2; })
						    .y0(function(d) { return axes.ver.scale(d.y0); })
						    .y1(function(d) { return axes.ver.scale(d.y0 + d.y); })
					    )					    
						.on('mouseover', function(){d3.select(this).style('fill','red');})
						.on('mouseout',  function(d, i){d3.select(this).style('fill', r3.util.getColorBand(config, i));});;

	this.linepath = this.areagroup.append('path')
					    .attr('class', function(d, i) { return 'linepath_' + categories[i];})
					    .style('stroke', 'white').style('fill','none').style('stroke-width',2)
					    .attr('d', d3.svg.line()
						    .x(function(d) { return axes.hor.scale(d.x) + axes.hor.scale.rangeBand()/2; })
						    .y(function(d) { return axes.ver.scale(d.y0 + d.y); })
					    );
};