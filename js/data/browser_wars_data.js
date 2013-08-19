var browser_wars_config = {
 		meta : {
 			caption : 'Browser Market Share',
 			subcaption : 'For the period of 1994-2006',
 			hlabel : 'Year',
 			vlabel : 'Global Market Share'
 		},

 		dimension : {
 			width : 440,
			height : 350
		},

		margin : {
				top : 60,
				bottom : 150,
				left : 60,
				right : 140
		},

		axis : {
			showsubticks : false,
			fontfamily : 'PT Sans'
		},

 		graph : {
 			orientation : 'Vertical',
 			custompalette :['#FDBF6F','#FF7F00','#CAB2D6','#B2DF8A','#33A02C','#FB9A99','#51016B','#69F200','#639B38','#347800'],
 			bgcolor: 'none'
 		},

 		area : {
 			opacity: 1
 		},

 		frame : {
 			bgcolor: 'none'
 		},

 		caption : {
 			strokecolor : '#555'
 		},

 		subCaption : {
 			strokecolor : '#555'
 		},

 		legend : {
 			position: 'right',
			fontfamily : 'PT Sans'
		},

		caption : {
			fontfamily: 'PT Sans'
		},

		subCaption : {
			fontfamily : 'PT Sans'
		}
 };

 var browser_wars_data = { 
 	categories : ['Mosaic', 'Netscape Classic', 'Internet Explorer', 'Mozilla Firefox', 'Safari', 'Opera', 'Others' ],
 	dataset : {
 		'Mosaic' : [
 			{ name : '94', value : 95 },
 			{ name : '95', value : 37 },
 			{ name : '96', value : 7 },
 			{ name : '97', value : 2 },
 			{ name : '98', value : 0 },
 			{ name : '99', value : 0 },
 			{ name : '00', value : 0 },
 			{ name : '01', value : 0 },
 			{ name : '02', value : 0 },
 			{ name : '03', value : 0 },
 			{ name : '04', value : 0 },
 			{ name : '05', value : 0 },
 			{ name : '06', value : 0 }
 		],

 		'Netscape Classic' : [
 			{ name : '94', value : 0 },
 			{ name : '95', value : 5 },
 			{ name : '96', value : 5 },
 			{ name : '97', value : 5 },
 			{ name : '98', value : 60 },
 			{ name : '99', value : 35 },
 			{ name : '00', value : 15 },
 			{ name : '01', value : 9 },
 			{ name : '02', value : 2 },
 			{ name : '03', value : 0 },
 			{ name : '04', value : 0 },
 			{ name : '05', value : 0 },
 			{ name : '06', value : 0 }
 		],

 		'Internet Explorer' : [
 			{ name : '94', value : 0 },
 			{ name : '95', value : 0 },
 			{ name : '96', value : 3.75 },
 			{ name : '97', value : 17.5 },
 			{ name : '98', value : 35 },
 			{ name : '99', value : 62.5 },
 			{ name : '00', value : 83.75 },
 			{ name : '01', value : 90 },
 			{ name : '02', value : 95.25 },
 			{ name : '03', value : 94.75 },
 			{ name : '04', value : 92.625 },
 			{ name : '05', value : 86.091 },
 			{ name : '06', value : 60.65 }
 		],

 		'Mozilla Firefox' : [
 			{ name : '94', value : 0 },
 			{ name : '95', value : 0 },
 			{ name : '96', value : 0 },
 			{ name : '97', value : 0 },
 			{ name : '98', value : 0 },
 			{ name : '99', value : 0 },
 			{ name : '00', value : 0 },
 			{ name : '01', value : 0 },
 			{ name : '02', value : 1 },
 			{ name : '03', value : 2 },
 			{ name : '04', value : 4 },
 			{ name : '05', value : 9.544639 },
 			{ name : '06', value : 9.5925 }
 		],

 		'Safari' : [
 			{ name : '94', value : 0 },
 			{ name : '95', value : 0 },
 			{ name : '96', value : 0 },
 			{ name : '97', value : 0 },
 			{ name : '98', value : 0 },
 			{ name : '99', value : 0 },
 			{ name : '00', value : 0 },
 			{ name : '01', value : 0 },
 			{ name : '02', value : 0 },
 			{ name : '03', value : 0 },
 			{ name : '04', value : 1 },
 			{ name : '05', value : 1.571667 },
 			{ name : '06', value : 30.995 }
 		],

 		'Opera' : [
 			{ name : '94', value : 0 },
 			{ name : '95', value : 0 },
 			{ name : '96', value : 0 },
 			{ name : '97', value : 0 },
 			{ name : '98', value : 0 },
 			{ name : '99', value : 0 },
 			{ name : '00', value : 0 },
 			{ name : '01', value : 0 },
 			{ name : '02', value : 0 },
 			{ name : '03', value : 0 },
 			{ name : '04', value : 0.625 },
 			{ name : '05', value : 0.7429 },
 			{ name : '06', value : 0.4825 }
 		],

 		'Others' : [
 			{ name : '94', value : 5 },
 			{ name : '95', value : 7.5 },
 			{ name : '96', value : 8.75 },
 			{ name : '97', value : 7.5 },
 			{ name : '98', value : 5 },
 			{ name : '99', value : 2.5 },
 			{ name : '00', value : 1.25 },
 			{ name : '01', value : 1 },
 			{ name : '02', value : 1.25 },
 			{ name : '03', value : 2.5 },
 			{ name : '04', value : 1.75 },
 			{ name : '05', value : 1.236933 },
 			{ name : '06', value : 0.4825 }
 		],
 	}
 };