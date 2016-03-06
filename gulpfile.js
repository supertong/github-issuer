const gulp = require('gulp');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const watchify = require('watchify');
const browserify = require('browserify');
const reactify = require('reactify');
const streamify = require('gulp-streamify');

const path = {
  DIST: './dist/'
};

gulp.task('default', function() {
  var bundler = watchify(browserify({
    entries: ['./core/popup.jsx'],
    transform: [reactify],
    extensions: ['.jsx'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));

  function build(file) {
    if (file) gutil.log('Recompiling ' + file);
    return bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source(path.DIST + 'popup.js'))
      .pipe(gulp.dest('./'));
  }
  build();
  bundler.on('update', build);
});
