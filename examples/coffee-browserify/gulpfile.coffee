path = require 'path'
gulp = require 'gulp'
stylus = require 'gulp-stylus'
uglify = require 'gulp-uglify'
reload = require 'gulp-livereload'
awatch = require 'gulp-autowatch'
source = require 'vinyl-source-stream'
buffer = require 'vinyl-buffer'

coffeeify = require 'coffeeify'
browserify = require 'browserify'

# paths
paths =
  coffeeSrc: './client/start.coffee'
  coffee: './client/**/*.coffee'
  html: './client/*.html'
  stylus: './client/css/**/*.styl'
  public: './public'

gulp.task 'server', (cb) ->
  require './start'

# javascript
gulp.task 'coffee', ->
    bCache = {}
    b = browserify paths.coffeeSrc,
      debug: true
      insertGlobals: false
      cache: bCache
      extensions: ['.coffee']
    b.transform coffeeify
    b.bundle()
    .pipe source "start.js"
    .pipe buffer()
    .pipe gulp.dest paths.public
    .pipe reload()

gulp.task 'html', ->
  gulp.src paths.html
  .pipe gulp.dest paths.public
  .pipe reload()

gulp.task 'stylus', ->
  gulp.src paths.stylus
  .pipe stylus()
  .pipe gulp.dest paths.public
  .pipe reload()

gulp.task 'watch', ->
  awatch gulp, paths

gulp.task 'default', ['coffee', 'html', 'stylus', 'server', 'watch']
