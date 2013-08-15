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
	});
});