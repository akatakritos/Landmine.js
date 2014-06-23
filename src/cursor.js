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

Cursor.prototype.tryMoveDelta = function(xDelta, yDelta) {
  if (this.field.isInRange(this.x + xDelta, this.y + yDelta)) {
    this.x += xDelta;
    this.y += yDelta;
  }
};

exportTestSymbol("Cursor", Cursor);
