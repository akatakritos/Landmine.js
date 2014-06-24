var MineField = require('./minefield');
var FieldLocationArtist = require('./artists/fieldlocationartist');
var CursorArtist = require('./artists/cursorartist');
var CanvasMetrics = require('./artists/canvasmetrics');
var Cursor = require('./cursor');
var EventDispatcher = require('./eventdispatcher');

var Game = function(options) {
  if (typeof options === 'undefined') {
    options = {};
  }

  var canvasId = options.canvas || "landmine";
  var canvas = document.getElementById(canvasId);
  this.context = canvas.getContext('2d');
  this.canvas = canvas;

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

  this.cursor = new Cursor(0, 0, this.field);

  this.bindEvents();
};

Game.prototype.draw = function() {
  var self = this;

  this.clear();

  this.field.forEach(function(location, x, y) {
    self.locationArtist.draw(location, x, y);
  });

  this.cursorArtist.draw(this.cursor.x, this.cursor.y);
};

Game.prototype.start = function() {
  this.draw();
};

Game.prototype.clear = function() {
  this.context.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
};

Game.prototype.bindEvents = function() {
  var self = this;
  var dispatcher = new EventDispatcher(this.canvas);
  dispatcher.on('move:left', function() {
    self.cursor.moveLeft();
    self.draw();
  });

  dispatcher.on('move:right', function() {
    self.cursor.moveRight();
    self.draw();
  });

  dispatcher.on('move:up', function() {
    self.cursor.moveUp();
    self.draw();
  });

  dispatcher.on('move:down', function() {
    self.cursor.moveDown();
    self.draw();
  });

  dispatcher.on('dig', function() {
    self.field.get(self.cursor.x, self.cursor.y).dig();
    self.draw();
  });

};


module.exports = Game;
