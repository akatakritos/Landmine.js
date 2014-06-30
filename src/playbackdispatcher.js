var utils = require('./utils');
var EventHandler = require('./eventhandler');

var PlaybackDispatcher = function(options) {
  utils.requireOptions(options, 'events');
  this.events = options.events;
  this.current = 0;
};

EventHandler.extend(PlaybackDispatcher);


var playNext = function() {
  var self = this;
  var events = self.events;
  var current = self.current;

  console.log('playing back', events[current].event);
  self.fire(events[current].event);
  if (events[current+1]) {
    setTimeout(playNext.bind(self), events[current+1].time - events[current].time);
    self.current++;
  }
};

PlaybackDispatcher.prototype.start = function() {
  setTimeout(playNext.bind(this), 0);

};

module.exports = PlaybackDispatcher;
