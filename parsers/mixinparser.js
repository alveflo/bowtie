'use strict';

function mixin() {
  this.mixinBox = {};
}

mixin.prototype.newMixin = function(identifier, argumentlist, block) {
  for (var i in argumentlist) {
    while (block.indexOf(argumentlist[i]) > 0)
      block = block.replace(argumentlist[i], "<%#"+i+"#%>");
  }
  this.mixinBox[identifier] = block;
};

mixin.prototype.evalMixin = function(identifier, argumentlist, content) {
  if (!this.mixinBox.hasOwnProperty(identifier))
    throw new Error("No such mixin '" + identifier + "'!");
  var block = this.mixinBox[identifier];
  for (var i in argumentlist) {
    var placeholder = "#{<%#"+i+"#%>}";
    while (block.indexOf(placeholder) > 0)
      block = block.replace(placeholder, argumentlist[i]);
    placeholder = "<%#"+i+"#%>";
    while (block.indexOf(placeholder) > 0)
      block = block.replace(placeholder, argumentlist[i]);
  }
  if (content) {
    block = block.replace("<%=BOWTIE-CONTENT=%>", content);
  }
  return block;
};

module.exports = mixin;
