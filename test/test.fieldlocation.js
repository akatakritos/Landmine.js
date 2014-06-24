var FieldLocation = require('../src/fieldlocation');
var assert = require('assert');

describe('FieldLocation', function() {
  describe('data', function() {
    var f = new FieldLocation();
    it('has a hasMine field', function() {
      assert(typeof(f.hasMine) !== 'undefined');
    });

    it('has a dug field', function() {
      assert(typeof(f.dug) !== 'undefined');
    });

    it('has a flagged field', function() {
      assert(typeof(f.flagged) !== 'undefined');
    });
  });

  describe('digging', function() {
    var f;
    beforeEach(function() {
      f = new FieldLocation();
    });

    it ('has a default dug of false', function() {
      assert.equal(false, f.dug);
    });

    it('toggles dug to true', function() {
      f.dig();
      assert.equal(true, f.dug);
    });

    it('does not toggle dug if dug multiple times', function() {
      f.dig();
      f.dig();
      assert.equal(true, f.dug);
    });

    it('throws if there is a mine there', function() {
      f.placeMine();
      assert.throws(function() {
        f.dig();
      });
    });

    it('does nothing if the spot is flagged', function() {
      f.flag();
      f.dig();
      assert(f.dug === false);
    });
  });

  describe('flagging', function() {
    var f;
    beforeEach(function() {
      f = new FieldLocation();
    });

    it('has a default flagged value of false', function() {
      assert.equal(false, f.flagged);
    });

    it('sets flagged to true when flagged', function() {
      f.flag();
      assert.equal(true, f.flagged);
    });

    it('doesnt do anything if already dug', function() {
      f.dig();
      f.flag();
      assert(f.flagged === false);
    });
  });

  describe('mining', function() {
    var f;
    beforeEach(function() {
      f = new FieldLocation();
    });

    it('has a default hasMine value of false', function() {
      assert(f.hasMine === false);
    });

    it('toggles hasMine to true if mined', function() {
      f.placeMine();
      assert(f.hasMine === true);
    });
  });


});
