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

    it ('Should return <p class="class-name class-name-foo" id="foo bar foo-bar" ng-model="foo">foo</p>', function() {
      var tag = 'p.class-name.class-name-foo#foo-bar(ng-model="foo"): foo'
      assert.equal('<p id="foo-bar" class="class-name class-name-foo" ng-model="foo">foo</p>', parser.parseTag(tag, "foo").trim());
    });

    it ('Should return <script src="foo-bar.js">alert(-1)</script>', function() {
      var tag = 'script(src="foo-bar.js")'
      assert.equal('<script src="foo-bar.js">alert(-1)</script>', parser.parseTag(tag, "alert(-1)").trim());
    });

    it ('Should return <link rel="stylesheet" href="/foo/foo-bar.css" />', function() {
      var tag = 'link(rel="stylesheet" href="/foo/foo-bar.css")'
      assert.equal('<link rel="stylesheet" href="/foo/foo-bar.css" />', parser.parseTag(tag).trim());
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
