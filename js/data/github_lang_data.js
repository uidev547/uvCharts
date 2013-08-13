var github_lang_config = {

 	graph : {
		bgcolor: 'none',
		custompalette : ['#A6CEE3','#1F78B4','#B2DF8A','#33A02C','#FB9A99','#E31A1C','#FDBF6F','#FF7F00','#CAB2D6','#6A3D9A']
	},

	dimension : {
		width : 420,
		height : 350
	},

	meta : {
		caption : 'Top Languages at Github'
	},

	label : {
		suffix : '%',
		strokecolor: '#555'
	},

	margin : {
		top : 40,
		bottom : 90,
		left : 100,
		right : 120
	},

	caption : {
		fontvariant : 'none'
	},

	frame : {
		bgcolor : 'none'
	},

	axis : {
		fontfamily : 'PT Sans'
	},

	legend : {
		fontfamily : 'PT Sans'
	},

	caption : {
		fontfamily: 'PT Sans'
	},

	subCaption : {
		fontfamily : 'PT Sans'
	}
 };

var github_lang_data = {
 	categories : ['language'],
	dataset : {
		'language' : [
			{name: 'Ruby', value: 12 },
			{name: 'javascript', value: 21 },
			{name: 'Java', value: 8 },
			{name: 'Shell', value: 8 },
			{name: 'Python', value: 8 },
			{name: 'PHP', value: 7 },
			{name: 'C', value: 6 },
			{name: 'C++', value: 5 },
			{name: 'Perl', value: 4 },
			{name: 'CoffeeScript', value: 3 }
		]
	}
 };
