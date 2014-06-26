var assert = require('assert');
var EventHandler = require('../src/eventhandler');

describe('EventHandler', function() {
  var Klass;
  beforeEach(function() {
    Klass = function() {
      /*n noop */
    };
  });

  describe('extending a klass', function() {
    it('adds a on function to the prototype', function() {
      EventHandler.extend(Klass);
      assert.equal('function', typeof Klass.prototype.on);
    });

    it('adds a fire function to the prototype', function() {
      EventHandler.extend(Klass);
      assert.equal('function', typeof Klass.prototype.fire);
    });
  });

  describe('registering and firing events', function() {
    var instance;
    beforeEach(function() {
      EventHandler.extend(Klass);
      instance = new Klass();
    });

    it('fires the event to a registered listener', function() {
      var fired = false;
      instance.on('event', function() { fired = true; });

      instance.fire('event');

      assert(fired === true, 'it didnt fire!');
    });

    it('can fire to multiple registered handlers', function() {
      var aFired = false, bFired = false;
      instance.on('event', function() { aFired = true; });
      instance.on('event', function() { bFired = true; });

      instance.fire('event');

      assert(aFired === true, "first handler didnt fire");
      assert(bFired === true, "second handler didnt fire");
    });

    it('can pass arbitrary arguments to the handlers', function() {
      var a, b, c;
      instance.on('event', function(p1, p2, p3) {
        a = p1;
        b = p2;
        c = p3;
      });

      instance.fire('event', 1, 2, 3);

      assert.equal(1, a);
      assert.equal(2, b);
      assert.equal(3, c);
    });

  });
});
