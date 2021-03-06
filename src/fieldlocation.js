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
