'use strict';
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const cached = require('gulp-cached');
const gulpif = require('gulp-if');
const del = require('del');
const browserSync = require('browser-sync');
const path = require('path');
const jsdoc = require('gulp-documentation');

module.exports = (gulp, config, tasks) => {

  /**
   * Compiles Javascript with the following steps:
   * 1. Babel
   * 2. concat
   * 3. uglify
   * 4. produce source maps
   * 5. trigger browserSync reload
   * Adds 'compile:js' to tasks.compile
   */
  function compileJs(done) {
    // if there are include paths, adds them to an array sources, otherwise uses just config.js.source
    const source = config.js.includePaths ? config.js.includePaths : [];
    source.push(config.js.source);
    gulp.src(source)
        .pipe(gulpif(config.js.sourceMapEmbed, sourcemaps.init()))
        .pipe(gulpif(config.js.babel, babel())) // all babel options handled in `.babelrc`
        .pipe(concat(config.js.destFileName))
        .pipe(gulpif(config.js.uglify, uglify()))
        .pipe(gulpif(config.js.sourceMapEmbed, sourcemaps.write((config.js.sourceMapEmber) ? null : './')))
        .pipe(gulp.dest(config.js.dest))
        .on('end', () => {
      if (config.browserSync.enabled) {
      browserSync.get('server').reload();
    }
    done();
  });
  }
  compileJs.description = 'Compile JS using Babel, concat and uglify.';
  gulp.task('compile:js', compileJs);
  tasks.compile.push('compile:js');

  /**
   * Removes *.js from the js dest
   * Adds 'clean:js' to tasks.clean
   */
  gulp.task('clean:js', (done) => {
    del([
      `${config.js.dest}*.{js,js.map}`,
    ], { force: true }).then( () => { done(); } );
  });
  tasks.clean.push('clean:js');

  /**
   * Runs source javacript through eslint using settings in `.eslintrc.js`
   * Adds 'validate:js' to tasks.validate
   */
  function validateJs() {
    return gulp.src(config.js.eslint.sources)
        .pipe(cached('validate:js'))
        .pipe(eslint())
        .pipe(eslint.format());
  }
  validateJs.description = 'Lint JS.';
  gulp.task('validate:js', () => validateJs());
  if (config.js.eslint.enabled) {
    tasks.validate.push('validate:js');
  }

  /**
   * Create gulp watch for javascript source
   * On file change, in parallel runs the following tasks
   * 1. 'compile:js'
   * 2. 'validate:js' if enabled
   * Adds 'watch:css' to tasks.watch
   */
  gulp.task('watch:js', () => gulp.watch(
      config.js.source, gulp.parallel('compile:js', validateJs)
  ));
  tasks.watch.push('watch:js');

  /**
   * Builds documentation from javascript comments using DocumentationJS
   * See http://documentation.js.org/ for more information
   * Adds 'docs:jsdoc' to tasks.compile
   * Also adds 'clean:docs:jsdoc' to tasks.clean
   */
  function docsJs() {
    return gulp.src(config.js.documentationJs.sources)
        .pipe(jsdoc(config.js.documentationJs.format))
        .pipe(gulp.dest(config.js.documentationJs.dest));
  };
  docsJs.description = 'Build JS docs with Documentation.JS';
  gulp.task('docs:jsdoc', docsJs);
  gulp.task('clean:docs:jsdoc', (done) => {
    del([config.js.documentationJs.dest]).then(() => {
    done();
  });
  });
  if (config.js.documentationJs.enabled) {
    tasks.compile.push('docs:jsdoc');
    tasks.clean.push('clean:docs:jsdoc');
  }

};