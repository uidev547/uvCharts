var olympics_config = {

		graph : {
			bgcolor: 'none',
			custompalette : ['#1a99aa','#aaa','#ff5c00']
		},

 		dimension : {
 			width : 500,
			height : 300
		},

		margin : {
			top : 60,
			bottom : 150,
			left : 100,
			right : 40
		},

		axis : {
			showsubticks : false,
			fontfamily : 'PT Sans'
		},

		meta : {
			caption : 'Top 6 Medal Winners of Olympic Games',
			subcaption : 'src : http://www.sports-reference.com/olympics/',
 			hlabel : 'Number of medals won',
 			vlabel : 'Countries'
		},

		frame : {
			bgcolor: 'none'		
		},

		legend : {
			fontfamily: 'PT Sans'
		},

		effects : {
			textcolor: '#000'
		},

		caption : {
			fontfamily: 'PT Sans'
		},

		subCaption : {
			fontfamily : 'PT Sans'
		}
};

var  olympics_data = {
 	categories : ['Gold','Silver','Bronze'],
	dataset : {
		'Gold' : [
			{name: 'USA', value: 1077 },
			{name: 'URS', value: 473 },
			{name: 'GER', value: 293 },
			{name: 'GBR', value: 255 },
			{name: 'FRA', value: 249 },
			{name: 'ITA', value: 248 }
		],

		'Silver' : [
			{name: 'USA', value: 860 },
			{name: 'URS', value: 376 },
			{name: 'GER', value: 328 },
			{name: 'GBR', value: 293 },
			{name: 'FRA', value: 262 },
			{name: 'ITA', value: 211 }
		],

		'Bronze' : [
			{name: 'USA', value: 742 },
			{name: 'URS', value: 355 },
			{name: 'GER', value: 320 },
			{name: 'GBR', value: 288 },
			{name: 'FRA', value: 310 },
			{name: 'ITA', value: 227 }
		]
	}
 };
