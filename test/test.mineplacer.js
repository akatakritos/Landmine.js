var assert = require('assert');
var LM = require('../dist/landmine.js');

describe('mineplacer', function() {
	describe('mine placement', function() {
		it('should not place mines in the first column', function() {
			var field = new LM.MineField({
				width:2, 
				height:10
			});
			var placer = new LM.MinePlacer();
			placer.placeMines(field, (field.width-1)*field.height);
			for(var y = 0; y < field.height; y++) {
				assert(!field.get(0, y).hasMine);
			}
		});
	});

	describe('error checking', function() {
		it('should throw if its impossible to place all mines', function() {
			var field = new LM.MineField({
				width: 5,
				height: 6
			});
			var placer = new LM.MinePlacer();
			assert.throws(function() {
				placer.placeMines(field, (field.width-1)*(field.height)+1);
			});
		});
	});
});
