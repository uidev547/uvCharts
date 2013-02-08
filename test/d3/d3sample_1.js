init = function() {
	barHorTest = new r3.BarGraph(r3.constants.defaultHorGraphdef);
	r3.util.transposeData(r3.constants.defaultHorGraphdef);
	tbarHorTest = new r3.BarGraph(r3.constants.defaultHorGraphdef);
	barVerTest = new r3.BarGraph(r3.constants.defaultVerGraphdef);
	r3.util.transposeData(r3.constants.defaultVerGraphdef);
	tbarVerTest = new r3.BarGraph(r3.constants.defaultVerGraphdef);
	
	r3.util.transposeData(r3.constants.defaultVerGraphdef);
	r3.util.transposeData(r3.constants.defaultHorGraphdef);
	
	stepUpBarHorTest = new r3.StepUpBarGraph(r3.constants.defaultHorGraphdef);
	r3.util.transposeData(r3.constants.defaultHorGraphdef);
	tstepUpBarHorTest = new r3.StepUpBarGraph(r3.constants.defaultHorGraphdef);
	stepUpBarVerTest = new r3.StepUpBarGraph(r3.constants.defaultVerGraphdef);
	r3.util.transposeData(r3.constants.defaultVerGraphdef);
	tstepUpBarVerTest = new r3.StepUpBarGraph(r3.constants.defaultVerGraphdef);
	
	r3.util.transposeData(r3.constants.defaultVerGraphdef);
	r3.util.transposeData(r3.constants.defaultHorGraphdef);
	
	stackedBarHorTest = new r3.StackedBarGraph(r3.constants.defaultHorGraphdef);
	r3.util.transposeData(r3.constants.defaultHorGraphdef);
	tstackedBarHorTest = new r3.StackedBarGraph(r3.constants.defaultHorGraphdef);
	stackedBarVerTest = new r3.StackedBarGraph(r3.constants.defaultVerGraphdef);
	r3.util.transposeData(r3.constants.defaultVerGraphdef);
	tstackedBarVerTest = new r3.StackedBarGraph(r3.constants.defaultVerGraphdef);

	r3.util.transposeData(r3.constants.defaultVerGraphdef);
	r3.util.transposeData(r3.constants.defaultHorGraphdef);
	
	lineHorTest = new r3.LineGraph(r3.constants.defaultHorGraphdef);
	r3.util.transposeData(r3.constants.defaultHorGraphdef);
	tlineHorTest = new r3.LineGraph(r3.constants.defaultHorGraphdef);
	lineVerTest = new r3.LineGraph(r3.constants.defaultVerGraphdef);
	r3.util.transposeData(r3.constants.defaultVerGraphdef);
	tlineVerTest = new r3.LineGraph(r3.constants.defaultVerGraphdef);

	r3.util.transposeData(r3.constants.defaultVerGraphdef);
	r3.util.transposeData(r3.constants.defaultHorGraphdef);
	
	areaHorTest = new r3.AreaGraph(r3.constants.defaultHorGraphdef);
	r3.util.transposeData(r3.constants.defaultHorGraphdef);
	tareaHorTest = new r3.AreaGraph(r3.constants.defaultHorGraphdef);
	areaVerTest = new r3.AreaGraph(r3.constants.defaultVerGraphdef);
	r3.util.transposeData(r3.constants.defaultVerGraphdef);
	tareaVerTest = new r3.AreaGraph(r3.constants.defaultVerGraphdef);

	r3.util.transposeData(r3.constants.defaultVerGraphdef);
	r3.util.transposeData(r3.constants.defaultHorGraphdef);

	stackareaHorTest = new r3.StackedAreaGraph(r3.constants.defaultHorGraphdef);
	stackareaVerTest = new r3.StackedAreaGraph(r3.constants.defaultVerGraphdef);
	
	centareaHorTest = new r3.PercentAreaGraph(r3.constants.defaultHorGraphdef);
	centareaVerTest = new r3.PercentAreaGraph(r3.constants.defaultVerGraphdef);
	
	centbarHorTest = new r3.PercentBarGraph(r3.constants.defaultHorGraphdef);
	centbarVerTest = new r3.PercentBarGraph(r3.constants.defaultVerGraphdef);
	
	donutTest = new r3.DonutGraph(r3.constants.defaultVerGraphdef);
	pieTest = new r3.PieGraph(r3.constants.defaultVerGraphdef);
	
	tableHorTest = new r3.TableGraph(r3.constants.defaultHorGraphdef);
	r3.util.transposeData(r3.constants.defaultHorGraphdef);
	ttableHorTest = new r3.TableGraph(r3.constants.defaultHorGraphdef);
	tableVerTest = new r3.TableGraph(r3.constants.defaultVerGraphdef);
	r3.util.transposeData(r3.constants.defaultVerGraphdef);
	tableVerTest = new r3.TableGraph(r3.constants.defaultVerGraphdef);
	
	r3.util.transposeData(r3.constants.defaultVerGraphdef);
	r3.util.transposeData(r3.constants.defaultHorGraphdef);
};