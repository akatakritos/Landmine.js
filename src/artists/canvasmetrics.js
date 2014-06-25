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

CanvasMetrics.prototype.locationToPoint = function(x, y) {
  return {
    x: x * this.locationSize,
    y: y * this.locationSize
  };
};

CanvasMetrics.prototype.locationToCenterPoint = function(x, y) {
  var upperLeft = this.locationToPoint(x, y);
  return {
    x: upperLeft.x + (this.locationSize / 2),
    y: upperLeft.y + (this.locationSize / 2)
  };
};

CanvasMetrics.prototype.locationToScaledOffsetPoint = function(x, y, offsetX, offsetY) {
  var upperLeft = this.locationToPoint(x, y);
  return {
    x : upperLeft.x + offsetX * this.locationSize,
    y : upperLeft.y + offsetY * this.locationSize
  };
};

CanvasMetrics.prototype.applyScaledOffsetsToCenter = function(center, offsetX, offsetY) {
  return {
    x: center.x + offsetX * (this.locationSize/2),
    y: center.y + offsetY * (this.locationSize/2)
  };
};


CanvasMetrics.prototype.scaleScalar = function(scale) {
  return this.locationSize * scale;
};

CanvasMetrics.prototype.locationFontSize = function() {
  return this.locationSize;
};

module.exports = CanvasMetrics;

