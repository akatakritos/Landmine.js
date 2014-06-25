var utils = require('../utils');


var countColor = function(count) {
  return "blue";
};

var font = function(pxSize) {
  return "bold " + pxSize + "px Arial";
};

var dirtOffsets = [
  { x: 0.6, y: 0.2 },
  { x: 0.3, y: 0.6 },
  { x: 0.7, y: 0.7 }];

var starOffsets = [
  { x: -0.13333333333333333, y: -0.8666666666666667 },
  { x: 0.06666666666666667,  y: -0.3333333333333333 },
  { x: 0.26666666666666666,  y: -0.6666666666666666 },
  { x: 0.26666666666666666,  y: -0.2 },
  { x: 0.6666666666666666,   y: 0.26666666666666666 },
  { x: 0.13333333333333333,  y: 0.06666666666666667 },
  { x: 0.4666666666666667,   y: 0.7333333333333333 },
  { x: -0.13333333333333333, y: 0.13333333333333333 },
  { x: -0.4666666666666667,  y: 0.6 },
  { x: -0.4,                 y: 0 },
  { x: -0.7333333333333333,  y: -0.4666666666666667 },
  { x: -0.4,                 y: -0.3333333333333333 } ];

var flagRects = [
  {
    color: 'red',
    x: -0.4666666666666667,
    y: -0.7333333333333333,
    width: 0.2,
    height: 0.2
  },
  {
    color: 'black',
    x: -0.06666666666666667,
    y: -0.7333333333333333,
    width: 0.06666666666666667,
    height: 0.6666666666666666
  },
  {
    color: 'black',
    x: -0.4,
    y: 0.6,
    width: 0.43333333333333335,
    height: 0.06666666666666667
  } ];

var FieldLocationArtist = function(options) {
  utils.requireOptions(options, 'context', 'metrics', 'field');

  this.context = options.context;
  this.field = options.field;
  this.metrics = options.metrics;
};

FieldLocationArtist.prototype.draw = function(location, x, y) {

  if (location.detonated) {
    this._drawStar(x, y);
    return;
  }

  if (location.flagged) {
    this._drawFlag(x, y);
    return;
  }

  if (!location.dug) {

    this._drawDirt(x, y);

  } else {

    var mineCount = this.field.countMines(x, y);
    if (mineCount > 0) {
      this._drawCount(x, y, mineCount);
    }

  }

};

FieldLocationArtist.prototype._drawDirt = function(x, y) {
  var self = this;
  dirtOffsets.forEach(function(offset) {
    self._drawDirtBox(x, y, offset);
  });
};

FieldLocationArtist.prototype._drawDirtBox = function(x, y, offset) {
  var pt = this.metrics.locationToScaledOffsetPoint(x, y, offset.x, offset.y);
  var dirtSize = this.metrics.scaleScalar(0.1);
  var ctx = this.context;

  ctx.beginPath();
  ctx.rect(pt.x, pt.y, dirtSize, dirtSize);
  ctx.fillStyle = 'black';
  ctx.fill();
};

FieldLocationArtist.prototype._drawCount = function(x, y, count) {
  var center = this.metrics.locationToCenterPoint(x, y);
  var ctx = this.context;

  ctx.fillStyle    = countColor(count);
  ctx.font         = font(this.metrics.locationFontSize());
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillText(count, center.x, center.y);
};

FieldLocationArtist.prototype._drawStar = function(x, y) {

  var ctx = this.context;
  var center = this.metrics.locationToCenterPoint(x, y);

  ctx.beginPath();
  var pt = this._starOffsetToPoint(center, 0);
  ctx.moveTo(pt.x, pt.y);

  for(var i = 1; i < starOffsets.length; i++) {
    pt = this._starOffsetToPoint(center, i);
    ctx.lineTo(pt.x, pt.y);
  }

  ctx.closePath();
  ctx.fillStyle = 'yellow';
  ctx.fill();
  ctx.stroke();

  //center
  ctx.beginPath();
  var r = this.metrics.scaleScalar(1/20);
  ctx.arc(center.x, center.y, r, 0, 2*Math.PI, false);
  ctx.fillStyle='red';
  ctx.fill();
  ctx.stroke();
};

FieldLocationArtist.prototype._starOffsetToPoint = function(center, starPointIndex) {
  var offset = starOffsets[starPointIndex];
  return this.metrics.applyScaledOffsetsToCenter(center, offset.x, offset.y);
};

FieldLocationArtist.prototype._drawFlag = function(x, y) {
  var center = this.metrics.locationToCenterPoint(x, y);
  var self = this;

  flagRects.forEach(function(r) {
    var upperLeft = self.metrics.applyScaledOffsetsToCenter(center, r.x, r.y);
    var w = self.metrics.scaleScalar(r.width);
    var h = self.metrics.scaleScalar(r.height);
    self._fillRect(r.color, upperLeft.x, upperLeft.y, w, h);
  });
};

FieldLocationArtist.prototype._fillRect = function(color, x, y, w, h) {
  var ctx = this.context;
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = color;
  ctx.fill();
};

module.exports = FieldLocationArtist;
