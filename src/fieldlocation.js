var FieldLocation = function() {
  this.hasMine = false;
  this.dug = false;
  this.flagged = false;
};

FieldLocation.prototype.dig = function() {
  if (this.hasMine) {
    throw "exploded";
  }

  if (this.flagged) {
    return;
  }

  this.dug = true;
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

module.exports = FieldLocation;
