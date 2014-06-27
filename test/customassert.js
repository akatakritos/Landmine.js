var assert = require('assert');

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

module.exports = assert;
