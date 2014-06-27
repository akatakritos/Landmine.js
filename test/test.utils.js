var assert = require('assert');
var utils = require('../src/utils');
var extend = utils.extend;

describe('utils', function() {
  describe('extend', function() {
    it('should copy from one', function() {
      var src = {
        a: 1,
        b: "2"
      };

      var dst = extend( src );

      assert.equal(dst.a, src.a);
      assert.equal(dst.b, src.b);
    });

    it('should copy from two', function() {
      var src1 = { a: 1 };
      var src2 = { b: "2" };
      var dest = extend( src1, src2 );

      assert.equal(dest.a, src1.a);
      assert.equal(dest.b, src2.b);
    });

    it('should override when copying from multiple', function() {
      var src1 = { a: 'hi' };
      var src2 = { a: 'should be this' };
      var dest = extend( src1, src2 );

      assert.equal(dest.a, src2.a);
    });
  });

  describe('requireOptions', function() {
    it('throws when an option is missing', function() {
      var options = {a: 1, b: 2};

      assert.throws(function() {
        utils.requireOptions(options, 'a', 'b', 'c');
      }, /required/);
    });

    it('doesnt throw when all options are provided', function() {
      var options = {a: 1, b: 1};
      assert.doesNotThrow(function() {
        utils.requireOptions(options, 'a', 'b');
      });
    });

  });

  describe('squareCenter', function() {
    it('gives the center location for a x, y, and size', function() {
      var center = utils.squareCenter(10, 10, 10);
      assert.equal(15, center.x);
      assert.equal(15, center.y);
    });
  });

});
