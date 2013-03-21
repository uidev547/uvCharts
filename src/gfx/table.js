uv.Table = function () {
	this.caption = undefined;
	this.position = undefined;
	this.graphdef = undefined;

	this.table = undefined;
	this.header = undefined;
	this.body = undefined;
	this.bodyrows = {};
};

uv.Table.prototype.init = function (graphdef, config) {
	this.graphdef = graphdef;
	this.config = $.extend(true, {}, config);
	this.position = this.config.meta.pos || 'body';

	this.table = d3.select(this.position).append('table').attr('class', this.config.table.tableclass);
	this.header = this.table.append('thead').attr('class', this.config.table.headerclass);
	this.body = this.table.append('tbody').attr('class', this.config.table.bodyclass);
	this.footer = this.table.append('tfoot').attr('class', this.config.table.footerclass);
};

uv.Table.prototype.finalize = function () {
	//console.log(this);
};