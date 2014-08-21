gulp       = require 'gulp'
uglify     = require 'gulp-uglify'
rename     = require 'gulp-rename'
sourcemaps = require 'gulp-sourcemaps'
autowatch  = require 'gulp-autowatch'
open       = require 'gulp-open'
mocha      = require 'gulp-mocha'

source     = require 'vinyl-source-stream'
buffer     = require 'vinyl-buffer'
watchify   = require 'watchify'
coffeeify  = require 'coffeeify'



paths =
  coffee: 'src/**/*.coffee'
  coffeeSrc: 'src/index.coffee'
  test: 'test/main.coffee'

gulp.task 'watch', ->
  autowatch gulp, paths

gulp.task 'test', ->
  testBundleCache = {}
  testBundler = watchify "./test/main.coffee",
    cache: testBundleCache
    extensions: ['.coffee']
  testBundler.transform coffeeify
  testBundler.bundle
    standalone: "fission"
    debug: true
    insertGlobals: true
  .pipe source "main.js"
  .pipe buffer()
  .pipe sourcemaps.init()
  .pipe sourcemaps.write()
  .pipe gulp.dest 'test/browser'
  .close()

gulp.task 'test:browser', ['test'], ->
  gulp.src './test/browser/index.html'
    .pipe open()

gulp.task 'coffee', ->
  bundleCache = {}
  bundler = watchify "./src/index.coffee",
    cache: bundleCache
    extensions: ['.coffee']
  bundler.transform coffeeify
  bundler.bundle
    standalone: "fission"
    debug: true
    insertGlobals: true
  .pipe source "fission.js"
  .pipe buffer()
  .pipe sourcemaps.init()
  .pipe sourcemaps.write()
  .pipe gulp.dest 'examples/coffee-require/client/vendor'
  .pipe gulp.dest 'examples/coffee-browserify/client/vendor'
  .pipe gulp.dest 'dist'
  .pipe uglify()
  .pipe rename 'fission.min.js'
  .pipe gulp.dest 'dist'
  .close()

gulp.task 'default', ['coffee', 'test', 'watch']
