init = function () {
	mydata = new r3.data(dataset);
	mydata.fetch();
	mydata.groupby(['name','class']);
	mydata.log();
	
	mydata.ungroupby('class');
	mydata.log();
};