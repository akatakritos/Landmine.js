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
      scorer: {
        current: function() { return 100; }
      }
    });
  });

  describe('integration tests', function() {

    it('no moving while in pre-game', function() {
      assert.notFired(game, 'invalidated', function() {
        events.fire('move:left');
      });
    });

    it('disallows flagging in a pre-game', function() {
      assert.notFired(game, 'flag:added', function() {
        assert.notFired(game, 'flag:removed', function() {
          assert.notFired(game, 'invalidated', function() {
            events.fire('flag');
            events.fire('flag'); //do it twice
          });
        });
      });
    });

    describe('general gameplay', function() {
      beforeEach(function() {
        events.fire('confirm'); //starts the game
      });

      it('invalidates when moving', function() {
        assert.fired(game, 'invalidated', function() {
          events.fire('move:right');
        });
      });

      it('fires level:finished when the level is done', function() {
        assert.fired(game, 'level:finished', function() {
          helpers.digAll(game, events);
        });

        assert.equal('between-levels', game.state);
      });

      it('fires the detonated event', function() {
        assert.fired(game, 'detonated', function() {
          helpers.digAMine(game, events);
        });
      });

      it('fires a gameOver event and passes the score', function() {
        var fired = false;
        game.on('gameOver', function(data) {
          fired = true;
          assert(typeof data.score !== 'undefined', 'did not pass the score');
        });

        helpers.digAMine(game, events);

        assert(fired === true, 'should have fired the gameOver event');
      });


      it ('doesnt let you dig a flagged spot', function() {
        events.fire('flag');
        assert.notFired(game, 'dig:safe', function() {
          events.fire('dig');
        });
      });

      it('doesnt let you dig a flagged mine either', function() {
        helpers.moveToMine(game, events);
        assert(game.field.get(game.cursor.x, game.cursor.y).hasMine === true);

        events.fire('flag');

        assert.notFired(game, 'detonated', function() {
          events.fire('dig');
        });
      });

      it('doesnt let you do flag operations on a dug spot', function() {
        events.fire('dig');

        assert.notFired(game, 'flag:added', function() {
          assert.notFired(game, 'flag:removed', function() {
            events.fire('flag');
          });
        });
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

      describe('confirming the loss', function() {
        beforeEach(function() {
          events.fire('confirm');
        });

        it ('returns the cursor back to the corner', function() {
          assert.equal(0, game.cursor.x);
          assert.equal(0, game.cursor.y);
        });

        describe('after confirming a loss', function() {
          beforeEach(function() {
            events.fire('confirm'); //reset
          });

          it('resets the game after confirming a loss', function() {
            assert.equal(1, game.level.levelNumber);
          });

          it ('returns the cursor to the top left', function() {
            assert.equal(0, game.cursor.x);
            assert.equal(0, game.cursor.y);
          });

          it('nothing is yet detonated or flagged', function() {
            game.field.forEach(function(spot) {
              assert(spot.dug === false, "the spot should not be dug");
              assert(spot.flagged === false, "the spot should not be flagged");
              assert(spot.detonated === false, 'the spot should not be detonated');
            });
          });
        });
      });
    });

    describe('multiple levels', function() {
      beforeEach(function() {
        events.fire('confirm');
        helpers.digAll(game, events);
      });

      it('cant move while between levels', function() {
        assert.equal('between-levels', game.state);
        assert.notFired(game, 'move:right', function() {
          events.fire('move:right');
        });
      });

      describe('starting the next level', function() {
        beforeEach(function() {
          assert.equal('between-levels', game.state);
          events.fire('confirm');
        });

        it('moves to level two after confirming between levels', function() {
          assert.equal('playing', game.state);
          assert.equal(2, game.level.levelNumber);
          assert.equal(8, game.level.minesRemaining());
          assert(game.level.finished() === false);
        });

        it('returns the cursor to the top left', function() {
          assert.equal(0, game.cursor.x);
          assert.equal(0, game.cursor.y);
        });

        it('has reset the field', function() {
          game.field.forEach(function(spot) {
            assert(spot.flagged === false, 'spots should be unflagged');
            assert(spot.detonated === false, 'spots should be undetonated');
            assert(spot.dug === false, 'spots should be undug');
          });
        });

        it('should set the correct number of mines', function() {
          var mines = 0;
          game.field.forEach(function(spot) {
            if (spot.hasMine) {
              mines++;
            }
          });

          assert.equal(game.level.mines(), mines);
        });
      });

    });
  });
});
