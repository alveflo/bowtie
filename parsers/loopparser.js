var contentParser = require('./contentparser');
var trimmer = require('../utils/trimmer');

function loopArray(varname, obj, block, settings) {
  var retVal = "";
  if (!settings.hasOwnProperty(trimmer.trimVariableName(obj)))
    throw "No such variable '" + obj + "'!";
  var arr = settings[trimmer.trimVariableName(obj)];
  for (var i in arr) {
    var elem = arr[i];
    var settings = {};
    settings[trimmer.trimVariableName(varname)] = elem;
    retVal += contentParser.parseString(block, settings);
  }
  return retVal;
}

module.exports = {
  loopBasic: function(varname, min, max, block) {
    var parsedStr = [];
    var str = "";
    for (var i = min ; i < max ; i++) {
      str = block;
      while (str.indexOf("#{"+varname+"}") != -1) {
        str = str.replace("#{"+varname+"}", i);
      }
      while (str.indexOf(varname) != -1) {
        str = str.replace(varname, i);
      }
      parsedStr.push(str);
    }
    return parsedStr.join(' ');
  },
  loopObject: function(varname, obj, block, settings) {
    return loopArray(varname, obj, block, settings);
  }
};
