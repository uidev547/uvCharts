var india_gdp_config = {

	graph : {
		orientation : 'Vertical',
		bgcolor: 'none',
		custompalette : ['#FFAA00']
	},

	dimension : {
		width : 420,
		height : 350
	},

	meta : {
		caption : 'India GDP',
		subcaption : 'For the period of 2000-2010',
		hlabel : 'Year',
		vlabel : 'GDP'
	},	

	margin : {
		top : 60,
		bottom : 150,
		left : 100,
		right : 120
	},

 	legend : {
			position: 'right',
			fontfamily : 'PT Sans'
	},

	label : {
		showlabel : false,
		strokecolor : '#555'
	},

	effects : {
		showhovertext : true
	},

	frame : {
		bgcolor : 'none'
	},

	axis : {
		fontfamily : 'PT Sans'
	},

	caption : {
			fontfamily: 'PT Sans'
		},

		subCaption : {
			fontfamily : 'PT Sans'
		}
};


var india_gdp_data = {
	categories : ['GDP'],
	dataset : {
		'GDP' : [
			{name: '2000-01', value: 4.4 },
			{name: '2001-02', value: 5.8 },
			{name: '2002-03', value: 3.8 },
			{name: '2003-04', value: 8.5 },
			{name: '2004-05', value: 7.5 },
			{name: '2005-06', value: 9.5 },
			{name: '2006-07', value: 9.7 },
			{name: '2007-08', value: 9.0 },
			{name: '2008-09', value: 6.7 },
			{name: '2009-10', value: 7.7 }
		]
	}
};