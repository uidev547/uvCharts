init = function () {
	ds = new Miso.Dataset({
		data: [
		   { name : 'Firefox', year : '2001', usage : '30' },
		   { name : 'Firefox', year : '2002', usage : '40' },
		   { name : 'Firefox', year : '2003', usage : '45' },
		   { name : 'Firefox', year : '2004', usage : '60' },
		   { name : 'Firefox', year : '2005', usage : '55' },
		   { name : 'Chrome', year : '2001', usage : '20' },
		   { name : 'Chrome', year : '2002', usage : '25' },
		   { name : 'Chrome', year : '2003', usage : '36' },
		   { name : 'Chrome', year : '2004', usage : '50' },
		   { name : 'Chrome', year : '2005', usage : '60' },
		   { name : 'IE', year : '2001', usage : '70' },
		   { name : 'IE', year : '2002', usage : '75' },
		   { name : 'IE', year : '2003', usage : '65' },
		   { name : 'IE', year : '2004', usage : '60' },
		   { name : 'IE', year : '2005', usage : '45' },
		   { name : 'Safari', year : '2001', usage : '20' },
		   { name : 'Safari', year : '2002', usage : '25' },
		   { name : 'Safari', year : '2003', usage : '30' },
		   { name : 'Safari', year : '2004', usage : '28' },
		   { name : 'Safari', year : '2005', usage : '23' },
		   { name : 'Opera', year : '2001', usage : '30' },
		   { name : 'Opera', year : '2002', usage : '40' },
		   { name : 'Opera', year : '2003', usage : '45' },
		   { name : 'Opera', year : '2004', usage : '60' },
		   { name : 'Opera', year : '2005', usage : '55' }
		],
	
		ready : function () {
			console.log(this.columnNames());
			console.log(this.rows());
			console.log(this.groupBy('name', ['year', 'usage']));
			console.log(this.column('name').data);
		}
	});
	
	ds.fetch();
	
	_.when(ds.fetch()).then(function(){
		  ds.eachColumn(function(columnName) {
		    console.log(ds.column(columnName).data);
		  });
		});
};