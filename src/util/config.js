uv.config = {
	graph : {
		palette : 'Brink',
		background : '#FFFFFF',
		orientation : 'Horizontal',
		max : 0,
		custompalette : [],
		opacity : 1
	},

	meta : {
		position : '#uv-div',
		caption : '',
		subcaption : '',
		hlabel : '',
		vlabel : '',
		hsublabel : '',
		vsublabel : '',
		isDownloadable : false
	},

	dimension : {
		width : 400,
		height : 400
	},

	margin : {
		top : 50,
		bottom : 150,
		left : 100,
		right : 100
	},

	frame : {
		bgcolor : '#FFFFFF'
	},

	axis : {
		ticks : 8,
		subticks : 2,
		padding : 5,
		minor : -10,
		strokecolor : '#000000',
		fontfamily : 'Arial',
		fontsize : '14',
		fontweight : 'bold',
		showticks : true,
		showsubticks : true,
		showtext : true
	},

	label : {
		fontfamily : 'Arial',
		fontsize : '11',
		fontweight : 'normal',
		strokecolor : '#000000',
		showlabel : true,
		precision : 2,
		prefix : '',
		suffix : ''
	},

	scale : {
		type : 'linear',
		ordinality : 0.2
	},

	bar : {
		strokecolor : 'none',
		fontfamily : 'Arial',
		fontsize : '10',
		fontweight : 'bold',
		textcolor : '#000'
	},

	line : {
		interpolation : 'linear'
	},

	area : {
		interpolation : 'cardinal',
		offset : 'zero',
		opacity : 0.2
	},

	pie : {
		fontfamily : 'Arial',
		fontsize : '14',
		fontweight : 'normal',
		fontvariant : 'small-caps',
		fontfill : '#FFFFFF',
		strokecolor : 'none',
		strokewidth : 2
	},
	
	donut : {
		fontfamily : 'Arial',
		fontsize : '14',
		fontweight : 'normal',
		fontvariant : 'small-caps',
		fontfill : '#FFFFF',
		factor : 0.4,
		strokecolor : 'none',
		strokewidth : 2
	},
	
	caption : {
		fontfamily : 'Arial',
		fontsize : '14',
		fontweight : 'bold',
		fontvariant : 'small-caps',
		textdecoration : 'none',
		hovercolor : '#696969',
		strokecolor : '#0000FF',
		textanchor : 'middle',
		cursor : 'pointer'
	},

	subCaption : {
		fontfamily : 'Arial',
		fontsize : '9',
		fontweight : 'normal',
		fontvariant : 'normal',
		textdecoration : 'none',
		textanchor : 'middle'
	},

	legend : {
		position : 'bottom',
		fontfamily : 'Arial',
		fontsize : '11',
		fontweight : 'normal',
		textmargin : 15,
		symbolsize : 10,
		inactivecolor : '#DDD',
		legendstart : 0,
		legendtype : 'categories'
	},

	effects : {
		hovercolor : '#FF0000',
		strokecolor : 'none',
		textcolor : '#000000',
		duration : 800,
		hover : 400,
		showhovertext : false
	}
};