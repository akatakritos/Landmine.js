var assert = require("assert");
var LM = require("../dist/landmine.js");

function instance(x, y, width, height) {
  x = x || 0;
  y = y || 0;
  width = width || 10;
  height = height || 10;

  return new LM.Cursor(x, y, new LM.MineField({
    width: width,
    height: height
  }));
}

describe("Cursor", function() {
  describe('Constructor', function() {
    it('sets the x and y', function() {
      var cursor = new LM.Cursor(1, 2);
      assert.equal(1, cursor.x);
      assert.equal(2, cursor.y);
    });
  });

  describe('movement', function() {
    describe("moveLeft", function() {
      it('decrements the x coordinate', function() {
        var c = instance(1, 0);
        c.moveLeft();
        assert.equal(0, c.x);
        assert.equal(0, c.y);
      });

      it ('cannot go negative', function() {
        var c = instance(0,0);
        c.moveLeft();
        assert.equal(0, c.x);
      });
    });

    describe('moveRight', function() {
      it('increments the x coordinate', function() {
        var c = instance();
        c.moveRight();
        assert.equal(1, c.x);
      });

      it('doesnt move past the right edge', function() {
        var c = instance(9, 0, 10, 10);
        c.moveRight();
        assert.equal(9, c.x);
      });
    });

    describe('moveUp', function() {
      it ('decrements the y coordinate', function() {
        var c = instance(1,1);
        c.moveUp();
        assert.equal(0, c.y);
      });

      it ('doesnt move past the top edge', function() {
        var c = instance(0,0);
        c.moveUp();
        assert.equal(0, c.y);
      });
    });

    describe('moveDown', function() {
      it ('increments the y coordinate', function() {
        var c = instance(0,0);
        c.moveDown();
        assert.equal(1, c.y);
      });

      it ('doesnt move past the bottom edge', function() {
        var c = instance(0, 9, 10, 10);
        c.moveDown();
        assert.equal(9, c.y);
      });
    });


  });
});
