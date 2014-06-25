var utils = require('../utils');

var CursorArtist = function(options) {
  utils.requireOptions(options, 'context', 'metrics');

  this.metrics = options.metrics;
  this.context = options.context;
};

CursorArtist.prototype.draw = function(x, y) {
  var ctx = this.context;
  var rect = this.metrics.locationRect(x, y);
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.width, rect.height);
  ctx.lineWidth = 1;
  ctx.stroke();
};

module.exports = CursorArtist;
