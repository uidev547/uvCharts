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

cv.utility.getStepMaxValue = function (graphdef) {
	if (graphdef.data) {
		return d3.max(graphdef.data.map( function (d) { 
			return d.value;
		}));
	} else if (graphdef.dataset) {
		var sumMap = graphdef.dataset[0].data.map( function(d) {return 0;});
		graphdef.dataset.map( function (d) {
			d.data.map( function (d, i) { 
				sumMap[i] += d.value;
			}); 
		});
		return d3.max(sumMap);
	} else {
		return 0;
	}
};

cv.utility.getDataArray = function (dataset) {
	return dataArray = dataset.map( function (d) { return d.data;});
};