var fs = require('fs');
var jison = require('jison');
var preparser = require('./preparser.js');
var pretty = require('html');

var bnf = fs.readFileSync('grammar.jison', 'utf8');
var jst = fs.readFileSync('example.jst', 'utf8');
var parser = new jison.Parser(bnf);

var preparsed = preparser.parse(jst);
var res = parser.parse(preparsed[0]);
var blocks = preparsed[1];
var settings = {
  apa: ['a','b','c','d','e','f','g','h','i','j','k']
}
for (var i in blocks)
  res = res.replace('<%='+i+'=%>', blocks[i]);

var regex = /#{([a-zA-Z][^:\s{};]*)}/g;
var match;

while (match = regex.exec(res)) {
  var lMatch = match[1];

  try {
    res = res.replace(match[0], eval('(' + 'settings.' + lMatch + ')'));
  } catch (ex) {
    console.log(ex);
  }
}

console.log(pretty.prettyPrint(res));
