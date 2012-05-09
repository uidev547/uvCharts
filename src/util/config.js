r3.config = {
	graph : {
		palette : 'Brink',
		background : 'white',
		max : 0
	},

	meta : {
		position : '#r3_div',
		caption : 'Usage of browsers by the years'
	},

	dimension : {
		width : 400,
		height : 400
	},

	margin : {
		top : 40,
		bottom : 90,
		left : 100,
		right : 100
	},

	axis : {
		ticks : 8,
		subticks : 1,
		padding : 5,
		minor : -10,
		strokecolor : '#000',
		fontfamily : 'Ubuntu',
		fontsize : '11',
		fontweight : 'normal'
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
		interpolation : 'cardinal'
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
		fontfamily : 'Tahoma',
		fontsize : '14',
		fontweight : 'bold',
		fontvariant : 'caps',
		textdecoration : 'underline',
		hovercolor : 'dimgrey'
	},
	
	legend : {
		fontfamily : 'Ubuntu',
		fontsize : '12',
		fontweight : 'normal',
		textmargin : 15,
		symbolsize : 10
	},

	effects : {
		hovercolor : 'red',
		strokecolor : 'none',
		textcolor : 'black',
		duration : 800
	}
};

