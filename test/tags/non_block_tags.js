'use strict';

var assert = require('assert'),
    parser = require('../../parsers/tagparser.js');

describe('Self closing tags', function() {

    it ('Should return <a href="foo.html">foo</a>', function() {
      var tag = 'a(href="foo.html")'
      assert.equal('<a href="foo.html">foo</a>', parser.parseTag(tag, "foo").trim());
    });

    it ('Should return <p class="className" ng-model="foo">foo</p>', function() {
      var tag = 'p.className(ng-model="foo")'
      assert.equal('<p class="className" ng-model="foo">foo</p>', parser.parseTag(tag, "foo").trim());
    });

    it ('Should return <button id="foo" class="className1 className2">{{foo.bar}}</button>', function() {
      var tag = 'button#foo.className1.className2'
      assert.equal('<button id="foo" class="className1 className2">{{foo.bar}}</button>', parser.parseTag(tag, "{{foo.bar}}").trim());
    });

    it ('Should return empty string', function() {
      var tag = '';
      assert.equal('', parser.parseTag(tag, 'foo bar').trim());
    });

    it ('Should return empty string', function() {
      var tag = '.foo#bar(href="index.html")';
      assert.equal('', parser.parseTag(tag, 'foo bar').trim());
    });

});
