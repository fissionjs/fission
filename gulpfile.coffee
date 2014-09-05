gulp       = require 'gulp'
uglify     = require 'gulp-uglify'
rename     = require 'gulp-rename'
sourcemaps = require 'gulp-sourcemaps'
autowatch  = require 'gulp-autowatch'
open       = require 'gulp-open'
mocha      = require 'gulp-mocha'
jshint     = require 'gulp-jshint'

source     = require 'vinyl-source-stream'
buffer     = require 'vinyl-buffer'
browserify = require 'browserify'


paths =
  js: 'lib/**/*.js'
  jsSrc: './lib/index.js'
  test: 'test/main.js'

gulp.task 'watch', ->
  autowatch gulp, paths

gulp.task 'test', ->
  bCache = {}
  b = browserify './test/main.js',
    standalone: 'fission'
    debug: true
    insertGlobals: true
    cache: bCache
  b.bundle()
  .pipe source 'main.js'
  .pipe buffer()
  .pipe sourcemaps.init()
  .pipe sourcemaps.write()
  .pipe gulp.dest 'test/browser'


gulp.task 'test:browser', ['test'], ->
  gulp.src './test/browser/index.html'
    .pipe open()

gulp.task 'js', ->
  gulp.src paths.js
  .pipe jshint()
  .pipe jshint.reporter()


gulp.task 'amd', ->
  bCache = {}
  b = browserify paths.jsSrc,
    standalone: 'fission'
    debug: true
    insertGlobals: true
    cache: bCache
  b.bundle()
  .pipe source 'fission.js'
  .pipe buffer()
  .pipe gulp.dest 'dist'
  .pipe uglify()
  .pipe rename 'fission.min.js'
  .pipe gulp.dest 'dist'


gulp.task 'default', ['js', 'test', 'amd', 'watch']
