'use strict';

function getTagName(tag) {
  var regex = /^[!|a-zA-Z]\w*/;
  var match = regex.exec(tag);
  var retVal = ""
  if (match != null) {
    retVal = match[0];
  }
  return retVal;
}

function getAttributes(tag) {
  var regex = /(\([^\)]*\))/;
  var match = regex.exec(tag);
  if (match != null) {
    return " " + match[0].replace('(','').replace(')','');
  }
  return "";
}

function getClasses(tag) {
  var regex = /(\.[a-zA-Z][\w|-]*)/g;
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
  var regex = /(#[a-zA-Z][\w|-]*)/g;
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
    var attributes = getAttributes(tag);
    tag = tag.replace('(' + attributes.trim() + ')', "");
    var tagName = getTagName(tag);
    console.log(tagName);
    // script without content must not be self closing,
    // since it's not valid html. so we need to compensate
    // for that...
    if ((tagName.toLowerCase() == 'script' && !body) || body) {
      var closeTag = true;
    }
    var classes = getClasses(tag);
    var ids = getIds(tag);

    if (tagName === '') {
      return '';
    }

    if (closeTag) {
      if (!body)
        body = "";
      return '<'+tagName+ids+classes+attributes+'>'+body+'</'+tagName+'> ';
    } else {
      if (tagName.indexOf('!') === 0)
        return '<'+tagName+ids+classes+attributes+'> ';
      return '<'+tagName+ids+classes+attributes+' /> ';
    }
  }
};
