var dataset = [
	{ name : 'Firefox', year : '_2001', usage : '30' },
	{ name : 'Firefox', year : '_2002', usage : '40' },
	{ name : 'Firefox', year : '_2003', usage : '45' },
	{ name : 'Firefox', year : '_2004', usage : '60' },
	{ name : 'Firefox', year : '_2005', usage : '55' },
	{ name : 'Chrome', year : '_2001', usage : '20' },
	{ name : 'Chrome', year : '_2002', usage : '25' },
	{ name : 'Chrome', year : '_2003', usage : '36' },
	{ name : 'Chrome', year : '_2004', usage : '50' },
	{ name : 'Chrome', year : '_2005', usage : '60' },
	{ name : 'IE', year : '_2001', usage : '70' },
	{ name : 'IE', year : '_2002', usage : '75' },
	{ name : 'IE', year : '_2003', usage : '65' },
	{ name : 'IE', year : '_2004', usage : '60' },
	{ name : 'IE', year : '_2005', usage : '45' },
	{ name : 'Safari', year : '_2001', usage : '20' },
	{ name : 'Safari', year : '_2002', usage : '25' },
	{ name : 'Safari', year : '_2003', usage : '30' },
	{ name : 'Safari', year : '_2004', usage : '28' },
	{ name : 'Safari', year : '_2005', usage : '23' },
	{ name : 'Opera', year : '_2001', usage : '30' },
	{ name : 'Opera', year : '_2002', usage : '40' },
	{ name : 'Opera', year : '_2003', usage : '45' },
	{ name : 'Opera', year : '_2004', usage : '60' },
	{ name : 'Opera', year : '_2005', usage : '55' }
];

init = function () {
	console.log(dataset);
	mydata = new r3.data(dataset);
	mydata.fetch();
	mydata.log();
	
	mydata.groupby(mydata.dataset, 'name'); mydata.log();
	mydata.groupby(mydata.dataset, 'year'); mydata.log();
};