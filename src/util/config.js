r3.config = {
	graph : {
		palette : 'Brink',
		background : 'white',
		orientation : 'Horizontal',
		max : 0
	},

	meta : {
		position : '.r3_div',
		caption : 'Usage of browsers by the years',
		subCaption : 'Among major vendors'
	},

	dimension : {
		width : 400,
		height : 400
	},

	margin : {
		top : 50,
		bottom : 90,
		left : 100,
		right : 100
	},

	frame : {
		bgcolor : '#fff'
	},

	axis : {
		ticks : 8,
		subticks : 2,
		padding : 5,
		minor : -10,
		strokecolor : '#000',
		fontfamily : 'Arial',
		fontsize : '14',
		fontweight : 'bold',
		hlabel : 'Horizontal Axis Label',
		vlabel : 'Vertical Axis Label',
		hsublabel : 'h sublabel',
		vsublabel : 'v sublabel'
	},

	label : {
		fontfamily : 'Arial',
		fontsize : '11',
		fontweight : 'normal',
		strokecolor : '#000'
	},

	scale : {
		ordinality : 0.2
	},
	
	bar : {
		strokecolor : 'none',
		fontfamily : 'Arial',
		fontsize : '10',
		fontweight : 'bold',
		textcolor : 'black'
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
		fontfill : 'white',
		strokecolor : 'none',
		strokewidth : 2
	},
	
	donut : {
		fontfamily : 'Arial',
		fontsize : '14',
		fontweight : 'normal',
		fontvariant : 'small-caps',
		fontfill : 'white',
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
		hovercolor : 'dimgrey',
		textanchor : 'middle'
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
		fontfamily : 'Arial',
		fontsize : '11',
		fontweight : 'normal',
		textmargin : 15,
		symbolsize : 10,
		inactive_color : '#DDD'
	},

	effects : {
		hovercolor : 'red',
		strokecolor : 'none',
		textcolor : 'black',
		duration : 800,
		hover : 400
	}
};