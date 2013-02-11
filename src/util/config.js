r3.config = {
	graph : {
		palette : 'Brink',
		background : 'white',
		type : undefined,
		orientation : 'Horizontal',
		max : 0
	},

	meta : {
		position : '#r3_div',
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
		bgcolor : '#ccc'
	},

	axis : {
		ticks : 8,
		subticks : 1,
		padding : 5,
		minor : -10,
		strokecolor : '#000',
		fontfamily : 'Ubuntu',
		fontsize : '14',
		fontweight : 'bold'
	},

	label : {
		fontfamily : 'Ubuntu',
		fontsize : '11',
		fontweight : 'normal',
		strokecolor : '#000'
	},

	scale : {
		ordinality : 0.2
	},

	table : {
		tableclass : 'r3_table',
		headerclass : 'r3_header',
		bodyclass : 'r3_body',
		footerclass : 'r3_footer'
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
		fontfamily : 'Ubuntu',
		fontsize : '14',
		fontweight : 'normal',
		fontvariant : 'small-caps',
		fontfill : 'white',
		strokecolor : 'none',
		strokewidth : 2
	},
	
	donut : {
		fontfamily : 'ubuntu',
		fontsize : '14',
		fontweight : 'normal',
		fontvariant : 'small-caps',
		fontfill : 'white',
		factor : 0.4,
		strokecolor : 'none',
		strokewidth : 2
	},
	
	caption : {
		fontfamily : 'Cambria',
		fontsize : '14',
		fontweight : 'bold',
		fontvariant : 'small-caps',
		textdecoration : 'none',
		hovercolor : 'dimgrey',
		textanchor : 'middle'
	},

	subCaption : {
		fontfamily : 'Cambria',
		fontsize : '9',
		fontweight : 'normal',
		fontvariant : 'normal',
		textdecoration : 'none',
		textanchor : 'middle'
	},

	legend : {
		fontfamily : 'Ubuntu',
		fontsize : '12',
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

