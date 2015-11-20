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
for (var i in blocks)
  res = res.replace('<%='+i+'=%>', blocks[i]);

console.log(pretty.prettyPrint(res));
