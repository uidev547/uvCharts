cv.constants = {};

cv.constants.defaultHorGraphdef = {
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
	stepup : false,
	charttype : undefined,

	dataset : [ 
		{	name : 'IE',
			data : [
				{ name: '2001', value: 60 },
				{ name: '2002', value: 70 },
				{ name: '2003', value: 80 },
				{ name: '2004', value: 90 },  
				{ name: '2005', value: 20 }
			]
		},{	name : 'Chrome', 
			data : [
				{name: '2001', value: 10}, 
				{name: '2002', value: 30}, 
				{name: '2003', value: 50},
				{name: '2004', value: 90},
				{name: '2005', value: 70},
			] 
		}, {name : 'Firefox', 
			data : [
				{name: '2001', value: 50}, 
				{name: '2002', value: 150}, 
				{name: '2003', value: 20},
				{name: '2004', value: 80},
				{name: '2005', value: 40},
			] 
		}, {name : 'Opera', 
			data : [
				{name: '2001', value: 90}, 
				{name: '2002', value: 60}, 
				{name: '2003', value: 30},
				{name: '2004', value: 10},
				{name: '2005', value: 70},
			] 
		}, {name : 'Rockmelt', 
			data : [
				{name: '2001', value: 30}, 
				{name: '2002', value: 10}, 
				{name: '2003', value: 60},
				{name: '2004', value: 90},
				{name: '2005', value: 40},
			] 
		}
	]
};

cv.constants.defaultVerGraphdef = {
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
	orientation : 'ver',
	multiseries : false,
	stepup : false,
	charttype : undefined,

	dataset : [ 
		{	name : 'IE',
			data : [
				{ name: '2001', value: 60 },
				{ name: '2002', value: 70 },
				{ name: '2003', value: 80 },
				{ name: '2004', value: 90 },  
				{ name: '2005', value: 20 }
			]
		},{	name : 'Chrome', 
			data : [
				{name: '2001', value: 10}, 
				{name: '2002', value: 30}, 
				{name: '2003', value: 50},
				{name: '2004', value: 90},
				{name: '2005', value: 70},
			] 
		}, {name : 'Firefox', 
			data : [
				{name: '2001', value: 50}, 
				{name: '2002', value: 150}, 
				{name: '2003', value: 20},
				{name: '2004', value: 80},
				{name: '2005', value: 40},
			] 
		}, {name : 'Opera', 
			data : [
				{name: '2001', value: 90}, 
				{name: '2002', value: 60}, 
				{name: '2003', value: 30},
				{name: '2004', value: 10},
				{name: '2005', value: 70},
			] 
		}, {name : 'Rockmelt', 
			data : [
				{name: '2001', value: 30}, 
				{name: '2002', value: 10}, 
				{name: '2003', value: 60},
				{name: '2004', value: 90},
				{name: '2005', value: 40},
			] 
		}
	]
};