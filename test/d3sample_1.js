init = function() {
	barHorTest = new cv.bargraph(cv.constants.defaultHorGraphdef);
	barVerTest = new cv.bargraph(cv.constants.defaultVerGraphdef);
	stepUpBarHorTest = new cv.stepup_bargraph(cv.constants.defaultHorGraphdef);
	stepUpBarVerTest = new cv.stepup_bargraph(cv.constants.defaultVerGraphdef);
	stackedBarHorTest = new cv.stacked_bargraph(cv.constants.defaultHorGraphdef);
	stackedBarVerTest = new cv.stacked_bargraph(cv.constants.defaultVerGraphdef);	
	lineHorTest = new cv.linegraph(cv.constants.defaultHorGraphdef);
	lineVerTest = new cv.linegraph(cv.constants.defaultVerGraphdef);
	areaHorTest = new cv.areagraph(cv.constants.defaultHorGraphdef);
	areaVerTest = new cv.areagraph(cv.constants.defaultVerGraphdef);
	donutTest = new cv.donutgraph(cv.constants.defaultVerGraphdef);
	pieTest = new cv.piegraph(cv.constants.defaultVerGraphdef);
	tableHorTest = new cv.tablegraph(cv.constants.defaultHorGraphdef);
	tableVerTest = new cv.tablegraph(cv.constants.defaultVerGraphdef);
};