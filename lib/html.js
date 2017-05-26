'use strict';
const htmlhint = require('gulp-htmlhint');
const data = require('gulp-data');
const del = require('del');
const fs = require('fs');
const path = require('path');
const join = require('path').join;
const twig = require('gulp-twig');
const gulpif = require('gulp-if');
const _ = require('lodash');

module.exports = (gulp, config, tasks) => {

  /**
   * Compiles html templates with twig.js
   * '.twig' and '.html' files listed in config.html.sources are piped through twig
   * data can be match for each template by matching the file with '*.data.json' file
   * for example: 'index.twig' and 'index.data.json'
   * Adds 'compile:html' to tasks.compile
   * @param done
   */
  function compileHtml(done) {
    var data = {};
    config.html.twig.dataSrc.forEach(function(filePath) {
      _.merge(data, JSON.parse(fs.readFileSync(filePath)));
    });
    return gulp.src(config.html.sources)
        .pipe(gulpif(config.html.twig.enabled, twig({
          data,
          base: config.html.twig.baseDir,
        })))
        .pipe(gulp.dest(config.html.dest))
        .on('end', () => { done(); });
  };
  compileHtml.description = 'Move html from source to build and run Swig if enabled';
  gulp.task('compile:html', done => compileHtml(done));
  tasks.compile.push('compile:html');

  /**
   * Runs runs basic validator on html
   * Adds 'validate:html' to tasks.validate
   */
  function validateHtml(done) {
    return gulp.src(config.html.dest + 'index.html')
        .pipe(htmlhint({
          "alt-require": true,
        }))
        .pipe(htmlhint.reporter('htmlhint-stylish'))
        .on('end', () => done() );
  };
  validateHtml.description = 'Lint Html';
  gulp.task('validate:html', validateHtml);
  if (config.html.lint) {
    tasks.validate.push('validate:html');
  }

  /**
   * Removes *.css and *.css.map from the the dest
   * Adds 'clean:css' to tasks.clean
   * @param done
   */
  function cleanHtml(done) {
    del(
        [
          join(config.html.dest, '*.html'),
        ],
        { force: true }
    )
        .then(() => { done(); });
  }
  cleanHtml.description = 'Clean built html';
  gulp.task('clean:html', cleanHtml);
  tasks.clean.push('clean:html');


  /**
   * Create gulp watch for twig.js templates
   * On file change, triggers the following tasks
   * 1. 'compile:html'
   * 2. 'validate:html' if enabled
   * Adds 'watch:html' to tasks.watch
   */
  function watchHtml() {
    const watchDirectories = config.html.sources;
    if (config.html.twig.enabled) {
      watchDirectories.push(config.html.twig.baseDir + '**/*.twig');
    }
    return gulp.watch(watchDirectories, gulp.series('compile:html', 'validate:html'));
  }
  watchHtml.description = 'Watch Html';
  gulp.task('watch:html', watchHtml);
  tasks.watch.push('watch:html');


  function easterHello(done) {
    console.log("World!");
    done();
  }
  easterHello.description = "Easter egg";
  gulp.task('hello', easterHello);
};