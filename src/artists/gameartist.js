var FieldLocationArtist = require('./fieldlocationartist');
var CursorArtist = require('./cursorartist');
var CanvasMetrics = require('./canvasmetrics');
var StatusBarArtist = require('./statusbarartist');
var utils = require('../utils');

var GameArtist = function(options) {
  utils.requireOptions(options, 'game', 'canvas');

  this.game = options.game;
  var canvas = options.canvas;
  this.context = canvas.getContext('2d');

  this.canvasSize = {
    width: canvas.width,
    height: canvas.height
  };

  this.metrics = new CanvasMetrics({
    canvasSize: this.canvasSize,
    fieldSize: this.game.field,
    statusBar: true
  });

  this.locationArtist = new FieldLocationArtist({
    metrics: this.metrics,
    context: this.context,
    field:   this.game.field
  });

  this.cursorArtist = new CursorArtist({
    context: this.context,
    metrics: this.metrics
  });

  this.statusBarArtist = new StatusBarArtist({
    context: this.context,
    metrics: this.metrics
  });

  var self = this;
  this.game.on('invalidated', function() {
    self.draw();
  });
};

GameArtist.prototype.draw = function() {
  var self = this;
  var game = this.game;

  this.clear();

  this.game.field.forEach(function(location, x, y) {
    self.locationArtist.draw(location, x, y);
  });

  this.statusBarArtist.draw({
    timeRemaining: game.score.timeBonusRemaining(),
    minesRemaining: game.level.minesRemaining(),
    score: game.score.current(),
    level: game.level.levelNumber
  });

  if (this.game.state === 'pre-game' || this.game.state == 'between-levels') {
    this._drawStartPrompt();
  } else {
    this.cursorArtist.draw(game.cursor.x, game.cursor.y);
  }
};

GameArtist.prototype.clear = function() {
  this.context.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
};

GameArtist.prototype._drawStartPrompt = function() {
  this._drawPrompt('Press Enter to Start');
};

GameArtist.prototype._drawPrompt = function(prompt) {
  var rect = this.metrics.promptRectangle();
  var ctx = this.context;

  ctx.clearRect(rect.x, rect.y, rect.width, rect.height);
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.width, rect.height);
  ctx.stroke();

  var fontSize = this.metrics.promptFontSize();
  var center = utils.rectangleCenter(rect.x, rect.y, rect.width, rect.height);
  ctx.font = "" + fontSize + "px Arial";
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(prompt, center.x, center.y);
};
module.exports = GameArtist;
