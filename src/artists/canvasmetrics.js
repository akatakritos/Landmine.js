var utils = require('../utils');


var CanvasMetrics = function(options) {
  utils.requireOptions(options, 'canvasSize', 'fieldSize');


  this.statusBarHeight = 0;
  this.statusBar  = !!options.statusBar;
  this.canvasSize = options.canvasSize;
  this.fieldSize  = options.fieldSize;
  this.locationSize = this.calculateLocationSize(this.canvasSize, this.fieldSize);

  if (options.statusBar) {
    this.statusBarHeight = this.locationSize;
  }
};

CanvasMetrics.prototype.calculateLocationSize = function(canvasSize, fieldSize) {
  //if we have a status bar, we need to allow one extra locations height
  var fieldHeight = this.statusBar ? fieldSize.height + 1 : fieldSize.height;

  return Math.floor(Math.min(canvasSize.width / fieldSize.width, canvasSize.height / fieldHeight));
};
CanvasMetrics.prototype.locationToPoint = function(x, y) {
  return {
    x: x * this.locationSize,
    y: y * this.locationSize + this.statusBarHeight
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

CanvasMetrics.prototype.locationRect = function(x, y) {
  var upperLeft = this.locationToPoint(x, y);
  return {
    x: upperLeft.x,
    y: upperLeft.y,
    width: this.locationSize,
    height: this.locationSize
  };
};

CanvasMetrics.prototype.scaleScalar = function(scale) {
  return this.locationSize * scale;
};

CanvasMetrics.prototype.locationFontSize = function() {
  return this.locationSize;
};

module.exports = CanvasMetrics;

