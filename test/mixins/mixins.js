'use strict';

var assert = require('assert'),
    parserObj = require('../../parsers/mixinparser.js'),
    parser = new parserObj();

describe('Mixin parser', function() {

    it ('Should return "<p>foo</p>"', function() {
      var block = "<p>#{$foo}</p>";
      var argumentlist = ["$foo", "$bar"];

      var mixin = parser.newMixin("mixin", argumentlist, block);
      assert.equal('<p>foo</p>', parser.evalMixin("mixin", ['foo', 'bar']));
    });

    it ('Should return "<p>bar</p>"', function() {
      var block = "<p>$foo</p>";
      var argumentlist = ["$foo", "$bar"];

      var mixin = parser.newMixin("mixin", argumentlist, block);
      assert.equal('<p>bar</p>', parser.evalMixin("mixin", ['bar', 'baz']));
    });

    it ('Should throw an error', function() {
      var block = "<p>#{$foo}</p>";
      var argumentlist = ["$foo", "$bar"];

      var mixin = parser.newMixin("mixin", argumentlist, block);

      function boom() {
        parser.evalMixin("foo", ['foo', 'bar'])
      }
      assert.throws(boom, Error);
    });

});
