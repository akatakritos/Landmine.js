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


exportTestSymbol('extend', extend);