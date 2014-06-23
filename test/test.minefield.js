var assert = require('assert');
var MineField = require('../src/minefield');

describe('minefield', function(){
  describe('construction', function() {
    it ('should have expected properties', function() {
      var field = new MineField();
      assert( field.width );
      assert( field.height );
    });

    it( 'should copy options', function() {
      var field = new MineField({width: 100, height: 200});
      assert.equal(100, field.width);
      assert.equal(200, field.height);
    });
  });

  describe('get', function() {
    var field = new MineField();

    it( 'should throw when x is out of bounds', function() {
      assert.throws(function() {
        field.get(1000, 1);
      });
    });

    it( 'should throw when y is out of bounds', function() {
      assert.throws(function() {
        field.get(1, 1000);
      });
    });

    it ('should return a valid value', function() {
      var v = field.get(1, 1);
      assert( v );
    });
  });

  describe('getNeighbors', function() {
    var field = new MineField();

    it( 'should return 8 elements from the middle', function() {
      var neighbors = field.getNeighbors( 5, 5);
      assert.equal(8, neighbors.length);
    });

    it ('should return 5 elements from the side', function() {
      var neighbors = field.getNeighbors( 0, 5);
      assert.equal(5, neighbors.length);
    });

    it ('should return 5 elements from the top', function() {
      var neighbors = field.getNeighbors( 5, 0);
      assert.equal(5, neighbors.length);
    });

    it ('should return 3 elements from the corner', function() {
      var neighbors = field.getNeighbors( 0, 0);
      assert.equal(3, neighbors.length);
    });
  });

  describe('countMines', function() {
    var field = new MineField();
    field.get(5, 5).placeMine();

    it('should record 1', function() {
      var count = field.countMines(4, 5);
      assert.equal(1, count);
    });

    it('should record 8', function() {
      field.get(9, 9).placeMine();
      field.get(9, 10).placeMine();
      field.get(9, 11).placeMine();
      field.get(10, 9).placeMine();
      field.get(10, 11).placeMine();
      field.get(11, 9).placeMine();
      field.get(11, 10).placeMine();
      field.get(11, 11).placeMine();

      var count = field.countMines(10,10);
      assert.equal(8, count);
    });
  });
});

