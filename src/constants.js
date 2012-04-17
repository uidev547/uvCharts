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
	orientation : 'horizontal',
	multiseries : false,

	name : 'Facebook',
	data : [{ name: '2001', value: 60 },
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
		{ name : 'Google', data : [10, 20, 30, 40, 50] },
		{ name : 'Microsoft', data : [20, 10, 60, 30, 40] },
		{ name : 'Amazon', data : [80, 60, 10, 30, 20] }
	]
};