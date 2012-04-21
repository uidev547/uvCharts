r3.table = function () {
	this.caption = undefined;
	this.position = undefined;
	this.graphdef = undefined;

	this.table = undefined;
	this.header = undefined;
	this.body = undefined;
	this.bodyrows = {};
};

r3.table.prototype.init = function(graphdef) {
	this.graphdef = graphdef;
	this.position = this.graphdef.pos || '#chart3rdiv' || 'body';

	this.table = d3.select(this.position).append('table').attr('class','chart3rtable');
	this.header = this.table.append('thead').attr('class','chart3rtableheader');
	this.body = this.table.append('tbody').attr('class','chart3rtablebody');
};

r3.table.prototype.finalize = function () {
	console.log(this);
};