uv.types = {};

uv.addChart = function (type, functionName) {
  uv.types[type] = functionName;
};

uv.addChart('Bar','BarGraph');
uv.addChart('Line','LineGraph');
uv.addChart('StackedBar','StackedBarGraph');
uv.addChart('StepUpBar','StepUpBarGraph');
uv.addChart('Area','AreaGraph');
uv.addChart('StackedArea','StackedAreaGraph');
uv.addChart('PercentBar','PercentBarGraph');
uv.addChart('PercentArea','PercentAreaGraph');
uv.addChart('Pie','PieGraph');
uv.addChart('Donut','DonutGraph');
uv.addChart('Waterfall','WaterfallGraph');
uv.addChart('StepUpWaterfall','StepupWaterfallGraph');
uv.addChart('PolarArea','PolarAreaGraph');

uv.chart = function (type, graphdef, config) {
  if (uv.types[type] !== undefined) {
    return new uv[uv.types[type]](graphdef, config);
  }
};
