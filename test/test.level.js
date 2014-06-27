var Level = require('../src/level');
var MockGame = require('./mockgame');
var assert = require('assert');

describe('Level', function() {
  var level;
  var game;
  beforeEach(function() {
    game = new MockGame();

    level = new Level({
      game: game
    });
  });

  describe('moveNext', function() {
    it('moves to the next level', function() {
      assert.equal(1, level.levelNumber);
      level.moveNext();
      assert.equal(2, level.levelNumber);
    });

    it('resets the finished properties', function() {
      level.dig();
      level.moveNext();
      assert(level.finished() === false);
    });
  });

  describe('mines', function() {
    it ('has 4 mines per level', function() {
      assert.equal(4, level.mines());

      level.moveNext();
      assert.equal(8, level.mines());
    });
  });

  describe('minesRemaining', function() {
    it('decreases when the player flags a spot', function() {
      var mines = level.minesRemaining();
      game.fire('flag:added');

      assert.equal(mines-1, level.minesRemaining());
    });

    it('increases when a player unflags a mine', function() {
      game.fire('flag:added');
      var mines = level.minesRemaining();
      game.fire('flag:removed');

      assert.equal(mines+1, level.minesRemaining());
    });
  });

});
