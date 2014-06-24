var FieldLocation = function() {
  this.hasMine = false;
  this.dug = false;
  this.flagged = false;
};

FieldLocation.prototype.dig = function() {
  if (this.hasMine) {
    throw "exploded";
  }

  this.dug = true;
};

FieldLocation.prototype.flag = function() {
  if (!this.dug) {
    this.flagged = true;
  }
};

FieldLocation.prototype.placeMine = function() {
  this.hasMine = true;
};

module.exports = FieldLocation;
