r3.tablegraph = function (graphdef) {
	r3.table.apply(this, [graphdef]);
	this.init(graphdef);

	if (this.graphdef.orientation === 'hor') {
		this.setHorTable();
	} else {
		this.setVerTable();
	}

	this.finalize();
};

r3.tablegraph.prototype = r3.util.extend(r3.table);

r3.tablegraph.prototype.setHorTable = function () {
	var categories = this.graphdef.categories, tableData = r3.util.getTabularArray(this.graphdef);

	categories.unshift('');
	this.header.append('tr').selectAll('td').data(categories).enter().append('td').text(function (d) { return d; });
	categories.shift();

	this.bodyrows = this.body.selectAll('tr').data(tableData)
					.enter().append('tr');

	this.bodyrows.selectAll('td').data(function (d, i) { return tableData[i]; })
					.enter().append('td')
					.attr('class', function (d, i) { return (i === 0) ? 'chart3rtablelabel' : 'chart3rtabledata'; })
					.text(function (d) {return d; });
};

r3.tablegraph.prototype.setVerTable = function () {
	var labels = r3.util.getLabelArray(this.graphdef), dataset = this.graphdef.dataset;

	labels.unshift('');
	this.header.append('tr').selectAll('td').data(labels).enter().append('td').text(function (d) { return d; });
	labels.shift();

	this.bodyrows = this.body.selectAll('tr').data(this.graphdef.categories)
					.enter().append('tr');

	this.bodyrows.selectAll('td')
		.data(function (d) {
			var arr = [], i, len;
			arr.push(d);
			for (i = 0, len = dataset[d].length; i < len; i = i + 1) { arr.push(dataset[d][i].value); }
			return arr;
		}).enter().append('td')
			.attr('class', function (d, i) { return (i === 0) ? 'chart3rtablelabel' : 'chart3rtabledata'; })
			.text(function (d) {return d; });
};