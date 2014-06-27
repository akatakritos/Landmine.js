var EventHandler = require('../src/eventhandler');
var MineField = require('../src/minefield');

var MockGame = function() {

  this.field = new MineField({
    width: 14,
    height: 10
  });
};

EventHandler.extend(MockGame);

module.exports = MockGame;
