var MineField = require('./minefield');
var FieldLocationArtist = require('./artists/fieldlocationartist');

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

  this.locationArtist = new FieldLocationArtist({
    minefield: this.field,
    canvasSize: this.canvasSize,
    context: this.context
  });
};

Game.prototype.draw = function() {
  var self = this;
  this.field.forEach(function(location, x, y) {
    self.locationArtist.draw(location, x, y);
  });
};

Game.prototype.start = function() {
  this.draw();
};

module.exports = Game;
