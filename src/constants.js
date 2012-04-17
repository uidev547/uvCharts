cv.constants = {};

cv.constants.defaultGraphdef = {
	dimension : {
		width : 400,
		height : 400
	},

	margin : {
		top : 40,
		bottom : 40,
		left : 40,
		right : 40
	},

	pos : "#chart3rdiv",
	orientation : 'horizontal',
	multiseries : false,

	name : 'Facebook',
	data : [ 60, 70, 80, 90, 20],

	dataset : [
		{ name : 'Google', data : [10, 20, 30, 40, 50] },
		{ name : 'Microsoft', data : [20, 10, 60, 30, 40] },
		{ name : 'Amazon', data : [80, 60, 10, 30, 20] }
	]
};