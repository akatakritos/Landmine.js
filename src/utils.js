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

var requireOptions = function(options) {
  var requiredOptions = Array.prototype.slice.call(arguments, 1);
  requiredOptions.forEach(function(requiredOption) {
    if (typeof options[requiredOption] === 'undefined') {
      throw new Error(requiredOption + " is a required option");
    }
  });
};

var squareCenter = function(x, y, size) {
  return {
    x: x + size / 2,
    y: y + size / 2
  };
};

module.exports = {
  extend: extend,
  requireOptions: requireOptions,
  squareCenter: squareCenter
};

