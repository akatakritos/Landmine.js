var MockEventDispatcher = require('./mockeventdispatcher');
var assert = require('./customassert');
var Game = require('../src/game');
var helpers = require('./gamehelpers');


describe('Game', function() {
  var game;
  var events;
  beforeEach(function() {
    events = new MockEventDispatcher();

    game = new Game({
      eventDispatcher: events,
      scorer: {}
    });
  });

  describe('integration tests', function() {

    it('no moving while in pre-game', function() {
      assert.notFired(game, 'invalidated', function() {
        events.fire('move:left');
      });
    });

    it('invalidates when moving', function() {
      events.fire('confirm');
      assert.fired(game, 'invalidated', function() {
        events.fire('move:right');
      });
    });

    it('fires level:finished when the level is done', function() {
      events.fire('confirm');

      assert.fired(game, 'level:finished', function() {
        helpers.digAll(game, events);
      });

      assert.equal('between-levels', game.state);
    });

    it('fires the detonated event', function() {
      events.fire('confirm');

      assert.fired(game, 'detonated', function() {
        helpers.digAMine(game, events);
      });

    });

    describe('losing', function() {
      beforeEach(function() {
        events.fire('confirm');
        helpers.digAMine(game, events);
      });

      it('sets the state to detonated', function() {
        assert.equal('detonated', game.state);
      });

      it('detonates all the mines', function() {
        game.field.forEach(function(spot, x, y) {
          if (spot.hasMine) {
            assert(spot.detonated === true, "the spot at {x}, {y} has a mine and should be detonated".replace('{x}', x).replace('{y}', y));
          }
        });
      });

      it('doesnt let you move after losing', function() {
        assert.notFired(game, 'invalidated', function() {
          events.fire('move:left');
        });
      });

      it('resets the game after confirming a loss', function() {
        events.fire('confirm');
        assert.equal('pre-game', game.state);

        events.fire('confirm');
        assert.equal(1, game.level.levelNumber);
      });
    });

    describe('multiple levels', function() {

      it('cant move while between levels', function() {
        events.fire('confirm');
        helpers.digAll(game, events);

        assert.equal('between-levels', game.state);
        assert.notFired(game, 'move:right', function() {
          events.fire('move:right');
        });
      });

      it('moves to level two after confirming between levels', function() {
        events.fire('confirm');
        helpers.digAll(game, events);

        assert.equal('between-levels', game.state);

        events.fire('confirm');
        assert.equal('playing', game.state);
        assert.equal(2, game.level.levelNumber);
        assert.equal(8, game.level.minesRemaining());
        assert(game.level.finished() === false);
      });
    });
  });
});
