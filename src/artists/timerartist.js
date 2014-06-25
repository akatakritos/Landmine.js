var utils = require('../utils');

var TimerArtist = function(options) {
  utils.requireOptions(options, 'metrics', 'context');
  this.metrics = options.metrics;
  this.context = options.context;
};

TimerArtist.prototype.draw = function(timeRemaining) {
  var ctx = this.context;
  var pt = this.metrics.statusBarCenter();
  ctx.fillStyle = 'black';
  ctx.font = this.font();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText("Time: " + timeRemaining, pt.x, pt.y);

};

TimerArtist.prototype.font = function() {
  var fontSize = this.metrics.statusBarFontSize();
  return "" + fontSize + "px Arial";
};

module.exports = TimerArtist;
