var uvcs = {
	color : 'Color String/Color Hex Code',
	ccode : 'any Color Code or Color String or "none"',
	fcode : 'any font',
	scode : "'linear'|'log'|'pow'|'sqrt'"
};

var details = {
	graph : {
		id : 'config-graph',
		desc : 'All general properties related to the chart are put up in this group.',
		properties : [
			{ name : 'palette', type : "String", default : "'Brink'", range: '', desc : 'This defines the color palette/set of colors used to color the graph. There are a set of palettes to choose from within uvCharts. You can override it with your own palette using <strong>custompalette</strong>'},
			{ name : 'bgcolor', type : uvcs.color, default : '#ffffff', range: uvcs.ccode, desc : 'The background color used for the entire chart include the margin spaces.'},
			{ name : 'orientation', type: 'String', default: 'Horizontal', range: "'Horizontal'/'Vertical'", desc : 'Orientation of the chart for a different layout based on requirements.'},
			{ name : 'custompalette', type: 'Array of Colors', default: '[]', range: "None", desc: 'Override the palette with your own color palette by providing a non empty array of color codes. They are used in order for corresponding category in the categories array of the graph definition.'},
			{ name : 'opacity', type: 'Decimal', default: 1, range: '0-1', desc: 'Opacity of the entire chart to make it blend into any background of your choice.'}
		]
	},

	meta : {
		id : 'config-meta',
		desc : 'All metadata type of the properties are aggregated into this group.',
		properties : [
			{ name : 'position', type : "CSS Selector String", default : "'#uv-div'", range: 'Any CSS Selector', desc : 'CSS Selector corresponding to the DOM element in which the entire chart is appended at the end. If multiple such elements exist the chart is appended only on the first selected element.'},
			{ name : 'caption', type : 'String', default : '""', range: 'Any String', desc : 'Caption for the graph'},
			{ name : 'subcaption', type: 'String', default: '""', range: 'Any String', desc : 'Subcaption for the graph'},
			{ name : 'hlabel', type: 'String', default: '""', range: "Any String", desc: 'Label for the horizontal axis'},
			{ name : 'vlabel', type: 'String', default: '""', range: 'Any String', desc: 'Label for the vertical axis'},
			{ name : 'hsublabel', type: 'String', default: '""', range: "Any String", desc: 'Sub-label for the horizontal axis'},
			{ name : 'vsublabel', type: 'String', default: '""', range: 'Any String', desc: 'Sub-label for the vertical axis'},
			{ name : 'isDownloadable', type: 'Boolean', default: 'false', range: 'true/false', desc: 'Whether or not to display the download link for the chart'},
			{ name : 'downloadLabel', type: 'String', default: 'Download', range: 'Any String', desc: 'Text to be displayed in the download link'}
		]
	},

	dimension : {
		id : 'config-dimension',
		desc : 'All properties related to the chart dimensions go in here',
		properties : [
			{ name : 'width', type : "Size", default : "400", range: 'Any CSS Size', desc : 'Width of the chart'},
			{ name : 'height', type : 'Size', default : '400', range: 'Any CSS Size', desc : 'Height of the chart'}
		]
	},

	margin : {
		id : 'config-margin',
		desc : 'All properties related to the chart margins go in here',
		properties : [
			{ name : 'top', type : "Size", default : "50", range: 'Any CSS Size', desc : 'Top margin of the chart'},
			{ name : 'bottom', type : 'Size', default : '150', range: 'Any CSS Size', desc : 'Bottom margin of the chart'},
			{ name : 'left', type : "Size", default : "100", range: 'Any CSS Size', desc : 'Left margin of the chart'},
			{ name : 'right', type : 'Size', default : '100', range: 'Any CSS Size', desc : 'Right margin of the chart'}
		]
	},

	frame : {
		id : 'config-frame',
		desc : 'All properties related to the chart frame go in here',
		properties : [
			{ name : 'bgcolor', type : uvcs.color, default : "#ffffff", range: uvcs.ccode, desc : 'Background color of the frame which contains the chart'}
		]
	},

	axis : {
		id : 'config-axis',
		desc : 'All properties related to the axes go in here',
		properties : [
			{ name : 'opacity', type: 'Decimal', default: '0.1', range: '0-1', desc: 'Opacity of the axis lines drawn for reference'},
			{ name : 'ticks', type : "Number", default : "8", range: '0 or above', desc : 'No.of major ticks on the measure axis'},
			{ name : 'subticks', type : 'Number', default : '2', range: '0 or above', desc : 'No.of minor ticks on the measure axis'},
			{ name : 'padding', type : "Size", default : "5", range: 'Any CSS Size', desc : 'Padding from the axis to the label'},
			{ name : 'minor', type : 'Size', default : '-10', range: '0 or less', desc : 'Length of the minor ticks towards the label'},
			{ name : 'strokecolor', type : uvcs.color, default : "#000000", range: uvcs.ccode, desc : 'Color of axis lines'},
			{ name : 'fontfamily', type : 'String', default : '"Arial"', range: uvcs.fcode, desc : 'Font used to display numbers on the axis'},
			{ name : 'fontsize', type : "Size", default : "11", range: '0 or above', desc : 'Font size of the font used on the axis'},
			{ name : 'fontweight', type : 'String', default : 'bold', range: 'normal|weight', desc : 'Font weight'},
			{ name : 'showticks', type : 'Boolean', default : 'true', range: 'true/false', desc : 'Show ticks flag'},
			{ name : 'showsubticks', type : "Boolean", default : "true", range: 'true/false', desc : 'Show subticks flag'},
			{ name : 'showtext', type : 'Boolean', default : 'true', range: 'true/false', desc : 'Show text flag'}
		]
	},

	label : {
		id : 'config-label',
		desc : 'All properties related to labels on the axis',
		properties : [
			{ name : 'fontfamily', type : 'String', default : '"Arial"', range: uvcs.fcode, desc : 'Font used to display labels on the axis'},
			{ name : 'fontsize', type : "Size", default : "11", range: '0 or above', desc : 'Font size of the font used on the labels'},
			{ name : 'fontweight', type : 'String', default : 'normal', range: 'normal|bold', desc : 'Font weight'},
			{ name : 'strokecolor', type : uvcs.color, default : "#000000", range: uvcs.ccode, desc : 'Color of axis lines'},
			{ name : 'showlabel', type : 'Boolean', default : 'true', range: 'true/false', desc : 'Show Labels flag'},
			{ name : 'precision', type : 'Number', default : '2', range: '0 or above', desc : 'Precision on the labels in case of decimal values'},
			{ name : 'prefix', type : "String", default : "''", range: 'Any String', desc : 'Any prefix which needs to be added to the label'},
			{ name : 'suffix', type : 'String', default : "''", range: 'Any String', desc : 'Any suffix which needs to be added to the label'}
		]
	},

	scale : {
		id : 'config-scale',
		desc : 'All properties related to scale used on the values',
		properties : [
			{ name : 'type', type : 'String', default : '"linear"', range: uvcs.scode, desc : 'Scale used to represent values on the chart'},
			{ name : 'ordinality', type : "Decimal", default : "0.2", range: '0-1', desc : 'Defines the gap between 2 consecutive labels'}
		]
	},

	tooltip : {
		id : 'config-tooltip',
		desc : 'All properties related to tooltip shown on hovering over an data element',
		properties : [
			{ name : 'show', type : 'Boolean', default : 'true', range: 'true/false', desc : 'Flag to enable or disable tooltip functionality'},
			{ name : 'format', type : "String", default : "%c [%l] : %v", range: 'String with %c, %l, %v', desc : 'Defines custom format for tooltip'}
		]
	},

	caption : {
		id : 'config-caption',
		desc : 'All properties related to the caption of the chart',
		properties : [	
			{ name : 'fontfamily', type : 'String', default : '"Arial"', range: uvcs.fcode, desc : 'Font used to display the caption'},
			{ name : 'fontsize', type : "Size", default : "11", range: '0 or above', desc : 'Font size of the font used on the caption'},
			{ name : 'fontweight', type : 'String', default : 'normal', range: 'normal|bold', desc : 'Font weight'},
			{ name : 'textdecoration', type: 'String', default : 'none', range: 'Any browser supported text decoration', desc: 'Text decoration applied on the caption'},
			{ name : 'strokecolor', type : uvcs.color, default : "#000000", range: uvcs.ccode, desc : 'Color of caption text'},
			{ name : 'cursor', type : 'String', default : 'pointer', range: 'Any browser supported cursor value', desc : 'Precision on the labels in case of decimal values'}
		]
	},

	subCaption : {
		id : 'config-subCaption',
		desc : 'All properties related to the sub-caption of the chart',
		properties : [
			{ name : 'fontfamily', type : 'String', default : '"Arial"', range: uvcs.fcode, desc : 'Font used to display the sub-caption'},
			{ name : 'fontsize', type : "Size", default : "11", range: '0 or above', desc : 'Font size of the font used on the sub-caption'},
			{ name : 'fontweight', type : 'String', default : 'normal', range: 'normal|bold', desc : 'Font weight'},
			{ name : 'textdecoration', type: 'String', default : 'none', range: 'Any browser supported text decoration', desc: 'Text decoration applied on the sub-caption'},
			{ name : 'strokecolor', type : uvcs.color, default : "#000000", range: uvcs.ccode, desc : 'Color of sub-caption text'},
			{ name : 'cursor', type : 'String', default : 'pointer', range: 'Any browser supported cursor value', desc : 'Precision on the labels in case of decimal values'}
		]
	},

	legend : {
		id : 'config-legend',
		desc : 'All properties related to the legend of the chart',
		properties : [

		]
	},

	effects : {
		id : 'config-effects',
		desc : 'All properties related to the various effects shown in the transitions',
		properties : [

		]
	},

	bar : {
		id : 'config-bar',
		desc : 'All properties affecting Bar, Stacked Bar and Step Up Bar Chart go here.',
		properties : [
			{ name : 'strokecolor', type : uvcs.color, default : '"none"', range: uvcs.ccode, desc : 'Stroke color used on the bars'},
			{ name : 'fontsize', type : "Size", default : "10", range: '0 or above', desc : 'Font size of the font used for the numbers'},
			{ name : 'fontweight', type : 'String', default : 'bold', range: 'normal|bold', desc : 'Font weight'},
			{ name : 'fontfamily', type : 'String', default : '"Arial"', range: uvcs.fcode, desc : 'Font used to display numbers on the bar'},
			{ name : 'textcolor', type : uvcs.color, default : '#000', range: uvcs.ccode, desc : 'Text color used for the numbers'}
		]
	},

	line : {
		id : 'config-line',
		desc : 'All properties specific to line chart are aggregated in this group',
		properties : [
			{ name : 'interpolation', type : 'String', default : '"linear"', range: '"linear"|"basis"|"cardinal"|"monotone"', desc : 'Read more <a target="_blank" href="https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-line_interpolate">here</a>'},
		]
	},

	area : {
		id : 'config-area',
		desc : 'All properties specifically affecting Area, Stacked Area and Percent Area go in this group.',
		properties : [
			{ name : 'interpolation', type : 'String', default : '"linear"', range: '"linear"|"basis"|"cardinal"|"monotone"', desc : 'Read more <a target="_blank" href="https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-line_interpolate">here</a>'},
			{ name : 'opacity', type : "Decimal", default : "0.2", range: '0-1', desc : 'Opacity in the case of simple Area chart'},
			{ name : 'offset', type : 'String', default : "'zero'", range: '"zero"|"wiggle"|"silhoutte"|"expand"', desc : 'Read more <a href="https://github.com/mbostock/d3/wiki/Stack-Layout#wiki-offset">here</a>'},
		]
	},

	pie : {
		id : 'config-pie',
		desc : 'All properties specific to Pie Chart go in this group',
		properties : [
			{ name : 'fontfamily', type : 'String', default : '"Arial"', range: uvcs.fcode, desc : 'Font used to display measure on the chart'},
			{ name : 'fontsize', type : "Size", default : "14", range: '0 or above', desc : 'Font size of the font used to display measure'},
			{ name : 'fontweight', type : 'String', default : 'normal', range: 'normal|bold', desc : 'Font weight'},
			{ name : 'fontvariant', type : 'String', default : 'small-caps', range: 'normal|small-caps', desc : 'Font variant used on the text'},
			{ name : 'fontfill', type : uvcs.color, default : "#000000", range: uvcs.ccode, desc : 'Text color on the measure'},
			{ name : 'strokecolor', type : uvcs.color, default : "#ffffff", range: uvcs.ccode, desc : 'Stroke color of each arc in the pie chart'},
			{ name : 'strokewidth', type : 'Number', default : '1', range: '0 or above', desc : 'Stroke width on each arc'}
		]
	},

	donut : {
		id : 'config-donut',
		desc : 'All properties specific to Donut Chart go in this group',
		properties : [
			{ name : 'fontfamily', type : 'String', default : '"Arial"', range: uvcs.fcode, desc : 'Font used to display measure on the chart'},
			{ name : 'fontsize', type : "Size", default : "14", range: '0 or above', desc : 'Font size of the font used to display measure'},
			{ name : 'fontweight', type : 'String', default : 'normal', range: 'normal|bold', desc : 'Font weight'},
			{ name : 'fontvariant', type : 'String', default : 'small-caps', range: 'normal|small-caps', desc : 'Font variant used on the text'},
			{ name : 'fontfill', type : uvcs.color, default : "#000000", range: uvcs.ccode, desc : 'Text color on the measure'},
			{ name : 'strokecolor', type : uvcs.color, default : "#ffffff", range: uvcs.ccode, desc : 'Stroke color of each arc in the donut chart'},
			{ name : 'strokewidth', type : 'Number', default : '1', range: '0 or above', desc : 'Stroke width on each arc'},
			{ name : 'factor', type : "Decimal", default : "0.4", range: '0-1', desc : 'Radius of the cropped part in terms of the bigger pie.'}
		]
	}
};