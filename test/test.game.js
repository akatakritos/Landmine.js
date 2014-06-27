var MockEventDispatcher = require('./mockeventdispatcher');
var assert = require('assert');
var Game = require('../src/game');
var helpers = require('./gamehelpers');

var didFire = function(model, event, action) {
  var fired = false;
  model.on(event, function() {
    fired = true;
  });

  action();

  return fired;
};

assert.notFired = function(model, event, action) {
  assert(!didFire(model, event, action), 'The ' + event + ' event should not have fired.');
};

assert.fired = function(model, event, action) {
  assert(didFire(model, event, action), 'The ' + event + ' event should have fired, but did not.');
};

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

    it('detonates all mines when you blow one up', function() {
      events.fire('confirm');

      assert.fired(game, 'detonated', function() {
        helpers.digAMine(game, events);
      });

      game.field.forEach(function(spot, x, y) {
        if (spot.hasMine) {
          assert(spot.detonated === true, "the spot at {x}, {y} has a mine and should be detonated".replace('{x}', x).replace('{y}', y));
        }
      });
    });

  });
});
