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
  this.state = 'pre-game';
  this.cursor.x = 0;
  this.cursor.y = 0;
};

Game.prototype.canPlay = function() {
  return this.state !== 'between-levels' && this.state !== 'pre-game' && this.state !== 'detonated';
};

Game.prototype.startLevel = function() {
  this.state = "playing";
  this.cursor.x = 0;
  this.cursor.y = 0;
  this.fire('level:started');
  this.fire('invalidated');
};

Game.prototype.bindEvents = function(dispatcher) {
  var self = this;

  dispatcher.on('confirm', function() {
    if (self.state === 'pre-game') {
      self.startLevel();
    } else if (self.state === 'between-levels') {
      self.level.moveNext();
      self.startLevel();
    } else if (self.state === 'detonated') {
      self.level.reset();
      self.start();
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
    if (spot.flagged) {
      return;
    }

    if (spot.hasMine) {
      self.field.detonateMines();
      self.fire('detonated');
      self.state = 'detonated';
      self.fire('game:over', {
        score: self.score.current(),
        level: self.level.levelNumber
      });
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
    if (!self.canPlay()) { return; }
    var spot = self.field.get(self.cursor.x, self.cursor.y);
    if (spot.dug) {
      return;
    }

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
