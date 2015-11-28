var assert = require('assert'),
    parser = require('../../parsers/tagparser.js');

describe('Self closing tags', function() {

  describe('DOCTYPE', function() {
    it ('Should return <!DOCTYPE html>', function() {
      var tag = '!DOCTYPE(html)'
      assert.equal('<!DOCTYPE html>', parser.parseTag(tag).trim());
    })
  });

  describe('Row break', function() {
    it ('Should return <br />', function() {
      var tag = 'br'
      assert.equal('<br />', parser.parseTag(tag).trim());
    })
  });

  describe('Input', function() {
    it ('Should return <input type="text" name="fname" />', function() {
      var tag = 'input(type="text" name="fname")'
      assert.equal('<input type="text" name="fname" />', parser.parseTag(tag).trim());
    })
  });

});
