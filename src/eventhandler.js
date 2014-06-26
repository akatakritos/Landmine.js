var EventHandler = {};

var eventListFor = function(thisObj) {
  if (!thisObj.__events__) {
    thisObj.__events__ = {};
  }

  return thisObj.__events__;
};

var handlersFor = function(thisObj, event) {
  var list = eventListFor(thisObj);
  return list[event] || (list[event] = []);
};

EventHandler.extend = function(klass) {

  klass.prototype.on = function(event, handler) {
    var handlers = handlersFor(this, event);
    handlers.push(handler);
  };

  klass.prototype.fire = function(event) {
    var args = Array.prototype.slice.call(arguments, 1);
    var handlers = handlersFor(this, event);

    handlers.forEach(function(handler) {
      handler.apply(null, args);
    });
  };
};

module.exports = EventHandler;
