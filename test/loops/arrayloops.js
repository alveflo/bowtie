var assert = require('assert'),
    parser = require('../../parsers/loopparser.js');

describe('Array looping', function() {

  it ('Should return <p>Foo</p><p>Bar</p><p>Baz</p>', function() {
    var arr = ['Foo', 'Bar', 'Baz'];
    var block = "<p>#{$element}</p>";
    var settings = {};
    settings['arr'] = arr;
    var parsed = parser.loopObject("$element", "$arr", block, settings);
    assert.equal("<p>Foo</p><p>Bar</p><p>Baz</p>" ,parsed);
  });

  it ('Should throw Error', function() {
    var arr = ['Foo', 'Bar', 'Baz'];
    var block = "<p>#{$element}</p>";
    var settings = {};
    settings['arr'] = arr;
    function boom() {
      parser.loopObject("$element", "$arrs", block, settings);
    }
    assert.throws(boom, Error);
  });


});
