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

FieldLocationArtist.prototype._drawFlag = function(x, y) {
  var center = utils.squareCenter(x * this.size, y * this.size, this.size);
  var ctx = this.context;

  ctx.fillStyle    = 'red';
  ctx.font         = font(this.size);
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillText("F", center.x, center.y);
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


FieldLocationArtist.prototype._drawBorder = function(x, y) {
  var ctx = this.context;
  ctx.beginPath();
  ctx.rect(x * this.size, y * this.size, this.size, this.size);
  ctx.lineWidth = 1;
  ctx.stroke();
};

module.exports = FieldLocationArtist;
