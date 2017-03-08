'use strict';
const autoprefixer = require('autoprefixer');
const del = require('del');
const postcss = require('gulp-postcss');
const flatten = require('gulp-flatten');
const gulpif = require('gulp-if');
const cached = require('gulp-cached');
const join = require('path').join;
const sassdoc = require('sassdoc');
const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const stylelint = require('gulp-stylelint');

// TODO includePaths does not seem to be working :(

module.exports = (gulp, config, tasks) => {

  /**
   * Compiles Scss with the following steps:
   * 1. Glob the Sass
   * 2. compile scss
   * 3. run compiled scss through autoprefixer for browser support
   * 4. produce source maps
   * 5. flatten output
   * Adds 'compile:scss' to tasks.compile
   * @param done
   */
  function compileScss(done) {
    gulp.src(config.css.source)
        .pipe(sassGlob())
        .pipe(gulpif(config.css.sourceMap, sourcemaps.init({})))
        .pipe(sass({
          outputStyle: config.css.outputStyle,
          sourceComments: config.css.sourceComments,
          includePaths: config.css.includePaths,
        }).on('error', sass.logError))
        .pipe(postcss(
            [
              autoprefixer({
                browsers: config.css.autoPrefixerBrowsers,
              }),
            ]
        ))
        .pipe(gulpif(config.css.sourceMap, sourcemaps.write((config.css.sourceMap) ? './' : null)))
        .pipe(gulpif(config.css.flattenOutput, flatten()))
        .pipe(gulp.dest(config.css.dest))
        .on('end', () => {
      done();
  });
  };
  compileScss.description = 'Compile Scss from source to dest, including sourcemap, autoprefixer, and flatten';
  gulp.task('compile:scss', done => compileScss(done));
  tasks.compile.push('compile:scss');

  /**
   * Removes *.css and *.css.map from the the dest
   * Adds 'clean:css' to tasks.clean
   * @param done
   */
  function cleanCss(done) {
    return del(
      [
        join(config.css.dest, '*.{css,css.map}'),
      ],
      { force: true }
    ).then(() => { done(); });
  }
  gulp.task('clean:css', cleanCss);
  tasks.clean.push('clean:css');

  /**
   * Runs source scss through stylelint using settings in `.stylelinerc.js`
   * Adds 'validate:css' to tasks.validate
   */
  function validateCss() {
    return gulp.src(config.css.source)
        .pipe(cached('validate:css'))
        .pipe(stylelint({
          failAfterError: false,
          reporters: [
            { formatter: 'string', console: true },
          ],
        }));
  };
  validateCss.description = 'Lint Scss';
  gulp.task('validate:css', () => validateCss());
  if (config.css.lint) {
    tasks.validate.push('validate:css');
  }

  /**
   * Builds documentation from scss using sassdoc
   * See http://sassdoc.com/ for more information
   * Adds 'docs:sassdoc' to tasks.compile
   * Also adds 'clean:docs:sassdoc' to tasks.clean
   */
  function docsCss() {
    return gulp.src(config.css.source)
        .pipe(sassdoc({
          dest: config.css.sassdoc.dest,
          verbose: config.css.sassdoc.verbose,
          exclude: config.css.sassdoc.exclude,
        }));
  };
  docsCss.description = 'Build CSS docs using SassDoc';
  gulp.task('docs:sassdoc', docsCss);
  gulp.task('clean:docs:sassdoc', (done) => {
    del([config.css.sassdoc.dest]).then(() => {
      done();
    });
  });
  if (config.css.sassdoc.enabled) {
    tasks.compile.push('docs:sassdoc');
    tasks.clean.push('clean:docs:sassdoc');
  }

  /**
   * Create gulp watch for scss source
   * On file change, triggers the following tasks
   * 1. 'compile:scss'
   * 2. 'docs:sassdoc' if enabled
   * 3. 'validate:css' if enabled
   * Adds 'watch:css' to tasks.watch
   */
  function watchCss() {
    const watchTasks = [compileScss];
    if (config.css.lint) {
      watchTasks.push(validateCss);
    }
    if (config.css.sassdoc.enabled) {
      watchTasks.push('docs:sassdoc');
    }
    return gulp.watch(config.css.source, gulp.parallel(watchTasks));
  }
  watchCss.description = 'Watch Scss';
  gulp.task('watch:css', watchCss);
  tasks.watch.push('watch:css');

};
