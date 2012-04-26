r3.data.prototype.groupBy = function (dataset, column) {
	if(!dataset) return;

	if(dataset._data === undefined) {
		for(key in dataset) {
			this.groupBy(dataset[key], column);
		}
	} else {
		for(value in this._keyset[column]){
			dataset[value] = {}; 
			dataset[value]._data = [];
		}
		
		for(var i=0, length=dataset._data.length; i<length; i++){
			var value = dataset._data[i][column];
			dataset[value]._data.push(dataset._data[i]);
		}
		
		dataset._data = undefined;
	}
};

r3.data.prototype.groupby = function (columns) {
	if(!(columns instanceof Array)) {
		if(this._dimensions[columns] === true) {
			this._dimensions[columns] = false; 
			this.dimensions.push(columns);
			this.groupBy(this.dataset, columns);
		}
	} else {
		for(var i=0, length=columns.length; i<length; i++) {
			if(this._dimensions[columns[i]] === true) {
				this._dimensions[columns[i]] = false; 
				this.dimensions.push(columns[i]);
				this.groupBy(this.dataset, columns[i]);
			}
		}
	}
};