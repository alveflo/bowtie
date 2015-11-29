var fs = require('fs');
var clientCodeParser = require('./parsers/clientcodeparser.js');
var parser = require('./grammar.js').parser;

var pretty = require('html');

var bnf = fs.readFileSync('grammar.jison', 'utf8');
var jst = fs.readFileSync('example.jst', 'utf8');


var settings = {
  apa: ['a','b','c','d','e','f','g','h','i','j','k']
}



// Preparse , i.e. rip out client code (script- and style blocks)
// in order to skip parsing of these
var preparsed = clientCodeParser.preParse(jst);
// Set settings to parser scope
parser.yy.settings = settings;
// Run parser
var res = parser.parse(preparsed[0]);

// Put the client code back in place
res = clientCodeParser.postParse(res, preparsed[1]);


console.log(res);
