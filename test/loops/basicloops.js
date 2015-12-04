var assert = require('assert'),
    parser = require('../../parsers/loopparser.js');

describe('Basic looping', function() {

  it ('Should return <p>1</p><p>2</p><p>3</p>', function() {
    var block = "<p>#{$i}</p>";
    var parsed = parser.loopBasic("$i", 1, 3, block);
    assert.equal("<p>1</p><p>2</p><p>3</p>" , parsed.trim());
  });

  it ('Should return <p>Foo</p><p>Bar</p><p>Baz</p>', function() {
    var block = "<p>foo.bar[$i]</p>";
    var parsed = parser.loopBasic("$i", 1, 3, block);
    assert.equal("<p>foo.bar[1]</p><p>foo.bar[2]</p><p>foo.bar[3]</p>" , parsed.trim());
  });


});
