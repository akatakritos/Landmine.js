var utils = require('./utils');
var MineField = require('./minefield');
var Cursor = require('./cursor');
var Level = require('./level');
var EventHandler = require('./eventhandler');
var Score = require('./score');

var Game = function(options) {
  utils.requireOptions(options, 'eventDispatcher');

  this.field = new MineField({
    width: 14,
    height: 10
  });

  this.cursor = new Cursor(0, 0, this.field);

  this.level = new Level({
    field: this.field,
    levelNumber: 1
  });

  this.score = new Score(this);

  this.bindEvents(options.eventDispatcher);
};

EventHandler.extend(Game);

Game.prototype.start = function() {
  this.fire('started');
  this.fire('invalidated');
};


Game.prototype.bindEvents = function(dispatcher) {
  var self = this;
  dispatcher.on('move:left', function() {
    self.cursor.moveLeft();
    self.fire('invalidated');
  });

  dispatcher.on('move:right', function() {
    self.cursor.moveRight();
    self.fire('invalidated');
  });

  dispatcher.on('move:up', function() {
    self.cursor.moveUp();
    self.fire('invalidated');
  });

  dispatcher.on('move:down', function() {
    self.cursor.moveDown();
    self.fire('invalidated');
  });

  dispatcher.on('dig', function() {
    var spot = self.field.get(self.cursor.x, self.cursor.y);

    if (spot.hasMine) {
      self.field.detonateMines();
      self.fire('detonated');
    } else {
      var dug = spot.dig();
      self.level.dig();
      if (dug) {
        self.fire('dig:safe');
      }
    }

    self.fire('invalidated');
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

    self.fire('invalidated');
  });

};


module.exports = Game;
