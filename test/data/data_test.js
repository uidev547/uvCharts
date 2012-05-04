init = function () {
	mydata = new r3.data(dataset);
	mydata.fetch();
	mydata.groupby(['year','class']);
	mydata.category = 'name';
	mydata.measures.push('usage');
	
	mydata.graph('bargraph');
	mydata.log();
};