cv.extend = function (f) {
	function g() {}
	g.prototype = f.prototype || f;
	return new g();
};

cv.utility = {};

cv.utility.getPascalCasedName = function (name) {
	return name.substring(0,1).toUpperCase() + name.substring(1);
};

cv.utility.getDataArray = function (data, index) {
	var dataArray = [];

	if(index === undefined) {
		for (var i=0; i<data.length; i++) {
			dataArray.push(data[i].value);
		}
	}

	return dataArray;
}