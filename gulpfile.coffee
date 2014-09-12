gulp       = require 'gulp'
uglify     = require 'gulp-uglify'
rename     = require 'gulp-rename'
sourcemaps = require 'gulp-sourcemaps'
autowatch  = require 'gulp-autowatch'
open       = require 'gulp-open'
mocha      = require 'gulp-mocha'
coffee     = require 'gulp-coffee'
coffeelint = require 'gulp-coffeelint'

source     = require 'vinyl-source-stream'
buffer     = require 'vinyl-buffer'
coffeeify  = require 'coffeeify'
browserify = require 'browserify'


paths =
  coffee: 'src/**/*.coffee'
  coffeeSrc: './src/index.coffee'
  jsSrc: './lib/index.js'
  test: 'test/main.coffee'

gulp.task 'watch', ->
  autowatch gulp, paths

gulp.task 'test', ->
  bCache = {}
  b = browserify './test/main.coffee',
    standalone: 'fission'
    debug: true
    insertGlobals: true
    cache: bCache
    extensions: ['.coffee']
  b.transform coffeeify 
  b.bundle()
  .pipe source 'main.js'
  .pipe buffer()
  .pipe sourcemaps.init()
  .pipe sourcemaps.write()
  .pipe gulp.dest 'test/browser'


gulp.task 'test:browser', ['test'], ->
  gulp.src './test/browser/index.html'
    .pipe open()

gulp.task 'coffee', ->
  gulp.src paths.coffee
  #.pipe coffeelint()
  #.pipe coffeelint.reporter()
  .pipe coffee()
  .pipe gulp.dest './lib'

gulp.task 'amd', ->
  bCache = {}
  b = browserify paths.coffeeSrc,
    standalone: 'fission'
    debug: true
    insertGlobals: true
    cache: bCache
    extensions: ['.coffee']
  b.transform coffeeify
  b.bundle()
  .pipe source 'fission.js'
  .pipe buffer()
  .pipe gulp.dest 'dist'
  .pipe uglify()
  .pipe rename 'fission.min.js'
  .pipe gulp.dest 'dist'


gulp.task 'default', ['coffee', 'test', 'amd', 'watch']
