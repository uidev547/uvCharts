uv.constants = {};

uv.constants.graphdef = {
	categories : ['IE', 'Chrome', 'Opera', 'Safari'],
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

uv.constants.waterfallGraphdef = {
        categories : ['data'],
        dataset : {
            'data' : [
                {
                    "name": "2005 Actual",
                    "value": 90
                },
                {
                    "name": "Price",
                    "value": 15
                },
                {
                    "name": "Volume",
                    "value": 21
                },
                {
                    "name": "Fixes",
                    "value": -37
                },
                {
                    "name": "Taxation",
                    "value": -43
                },
                {
                    "name": "Escalation",
                    "value": -40
                },
                {
                    "name": "Mix",
                    "value": 46
                },
                {
                    "name": "Market Effect",
                    "value": 91
                },
                {
                    "name": "Partners",
                    "value": 61
                }
            ]
        }
    };

uv.constants.name = {
	pos : 'r3_div',
	frame : 'r3_frame',
	panel : 'r3_panel',
	background : 'r3_bg',
	horaxis : 'r3_horaxis',
	veraxis : 'r3_veraxis',
	table : {
			tableclass : 'r3_table',
			headerclass : 'r3_header',
			bodyclass : 'r3_body',
			footerclass : 'r3_footer'
	}
};

uv.constants.classes = {
	uv : 'uv',
	pos : 'uv-div',
	frame : 'uv-frame',
	panel : 'uv-panel',
	bg : 'uv-bg',
	axes : 'uv-axes',
	legend : 'uv-legend',
	framebg : 'uv-frame-bg',
	horaxis : 'uv-hor-axis',
	veraxis : 'uv-ver-axis',
	caption : 'uv-caption',
	captiontext : 'uv-caption-text',
	subcaption : 'uv-subcaption',
	subcaptiontext : 'uv-subcaption-text',
	axeslabel : 'uv-axes-label',
	axessublabel : 'uv-axes-sub-label',
	legendsign : 'uv-legend-sign',
	legendlabel : 'uv-legend-label'
};
