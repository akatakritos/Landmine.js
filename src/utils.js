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

module.exports = {
  extend: extend
};

