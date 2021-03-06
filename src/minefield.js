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
