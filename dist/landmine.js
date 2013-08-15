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


	/**
	 * Export
	 */
	if ( typeof window !== 'undefined' && !window.Landmine ) {
		window.Landmine = LM;
	} else if ( module && module.exports ) {
		module.exports = LM;
	}

})();