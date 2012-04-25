init = function () {
	mydata = new r3.data(dataset);
	mydata.fetch(); //mydata.log();
	mydata.groupby(['name','class']);
	
	mydata.ungroupby('class');
	//mydata.log();
};