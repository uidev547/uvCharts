init = function() {
	barHorTest = new r3.bargraph(r3.constants.defaultHorGraphdef);
	r3.util.transposeData(r3.constants.defaultHorGraphdef);
	tbarHorTest = new r3.bargraph(r3.constants.defaultHorGraphdef);
	barVerTest = new r3.bargraph(r3.constants.defaultVerGraphdef);
	r3.util.transposeData(r3.constants.defaultVerGraphdef);
	tbarVerTest = new r3.bargraph(r3.constants.defaultVerGraphdef);
	
	r3.util.transposeData(r3.constants.defaultVerGraphdef);	
	r3.util.transposeData(r3.constants.defaultHorGraphdef);
	
	stepUpBarHorTest = new r3.stepup_bargraph(r3.constants.defaultHorGraphdef);
	stepUpBarVerTest = new r3.stepup_bargraph(r3.constants.defaultVerGraphdef);
	stackedBarHorTest = new r3.stacked_bargraph(r3.constants.defaultHorGraphdef);
	stackedBarVerTest = new r3.stacked_bargraph(r3.constants.defaultVerGraphdef);	
	lineHorTest = new r3.linegraph(r3.constants.defaultHorGraphdef);
	lineVerTest = new r3.linegraph(r3.constants.defaultVerGraphdef);
	areaHorTest = new r3.areagraph(r3.constants.defaultHorGraphdef);
	areaVerTest = new r3.areagraph(r3.constants.defaultVerGraphdef);
	stackareaHorTest = new r3.stacked_areagraph(r3.constants.defaultHorGraphdef);
	stackareaVerTest = new r3.stacked_areagraph(r3.constants.defaultVerGraphdef);
	donutTest = new r3.donutgraph(r3.constants.defaultVerGraphdef);
	pieTest = new r3.piegraph(r3.constants.defaultVerGraphdef);
	tableHorTest = new r3.tablegraph(r3.constants.defaultHorGraphdef);
	tableVerTest = new r3.tablegraph(r3.constants.defaultVerGraphdef);
};