/*
 * grunt-kramdown-rfc2629
 * https://github.com/hildjj/grunt-kramdown-rfc2629
 *
 * Copyright (c) 2014 Joe Hildebrand
 * Licensed under the MIT license.
 */

'use strict';

var child_process = require('child_process');
var path = require('path');
var async = require('async');

function replace_ext(dir, filepath, ext) {
  return path.join(dir,
    path.basename(filepath, path.extname(filepath)) + ext);
}

var validTypes = ['text', 'html', 'raw', 'nroff'];

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('kramdown_rfc2629', 'Edit RFCs in kramdown, then generate XML, text, and HTML.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      outputs: ['text', 'html'],
      outputDir: 'output',
      removeXML: false
    });

    if (typeof(options.outputs) === 'string') {
      options.outputs = [options.outputs];
    }

    var outputs = options.outputs.filter(function(o) {
      return (validTypes.indexOf(o) >= 0);
    }).map(function(o) {
      return "--" + o;
    });
    if (outputs.length < 1) {
      return grunt.fail.fatal('No valid output format specified: ' + options.outputs);
    }
    outputs = " " + outputs.join(' ');

    var done = this.async();

    grunt.file.mkdir(options.outputDir);
    async.each(this.filesSrc, function(filepath, cb) {
      var xml = replace_ext(options.outputDir, filepath, ".xml");
      var html = replace_ext(options.outputDir, filepath, ".html");
      var txt = replace_ext(options.outputDir, filepath, ".txt");
      async.series([
        function(cb) {
          grunt.log.write('Creating "' + xml + '"...');
          child_process.exec("kramdown-rfc2629 " + filepath + " > " + xml, function(er) {
            if (er) {
              grunt.log.errorlns(er);
            } else {
              grunt.log.ok();
            }
            cb(er);
          });
        },
        function(cb) {
          grunt.log.write('Creating ' + options.outputs.join(' and ') +
            ' in "' + options.outputDir + '"...');

          child_process.exec("xml2rfc "  + xml + outputs, function(er) {
            if (er) {
              grunt.log.errorlns(er);
            } else {
              grunt.log.ok();
            }
            cb(er);
          });
        },
        function(cb) {
          if (options.removeXML) {
            grunt.log.write('Deleting "' + xml + '"...');
            grunt.file.delete(xml);
            grunt.log.ok();
          }
          cb();
        }
      ], cb);
    }, done);
  });

};
