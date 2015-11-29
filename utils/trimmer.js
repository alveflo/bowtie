module.exports = {
  trimVariableName: function(varname) {
    if (varname.indexOf("$") === 0)
      varname = varname.substring(1, varname.length);
    return varname;
  }
}
