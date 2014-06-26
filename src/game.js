var MineField = require('./minefield');
var FieldLocationArtist = require('./artists/fieldlocationartist');
var CursorArtist = require('./artists/cursorartist');
var CanvasMetrics = require('./artists/canvasmetrics');
var Cursor = require('./cursor');
var EventDispatcher = require('./eventdispatcher');
var StatusBarArtist = require('./artists/statusbarartist');
var Level = require('./level');
var EventHandler = require('./eventhandler');
var Score = require('./score');

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
    width: 14,
    height: 10
  });

  this.metrics = new CanvasMetrics({
    canvasSize: this.canvasSize,
    fieldSize: this.field,
    statusBar: true
  });

  this.locationArtist = new FieldLocationArtist({
    metrics: this.metrics,
    context: this.context,
    field:   this.field
  });

  this.cursorArtist = new CursorArtist({
    context: this.context,
    metrics: this.metrics
  });

  this.statusBarArtist = new StatusBarArtist({
    context: this.context,
    metrics: this.metrics
  });

  this.cursor = new Cursor(0, 0, this.field);


  this.level = new Level({
    field: this.field,
    levelNumber: 1
  });

  this.score = new Score(this);

  this.bindEvents();
};

EventHandler.extend(Game);

Game.prototype.draw = function() {
  var self = this;

  this.clear();

  this.field.forEach(function(location, x, y) {
    self.locationArtist.draw(location, x, y);
  });

  this.cursorArtist.draw(this.cursor.x, this.cursor.y);
  this.statusBarArtist.draw({
    timeRemaining: this.score.timeBonusRemaining(),
    minesRemaining: this.level.minesRemaining(),
    score: this.score.current(),
    level: this.level.levelNumber
  });
};

Game.prototype.start = function() {
  this.draw();
  this.fire('started');
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
    var spot = self.field.get(self.cursor.x, self.cursor.y);

    if (spot.hasMine) {
      self.field.detonateMines();
      self.fire('detonated');
    } else {
      spot.dig();
      self.level.dig();
      self.fire('dig:safe');
    }

    self.draw();
    if (self.level.finished()) {
      self.field.flagAllMines();
      self.fire('level:finished');
      alert("YAY!");
    }
  });

  dispatcher.on('flag', function() {
    var spot = self.field.get(self.cursor.x, self.cursor.y);
    spot.flag();

    if (spot.flagged) {
      self.level.flag();
      self.fire('flag:added');
    } else {
      self.level.unflag();
      self.fire('flag:removed');
    }

    self.draw();
  });

};


module.exports = Game;
