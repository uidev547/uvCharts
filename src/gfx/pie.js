r3.piegraph = function (graphdef) {
	r3.graph.apply(this, [graphdef]);
	this.init(graphdef);

	this.outerRadius = Math.min(this.height(), this.width()) * 2 / 5;
	this.innerRadius = 0;
	this.center = {
		x : this.width() / 2,
		y : this.height() / 2
	};

	this.category = graphdef.categories[0];
	this.data = r3.util.getCategoryData(this.graphdef, [this.category]);

	this.layout = d3.layout.pie();
	this.arcfunc = d3.svg.arc().innerRadius(this.innerRadius).outerRadius(this.outerRadius);
	this.panel.data(this.data);

	var config = this.config,
		arc = this.arcfunc,
		center = this.center;

	this.arcs = this.panel.selectAll('g.arc')
					.data(this.layout).enter()
					.append('g').attr('class', 'arc')
					.attr('transform', 'translate(' + this.center.x + ',' + this.center.y + ')');

	this.arcpath = this.arcs.append('path')
	    .attr('fill', function (d, i) { return r3.util.getColorBand(config, i); }).attr('d', this.arcfunc)
		.on('mouseover', function (d, i) {
			var dev = {
				x : arc.centroid(d)[0] / 4,
				y : arc.centroid(d)[1] / 4
			};
			d3.select(this.parentNode)
				.attr('transform', 'translate(' + (center.x + dev.x) + ',' + (center.y + dev.y) + ')');
		})
		.on('mouseout', function () {
			d3.select(this.parentNode).attr('transform', 'translate(' + center.x + ',' + center.y + ')');
		});

	this.arcs.append('text')
	    .attr('transform', function (d) { return 'translate(' + arc.centroid(d) + ')'; })
	    .attr('dy', '.35em')
	    .attr('text-anchor', 'middle')
	    .attr('display', function (d) { return d.value > 15 ? null : 'none'; })
	    .attr('color', 'white')
	    .text(function (d, i) { return d.value; });

	console.log(this);
};

r3.piegraph.prototype = r3.util.extend(r3.graph);