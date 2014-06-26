var Timer = require('./timer');

var Score = function(game) {
  this.score = 0;
  this.timeEllapsed = 0;

  this.timer = new Timer(1000);
  this.timer.on('tick', function(interval) {
    self.timeEllapsed += interval;
  });

  var self = this;
  game.on("dig:safe", function() {
    self.score++;
  });

  game.on('level:finished', function() {
    self.score += self.timeBonusRemaining();
    self.resetLevel();
  });

  game.on('detonated', function() {
    self.timer.stop();
  });

  game.on('started', function() {
    self.resetGame();
  });
};

Score.prototype.current = function() {
  return this.score;
};

Score.prototype.timeBonusRemaining = function() {
  return 180 - this._secondsEllapsed();
};

Score.prototype._secondsEllapsed = function() {
};

Score.prototype.resetLevel = function() {
  this.timeEllapsed = 0;
};

Score.prototype.resetGame = function() {
  this.timeEllapsed = 0;
  this.score = 0;
};

module.exports = Score;
