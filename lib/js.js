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

  function compileJs(done) {
    // if there are include paths, adds them to an array sources, otherwise uses just config.js.source
    const source = config.js.includePaths ? config.js.includePaths : [];
    source.push(config.js.source);
    gulp.src(source)
        .pipe(gulpif(config.js.sourceMap, sourcemaps.init()))
        .pipe(gulpif(config.js.babel, babel())) // all babel options handled in `.babelrc`
        .pipe(concat(config.js.destFileName))
        .pipe(gulpif(config.js.uglify, uglify()))
        .pipe(gulpif(config.js.sourceMap, sourcemaps.write((config.js.sourceMap) ? './' : null)))
        .pipe(gulp.dest(config.js.dest))
        .on('end', () => {
      if (config.browserSync.enabled) {
      browserSync.get('server').reload();
    }
    done();
  });
  }
  compileJs.description = 'Transpile JS using Babel, concat and uglify.';
  gulp.task('compile:js', compileJs);
  tasks.compile.push('compile:js');

  gulp.task('clean:js', (done) => {
    del([
      `${config.js.dest}*.{js,js.map}`,
    ], { force: true }).then( () => { done(); } );
  });
  tasks.clean.push('clean:js');


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


  gulp.task('watch:js', () => gulp.watch(config.js.source, gulp.parallel('compile:js', validateJs)));
  tasks.watch.push('watch:js');


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