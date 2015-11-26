module.exports = {
  parseIfWithoutElse: function(expression, block) {
    try {
      var result = eval('('+expression+')');

      if (result === true) {
        return block;
      }
    } catch (ex) {}
    return "";
  },
  parseIfElse: function(expression, trueBlock, falseBlock) {
    try {
      var result = eval('('+expression+')');
      if (result === true) {
        return trueBlock;
      }
    } catch (ex) {}
    return falseBlock;
  }
};
