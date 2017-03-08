'use strict';
const htmlhint = require('gulp-htmlhint');
// const pug = require('gulp-pug');
const data = require('gulp-data');
const del = require('del');
const path = require('path');
const join = require('path').join;
const twig = require('gulp-twig');
const gulpif = require('gulp-if');

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
    return gulp.src(config.html.sources)
        .pipe(data((file) => {
              let dataPath = (path.dirname(file.path) + '/' + path.basename(file.path, '.twig') + '.data.json');
              return require(dataPath);
            }))
        .pipe(gulpif(config.html.twig.enabled, twig({
          base: config.html.twig.baseDir,
          data: {
            title: 'hello'
          }
        })))
        .pipe(gulp.dest(config.html.dest))
        .on('end', () => {
          if (config.browserSync.enabled) {
            // browserSync.get('server').reload();
          }
          done();
        });
  };
  compileHtml.description = 'Move html from source to build and run Swig if enabled';
  gulp.task('compile:html', done => compileHtml(done));
  tasks.compile.push('compile:html');

  /**
   * Runs runs basic validator on html
   * Adds 'validate:html' to tasks.validate
   */
  function validateHtml() {
    return gulp.src(config.html.sources)
        .pipe(htmlhint())
        .pipe(htmlhint.reporter('htmlhint-stylish'));
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
    const watchTasks = [compileHtml];
    if (config.html.lint) {
      watchTasks.push(validateHtml);
    }
    return gulp.watch(config.html.sources, gulp.parallel(watchTasks));
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