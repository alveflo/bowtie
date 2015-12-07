'use strict';

var assert = require('assert'),
    parser = require('../../parsers/ifelseparser.js');

describe('If else', function() {

  describe('Constant comparisons if without else', function() {
    it ('Should return "foo"', function() {
      assert.equal("foo", parser.parseIfWithoutElse("'foo' === 'foo'", "foo", {}));
    });

    it ('Should return empty string', function() {
      assert.equal("", parser.parseIfWithoutElse("'foo' === 'bar'", "foo", {}));
    });

    it ('Should return "-1"', function() {
      assert.equal("-1", parser.parseIfWithoutElse("'foo'.indexOf('bar') === -1", "-1", {}));
    });

    it ('Should return "5"', function() {
      assert.equal("5", parser.parseIfWithoutElse("0 > -3", "5", {}));
    });

  });


  describe('Variable comparisons if-else', function() {
    it ('Should return "foo"', function() {
      assert.equal("foo", parser.parseIfElse("$foo === 'foo'", "foo", "bar", { foo: 'foo' }));
    });

    it ('Should return "bar"', function() {
      assert.equal("bar", parser.parseIfElse("$foo === 'bar'", "foo", "bar", { foo: 'foo' }));
    });

    it ('Should return "4"', function() {
      assert.equal("4", parser.parseIfElse("$foo.pet.count === 4", "4", "bar", {
        foo: {
          pet: {
            count: 4
          }
        }
      }));
    });

  });

  describe('Variable comparisons if without else', function() {
    it ('Should return "foo"', function() {
      assert.equal("foo", parser.parseIfWithoutElse("$foo === 'foo'", "foo", { foo: 'foo' }));
    });

    it ('Should return empty string', function() {
      assert.equal("", parser.parseIfWithoutElse("$foo === 'bar'", "foo", { foo: 'foo' }));
    });

    it ('Should return "foo"', function() {
      assert.equal("foo", parser.parseIfWithoutElse("$foo.pet.count === 4", "foo", {
        foo: {
          pet: {
            count: 4
          }
        }
      }));
    });
  });

});
