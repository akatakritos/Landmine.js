(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var utils = require('../utils');


var CanvasMetrics = function(options) {
  utils.requireOptions(options, 'canvasSize', 'fieldSize');


  this.statusBarHeight = 0;
  this.statusBar  = !!options.statusBar;
  this.canvasSize = options.canvasSize;
  this.fieldSize  = options.fieldSize;
  this.locationSize = this.calculateLocationSize(this.canvasSize, this.fieldSize);

  if (options.statusBar) {
    this.statusBarHeight = this.locationSize;
  }
};

CanvasMetrics.prototype.calculateLocationSize = function(canvasSize, fieldSize) {
  //if we have a status bar, we need to allow one extra locations height
  var fieldHeight = this.statusBar ? fieldSize.height + 1 : fieldSize.height;

  return Math.floor(Math.min(canvasSize.width / fieldSize.width, canvasSize.height / fieldHeight));
};
CanvasMetrics.prototype.locationToPoint = function(x, y) {
  return {
    x: x * this.locationSize,
    y: y * this.locationSize + this.statusBarHeight
  };
};

CanvasMetrics.prototype.locationToCenterPoint = function(x, y) {
  var upperLeft = this.locationToPoint(x, y);
  return {
    x: upperLeft.x + (this.locationSize / 2),
    y: upperLeft.y + (this.locationSize / 2)
  };
};

CanvasMetrics.prototype.locationToScaledOffsetPoint = function(x, y, offsetX, offsetY) {
  var upperLeft = this.locationToPoint(x, y);
  return {
    x : upperLeft.x + offsetX * this.locationSize,
    y : upperLeft.y + offsetY * this.locationSize
  };
};

CanvasMetrics.prototype.applyScaledOffsetsToCenter = function(center, offsetX, offsetY) {
  return {
    x: center.x + offsetX * (this.locationSize/2),
    y: center.y + offsetY * (this.locationSize/2)
  };
};

CanvasMetrics.prototype.locationRect = function(x, y) {
  var upperLeft = this.locationToPoint(x, y);
  return {
    x: upperLeft.x,
    y: upperLeft.y,
    width: this.locationSize,
    height: this.locationSize
  };
};

CanvasMetrics.prototype.scaleScalar = function(scale) {
  return this.locationSize * scale;
};

CanvasMetrics.prototype.locationFontSize = function() {
  return this.locationSize;
};

CanvasMetrics.prototype.statusBarCenter = function() {
  return {
    x: this.fieldSize.width * this.locationSize / 2,
    y: this.statusBarHeight / 2
  };
};

CanvasMetrics.prototype.statusBarFontSize = function() {
  return this.scaleScalar(0.75);
};

CanvasMetrics.prototype.statusBarCorner = function(which) {
  if (which === "topleft") {

    return {x: 0, y: 0};

  } else if (which === "bottomleft") {

    return {x: 0, y: this.statusBarHeight };

  } else if (which === "topright" )  {

    return {x: (this.fieldSize.width) * this.locationSize, y: 0 };

  } else if (which === "bottomright"){

    return {x: (this.fieldSize.width) * this.locationSize, y: this.statusBarHeight};

  } else {

    throw new Error("Unrecognized corner identifier: " + which);

  }
};

CanvasMetrics.prototype.promptRectangle = function() {
  return {
    x: this.canvasSize.width * 0.25,
    y: this.canvasSize.height * 0.25,
    width: this.canvasSize.width * 0.50,
    height: this.canvasSize.height * 0.50
  };
};

CanvasMetrics.prototype.promptFontSize = function() {
  return this.statusBarFontSize();
};

module.exports = CanvasMetrics;


},{"../utils":19}],2:[function(require,module,exports){
var utils = require('../utils');

var CursorArtist = function(options) {
  utils.requireOptions(options, 'context', 'metrics');

  this.metrics = options.metrics;
  this.context = options.context;
};

CursorArtist.prototype.draw = function(x, y) {
  var ctx = this.context;
  var rect = this.metrics.locationRect(x, y);
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.width, rect.height);
  ctx.lineWidth = 1;
  ctx.stroke();
};

module.exports = CursorArtist;

},{"../utils":19}],3:[function(require,module,exports){
var utils = require('../utils');


var countColors = [
  "green",
  "blue",
  "red",
  "fuchsia",
  "teal",
  "purple",
  "olive",
  "navy"];

var countColor = function(count) {
  return countColors[count - 1];
};

var font = function(pxSize) {
  return "bold " + pxSize + "px Arial";
};

var dirtOffsets = [
  { x: 0.6, y: 0.2 },
  { x: 0.3, y: 0.6 },
  { x: 0.7, y: 0.7 }];

var starOffsets = [
  { x: -0.13333333333333333, y: -0.8666666666666667 },
  { x: 0.06666666666666667,  y: -0.3333333333333333 },
  { x: 0.26666666666666666,  y: -0.6666666666666666 },
  { x: 0.26666666666666666,  y: -0.2 },
  { x: 0.6666666666666666,   y: 0.26666666666666666 },
  { x: 0.13333333333333333,  y: 0.06666666666666667 },
  { x: 0.4666666666666667,   y: 0.7333333333333333 },
  { x: -0.13333333333333333, y: 0.13333333333333333 },
  { x: -0.4666666666666667,  y: 0.6 },
  { x: -0.4,                 y: 0 },
  { x: -0.7333333333333333,  y: -0.4666666666666667 },
  { x: -0.4,                 y: -0.3333333333333333 } ];

var flagRects = [
  {
    color: 'red',
    x: -0.4666666666666667,
    y: -0.7333333333333333,
    width: 0.2,
    height: 0.2
  },
  {
    color: 'black',
    x: -0.06666666666666667,
    y: -0.7333333333333333,
    width: 0.06666666666666667,
    height: 0.6666666666666666
  },
  {
    color: 'black',
    x: -0.4,
    y: 0.6,
    width: 0.43333333333333335,
    height: 0.06666666666666667
  } ];

var FieldLocationArtist = function(options) {
  utils.requireOptions(options, 'context', 'metrics', 'field');

  this.context = options.context;
  this.field = options.field;
  this.metrics = options.metrics;
};

FieldLocationArtist.prototype.draw = function(location, x, y) {

  if (location.detonated) {
    this._drawStar(x, y);
    return;
  }

  if (location.flagged) {
    this._drawFlag(x, y);
    return;
  }

  if (!location.dug) {

    this._drawDirt(x, y);

  } else {

    var mineCount = this.field.countMines(x, y);
    if (mineCount > 0) {
      this._drawCount(x, y, mineCount);
    }

  }

};

FieldLocationArtist.prototype._drawDirt = function(x, y) {
  var self = this;
  dirtOffsets.forEach(function(offset) {
    self._drawDirtBox(x, y, offset);
  });
};

FieldLocationArtist.prototype._drawDirtBox = function(x, y, offset) {
  var pt = this.metrics.locationToScaledOffsetPoint(x, y, offset.x, offset.y);
  var dirtSize = this.metrics.scaleScalar(0.1);
  var ctx = this.context;

  ctx.beginPath();
  ctx.rect(pt.x, pt.y, dirtSize, dirtSize);
  ctx.fillStyle = 'black';
  ctx.fill();
};

FieldLocationArtist.prototype._drawCount = function(x, y, count) {
  var center = this.metrics.locationToCenterPoint(x, y);
  var ctx = this.context;

  ctx.fillStyle    = countColor(count);
  ctx.font         = font(this.metrics.locationFontSize());
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillText(count, center.x, center.y);
};

FieldLocationArtist.prototype._drawStar = function(x, y) {

  var ctx = this.context;
  var center = this.metrics.locationToCenterPoint(x, y);

  ctx.beginPath();
  var pt = this._starOffsetToPoint(center, 0);
  ctx.moveTo(pt.x, pt.y);

  for(var i = 1; i < starOffsets.length; i++) {
    pt = this._starOffsetToPoint(center, i);
    ctx.lineTo(pt.x, pt.y);
  }

  ctx.closePath();
  ctx.fillStyle = 'yellow';
  ctx.fill();
  ctx.stroke();

  //center
  ctx.beginPath();
  var r = this.metrics.scaleScalar(1/20);
  ctx.arc(center.x, center.y, r, 0, 2*Math.PI, false);
  ctx.fillStyle='red';
  ctx.fill();
  ctx.stroke();
};

FieldLocationArtist.prototype._starOffsetToPoint = function(center, starPointIndex) {
  var offset = starOffsets[starPointIndex];
  return this.metrics.applyScaledOffsetsToCenter(center, offset.x, offset.y);
};

FieldLocationArtist.prototype._drawFlag = function(x, y) {
  var center = this.metrics.locationToCenterPoint(x, y);
  var self = this;

  flagRects.forEach(function(r) {
    var upperLeft = self.metrics.applyScaledOffsetsToCenter(center, r.x, r.y);
    var w = self.metrics.scaleScalar(r.width);
    var h = self.metrics.scaleScalar(r.height);
    self._fillRect(r.color, upperLeft.x, upperLeft.y, w, h);
  });
};

FieldLocationArtist.prototype._fillRect = function(color, x, y, w, h) {
  var ctx = this.context;
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = color;
  ctx.fill();
};

module.exports = FieldLocationArtist;

},{"../utils":19}],4:[function(require,module,exports){
var FieldLocationArtist = require('./fieldlocationartist');
var CursorArtist = require('./cursorartist');
var CanvasMetrics = require('./canvasmetrics');
var StatusBarArtist = require('./statusbarartist');
var utils = require('../utils');

var GameArtist = function(options) {
  utils.requireOptions(options, 'game', 'canvas');

  this.game = options.game;
  var canvas = options.canvas;
  this.context = canvas.getContext('2d');

  this.canvasSize = {
    width: canvas.width,
    height: canvas.height
  };

  this.metrics = new CanvasMetrics({
    canvasSize: this.canvasSize,
    fieldSize: this.game.field,
    statusBar: true
  });

  this.locationArtist = new FieldLocationArtist({
    metrics: this.metrics,
    context: this.context,
    field:   this.game.field
  });

  this.cursorArtist = new CursorArtist({
    context: this.context,
    metrics: this.metrics
  });

  this.statusBarArtist = new StatusBarArtist({
    context: this.context,
    metrics: this.metrics
  });

  var self = this;
  this.game.on('invalidated', function() {
    self.draw();
  });
};

GameArtist.prototype.draw = function() {
  var self = this;
  var game = this.game;

  this.clear();

  this.game.field.forEach(function(location, x, y) {
    self.locationArtist.draw(location, x, y);
  });

  this.statusBarArtist.draw({
    timeRemaining: game.score.timeBonusRemaining(),
    minesRemaining: game.level.minesRemaining(),
    score: game.score.current(),
    level: game.level.levelNumber
  });

  if (this.game.state === 'pre-game' || this.game.state === 'between-levels') {
    this._drawStartPrompt();
  } else {
    this.cursorArtist.draw(game.cursor.x, game.cursor.y);
  }
};

GameArtist.prototype.clear = function() {
  this.context.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
};

GameArtist.prototype._drawStartPrompt = function() {
  this._drawPrompt('Press Enter to Start');
};

GameArtist.prototype._drawPrompt = function(prompt) {
  var rect = this.metrics.promptRectangle();
  var ctx = this.context;

  ctx.clearRect(rect.x, rect.y, rect.width, rect.height);
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.width, rect.height);
  ctx.stroke();

  var fontSize = this.metrics.promptFontSize();
  var center = utils.rectangleCenter(rect.x, rect.y, rect.width, rect.height);
  ctx.font = "" + fontSize + "px Arial";
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(prompt, center.x, center.y);
};
module.exports = GameArtist;

},{"../utils":19,"./canvasmetrics":1,"./cursorartist":2,"./fieldlocationartist":3,"./statusbarartist":5}],5:[function(require,module,exports){
var utils = require('../utils');

var StatusBarArtist = function(options) {
  utils.requireOptions(options, 'metrics', 'context');
  this.metrics = options.metrics;
  this.context = options.context;
};

StatusBarArtist.prototype.draw = function(status) {
  var ctx = this.context;
  ctx.fillStyle = 'black';


  if (typeof status.timeRemaining !== 'undefined') {
    this._drawTimeRemaining(status.timeRemaining);
  }

  if (typeof status.score !== 'undefined') {
    this._drawScore(status.score);
  }

  if (typeof status.minesRemaining !== 'undefined') {
    this._drawMinesRemaining(status.minesRemaining);
  }

  if (typeof status.level !== 'undefined') {
    this._drawLevel(status.level);
  }
};

StatusBarArtist.prototype._drawTimeRemaining = function(timeRemaining) {
  var corner = this.metrics.statusBarCorner('topleft');
  var ctx = this.context;

  ctx.font = this.font();
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText("Time: " + timeRemaining, corner.x, corner.y);
};

StatusBarArtist.prototype._drawMinesRemaining = function(minesRemaining) {
  var corner = this.metrics.statusBarCorner("bottomleft");
  var ctx = this.context;

  ctx.font = this.font();
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  ctx.fillText("Mines: " + minesRemaining, corner.x, corner.y);
};

StatusBarArtist.prototype._drawLevel = function(level) {
  var corner = this.metrics.statusBarCorner('topright');
  var ctx = this.context;

  ctx.font = this.font();
  ctx.textAlign = 'right';
  ctx.textBaseline = 'top';
  ctx.fillText("Level: " + level, corner.x, corner.y);
};

StatusBarArtist.prototype._drawScore = function(score) {
  var ctx = this.context;
  var pt = this.metrics.statusBarCenter();

  ctx.font = this.scoreFont();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(score, pt.x, pt.y);
};

StatusBarArtist.prototype.scoreFont = function() {
  var fontSize = this.metrics.statusBarFontSize();
  return "" + fontSize + "px Arial";
};

StatusBarArtist.prototype.font = function() {
  var fontSize = this.metrics.statusBarFontSize() * 0.50;
  return "" + fontSize + "px Arial";
};

module.exports = StatusBarArtist;

},{"../utils":19}],6:[function(require,module,exports){
var Cursor = function(x, y, field) {
  this.x = x;
  this.y = y;
  this.field = field;
};

Cursor.prototype.moveLeft = function() {
  this.tryMoveDelta(-1, 0);
};

Cursor.prototype.moveRight = function() {
  this.tryMoveDelta(1, 0);
};

Cursor.prototype.moveUp = function() {
  this.tryMoveDelta(0, -1);
};

Cursor.prototype.moveDown = function() {
  this.tryMoveDelta(0, 1);
};

Cursor.prototype.tryMoveDelta = function(xDelta, yDelta) {
  if (this.field.isInRange(this.x + xDelta, this.y + yDelta)) {
    this.x += xDelta;
    this.y += yDelta;
  }
};

module.exports = Cursor;

},{}],7:[function(require,module,exports){
var EventHandler = require('./eventhandler');
var eventMap = {
  37 : "move:left",    //left arrow
  38 : "move:up",      //up arrow
  39 : "move:right",   //right arrow
  40 : "move:down",    //down arrow
  16 : "dig",          //shift
  90 : "flag",         //z
  13 : "confirm"       //enter
};
var EventDispatcher = function(element) {
  this.handlers = {};
  var self = this;

  element.setAttribute('tabindex', '1');
  element.focus();

  element.addEventListener('keydown', function(e) {
    if (typeof(eventMap[e.keyCode]) !== 'undefined') {
      self.fire(eventMap[e.keyCode]);
      self.fire('any', eventMap[e.keyCode]);
    }
  });

};

EventHandler.extend(EventDispatcher);

module.exports = EventDispatcher;

},{"./eventhandler":8}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"./utils":19}],10:[function(require,module,exports){
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

},{"./artists/gameartist":4,"./eventdispatcher":7,"./eventlogger":9,"./game":12,"./playbackdispatcher":16,"./utils":19}],11:[function(require,module,exports){
var FieldLocation = function() {
  this.hasMine = false;
  this.dug = false;
  this.flagged = false;
  this.detonated = false;
};

FieldLocation.prototype.dig = function() {
  if (this.hasMine) {
    throw new Error("exploded");
  }

  if (this.flagged) {
    return;
  }

  if (this.dug) {
    return false;
  }

  this.dug = true;
  return true;
};

FieldLocation.prototype.flag = function() {
  if (this.dug) {
    return;
  }

  //toggle
  this.flagged = !this.flagged;
};

FieldLocation.prototype.placeMine = function() {
  this.hasMine = true;
};

FieldLocation.prototype.detonate = function() {
  if (this.hasMine) {
    this.detonated = true;
  }
};
FieldLocation.prototype.reset = function() {
  this.hasMine = false;
  this.flagged = false;
  this.dug = false;
  this.detonated = false;
};

module.exports = FieldLocation;

},{}],12:[function(require,module,exports){
var utils = require('./utils');
var MineField = require('./minefield');
var Cursor = require('./cursor');
var Level = require('./level');
var EventHandler = require('./eventhandler');
var Score = require('./score');

var Game = function(options) {
  utils.requireOptions(options, 'eventDispatcher');

  this.field = new MineField({
    width: 14,
    height: 10
  });

  this.cursor = new Cursor(0, 0, this.field);

  this.level = new Level({
    game: this,
  });

  this.score = options.scorer || new Score(this);
  this.state = 'pre-game';

  this.bindEvents(options.eventDispatcher);
};

EventHandler.extend(Game);

Game.prototype.start = function() {
  this.fire('started');
  this.fire('invalidated');
  this.state = 'pre-game';
  this.cursor.x = 0;
  this.cursor.y = 0;
};

Game.prototype.canPlay = function() {
  return this.state !== 'between-levels' && this.state !== 'pre-game' && this.state !== 'detonated';
};

Game.prototype.startLevel = function() {
  this.state = "playing";
  this.cursor.x = 0;
  this.cursor.y = 0;
  this.fire('level:started');
  this.fire('invalidated');
};

Game.prototype.bindEvents = function(dispatcher) {
  var self = this;

  dispatcher.on('confirm', function() {
    if (self.state === 'pre-game') {
      self.startLevel();
    } else if (self.state === 'between-levels') {
      self.level.moveNext();
      self.startLevel();
    } else if (self.state === 'detonated') {
      self.level.reset();
      self.start();
    }
  });

  dispatcher.on('move:left', function() {
    if (!self.canPlay()) { return; }

    self.cursor.moveLeft();
    self.fire('invalidated');
  });

  dispatcher.on('move:right', function() {
    if (!self.canPlay()) { return; }

    self.cursor.moveRight();
    self.fire('invalidated');
  });

  dispatcher.on('move:up', function() {
    if (!self.canPlay()) { return; }

    self.cursor.moveUp();
    self.fire('invalidated');
  });

  dispatcher.on('move:down', function() {
    if (!self.canPlay()) { return; }

    self.cursor.moveDown();
    self.fire('invalidated');
  });

  dispatcher.on('dig', function() {
    if (!self.canPlay()) { return; }

    var spot = self.field.get(self.cursor.x, self.cursor.y);
    if (spot.flagged) {
      return;
    }

    if (spot.hasMine) {
      self.field.detonateMines();
      self.fire('detonated');
      self.state = 'detonated';
      self.fire('gameOver', {
        score: self.score.current()
      });
    } else {
      if (spot.dig()) {
        self.fire('dig:safe');
      }
    }

    if (self.level.finished()) {
      self.field.flagAllMines();
      self.state = 'between-levels';
      self.fire('level:finished');
    }

    self.fire('invalidated');
  });

  dispatcher.on('flag', function() {
    if (!self.canPlay()) { return; }
    var spot = self.field.get(self.cursor.x, self.cursor.y);
    if (spot.dug) {
      return;
    }

    spot.flag();

    if (spot.flagged) {
      self.fire('flag:added');
    } else {
      self.fire('flag:removed');
    }

    self.fire('invalidated');
  });

};


module.exports = Game;

},{"./cursor":6,"./eventhandler":8,"./level":13,"./minefield":14,"./score":17,"./utils":19}],13:[function(require,module,exports){
var MinePlacer = require('./mineplacer');
var utils = require('./utils');

var Level = function(options) {
  utils.requireOptions(options, 'game');

  var game = options.game;
  this.field = game.field;

  this.reset();

  var self = this;
  game.on('dig:safe', function() {
    self.dig();
  });

  game.on('flag:added', function() {
    self.flag();
  });

  game.on('flag:removed', function() {
    self.unflag();
  });
};

Level.prototype.mines = function() {
  return this.levelNumber * 4;
};

Level.prototype.minesRemaining = function() {
  return this.mines() - this.flags;
};

Level.prototype.flag = function() {
  this.flags++;
};

Level.prototype.unflag = function() {
  this.flags--;
};

Level.prototype.dig = function() {
  this.spacesCleared++;
};

Level.prototype.spacesRemaining = function() {
  return this.field.width * this.field.height - this.spacesCleared - this.mines();
};

Level.prototype.finished = function() {
  return this.spacesRemaining() === 0;
};

Level.prototype.reset = function() {
  this.levelNumber = 1;
  this.levelReset();
};

Level.prototype.moveNext = function() {
  this.levelNumber++;
  this.levelReset();
};

Level.prototype.levelReset = function() {
  this.spacesCleared = 0;
  this.flags = 0;
  this.setMines();
};

Level.prototype.setMines = function() {
  this.field.reset();
  var miner = new MinePlacer();
  miner.placeMines(this.field, this.mines());
};

module.exports = Level;

},{"./mineplacer":15,"./utils":19}],14:[function(require,module,exports){
var extend = require('./utils').extend;
var FieldLocation = require('./fieldlocation');

var MineField = function( options ) {
  if ( typeof options === 'undefined' ) {
    options = {};
  }

  var defaults = {
    width: 80,
    height: 40
  };

  this.options = extend(defaults, options);

  this.width = this.options.width;
  this.height = this.options.height;

  this.field = new Array(this.width);
  for( var i = 0; i < this.width; i++) {
    this.field[i] = new Array(this.height);
    for( var j = 0; j < this.height; j++ ) {
      this.field[i][j] = new FieldLocation();
    }
  }
};

MineField.prototype.get = function(x,y) {
  if (! this.isInRange(x,y) ) {
    throw new Error('position out of range (' + x + ', ' + y + ')');
  }

  return this.field[x][y];
};

var minefieldNeighborDeltas = [
  {x:-1,y:-1},
  {x:-1,y:0},
  {x:-1,y:1},
  {x:0,y:-1},
  {x:0,y:1},
  {x:1,y:-1},
  {x:1,y:0},
  {x:1,y:1}
];

MineField.prototype.getNeighbors = function(x, y) {
  var neighbors = [];
  for (var i = 0, len = minefieldNeighborDeltas.length; i < len; i++) {
    var delta = minefieldNeighborDeltas[i];
    var dx = x + delta.x, dy = y + delta.y;

    if ( this.isInRange( dx, dy ) ) {
      neighbors.push( this.get(dx, dy) );
    }
  }

  return neighbors;

};

MineField.prototype.isInRange = function( x, y ) {
  return (x >= 0 && x < this.width && y >= 0 && y < this.height);
};

MineField.prototype.countMines = function( x, y ) {
  var neighbors = this.getNeighbors(x, y),
    count = 0;

  for (var i = neighbors.length - 1; i >= 0; i--) {
    if (neighbors[i].hasMine) {
      count++;
    }
  }

  return count;
};

MineField.prototype.forEach = function(callback) {
  var i = 0, j = 0, w = this.width, h = this.height;

  for( i = 0; i < w; i++ ) {
    for( j = 0; j < h; j++ ) {
      callback(this.get(i, j), i, j);
    }
  }
};

MineField.prototype.countAllMines = function() {
  var self = this;
  this.forEach(function( spot, x, y ) {
    spot.count = self.countMines(x, y);
  });
};

MineField.prototype.detonateMines = function() {
  this.forEach(function(spot, x, y) {
    //jshint unused:false

    spot.detonate();
  });
};

MineField.prototype.flagAllMines = function() {
  this.forEach(function(spot, x, y) {
    //jshint unused:false

    if (spot.hasMine && !spot.flagged) {
      spot.flag();
    }
  });
};

MineField.prototype.reset = function() {
  this.forEach(function(spot) {
    spot.reset();
  });
};

module.exports = MineField;

},{"./fieldlocation":11,"./utils":19}],15:[function(require,module,exports){
var MinePlacer = function() {
};

MinePlacer.prototype.placeMines = function( field, count ) {
  if (count > this.totalPlacableMines(field)) {
    throw new Error("Can't place " + count + " mines in a field sized " + field.width + "x" + field.height);
  }

  for( var i = 0; i < count; i++ ) {
    this.placeMine( field );
  }
};

MinePlacer.prototype.placeMine = function( field ) {
  var spot, pos, placed = false;
  do {
    pos = this.randomLocation( field );
    spot = field.get( pos.x, pos.y );

    if ( ! spot.hasMine) {
      spot.placeMine();
      placed = true;
    }
  } while ( !placed );
};

MinePlacer.prototype.randomLocation = function( field ) {
  return {
    x: Math.floor((Math.random() * (field.width-1))) + 1,
    y: Math.floor((Math.random() * field.height))
  };
};

MinePlacer.prototype.totalPlacableMines = function( field ) {
  return (field.width-1)*field.height;
};

module.exports = MinePlacer;

},{}],16:[function(require,module,exports){
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

},{"./eventhandler":8,"./utils":19}],17:[function(require,module,exports){
var Timer = require('./timer');

var Score = function(game) {
  this.score = 0;
  this.timeEllapsed = 0;

  this.timer = new Timer(1000);
  this.timer.on('tick', function(interval) {
    self.timeEllapsed += interval;
    game.fire('invalidated');
  });

  var self = this;
  game.on("dig:safe", function() {
    self.score++;
  });

  game.on('level:finished', function() {
    self.score += self.timeBonusRemaining();
    self.timer.stop();
  });

  game.on('level:started', function() {
    self.resetLevel();
    self.timer.start();
  });

  game.on('detonated', function() {
    self.timer.stop();
  });

  game.on('started', function() {
    self.resetGame();
  });
};

Score.prototype.current = function() {
  return this.score;
};

Score.prototype.timeBonusRemaining = function() {
  return 180 - this._secondsEllapsed();
};

Score.prototype._secondsEllapsed = function() {
  return Math.floor(this.timeEllapsed / 1000);
};

Score.prototype.resetLevel = function() {
  this.timeEllapsed = 0;
};

Score.prototype.resetGame = function() {
  this.timeEllapsed = 0;
  this.score = 0;
};

module.exports = Score;

},{"./timer":18}],18:[function(require,module,exports){
var Timer = function(interval) {
  this.interval = interval;
  this.eventHandlers = {};
  this.lastTick = 0;
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
    self.lastTick = Date.now();
  }, this.interval);
};

