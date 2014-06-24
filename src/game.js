var MineField = require('./minefield');
var FieldLocationArtist = require('./artists/fieldlocationartist');
var CursorArtist = require('./artists/cursorartist');
var CanvasMetrics = require('./artists/canvasmetrics');

var Game = function(options) {
  if (typeof options === 'undefined') {
    options = {};
  }

  var canvasId = options.canvas || "landmine";
  var canvas = document.getElementById(canvasId);
  this.context = canvas.getContext('2d');
  this.canvasSize = {
    width: canvas.width,
    height: canvas.height
  };

  this.field = new MineField({
    width: 15,
    height: 12
  });

  this.metrics = new CanvasMetrics({
    canvasSize: this.canvasSize,
    fieldSize: this.field
  });

  this.locationArtist = new FieldLocationArtist({
    metrics: this.metrics,
    context: this.context
  });

  this.cursorArtist = new CursorArtist({
    context: this.context,
    metrics: this.metrics
  });
};

Game.prototype.draw = function() {
  var self = this;
  this.field.forEach(function(location, x, y) {
    self.locationArtist.draw(location, x, y);
  });

  this.cursorArtist.draw(1, 2);
};

Game.prototype.start = function() {
  this.draw();
};

module.exports = Game;