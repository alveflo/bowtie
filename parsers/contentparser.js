var trimmer = require('../utils/trimmer');

function parseString(str, settings) {
  // Start with indexers , i.e. [$i]
  var regex = /\[(\$[a-zA-Z][\w|.|]*)]/g;
  var match;

  while (match = regex.exec(str)) {
    var lMatch = match[1];
    str = str.replace(lMatch, parseVariable(lMatch, settings));
  }

  // Then evaluate others i.e. foo.bar[0]
  regex = /#{(\$[a-zA-Z][\w|.|\[|\]]*)}/g;
  while (match = regex.exec(str)) {
    var lMatch = match[1];
    str = str.replace(match[0], parseVariable(lMatch, settings));
  }
  console.log(str);
  console.log(settings);

  return str;
}

function parseVariable(str, settings) {
  // remove dollarsign; Variablename: $var
  str = trimmer.trimVariableName(str);
  try {
    str = str.replace(str, eval('(settings.'+str+')'));
  } catch (ex) {}
  return str;
}

module.exports = {
  "parseString": parseString,
  "parseVariable": parseVariable
};
