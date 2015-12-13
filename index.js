'use strict';
var bowtie = require('./bowtie.js')
var extend = require('util')._extend;
var ext = require('gulp-util').replaceExtension;
var PluginError = require('gulp-util').PluginError;
var path = require('path');

function addCompiler(options) {
  return extend(options, {
    "$_compile_bowtie": compiler
  });
};

function compiler(filename, options) {
  var fs = require('fs');
  var encoding = 'utf8';
  if (options.encoding) {
    encoding = options.encoding;
  }

  var content = fs.readFileSync(filename, encoding);
  options = addCompiler(options);
  options.filename = path.join(process.cwd(), filename);

  return bowtie.compile(content, options);
};

module.exports = {
  "compiler": compiler,
  gulp: function(options) {
    var through = require('through2');
    var opts = extend({}, addCompiler(options));

    function CompileBowtie(file, enc, cb) {
      opts.filename = file.path;

      if (file.data) {
        opts = extend(opts, file.data)
      }

      file.path = ext(file.path, '.html');

      if (file.isBuffer()) {
        try {
          var contents = String(file.contents);
          var compiled = bowtie.compile(contents, opts);
          file.contents = new Buffer(compiled);
        } catch (e) {
          return cb(new PluginError('bowtie', e));
        }
      }
      cb(null, file);
    }
    return through.obj(CompileBowtie);
  }
};
