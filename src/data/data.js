r3 = {};
r3.util = {};

r3.data = function (dataset) {
	this._dataset = dataset;
	this._columns = [];
	this._dimensions = [];
	this._measures = [];
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
			this._columns.push(property);
			
			if(r3.util.isNumber(this.dataset._data[0][property])) {
				this._measures.push(property);
			} else {
				this._dimensions.push(property);
				this._keyset[property] = {};
			}				
		}
		
		for(var i=0, length=this.dataset._data.length; i<length; i++) {
			for(var j=0, limit=this._dimensions.length; j<limit; j++) {
				var dimension = this._dimensions[j], 
					value = this.dataset._data[i][dimension];
				
				this._keyset[dimension][value] = true;
			}
		}
	}
};

r3.data.prototype.groupby = function (dataset, column) {
	if(!dataset) return;
	
	console.log('grouping by ' + column);
	if(dataset._data === undefined) {
		for(key in dataset) {
			this.groupby(dataset[key], column);
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
}

r3.data.prototype.log = function () {
	console.log('Columns    : ' + this._columns.join(','));
	console.log('Dimensions : ' + this._dimensions.join(','));
	console.log('Measures   : ' + this._measures.join(','));
	
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