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

  describe('forEach', function() {
    it('should iterate over all spots', function() {
      var w = 5;
      var h = 6;
      var size = w * h;
      var count = 0;

      var field = new MineField({
        width: w,
        height: h
      });

      field.forEach(function(spot, x, y) {
        count = count + 1;
      });

      assert.equal(size, count);
    });
  });

  describe('mine operations', function() {
    var field;
    beforeEach(function() {
      field = new MineField({
        width: 2,
        height: 2
      });

      field.get(0,0).placeMine();
      field.get(1,1).placeMine();
    });

    describe('detonateMines', function() {
      it('detonates all locations with mines', function() {
        field.detonateMines();

        assert(field.get(0,0).detonated === true);
        assert(field.get(1,1).detonated === true);
        assert(field.get(0,1).detonated === false);
        assert(field.get(1,0).detonated === false);
      });
    });

    describe('flagAllMines', function() {
      it('flags all locations with mines', function() {
        field.flagAllMines();

        assert(field.get(0,0).flagged === true);
        assert(field.get(1,1).flagged === true);
        assert(field.get(0,1).flagged === false);
        assert(field.get(1,0).flagged === false);
      });

      it('doesnnt unflag an already flagged spot', function() {
        field.get(0,0).flag();
        field.flagAllMines();

        assert(field.get(0,0).flagged === true);
        assert(field.get(1,1).flagged === true);
      });
    });
  });


});

