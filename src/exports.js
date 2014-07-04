var Game = require('./game');
var GameArtist = require('./artists/gameartist');
var EventDispatcher = require('./eventdispatcher');
var utils = require('./utils');
var EventLogger = require('./eventlogger');
var PlaybackDispatcher = require('./playbackdispatcher');

var Landmine = window.Landmine || {};

Landmine.start = function(options) {
  utils.requireOptions(options, 'canvas');

  var eventDispatcher = options.eventDispatcher || new EventDispatcher(options.canvas);

  var game = new Game({
    canvas: options.canvas,
    eventDispatcher: eventDispatcher
  });

  //jshint unused:false
  var gameArtist = new GameArtist({
    canvas: options.canvas,
    game: game
  });

  var eventLogger = new EventLogger({
    eventDispatcher: eventDispatcher
  });

  Landmine.events = eventLogger;

  game.start();

};

Landmine.playback = function(options) {
  utils.requireOptions(options, 'canvas', 'events');
  var vcr = new PlaybackDispatcher({
    events: options.events
  });

  options.eventDispatcher = vcr;

  Landmine.start(options);

  vcr.start();

};

window.Landmine = Landmine;
