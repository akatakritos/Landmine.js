var utils = require('../utils');
var dirtOffsets = [
  { x: 0.6, y: 0.2 },
  { x: 0.3, y: 0.6 },
  { x: 0.7, y: 0.7 }];

var FieldLocationArtist = function(options) {
  utils.requireOptions(options, 'context', 'metrics');
  this.context = options.context;

  this.size = options.metrics.locationSize;
};

FieldLocationArtist.prototype.draw = function(location, x, y) {
  //this._drawBorder(x, y);
  if (!location.dug) {
    this._drawDirt(x, y);
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

FieldLocationArtist.prototype._drawBorder = function(x, y) {
  var ctx = this.context;
  ctx.beginPath();
  ctx.rect(x * this.size, y * this.size, this.size, this.size);
  ctx.lineWidth = 1;
  ctx.stroke();
};

module.exports = FieldLocationArtist;
