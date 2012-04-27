r3.config = {
	graph : {
		palette : 'Soft',
		orientation : 'ver',
		background : 'white'
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
		bottom : 60,
		left : 60,
		right : 40
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
		interpolation : 'linear'
	},
	
	caption : {
		fontfamily : 'Tahoma',
		fontsize : '14',
		fontweight : 'normal',
		fontvariant : 'small-caps',
		textdecoration : 'underline',
		hovercolor : 'dimgrey'
	},

	effects : {
		hovercolor : 'red',
		strokecolor : 'white',
		duration : 600
	}
};

