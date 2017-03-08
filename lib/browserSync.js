'use strict';
const browserSync = require('browser-sync').create('server');
const path = require('path');
const _ = require('lodash');

module.exports = (gulp, config, tasks) => {

  /**
   * Watch files using the baseDir for the server and any additional paths supplied through config
   * @type {Array}
   */
  const watchFiles = [];
  watchFiles.push(config.browserSync.baseDir);
  if (config.browserSync.additionalWatchFiles) {
    config.browserSync.additionalWatchFiles.forEach((file) => {
      watchFiles.push(file);
    });
  }
  /**
   * Map options from the config file to browserSyncs input
   * @type {{browser: Array, server: {baseDir: Array}, startPath: string, files: string, port: number, open: boolean, reloadOnRestart: boolean, reloadDelay: number, reloadDebounce: number, snippetOptions: {rule: {match: RegExp, fn: (function(): *)}}, notify: {styles: string[]}}}
   */
  const options = {
    browser: config.browserSync.browser,
    server: {
      baseDir: watchFiles,
    },
    startPath: config.browserSync.startPath,
    files: config.browserSync.baseDir,
    port: config.browserSync.port,
    open: config.browserSync.openBrowserAtStart,
    reloadOnRestart: true,
    reloadDelay: config.browserSync.reloadDelay,
    reloadDebounce: config.browserSync.reloadDebounce,
    // placing at `</body>` instead of `<body>`
    snippetOptions: {
      rule: {
        match: /<\/body>/i,
        fn: (snippet, match) => snippet + match,
      },
    },
    notify: {
      styles: [
        'display: none',
        'padding: 15px',
        'font-family: sans-serif',
        'position: fixed',
        'font-size: 0.9em',
        'z-index: 9999',
        'bottom: 0px',
        'right: 0px',
        'border-bottom-left-radius: 5px',
        'background-color: #1B2032',
        'margin: 0',
        'color: white',
        'text-align: center',
      ],
    },
  };

  /**
   * Initiates browserSync server
   * Adds task 'serve' to Gulp
   * @returns {*}
   */
  function serve() {
    return browserSync.init(options);
  }
  serve.description = 'Create a local server using BrowserSync';
  gulp.task('serve', serve);
  tasks.default.push('serve');
};