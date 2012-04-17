
cv.bargraph.prototype = cv.extend(cv.graph);

cv.bar = function (graphdef, data, topparent, parent, color, seriesname, seriesnumber) {
	this.bar = parent.append('g').data(cv.utility.getDataArray(data));
	this.topparent = topparent; 
	this.parent = parent;
	this.length = data.length;
}

cv.bargraph = function (graphdef) {
	var bargroups = [], 
		bargroup;

	var bars, i, panel;

	this.init(graphdef);
	var maxvalue = ac.utility.getMaxValue(graphdef);
	var dataset = graphdef.dataset;

	var GraphTypeMap = { 
		v : { getBarWidth : 'getWidth', constructor : 'VBar', position : 'left'},
		h : { getBarWidth : 'getHeight',constructor : 'HBar', position : 'bottom'}
	};

	var createMultiSeriesBar = function (type) {
		var dataSetSize = graphdef.dataset.length;
		var showCategory = false;
		var noOfRecords;
		var barWidthFuncName = GraphTypeMap[type].getBarWidth;
		var constructorFuncName = GraphTypeMap[type].constructor;
		var position = GraphTypeMap[type].position;
	};


	var createBars = {
		'v': function () {
			if (dataset) {
				createMultiSeriesBar('v');
			} else {
				bar.push(new AR.VBar(graphdef, graphdef.data, this.frame, this.panel, maxvalue));
			}
		}

		'h' : function () {
			if (dataset) {
				createMultiSeriesBar('h');
			} else {
				bar.push(new AR.HBar(graphdef, graphdef.data, this.frame, this.panel, maxvalue));
			}
		}
	};

	createBars(graphdef.type || 'v');

	this.setWidth = function (width) {
		ac.graph.prototype.setWidth.call(this, width);
		bar.adjustposition(this.dimension);
		setRules();
	};

	this.setHeight = function (height) {
		ac.graph.prototype.setHeight.call(this, height);
		bar.adjustposition(this.dimension);
		setRules();
	};

	this.setPalette = function (paletteCode) {
		bar.setPalette(paletteCode);
	}
};