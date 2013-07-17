init = function() {
	var horConfig = $.extend(true, {}, uv.config);
	var verConfig = $.extend(true, {}, uv.config);
	var graphdef = $.extend(true, {}, uv.constants.graphdef);
	var tgraphdef = $.extend(true, {}, uv.constants.graphdef);
    var waterfallGraphdef = $.extend(true, {}, uv.constants.waterfallGraphdef);
	
	verConfig.graph.orientation = 'Vertical';
	uv.util.transposeData(tgraphdef);

    barHorTest = uv.chart('Bar', graphdef, horConfig);
    tbarHorTest = uv.chart('Bar', tgraphdef, horConfig);
    barVerTest = uv.chart('Bar', graphdef, verConfig);
    tbarVerTest = uv.chart('Bar', tgraphdef, horConfig);

	stepUpBarHorTest = uv.chart('StepUpBar', graphdef, horConfig);
	tstepUpBarHorTest = uv.chart('StepUpBar', tgraphdef, horConfig);
	stepUpBarVerTest = uv.chart('StepUpBar', graphdef, verConfig);
	tstepUpBarVerTest = uv.chart('StepUpBar', tgraphdef, verConfig);
	
	stackedBarHorTest = uv.chart('StackedBar', graphdef, horConfig);
	tstackedBarHorTest = uv.chart('StackedBar', tgraphdef, horConfig);
	stackedBarVerTest = uv.chart('StackedBar', graphdef, verConfig);
	tstackedBarVerTest = uv.chart('StackedBar', tgraphdef, verConfig);

	lineHorTest = uv.chart('Line', graphdef, horConfig);
	tlineHorTest = uv.chart('Line', tgraphdef, horConfig);
	lineVerTest = uv.chart('Line', graphdef, verConfig);
	tlineVerTest = uv.chart('Line', tgraphdef, verConfig);

	areaHorTest = uv.chart('Area', graphdef, horConfig);
	tareaHorTest = uv.chart('Area', tgraphdef, horConfig);
	areaVerTest = uv.chart('Area', graphdef, verConfig);
	tareaVerTest = uv.chart('Area', tgraphdef, verConfig);

	stackareaHorTest = uv.chart('StackedArea', graphdef, horConfig);
	stackareaVerTest = uv.chart('StackedArea', graphdef, verConfig);
	
	centareaHorTest = uv.chart('PercentArea', graphdef, horConfig);
	centareaVerTest = uv.chart('PercentArea', graphdef, verConfig);
	
	centbarHorTest = uv.chart('PercentBar', graphdef, verConfig);
	centbarVerTest = uv.chart('PercentBar', graphdef, verConfig);
	
	donutTest = uv.chart('Donut', graphdef, horConfig);
	pieTest = uv.chart('Pie', graphdef, horConfig);
	polarAreaTest = uv.chart('PolarArea', graphdef, horConfig);

  waterfallTest = uv.chart('Waterfall', waterfallGraphdef, verConfig);
  waterfallTest = uv.chart('Waterfall', waterfallGraphdef, horConfig);
  //waterfallTest = uv.chart('Waterfall', graphdef, verConfig);
  //waterfallTest = uv.chart('Waterfall', tgraphdef, horConfig);
	
/*	tableHorTest = new uv.TableGraph(graphdef, horConfig);
	ttableHorTest = new uv.TableGraph(tgraphdef, horConfig);
	tableVerTest = new uv.TableGraph(graphdef, verConfig);
	tableVerTest = new uv.TableGraph(tgraphdef, verConfig);*/
	
};