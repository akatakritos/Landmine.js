var EventHandler = require('../src/eventhandler');

var MockEventDispatcher = function() {
};

EventHandler.extend(MockEventDispatcher);

module.exports = MockEventDispatcher;
