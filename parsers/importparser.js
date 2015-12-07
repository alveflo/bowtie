'use strict';

module.exports = {
  import: function(path) {
    var content = fs.readFileSync(process.cwd() + path, 'utf8');
    return content;
  }
};
