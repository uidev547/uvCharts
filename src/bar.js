
cv.bargraph.prototype = cv.extend(cv.graph);

cv.bar = function (graphdef, data, topparent, parent, color, seriesname, seriesnumber) {
	this.bar = parent.append('g').data(cv.utility.getDataArray(data));
	this.topparent = topparent; 
	this.parent = parent;
	this.length = data.length;
}

cv.bargraph = function (graphdef) {
	var bargroups = [], 
		bargroup, 
		dataset = [];

	var bars, i, panel;

	this.init(graphdef);
	var maxvalue = ac.utility.getMaxValue(graphdef);
	var dataset = graphdef.data.map( function (d) { return d.value; } 

	if (this.graphdef.data) {
		dataset.push(this.graphdef.data.map( function (d) { return d.value; }));
	} else {
		dataset.push(this.graphdef.dataset.map( function (d) { return d.map( function (d) { return d.value});}));
	}
};