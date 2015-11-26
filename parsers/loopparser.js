module.exports = {
  parseFor: function(varname, min, max, block) {
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
  }
};
