function getTagName(tag) {
  var regex = /^[!|a-zA-Z]+/;
  var match = regex.exec(tag);
  if (match != null) {
    return match[0];
  }
  return "";
}

function getAttributes(tag) {
  var regex = /(\(.*\))/;
  var match = regex.exec(tag);
  if (match != null) {
    return " " + match[0].replace('(','').replace(')','');
  }
  return "";
}

function getClasses(tag) {
  var regex = /(\.[a-zA-Z]\w+)/g;
  var classes = [];
  var match;
  tag = tag.replace(/\(\S+[^\)]\)/, '');
  while (match = regex.exec(tag)) {
    classes.push(match[0].replace('.', ''));
  }
  if (classes.length > 0) {
    return " class=\"" + classes.join(' ') + "\"";
  }
  return "";
}

function getIds(tag) {
  var regex = /(#[a-zA-Z]+)/g;
  var classes = [];
  var match;
  tag = tag.replace(/\(\S+[^\)]\)/, '');
  while (match = regex.exec(tag)) {
    classes.push(match[0].replace('#', ''));
  }
  if (classes.length > 0) {
    return " id=\"" + classes.join(' ') + "\"";
  }
  return "";
}

module.exports = {
  parseTag: function(tag, body) {
    var tagName = getTagName(tag);
    var attributes = getAttributes(tag);
    var classes = getClasses(tag);
    var ids = getIds(tag);
    if (body) {
      return '<'+tagName+ids+classes+attributes+'>'+body+'</'+tagName+'> ';
    } else {
      if (tagName.indexOf('!') === 0)
        return '<'+tagName+ids+classes+attributes+'> ';
      return '<'+tagName+ids+classes+attributes+' /> ';
    }
  }
};
