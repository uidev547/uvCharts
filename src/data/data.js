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

r3.data.prototype.log = function () {
/*	console.log(this._columns);
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
*/	
	console.log(this.dataset);
};