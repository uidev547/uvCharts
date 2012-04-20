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
	return d3.max(graphdef.categories.map( function (d) {
		return d3.max(graphdef.dataset[d].map( function (d) { 
			return d.value;
		})); 
	}));
};

r3.util.getStepMaxValue = function (graphdef) {
	var sumMap = graphdef.dataset[graphdef.categories[0]].map( function(d) {return 0;});
	graphdef.categories.map( function (d) {
		graphdef.dataset[d].map( function (d, i) { 
			sumMap[i] += d.value;
		}); 
	});

	return d3.max(sumMap);
};

r3.util.getDataArray = function (graphdef) {
	return graphdef.categories.map( function (d) { return graphdef.dataset[d];});
};

r3.util.getTabularArray = function (graphdef) {
	var table = [];
	for(var i=0, len = graphdef.dataset[graphdef.categories[0]].length; i<len; i++) {
		var arr = []; arr.push(graphdef.dataset[graphdef.categories[0]][i].name);
		for(var j=0, catlen = graphdef.categories.length; j<catlen; j++) {
			arr.push(graphdef.dataset[graphdef.categories[j]][i].value);
		}
		table.push(arr);
	}
	return table;
};

r3.util.getLabelArray = function (graphdef) {
	return graphdef.dataset[graphdef.categories[0]].map( function (d) { return d.name;})
};

r3.util.getCategoryData = function (graphdef, categories) {
	return categories.map( function (d) {
		return graphdef.dataset[d].map( function (d) {
			return d.value;
		});
	});
};