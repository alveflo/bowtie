'use strict';

module.exports = {
  compile: function(content, settings) {
    var fs = require('fs');
    var extend = require('util')._extend;
    var clientCodeParser = require('./parsers/clientcodeparser.js');
    var parser = require('./grammar/grammar.js').parser;

    var beautify_html = require('js-beautify').html;

    // Preparse , i.e. rip out client code (script- and style blocks)
    // in order to skip parsing of these
    var preparsed = clientCodeParser.preParse(content);
    // Get the file content without client code
    var preparsedResult = preparsed[0];
    // Get the client code for post parsing
    var forpostparse = preparsed[1];

    // Scan for import and replace +import("/foo/bar") -> content

    // Set settings to parser scope
    parser.yy.settings = {};

    if (settings.locals) {
      parser.yy.settings = extend({}, settings.locals);
    }
    // Run parser
    var res = parser.parse(preparsedResult);

    // Put the client code back in place
    res = clientCodeParser.postParse(res, forpostparse);

    if (settings.pretty)
      res = beautify_html(res);

    return res;

  }
}
