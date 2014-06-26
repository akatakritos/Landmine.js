var utils = require('../utils');

var StatusBarArtist = function(options) {
  utils.requireOptions(options, 'metrics', 'context');
  this.metrics = options.metrics;
  this.context = options.context;
};

StatusBarArtist.prototype.draw = function(status) {
  var ctx = this.context;
  ctx.fillStyle = 'black';


  if (typeof status.timeRemaining !== 'undefined') {
    this._drawTimeRemaining(status.timeRemaining);
  }

  if (typeof status.score !== 'undefined') {
    this._drawScore(status.score);
  }

  if (typeof status.minesRemaining !== 'undefined') {
    this._drawMinesRemaining(status.minesRemaining);
  }

  if (typeof status.level !== 'undefined') {
    this._drawLevel(status.level);
  }
};

StatusBarArtist.prototype._drawTimeRemaining = function(timeRemaining) {
  var corner = this.metrics.statusBarCorner('topleft');
  var ctx = this.context;

  ctx.font = this.font();
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText("Time: " + timeRemaining, corner.x, corner.y);
};

StatusBarArtist.prototype._drawMinesRemaining = function(minesRemaining) {
  var corner = this.metrics.statusBarCorner("bottomleft");
  var ctx = this.context;

  ctx.font = this.font();
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  ctx.fillText("Mines: " + minesRemaining, corner.x, corner.y);
};

StatusBarArtist.prototype._drawLevel = function(level) {
  var corner = this.metrics.statusBarCorner('topright');
  var ctx = this.context;

  ctx.font = this.font();
  ctx.textAlign = 'right';
  ctx.textBaseline = 'top';
  ctx.fillText("Level: " + level, corner.x, corner.y);
};

StatusBarArtist.prototype._drawScore = function(score) {
  var ctx = this.context;
  var pt = this.metrics.statusBarCenter();

  ctx.font = this.scoreFont();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(score, pt.x, pt.y);
};

StatusBarArtist.prototype.scoreFont = function() {
  var fontSize = this.metrics.statusBarFontSize();
  return "" + fontSize + "px Arial";
};

StatusBarArtist.prototype.font = function() {
  var fontSize = this.metrics.statusBarFontSize() * 0.50;
  return "" + fontSize + "px Arial";
};

module.exports = StatusBarArtist;
