cv.extend = function (f) {
	function g() {}
	g.prototype = f.prototype || f;
	return new g();
};

r3.util = {};

r3.util.getPascalCasedName = function (name) {
	return name.substring(0,1).toUpperCase() + name.substring(1);
};

r3.util.getMaxValue = function (graphdef) {
	return d3.max(graphdef.dataset.map( function (d) {
		return d3.max(d.data.map( function (d) { 
			return d.value;
		})); 
	}));
};

r3.util.getStepMaxValue = function (graphdef) {
	var sumMap = graphdef.dataset[0].data.map( function(d) {return 0;});
	graphdef.dataset.map( function (d) {
		d.data.map( function (d, i) { 
			sumMap[i] += d.value;
		}); 
	});
	return d3.max(sumMap);
};

r3.util.getDataArray = function (dataset) {
	return dataset.map( function (d) { return d.data;});
};