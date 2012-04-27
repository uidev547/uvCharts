r3.effects = {};

r3.effects.bar = {};
r3.effects.bar.mouseover = function (config) {
	return function () {
		d3.select(this.parentNode.parentNode).selectAll('rect')
			.style('fill', config.effects.hovercolor)
			.style('stroke', config.effects.strokecolor);
	
		d3.select(this.parentNode.parentNode).selectAll('text')
			.style('fill', config.bar.textcolor);
	}
};

r3.effects.bar.mouseout = function (config, color) {
	return function () {
		d3.select(this.parentNode.parentNode).selectAll('rect')
			.style('fill', color)
			.style('stroke', 'none');
	
		d3.select(this.parentNode.parentNode).selectAll('text')
			.style('fill', 'none');
	}
};