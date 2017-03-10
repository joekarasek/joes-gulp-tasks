'use strict';

module.exports = (gulp, config, tasks) => {
  
  function cleanPipe(done) {
    gulp.src(config.assets.sources)
        .pipe(gulp.dest(config.assets.dest));
    done();
  }
  cleanPipe.description = 'Transfer files without processing';
  gulp.task('compile:cleanAssetTransfer', cleanPipe);
  tasks.compile.push('compile:cleanAssetTransfer');


  function watchAssets() {
    const watchTasks = [cleanPipe];
    return gulp.watch(config.assets.sources, gulp.parallel(watchTasks));
  }
  watchAssets.description = 'Watch Scss';
  gulp.task('watch:assets', watchAssets);
  tasks.watch.push('watch:assets');
  
};
