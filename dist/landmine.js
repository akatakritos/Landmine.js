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