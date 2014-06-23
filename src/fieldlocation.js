var FieldLocation = function() {
  this.hasMine = false;
  this.count = 0;
  this.dug = false;
};

FieldLocation.prototype.dig = function() {
  if (this.hasMine) {
    throw "exploded";
  }

  this.dug = true;
};

FieldLocation.prototype.placeMine = function() {
  this.hasMine = true;
};
