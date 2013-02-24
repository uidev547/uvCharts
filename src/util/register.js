r3.types = {};

r3.registerGraph = function (type, functionName) {
  r3.types[type] = functionName;
};

r3.registerGraph('Bar','BarGraph');
r3.registerGraph('Line','LineGraph');
r3.registerGraph('StackedBar','StackedBarGraph');
r3.registerGraph('StepUpBar','StepUpBarGraph');
r3.registerGraph('Area','AreaGraph');
r3.registerGraph('StackedArea','StackedAreaGraph');
r3.registerGraph('PercentBar','PercentBarGraph');
r3.registerGraph('PercentArea','PercentAreaGraph');
r3.registerGraph('Pie','PieGraph');
r3.registerGraph('Donut','DonutGraph');

r3.buildGraph = function (type, graphdef, config) {
  if (r3.types[type] !== undefined) {
    return new r3[r3.types[type]](graphdef, config);
  }
};