var assert = require('assert'),
    parser = require('../../parsers/loopparser.js');

describe('Array looping', function() {

  describe('Three elements', function() {
    it ('Should return <p>Foo</p><p>Bar</p><p>Baz</p>', function() {
      var arr = ['Foo', 'Bar', 'Baz'];
      var block = "<p>#{$element}</p>";
      var parsed = parser.loopObject("$element", arr, block);
      assert.equal("<p>Foo</p><p>Bar</p><p>Baz</p>" ,parsed);
    });
  });

});
