init = function() {
	var horConfig = $.extend(true, {}, r3.config);
	var verConfig = $.extend(true, {}, r3.config);
	var graphdef = $.extend(true, {}, r3.constants.graphdef);
	var tgraphdef = $.extend(true, {}, r3.constants.graphdef);
	
	verConfig.graph.orientation = 'Vertical';
	r3.util.transposeData(tgraphdef);

	barHorTest = r3.buildGraph('Bar', graphdef, horConfig);
	tbarHorTest = r3.buildGraph('Bar', tgraphdef, horConfig);
	barVerTest = r3.buildGraph('Bar', graphdef, verConfig);
	tbarVerTest = r3.buildGraph('Bar', tgraphdef, verConfig);
	
	stepUpBarHorTest = r3.buildGraph('StepUpBar', graphdef, horConfig);
	tstepUpBarHorTest = r3.buildGraph('StepUpBar', tgraphdef, horConfig);
	stepUpBarVerTest = r3.buildGraph('StepUpBar', graphdef, verConfig);
	tstepUpBarVerTest = r3.buildGraph('StepUpBar', tgraphdef, verConfig);
	
	stackedBarHorTest = r3.buildGraph('StackedBar', graphdef, horConfig);
	tstackedBarHorTest = r3.buildGraph('StackedBar', tgraphdef, horConfig);
	stackedBarVerTest = r3.buildGraph('StackedBar', graphdef, verConfig);
	tstackedBarVerTest = r3.buildGraph('StackedBar', tgraphdef, verConfig);

	lineHorTest = r3.buildGraph('Line', graphdef, horConfig);
	tlineHorTest = r3.buildGraph('Line', tgraphdef, horConfig);
	lineVerTest = r3.buildGraph('Line', graphdef, verConfig);
	tlineVerTest = r3.buildGraph('Line', tgraphdef, verConfig);

	areaHorTest = r3.buildGraph('Area', graphdef, horConfig);
	tareaHorTest = r3.buildGraph('Area', tgraphdef, horConfig);
	areaVerTest = r3.buildGraph('Area', graphdef, verConfig);
	tareaVerTest = r3.buildGraph('Area', tgraphdef, verConfig);

	stackareaHorTest = r3.buildGraph('StackedArea', graphdef, horConfig);
	stackareaVerTest = r3.buildGraph('StackedArea', graphdef, verConfig);
	
	centareaHorTest = r3.buildGraph('PercentArea', graphdef, horConfig);
	centareaVerTest = r3.buildGraph('PercentArea', graphdef, verConfig);
	
	centbarHorTest = r3.buildGraph('PercentBar', graphdef, verConfig);
	centbarVerTest = r3.buildGraph('PercentBar', graphdef, verConfig);
	
	donutTest = r3.buildGraph('Donut', graphdef, horConfig);
	pieTest = r3.buildGraph('Pie', graphdef, horConfig);
	
	tableHorTest = new r3.TableGraph(graphdef, horConfig);
	ttableHorTest = new r3.TableGraph(tgraphdef, horConfig);
	tableVerTest = new r3.TableGraph(graphdef, verConfig);
	tableVerTest = new r3.TableGraph(tgraphdef, verConfig);
};