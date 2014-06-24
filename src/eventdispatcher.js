var eventMap = {
  37 : "move:left",    //left arrow
  38 : "move:up",      //up arrow
  39 : "move:right",   //right arrow
  40 : "move:down",    //down arrow
  32 : "dig"           //spacebar
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

EventDispatcher.prototype.on = function(eventName, handler) {
  var handleList = this.handlers[eventName] || (this.handlers[eventName] = []);
  handleList.push(handler);
};

EventDispatcher.prototype.fire = function(eventName) {
  if (typeof this.handlers[eventName] !== 'undefined') {
    this.handlers[eventName].forEach(function(handler) {
      handler();
    });
  }
};

module.exports = EventDispatcher;
