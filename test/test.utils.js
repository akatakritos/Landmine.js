var assert = require('assert');
var extend = require('../src/utils').extend;

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
});
