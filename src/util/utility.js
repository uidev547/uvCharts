uv.util = {};

/**
 * Utility method to extend prototype for JavaScript classes, to act like inheritance
 * @param  {Class} f Original class which is being extended
 * @return {Prototype}   Prototype containing the functions from the super class
 */
uv.util.inherits = function (f) {
	function G() {}
	G.prototype = f.prototype || f;
	return new G();
};

/**
 * Utility method to return a unique identification id
 * @return {number} Timestamp in ms is returned as a unique id
 */
uv.util.getUniqueId = function () {
	return new Date().getTime();
};

/**
 * 
 */
uv.util.getMaxValue = function (graphdef) {
	return d3.max(graphdef.categories.map(function (d) {
		return d3.max(graphdef.dataset[d].map(function (d) {
			return d.value;
		}));
	}));
};

uv.util.getStepMaxValue = function (graphdef) {
	var sumMap = graphdef.dataset[graphdef.categories[0]].map(function () {return 0; });
	graphdef.categories.map(function (d) {
		graphdef.dataset[d].map(function (d, i) {
			sumMap[i] += d.value;
		});
	});

	return d3.max(sumMap);
};

uv.util.getWaterfallMaxValue = function(graphdef) {
	var sumMap = graphdef.categories.map(function() {return 0;});
	graphdef.categories.map(function (d, i) {
		var localMax = 0;
		graphdef.dataset[d].map(function(d) {
			localMax += d.value;
			if(sumMap[i] < localMax) {
				sumMap[i] = localMax;
			}
		});
	});

	return d3.max(sumMap);
};

uv.util.getSumUpArray = function (graphdef) {
	var sumMap = graphdef.dataset[graphdef.categories[0]].map(function () {return 0; });
	graphdef.categories.map(function (d) {
		graphdef.dataset[d].map(function (d, i) {
			sumMap[i] += d.value;
		});
	});

	return sumMap;
};

uv.util.getPercentage = function (value, total) {
	return value * 100 / total;
};

uv.util.getDataArray = function (graphdef) {
	return graphdef.categories.map(function (d) { return graphdef.dataset[d]; });
};

uv.util.getTabularArray = function (graphdef) {
	var table = [], i, j, catlen, len, arr = [];
	for (i = 0, len = graphdef.dataset[graphdef.categories[0]].length; i < len; i = i + 1) {
		arr = [];
		arr.push(graphdef.dataset[graphdef.categories[0]][i].name);
		for (j = 0, catlen = graphdef.categories.length; j < catlen; j = j + 1) {
			arr.push(graphdef.dataset[graphdef.categories[j]][i].value);
		}
		table.push(arr);
	}
	return table;
};

uv.util.getLabelArray = function (graphdef) {
	return graphdef.dataset[graphdef.categories[0]].map(function (d) { return d.name; });
};

uv.util.getCategoryArray = function (graphdef) {
	return graphdef.categories.map(function (d) { return d; });
};

uv.util.getCategoryData = function (graphdef, categories) {
	return categories.map(function (d) {
		return graphdef.dataset[d].map(function (d) {
			return d.value;
		});
	});
};

uv.util.transposeData = function (graphdef) {
	var dataset = {}, i, j, length, jlength,
		name, label, value, categories = graphdef.dataset[graphdef.categories[0]].map(function (d) { return d.name; });

	for (i = 0, length = categories.length; i < length; i = i + 1) { dataset[categories[i]] = []; }

	for (i = 0, length = graphdef.categories.length; i < length; i = i + 1) {
		name = graphdef.categories[i];
		for (j = 0, jlength = graphdef.dataset[name].length; j < jlength; j = j + 1) {
			label = graphdef.dataset[name][j].name;
			value = graphdef.dataset[name][j].value;
			dataset[label].push({ 'name' : name, 'value' : value });
		}
	}

	graphdef.categories = categories;
	graphdef.dataset = dataset;
};

uv.util.getPascalCasedName = function (name) {
	return name.substring(0, 1).toUpperCase() + name.substring(1);
};

uv.util.getColorBand = function (config, index) {
	var len = uv.palette[config.graph.palette].length;
	return uv.palette[config.graph.palette][index % len];
};

/**
 * This function finds regular expressions other than Alphabets, Numbers,
 * "_" and "-" and replaces it with "_".
 * @param  {string} name The string which needs to be formatted
 * @return {string}      Returns the formatted String 
 */
uv.util.formatClassName = function(name){
	var returnName = name.trim().replace(/[^A-Za-z0-9_\-]/g,"-").toLowerCase();
	return returnName;
};

uv.util.svgToPng = function(graph, callback){
	var svgContent = d3.select(graph.frame.node().parentNode).html(),
			canvas = document.createElement('canvas'),
			ctx = canvas.getContext("2d"),
			width = graph.width() + graph.left() + graph.right(),
			height = graph.width() + graph.top() + graph.bottom();

	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);
	ctx.drawSvg(svgContent);
	canvas.toBlob(function(blob) {
		saveAs(blob, "png_download"+Math.ceil(Math.random()*100000)+".png");
	}, "image/png");
	callback.call();
};

uv.util.isCanvasSupported = function (){
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
};
/**
 * This function waits till the end of the transition and then call the callback
 * function which is passed as an argument
 * @param  {transition}   transition It's the current transition
 * @param  {Function} callback   function which is called at the end of
 *                               transition
 */
uv.util.endAll = function (transition, callback){
	var n = 0;
	transition.each(function() { ++n; }).each("end", function() {
    if (!--n) {
      callback.apply(this, arguments);
    }
  });
};

uv.util.cloneArray = function (array, isDeepClone) {
	var clone = [], length = array.length;
	for (var i = 0; i < length; i++) {
		var value = array[i], clonedValue;

		if (isDeepClone) {
			if (Array.isArray(value)) {
				clonedValue = uv.util.cloneArray(value, isDeepClone);
			} else if (typeof value === 'object') {
				clonedValue = uv.util.cloneObject(value, isDeepClone);
			} else {
				clonedValue = value;
			}
		} else {
			clonedValue = value;
		}

		clone[i] = clonedValue;
	}

	return clone;
};

uv.util.cloneObject = function (object, isDeepClone) {
	var clone = {}, key;
	for (key in object) {
		var value = object[key], clonedValue;

		if (isDeepClone) {
			if (Array.isArray(value)) {
				clonedValue = uv.util.cloneArray(value, isDeepClone);
			} else if (typeof value === 'object') {
				clonedValue = uv.util.cloneObject(value, isDeepClone);
			} else {
				clonedValue = value;
			}
		} else {
			clonedValue = value;
		}

		clone[key] = clonedValue;
	}

	return clone;
};

uv.util.extend = function (defaults, subj, isDeepClone) {
	var obj = uv.util.cloneObject(defaults, isDeepClone),
			key;

	for (key in subj) {
		var value = subj[key], extValue;

		if (isDeepClone) {}
	}

};