// Returns [string :string, codeblocks : array]
function ripOutCode(str) {
  var blocks = [];
  var blockCount = 0;
  var parsedStr = str;
  var regex = /(script|style).*{/g;
  var match,
      block,
      substr,
      braceCounter;
  while (match = regex.exec(str)) {
    substr = str.substring(match.index + match[0].length, str.length);
    braceCounter = 1;
    block = "";
    for (var c in substr) {
      if (substr[c] == '{')
        braceCounter++;
      else if (substr[c] == '}')
        braceCounter--;
      if (braceCounter == 0)
        break;
      block += substr[c];
    }

    blocks[blockCount] = block;
    var tempStr = str.substring(0, match.index + match[0].length) + ' <%=' + blockCount++ + '=%> ' + str.substring(match.index + match[0].length + block.length, str.length);
    str = tempStr;

  }
  return [str, blocks];
}

module.exports = {
  parse: function(str) {
    return ripOutCode(str);
  }
}
