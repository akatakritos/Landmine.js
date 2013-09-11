(function() {
	"use strict";
	/* namespace object */
	var LM = {};
;

/**
 * Extends an object, copying properties from right to left
 * @param  {Object} objectsN N objects to copy
 * @return {Object}          conglomeration of all object properties
 */
var extend = function( objectsN ) {
	var destination = {};
	var i = 0;
	var length = arguments.length;
	var prop;
	var src;

	for ( i = 0; i < length; i++ ) {
		src = arguments[i];
		for( prop in src ) {

			if (src[prop] !== undefined) {
				destination[prop] = src[prop];
			}
		}
	}

	return destination;
};

/**
 * Export a symbol to the namespace property
 * @param  {string} name  the name of the symbol
 * @param  {Object} value the value of the symbol
 */
var exportSymbol = function( name, value ) {
	if ( ! LM[name] ) {
		LM[name] = value;
	}
};

/**
 * Export a symbol only in test environments
 * @param  {string} name  symbol name
 * @param  {Object} value symbol value
 */
var exportTestSymbol = function( name, value ) {
	if( ! LM[name] && module && module.exports ) {
		LM[name] = value;
	}
};


exportTestSymbol('extend', extend);;

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
			this.field[i][j] = new FieldLocation();
		}
	}
};

MineField.prototype.get = function(x,y) {
	if (! this.isInRange(x,y) ) {
		throw 'position out of range';
	}

	return this.field[x][y];
};

var minefieldNeighborDeltas = [
	{x:-1,y:-1},
	{x:-1,y:0},
	{x:-1,y:1},
	{x:0,y:-1},
	{x:0,y:1},
	{x:1,y:-1},
	{x:1,y:0},
	{x:1,y:1}
];

MineField.prototype.getNeighbors = function(x, y) {
	var neighbors = [];
	for (var i = 0, len = minefieldNeighborDeltas.length; i < len; i++) {
		var delta = minefieldNeighborDeltas[i];
		var dx = x + delta.x, dy = y + delta.y;

		if ( this.isInRange( dx, dy ) ) {
			neighbors.push( this.get(dx, dy) );
		}
	}

	return neighbors;

};

MineField.prototype.isInRange = function( x, y ) {
	return (x >= 0 && x < this.width && y >= 0 && y < this.height);
};

MineField.prototype.countMines = function( x, y ) {
	var neighbors = this.getNeighbors(x, y),
		count = 0;

	for (var i = neighbors.length - 1; i >= 0; i--) {
		if (neighbors[i].hasMine) {
			count++;
		}
	}

	return count;
};

MineField.prototype.forEach = function(callback) {
	var i = 0, j = 0, w = this.width, l = this.l;

	for( i = 0; i < w; i++ ) {
		for( j = 0; j < h; j++ ) {
			callback(this.get(i, j), i, j);
		}
	}
};

MineField.prototype.countAllMines = function() {
	var self = this;
	this.forEach(function( spot, x, y ) {
		spot.count = self.countMines(x, y);
	});
};

exportSymbol('MineField', MineField);
;

var FieldLocation = function() {
	this.hasMine = false;
	this.count = 0;
	this.dug = false;
};

FieldLocation.prototype.dig = function() {
	if (this.hasMine) {
		throw "exploded";
	}

	this.dug = true;
};

FieldLocation.prototype.placeMine = function() {
	this.hasMine = true;
};;

var MinePlacer = function() {
};

MinePlacer.prototype.placeMines = function( field, count ) {
	if (count > this.totalPlacableMines(field)) {
		throw "Can't place " + count + " mines in a field sized " + field.width + "x" + field.height;
	}

	for( var i = 0; i < count; i++ ) {
		this.placeMine( field );
	}
};

MinePlacer.prototype.placeMine = function( field ) {
	var spot, pos, placed = false;
	do {
		pos = this.randomLocation( field );
		spot = field.get( pos.x, pos.y );

		if ( ! spot.hasMine) {
			spot.placeMine();
			placed = true;
		}
	} while ( !placed );
};

MinePlacer.prototype.randomLocation = function( field ) {
	return {
		x: Math.floor((Math.random() * (field.width-1))) + 1,
		y: Math.floor((Math.random() * field.height))
	};
};

MinePlacer.prototype.totalPlacableMines = function( field ) {
	return (field.height-1)*field.width;
};

exportTestSymbol('MinePlacer', MinePlacer);
;


	/**
	 * Export
	 */
	if ( typeof window !== 'undefined' && !window.Landmine ) {
		window.Landmine = LM;
	} else if ( module && module.exports ) {
		module.exports = LM;
	}

})();