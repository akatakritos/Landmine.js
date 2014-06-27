var GameHelpers = {};

var iterate = function(game, events, predicate) {
  var x = 0, y = 0;
  var h = game.field.height;
  var w = game.field.width;

  var down = false;
  for(x = 0; x < w; x++) {
    down = !down;

    for(y = 0; y < h; y++) {
      var spot = game.field.get(game.cursor.x, game.cursor.y);

      if (predicate(spot)) {
        return;
      }

      if(down) {
        events.fire('move:down');
      } else {
        events.fire('move:up');
      }
    }

    events.fire('move:right');
  }
};

GameHelpers.digAll = function(game, events) {
  iterate(game, events, function(spot) {
    if (!spot.hasMine) {
      events.fire('dig');
    }
  });
};

GameHelpers.digAMine = function(game, events) {
  GameHelpers.moveToMine(game, events);
  events.fire('dig');
};

GameHelpers.moveToMine = function(game, events) {
  iterate(game, events, function(spot) {
    if (spot.hasMine) {
      return true; //quit iterating
    }
  });
};

module.exports = GameHelpers;
