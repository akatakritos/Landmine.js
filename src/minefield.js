var MineField = function( options ) {
	if ( typeof options === 'undefined' ) {
		options = {};
	}

	var defaults = {
		width: 80,
		height: 40
	};

	this.options = extend(defaults, options);

	Object.defineProperty(this, 'width', {enumerable: true, value: this.options.width });
	Object.defineProperty(this, 'height', {enumerable: true, value: this.options.height});

	this.field = Array(this.width);
	for( var i = 0; i < this.width; i++) {
		this.field[i] = Array(this.height);
		for( var j = 0; j < this.height; j++ ) {
			//this.field[i][j] = new FieldSpot();
		}
	}
};

MineField.prototype.get = function(x,y) {
	if (x > width) { 
		throw "x is out of bounds";
	}
	if ( y > height ) {
		throw "y is out of bounds";
	}

	return this.field[x][y];
};


exportSymbol('MineField', MineField);
