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
 * "_" and "-" and replaces it with "-".
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

/**
 * This function returns all class names of the element including new class name.
 * Useful in cases where we need to avoid over-writting of classes.
 * @param  {} self this referring to svgElement
 * @param  {String} name new class name to be added
 * @return {String}      All class names as string.
 */
uv.util.getClassName = function(self, name) {
	var formattedName = uv.util.formatClassName(name);
	if( !d3.select(self).attr('class')) {
		return formattedName;
	}
	if(d3.select(self).attr('class').split(' ').indexOf(formattedName) === -1) {
		return d3.select(self).attr('class');
	}
	return d3.select(self).attr('class') + " " + formattedName;
};

/**
 * Returns specified value of given data object if integer, else returns formatted value considering precision.
 * @param  self 
 * @param  {Number} d    data object
 * @return {Strinig}     value with precision
 */
uv.util.getLabelValue = function(self, d) {
	// if(typeof d.value !== 'number') return null;
	var val = (d.value%1 === 0) ? d.value : d.value.toFixed(self.config.label.precision);
	return String(val);
};

uv.util._deepClone = function(target, src) {
    if(typeof src === 'object') {
        for(var key in src) {
            if(src.hasOwnProperty(key)) {
               if(target === undefined) {
                    target = Array.isArray(src) ? [] : {};
               }
               target[key] = uv.util._deepClone(target[key], src[key]);
            }
        }
    } else {
        target = src;
    }
    return target;
};


/**
 * Extends properies of rest of the arguments to the first argument.
 * @param  {Object} target
 * @param  {Object} argument1
 * @param  {Object} argumentN
 * @return target object 
 */
uv.util.extend = function() {
	if(arguments[0] === undefined || arguments[0] === null) {
		return arguments[0];
	}
    for(var i=1; i<arguments.length; i++) {
        for(var key in arguments[i]) {
            if(arguments[i].hasOwnProperty(key)) {
                arguments[0][key] = uv.util._deepClone(arguments[0][key], arguments[i][key]);
            }
        }
    }
    return arguments[0];
};
