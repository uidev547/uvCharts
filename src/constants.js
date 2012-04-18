cv.constants = {};

cv.constants.defaultGraphdef = {
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

	pos : "#chart3rdiv",
	orientation : 'hor',
	multiseries : false,
	stepup : true,
	charttype : undefined,

	name : 'Facebook',
	data : undefined,
	datum : [{ name: '2001', value: 60 },
			{ name: '2002', value: 70 },
			{ name: '2003', value: 80 },
			{ name: '2004', value: 90 },  
			{ name: '2005', value: 20 },
			{ name: '2006', value: 70 },
			{ name: '2007', value: 80 },
			{ name: '2008', value: 90 },
			{ name: '2009', value: 20 },
			{ name: '2010', value: 70 },
			{ name: '2011', value: 80 },
			{ name: '2012', value: 90 }],

	dataset : [
		{ 	name : 'Google', 
			data : [
				{name: '2001', value: 10}, 
				{name: '2002', value: 30}, 
				{name: '2003', value: 50},
				{name: '2004', value: 90},
				{name: '2005', value: 70},
				] 
		}, {name : 'Amazon', 
			data : [
				{name: '2001', value: 50}, 
				{name: '2002', value: 150}, 
				{name: '2003', value: 20},
				{name: '2004', value: 80},
				{name: '2005', value: 40},
			] 
		}, {name : 'Microsoft', 
			data : [
				{name: '2001', value: 90}, 
				{name: '2002', value: 60}, 
				{name: '2003', value: 30},
				{name: '2004', value: 10},
				{name: '2005', value: 70},
			] 
		}
	]
};