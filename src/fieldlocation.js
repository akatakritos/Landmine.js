var FieldLocation = function() {
  this.hasMine = false;
  this.dug = false;
  this.flagged = false;
  this.detonated = false;
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

FieldLocation.prototype.detonate = function() {
  if (this.hasMine) {
    this.detonated = true;
  }
};

module.exports = FieldLocation;
