init = function () {
	mydata = new r3.data(dataset);
	mydata.fetch();
	mydata.groupby(['year']);
	mydata.category = 'name';
	mydata.measures.push('usage');
	
	mydata.graph('bargraph');
	mydata.log();
};