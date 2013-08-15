var assert = require('assert');
var LM = require('../dist/landmine.js');

describe('minefield', function(){
	describe('construction', function() {
		it ('should have expected properties', function() {
			var field = new LM.MineField();
			assert( field.width );
			assert( field.height );
		});

		it( 'should copy options', function() {
			var field = new LM.MineField({width: 100, height: 200});
			assert.equal(100, field.width);
			assert.equal(200, field.height);
		});
	});

	describe('get', function() {
		var field = new LM.MineField();

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
		var field = new LM.MineField();

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
});