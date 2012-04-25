r3 = {};
r3.util = {};

r3.data = function (dataset) {
	this._dataset = dataset;
	this._columns = {};
	this._dimensions = {};
	this._measures = {};
	this._keyset = {};
	
	this.dimensions = [];
	this.measures = [];
	this.dataset = { _data : undefined };
};

r3.util.isNumber = function (n) {
	return !isNaN(n);
};

r3.data.prototype.fetch = function () {
	this.dataset._data = jQuery.extend(true, [], this._dataset);
	
	if(this.dataset._data.length > 0){
		for(property in this.dataset._data[0]){
			this._columns[property] = true;
			
			if(r3.util.isNumber(this.dataset._data[0][property])) {
				this._measures[property] = true;
			} else {
				this._dimensions[property] = true;
				this._keyset[property] = {};
			}				
		}
		
		for(var i=0, length=this.dataset._data.length; i<length; i++) {
			for(var dimension in this._dimensions) {
				var value = this.dataset._data[i][dimension];
				this._keyset[dimension][value] = true;
			}
		}
	}
};

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

r3.data.prototype.merge = function () {
	
};

r3.data.prototype.ungroupBy = function (dataset, column, depth, level) {
	if( dataset === undefined )
		return;
	
	if( level === undefined)
		level = 0;
	
	if( depth === level ) {
		dataset._tmp = {};
		//this.merge(dataset, column);
	} else {
		//console.log(dataset);
		for(var property in dataset) {
			this.ungroupBy(dataset[property], column, depth, level+1);
		}
	}
}

r3.data.prototype.ungroupby = function (columns) {
	if(!(columns instanceof Array)) {
		if(this._dimensions[columns] === false) {
			this._dimensions[columns] = true;
			if(this.dimensions.indexOf(columns) != -1){
				this.ungroupBy(this.dataset, columns, this.dimensions.indexOf(columns));
				this.dimensions.splice(this.dimensions.indexOf(columns),1);
			}
		}
	} else {
		for(var i=0, length=columns.length; i<length; i++) {
			if(this._dimensions[columns[i]] === false) {
				this._dimensions[columns[i]] = true; this.dimensions.push(columns[i]);
				if(this.dimensions.indexOf(columns[i]) != -1){
					this.ungroupBy(this.dataset, columns[i], this.dimension.indexOf(columns[i]));
					this.dimensions.splice(this.dimensions.indexOf(columns[i]),1);
				}
			}
		}
	}
};

r3.data.prototype.log = function () {
	console.log(this._columns);
	console.log(this._dimensions);
	console.log(this._measures);
	
	console.log('KeySet     : ');
	for(key in this._keyset) {
		var valuestr = '';
		for(value in this._keyset[key]) {
			valuestr += (value + ',');
		}
		
		console.log('	' + key + ' : ' + valuestr);
	}
	
	console.log(this.dataset);
};