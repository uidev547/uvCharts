r3.data.prototype.query = function (selection, filters, groups, groupfilters) {
	r3.data.filter(filters);
	r3.data.groupby(groups);
	r3.data.having(groupfilters);
	r3.data.select(selections);
};