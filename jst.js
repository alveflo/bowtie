module.exports = {
  parse: function(filename, settings) {
    var fs = require('fs');
    var clientCodeParser = require('./parsers/clientcodeparser.js');
    var parser = require('./grammar.js').parser;

    var beautify_html = require('js-beautify').html;

    var encoding = 'utf8';
    if (settings.encoding)
      encoding = settings.encoding;

    var file = fs.readFileSync(filename, encoding);

    // Preparse , i.e. rip out client code (script- and style blocks)
    // in order to skip parsing of these
    var preparsed = clientCodeParser.preParse(file);
    var preparsedResult = preparsed[0];
    var forpostparse = preparsed[1];

    // Scan for import and replace +import("/foo/bar") -> content

    // Set settings to parser scope
    parser.yy.settings = settings;
    // Run parser
    var res = parser.parse(preparsedResult);

    // Put the client code back in place
    res = clientCodeParser.postParse(res, forpostparse);

    fs.writeFile(filename + ".html", beautify_html(res), function(err) {
      if (err) return console.log(err);
    });
  }
}
