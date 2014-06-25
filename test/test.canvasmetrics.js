var assert = require('assert');
var CanvasMetrics = require('../src/artists/canvasmetrics');

describe("CanvasMetrics", function() {
  var metrics;
  beforeEach(function() {
    metrics = new CanvasMetrics({
      canvasSize: { width: 150, height: 100 },
      fieldSize:  { width: 15,  height: 10  }
    });
  });

  describe("locationToPoint", function() {

    it('gives 0, 0 for the top left', function() {
      var result = metrics.locationToPoint(0,0);
      assert.equal(0, result.x);
      assert.equal(0, result.y);
    });

    it ('gives 140, 90 for the bottom right', function() {
      var pt = metrics.locationToPoint(14, 9);
      assert.equal(140, pt.x);
      assert.equal(90,  pt.y);
    });

  });

  describe('locationToCenterPoint', function() {
    it('gives 5, 5 for the uppper left', function() {
      var pt = metrics.locationToCenterPoint(0, 0);
      assert.equal(5, pt.x);
      assert.equal(5, pt.y);
    });

    it('gives 145, 95 for bottom right', function() {
      var pt = metrics.locationToCenterPoint(14, 9);
      assert.equal(145, pt.x);
      assert.equal(95, pt.y);
    });
  });

  describe('locationToScaledOffsetPoint', function() {
    it('scales 0,0 at 0.2, 0.5 to 2, 5', function() {
      var pt = metrics.locationToScaledOffsetPoint(0, 0, 0.2, 0.5);
      assert.equal(2, pt.x);
      assert.equal(5, pt.y);
    });

    it ('scales 14,9 at 0.2, 0.5 to 142,95', function() {
      var pt = metrics.locationToScaledOffsetPoint(14, 9, 0.2, 0.5);
      assert.equal(142, pt.x);
      assert.equal(95, pt.y);
    });
  });

  describe('with statusBar', function() {
    beforeEach(function() {
      metrics = new CanvasMetrics({
        canvasSize: { width: 150, height: 110 }, //needs an extra 10 height to leave room for status bar
        fieldSize:  { width: 15,  height: 10  },
        statusBar: true
      });
    });

    it('yields 0, 10 for top left', function() {
      var pt = metrics.locationToPoint(0,0);
      assert.equal(0, pt.x);
      assert.equal(10, pt.y);
    });
  });

});
