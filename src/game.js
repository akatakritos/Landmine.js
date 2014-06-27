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
    game: this,
  });

  this.score = options.scorer || new Score(this);
  this.state = 'pre-game';

  this.bindEvents(options.eventDispatcher);
};

EventHandler.extend(Game);

Game.prototype.start = function() {
  this.fire('started');
  this.fire('invalidated');
};

Game.prototype.canPlay = function() {
  return this.state !== 'between-levels' && this.state !== 'pre-game';
};

Game.prototype.bindEvents = function(dispatcher) {
  var self = this;

  dispatcher.on('confirm', function() {
    if (self.state === 'pre-game') {
      self.state = "playing";
      self.fire('level:started');
      self.fire('invalidated');
    }
  });

  dispatcher.on('move:left', function() {
    if (!self.canPlay()) { return; }

    self.cursor.moveLeft();
    self.fire('invalidated');
  });

  dispatcher.on('move:right', function() {
    if (!self.canPlay()) { return; }

    self.cursor.moveRight();
    self.fire('invalidated');
  });

  dispatcher.on('move:up', function() {
    if (!self.canPlay()) { return; }

    self.cursor.moveUp();
    self.fire('invalidated');
  });

  dispatcher.on('move:down', function() {
    if (!self.canPlay()) { return; }

    self.cursor.moveDown();
    self.fire('invalidated');
  });

  dispatcher.on('dig', function() {
    if (!self.canPlay()) { return; }

    var spot = self.field.get(self.cursor.x, self.cursor.y);

    if (spot.hasMine) {
      self.field.detonateMines();
      self.fire('detonated');
    } else {
      if (spot.dig()) {
        self.fire('dig:safe');
      }
    }

    if (self.level.finished()) {
      self.field.flagAllMines();
      self.state = 'between-levels';
      self.fire('level:finished');
    }

    self.fire('invalidated');
  });

  dispatcher.on('flag', function() {
    var spot = self.field.get(self.cursor.x, self.cursor.y);
    spot.flag();

    if (spot.flagged) {
      self.fire('flag:added');
    } else {
      self.fire('flag:removed');
    }

    self.fire('invalidated');
  });

};


module.exports = Game;
