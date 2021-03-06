'use strict';
const browserSync = require('browser-sync');

module.exports = (gulp, config, tasks) => {

  if (config.browserSync.enabled) {
    require('./lib/browserSync')(gulp, config, tasks);
  }

  if (config.css.enabled) {
    require('./lib/css')(gulp, config, tasks);
  }
  
  if (config.html.enabled) {
    require('./lib/html')(gulp, config, tasks);
  }

  if (config.js.enabled) {
    require('./lib/js')(gulp, config, tasks);
  }

  if (config.assets.enabled) {
    require('./lib/cleanPipe')(gulp, config, tasks);
  }

};