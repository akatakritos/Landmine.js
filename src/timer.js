var Timer = function(interval) {
  this.interval = interval;
  this.eventHandlers = {};
};

Timer.prototype.on = function(event, handler) {
  var handlers = this.eventHandlers[event] || (this.eventHandlers[event] = []);
  handlers.push(handler);
};

Timer.prototype.fire = function(event) {
  var args = Array.prototype.slice.call(arguments, 1);
  if (this.eventHandlers[event]) {
    this.eventHandlers[event].forEach(function(cb) {
      cb.apply(null, args);
    });
  }
};

Timer.prototype.start = function() {
  var self = this;
  this._intervalId = setInterval(function() {
    self.fire('tick');
  }, this.interval);
};

Timer.prototype.stop = function() {
  clearTimeout(this._intervalId);
};

module.exports = Timer;
