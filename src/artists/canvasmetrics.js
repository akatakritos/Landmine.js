var utils = require('../utils');

var calculateLocationSize = function(canvasSize, fieldSize) {
  return Math.floor(Math.min(canvasSize.width / fieldSize.width, canvasSize.height / fieldSize.height));
};

var CanvasMetrics = function(options) {
  utils.requireOptions(options, 'canvasSize', 'fieldSize');

  this.canvasSize = options.canvasSize;
  this.fieldSize  = options.fieldSize;
  this.locationSize = calculateLocationSize(this.canvasSize, this.fieldSize);
};

module.exports = CanvasMetrics;

