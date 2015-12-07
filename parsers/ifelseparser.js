'use strict';

var contentParser = require('./contentparser.js');
module.exports = {
  parseIfWithoutElse: function(expression, block, settings) {
    try {
      var result = eval('('+contentParser.parseVariable(expression, settings)+')');

      if (result === true) {
        return block;
      }
    } catch (ex) {}
    return "";
  },
  parseIfElse: function(expression, trueBlock, falseBlock, settings) {
    try {
      var result = eval('('+contentParser.parseVariable(expression, settings)+')');
      if (result === true) {
        return trueBlock;
      }
    } catch (ex) {}
    return falseBlock;
  }
};
