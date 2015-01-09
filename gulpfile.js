'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var autowatch = require('gulp-autowatch');
var open = require('gulp-open');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');

var paths = {
  js: 'lib/**/*.js',
  jsSrc: './index.js',
  test: 'test/main.js'
};
var bCache = {};

gulp.task('watch', function() {
  autowatch(gulp, paths);
});

gulp.task('test', function() {
  var b = browserify('./test/main.js', {
    standalone: 'fission',
    debug: true,
    insertGlobals: true,
    cache: bCache
  });

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('test/browser'));
});

gulp.task('test:browser', ['test'], function() {
  return gulp.src('./test/browser/index.html').pipe(open());
});

gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('amd', function() {
  var b = browserify(paths.jsSrc, {
    standalone: 'fission',
    debug: true,
    insertGlobals: true,
    cache: bCache
  });

  return b.bundle()
    .pipe(source('fission.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename('fission.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['js', 'test', 'amd', 'watch']);
