var utils = require('../utils');


var countColor = function(count) {
  return "blue";
};

var font = function(size) {
  var pxSize = size;
  return "bold " + pxSize + "px Arial";
};

var dirtOffsets = [
  { x: 0.6, y: 0.2 },
  { x: 0.3, y: 0.6 },
  { x: 0.7, y: 0.7 }];

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
  this.size = options.metrics.locationSize;
};

FieldLocationArtist.prototype.draw = function(location, x, y) {
  //this._drawBorder(x, y);
  if (!location.dug) {

    if (location.flagged) {
      this._drawFlag(x, y);
    } else {
      this._drawDirt(x, y);
    }

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
  var a = x * this.size + offset.x * this.size,
      b = y * this.size + offset.y * this.size,
      dirtSize = this.size * 0.1,
      ctx = this.context;

  ctx.beginPath();
  ctx.rect(a, b, dirtSize, dirtSize);
  ctx.fillStyle = 'black';
  ctx.fill();
};

FieldLocationArtist.prototype._drawCount = function(x, y, count) {
  var center = utils.squareCenter(x * this.size, y * this.size, this.size);
  var ctx = this.context;

  ctx.fillStyle    = countColor(count);
  ctx.font         = font(this.size);
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillText(count, center.x, center.y);
};


FieldLocationArtist.prototype._drawFlag = function(x, y) {
  var center = utils.squareCenter(x * this.size, y * this.size, this.size, this.size);
  var self = this;

  flagRects.forEach(function(r) {
    self._fillRect(
      r.color,
      center.x + r.x * (self.size/ 2),
      center.y + r.y * (self.size / 2),
      r.width * self.size,
      r.height * self.size);
  });
};

FieldLocationArtist.prototype._fillRect = function(color, x, y, w, h) {
  var ctx = this.context;
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = color;
  ctx.fill();
};

FieldLocationArtist.prototype._drawBorder = function(x, y) {
  var ctx = this.context;
  ctx.beginPath();
  ctx.rect(x * this.size, y * this.size, this.size, this.size);
  ctx.lineWidth = 1;
  ctx.stroke();
};

module.exports = FieldLocationArtist;
