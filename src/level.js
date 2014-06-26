var MinePlacer = require('./mineplacer');
var utils = require('./utils');

var Level = function(options) {
  utils.requireOptions(options, 'field', 'levelNumber');
  this.field = options.field;
  this.levelNumber = options.levelNumber;
  this.spacesCleared = 0;
  this.flags = 0;

  var miner = new MinePlacer();
  miner.placeMines(this.field, this.mines());
};

Level.prototype.mines = function() {
  return (this.levelNumber+1) * 4;
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
