var utils = require('../utils');

var CursorArtist = function(options) {
  utils.requireOptions(options, 'context', 'metrics');

  this.size = options.metrics.locationSize;
  this.context = options.context;
};

CursorArtist.prototype.draw = function(x, y) {
  console.log('drawing cursor', x, y);
  console.log(this);
  var ctx = this.context;
  ctx.beginPath();
  ctx.rect(x * this.size, y * this.size, this.size, this.size);
  ctx.lineWidth = 1;
  ctx.stroke();
};

module.exports = CursorArtist;
