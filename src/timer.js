var Timer = function(interval) {
  this.interval = interval;
  this.eventHandlers = {};
  this.lastStart = 0;
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
  if (this._intervalId) {
    throw new Error("Timer already started!");
  }

  var self = this;
  this.lastTick = Date.now();
  this._intervalId = setInterval(function() {
    self.fire('tick', Date.now() - self.lastTick);
  }, this.interval);
};

Timer.prototype.stop = function() {
  clearTimeout(this._intervalId);
  this._intervalId = null;
};

module.exports = Timer;
