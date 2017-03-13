'use strict';
// ========================
// Dependencies
// ========================
const gulp          = require('gulp');
const joesGulpTasks = require('joes-gulp-tasks');
const config        = require('./gulpconfig.js');

// ========================
// Joe' Gulp Tasks
// ========================
const tasks = {
  compile: [],
  watch: [],
  validate: [],
  clean: [],
  default: ['watch'],
};
// Populates specific gulp tasks based on gulpconfig.js
// Also adds active tasks to the tasks object in their appropriate arrays
joesGulpTasks(gulp, config, tasks);


// ========================
// Custom Tasks
// ========================
//
// Here's a simple pattern to follow for creating your own gulp tasks, don't
// forget to add any needed dependencies to the top of the file as well.
//
//         gulp.task('myTask', function() {
//           return gulp.src('/mySource')
//               .pipe(aPlugin())
//               .pipe(anotherCoolPlugin())
//               .pipe(gulp.dest('./myDest'));
//         });
//         tasks.default.push('myTask');
//
// See the readme for further instructions on adding your own commands.

// Add custom tasks here

// ========================
// End Custom Tasks
// ========================

// ========================
// Master Tasks
// ========================

// If any cleaning tasks exists, defines a master clean task `gulp clean`
tasks.clean[0] ? gulp.task('clean', gulp.parallel(tasks.clean)) : null;
// If any compiling tasks exists, defines a master compile task `gulp compile`
tasks.compile[0] ? gulp.task('compile', gulp.series(
    'clean',
    gulp.series(tasks.compile)
)) : null;
// If any validating tasks exists, defines a master validate task `gulp validate`
tasks.validate[0] ? gulp.task('validate', gulp.parallel(tasks.validate)) : null;
// If any watch tasks exists, defines a master watch task `gulp watch`
tasks.watch[0] ? gulp.task('watch', gulp.parallel(tasks.watch)) : null;
// Defines a master default task which always starts with a compile `gulp`
tasks.default[0] ? gulp.task('default', gulp.series(
    'compile',
    gulp.parallel(tasks.default)
)) : null;

// ========================
// End Master Tasks
// ========================