Timer.prototype.stop = function() {
  clearInterval(this._intervalId);
  this._intervalId = null;
};

module.exports = Timer;

},{}],19:[function(require,module,exports){
/**
 * Extends an object, copying properties from right to left
 * @param  {Object} objectsN N objects to copy
 * @return {Object}          conglomeration of all object properties
 */
var extend = function( varargs ) {
  //jshint unused:false
  var destination = {};
  var i = 0;
  var length = arguments.length;
  var prop;
  var src;

  for ( i = 0; i < length; i++ ) {
    src = arguments[i];
    for( prop in src ) {

      if (src[prop] !== undefined) {
        destination[prop] = src[prop];
      }
    }
  }

  return destination;
};

var requireOptions = function(options) {
  var requiredOptions = Array.prototype.slice.call(arguments, 1);
  requiredOptions.forEach(function(requiredOption) {
    if (typeof options[requiredOption] === 'undefined') {
      throw new Error(requiredOption + " is a required option");
    }
  });
};

var rectangleCenter = function( x, y, width, height) {
  return {
    x: x + width / 2,
    y: y + height / 2
  };
};

var squareCenter = function(x, y, size) {
  return rectangleCenter(x, y, size, size);
};


module.exports = {
  extend: extend,
  requireOptions: requireOptions,
  squareCenter: squareCenter,
  rectangleCenter: rectangleCenter
};


},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);