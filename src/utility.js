cv.extend = function (f) {
	function g() {}
	g.prototype = f.prototype || f;
	return new g();
};

cv.utility = {};

cv.utility.getPascalCasedName = function (name) {
	return name.substring(0,1).toUpperCase() + name.substring(1);
};

cv.utility.getMaxValue = function (graphdef) {
	if (graphdef.data) {
		return d3.max(graphdef.data.map( function (d) { 
			return d.value;
		}));
	} else if (graphdef.dataset) {
		return d3.max(graphdef.dataset.map( function (d) {
			return d3.max(d.data.map( function (d) { 
				return d.value;
			})); 
		}));
	} else {
		return 0;
	}
};

cv.utility.getDataArray = function (data, dataset) {
	var dataArray = [];

	if (data) {
		dataArray.push(data);
	} else {
		dataArray = dataset.map( function (d) { return d.data;});
	}

	return dataArray;
};