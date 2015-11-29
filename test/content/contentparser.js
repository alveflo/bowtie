var assert = require('assert'),
    parser = require('../../parsers/contentparser.js');

describe('Content parser', function() {

  describe('String interpolation', function() {
    it ('Should return "foo bar"', function() {
      var settings = {
        "setting": {
          "foo": ['foo', 'bar', 'baz'],
        },
        "i": 1
      };
      var str = 'foo #{$setting.foo[$i]}';
      assert.equal('foo bar', parser.parseString(str, settings));
    })
  });

  describe('Variable value replacement', function() {
    it ('Should return "bar"', function() {
      var settings = {
        "setting": "bar"
      };
      var str = '$setting';
      assert.equal('bar', parser.parseVariable(str, settings));
    })
  });

});
