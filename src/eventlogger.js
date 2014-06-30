var utils = require('./utils');

var EventLogger = function(options) {
  utils.requireOptions(options, 'eventDispatcher');

  this.eventDispatcher = options.eventDispatcher;
  this.events = [];

  var self = this;
  this.eventDispatcher.on('any', function(event) {
    self.events.push({
      event: event,
      time: new Date().getTime()
    });
  });
};

module.exports = EventLogger;
