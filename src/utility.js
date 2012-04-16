cv.extend = function (f) {
	function g() {}
	g.prototype = f.prototype || f;
	return new g();
};

cv.utility = {};

cv.utility.getPascalCasedName = function (name) {
	return name.substring(0,1).toUpperCase() + name.substring(1);
};

cv.utility.max = function (graphdef) {
	if (graphdef.data) {
		return d3.max(graphdef.data);
	} else {
		//TODO
		var maxVals = [];
		return 0;
	}
}