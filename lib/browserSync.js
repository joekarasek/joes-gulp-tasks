'use strict';
const browserSync = require('browser-sync').create('server');
const path = require('path');
const _ = require('lodash');

module.exports = (gulp, config, tasks) => {
  const watchFiles = [];
  if (config.browserSync.enabled) {
    // watchFiles.push(path.join(config.browserSync.baseDir, ''));
  }
  if (config.browserSync.watchFiles) {
    config.browserSync.watchFiles.forEach((file) => {
      watchFiles.push(file);
    });
  }
  const options = {
    browser: config.browserSync.browser,
    server: {
      baseDir: config.browserSync.baseDir,
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

  function serve() {
    return browserSync.init(options);
  }
  serve.description = 'Create a local server using BrowserSync';
  gulp.task('serve', serve);
  tasks.default.push('serve');
};