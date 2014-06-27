var Game = require('./game');
var GameArtist = require('./artists/gameartist');
var EventDispatcher = require('./eventdispatcher');
var utils = require('./utils');

var Landmine = window.Landmine || {};

Landmine.start = function(options) {
  utils.requireOptions(options, 'canvas');

  var eventDispatcher = new EventDispatcher(options.canvas);

  var game = new Game({
    canvas: options.canvas,
    eventDispatcher: eventDispatcher
  });

  //jshint unused:false
  var gameArtist = new GameArtist({
    canvas: options.canvas,
    game: game
  });

  game.start();

};

window.Landmine = Landmine;
