cv.tablegraph = function (graphdef) {
	cv.table.apply(this, [graphdef]);
	this.init(graphdef);

	if(this.graphdef.orientation === 'hor') {
		this.setHorTable();
	} else {
		this.setVerTable();
	}
};

cv.tablegraph.prototype = cv.extend(cv.table);

cv.tablegraph.prototype.setHorTable = function () {
	var categories = this.graphdef.categories; categories.unshift('');
	this.header.append('tr').selectAll('td').data(categories)
		.enter().append('td')
		.text(function (d) { return d;});

	categories.shift();
	var tableData = r3.util.getTabularArray(this.graphdef);

	this.rows = this.body.selectAll('tr').data(tableData)
					.enter().append('tr');

	this.rows.selectAll('td').data( function(d,i) { return tableData[i];})
					.enter().append('td').text( function(d) {return d;});
};

cv.tablegraph.prototype.setVerTable = function () {
	var labels = r3.util.getLabelArray(this.graphdef); labels.unshift('');
	this.header.append('tr').selectAll('td').data(labels)
		.enter().append('td')
		.text(function (d) { return d;});

	labels.shift();

	this.rows = this.body.selectAll('tr').data(this.graphdef.categories)
					.enter().append('tr');

	var dataset = this.graphdef.dataset;
	this.rows.selectAll('td').data( function (d) { 
		var arr = []; arr.push(d);
		for( var i=0, len=dataset[d].length; i<len; i++)
			arr.push(dataset[d][i].value);
		return arr;
	}).enter().append('td').text( function(d) {return d;});
}