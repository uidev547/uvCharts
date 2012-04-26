r3.constants = {};

r3.constants.defaultHorGraphdef = {
	pos : '#r3_div',
	orientation : 'hor',
	stepup : false,
	charttype : undefined,

	categories : ['IE', 'Chrome', 'Firefox', 'Opera', 'Safari'],
	dataset : {
		'IE' : [
			{name: '2001', value: 60 },
			{name: '2002', value: 70 },
			{name: '2003', value: 80 },
			{name: '2004', value: 90 },
			{name: '2005', value: 20 }
		],
		'Chrome' : [
			{name: '2001', value: 10},
			{name: '2002', value: 30},
			{name: '2003', value: 50},
			{name: '2004', value: 90},
			{name: '2005', value: 70}
		],
		'Firefox': [
			{name: '2001', value: 50},
			{name: '2002', value: 150},
			{name: '2003', value: 20},
			{name: '2004', value: 80},
			{name: '2005', value: 40}
		],
		'Opera': [
			{name: '2001', value: 90},
			{name: '2002', value: 60},
			{name: '2003', value: 30},
			{name: '2004', value: 10},
			{name: '2005', value: 70}
		],
		'Safari' : [
			{name: '2001', value: 30},
			{name: '2002', value: 10},
			{name: '2003', value: 60},
			{name: '2004', value: 90},
			{name: '2005', value: 40}
		]
	}
};

r3.constants.defaultVerGraphdef = {
	pos : '#r3_div',
	orientation : 'ver',
	stepup : false,
	charttype : undefined,

	categories : ['IE', 'Chrome', 'Firefox', 'Opera', 'Safari'],
	dataset : {
		'IE' : [
			{name: '2001', value: 60 },
			{name: '2002', value: 70 },
			{name: '2003', value: 80 },
			{name: '2004', value: 90 },
			{name: '2005', value: 20 }
		],
		'Chrome' : [
			{name: '2001', value: 10},
			{name: '2002', value: 30},
			{name: '2003', value: 50},
			{name: '2004', value: 90},
			{name: '2005', value: 70}
		],
		'Firefox': [
			{name: '2001', value: 50},
			{name: '2002', value: 150},
			{name: '2003', value: 20},
			{name: '2004', value: 80},
			{name: '2005', value: 40}
		],
		'Opera': [
			{name: '2001', value: 90},
			{name: '2002', value: 60},
			{name: '2003', value: 30},
			{name: '2004', value: 10},
			{name: '2005', value: 70}
		],
		'Safari' : [
			{name: '2001', value: 30},
			{name: '2002', value: 10},
			{name: '2003', value: 60},
			{name: '2004', value: 90},
			{name: '2005', value: 40}
		]
	}
};

r3.constants.name = {
	pos : 'r3_div',
	frame : 'r3_frame',
	panel : 'r3_panel',
	background : 'r3_bg',
	horaxis : 'r3_horaxis',
	veraxis : 'r3_veraxis'
};

r3.constants.palettes = {
    'Plain': ['#1F77B4'],
    'Simple': ['#d42f3c', '#85b1e6', '#FD6D16', '#dfe617'],
    'RGB': ['#bb2211', '#2222bb', '#22aa22', '#9999aa', '#223322'],
    'Olive': ['#B4AF91', '#787746', '#40411E', '#32331D'],
    'Soil and Sky': ['#928174', '#AA9788', '#BDE4E9', '#A8E1E9', '#90D1DA'],
    'Candid': ['#EADEA1', '#808355', '#4E493D', '#3A301C', '#3F7696'],
    'Sulphide': ['#949993', '#615952', '#343640', '#A15026', '#C7B091'],
    'New Moon': ['#EEE6AB', '#C5BC8E', '#696758', '#45484B', '#36393B'],
    'Nature': ['#EEEFD8', '#BECD8A', '#73880A', '#CCCC33', '#E2EAA3'],
    'Earth': ['#862424', '#D8D1B4', '#B3AB8E', '#F1F0E9', '#353535'],
    'Sea': ['#334433', '#6699aa', '#88aaaa', '#aacccc', '#447799'],
    'Lemon': ['#eebb00', '#ddaa00', '#eecc00', '#ffee11'],
    'Water': ['#2266bb', '#3388dd', '#55aaee', '#bbddee', '#113355'],
    'Grass': ['#00AF64', '#36D729', '#61D7A4', '#007241'],
	'Hash' : ['tomato', 'yellowgreen', 'midnightblue', 'lightseagreen', 'gold', 'crimson']
};