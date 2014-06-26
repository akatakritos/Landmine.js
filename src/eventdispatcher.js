var EventHandler = require('./eventhandler');
var eventMap = {
  37 : "move:left",    //left arrow
  38 : "move:up",      //up arrow
  39 : "move:right",   //right arrow
  40 : "move:down",    //down arrow
  16 : "dig",          //shift
  90 : "flag"          //z
};
var EventDispatcher = function(element) {
  this.handlers = {};
  var self = this;

  element.setAttribute('tabindex', '1');
  element.focus();

  element.addEventListener('keydown', function(e) {
    if (typeof(eventMap[e.keyCode]) !== 'undefined') {
      self.fire(eventMap[e.keyCode]);
    }
  });

};

EventHandler.extend(EventDispatcher);

module.exports = EventDispatcher;
