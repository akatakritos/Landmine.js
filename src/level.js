var MinePlacer = require('./mineplacer');
var utils = require('./utils');

var Level = function(options) {
  utils.requireOptions(options, 'game');

  var game = options.game;
  this.field = game.field;
  this.levelNumber = 1;
  this.spacesCleared = 0;
  this.flags = 0;

  var miner = new MinePlacer();
  miner.placeMines(this.field, this.mines());

  var self = this;
  game.on('dig:safe', function() {
    self.dig();
  });

  game.on('flag:added', function() {
    self.flag();
  });

  game.on('flag:removed', function() {
    self.unflag();
  });
};

Level.prototype.mines = function() {
  return this.levelNumber * 4;
};

Level.prototype.minesRemaining = function() {
  return this.mines() - this.flags;
};

Level.prototype.flag = function() {
  this.flags++;
};

Level.prototype.unflag = function() {
  this.flags--;
};

Level.prototype.dig = function() {
  this.spacesCleared++;
};

Level.prototype.spacesRemaining = function() {
  return this.field.width * this.field.height - this.spacesCleared - this.mines();
};

Level.prototype.finished = function() {
  return this.spacesRemaining() === 0;
};

module.exports = Level;
