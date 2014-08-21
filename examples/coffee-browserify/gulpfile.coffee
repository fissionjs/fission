path = require 'path'
gulp = require 'gulp'
jade = require 'gulp-jade'
gutil = require 'gulp-util'
cache = require 'gulp-cached'
jshint = require 'gulp-jshint'
stylus = require 'gulp-stylus'
uglify = require 'gulp-uglify'
concat = require 'gulp-concat'
plumber = require 'gulp-plumber'
reload = require 'gulp-livereload'
autowatch = require 'gulp-autowatch'

source = require 'vinyl-source-stream'
buffer = require 'vinyl-buffer'

coffeeify = require 'coffeeify'
browserify = require 'browserify'


# paths
paths =
  img: './client/img/**/*'
  fonts: './client/fonts/**/*'
  coffee: './client/**/*.coffee'
  coffeeSrc: './client/start.coffee'
  stylus: './client/**/*.styl'
  jade: './client/**/*.jade'

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
    .pipe gulp.dest './public'
    #.pipe reload()

# styles
gulp.task 'stylus', ->
  gulp.src paths.stylus
    .pipe stylus()
    .pipe concat 'app.css'
    .pipe gulp.dest './public'
    .pipe reload()

gulp.task 'jade', ->
  gulp.src paths.jade
    .pipe jade()
    .pipe gulp.dest './public'
    .pipe reload()

gulp.task 'img', ->
  gulp.src paths.img
    .pipe cache 'img'
    .pipe gulp.dest './public/img'
    .pipe reload()

gulp.task 'watch', ->
  autowatch gulp, paths


gulp.task 'css', ['stylus']
gulp.task 'js', ['coffee']
gulp.task 'static', ['jade', 'img']
gulp.task 'default', ['js', 'css', 'static', 'server', 'watch']
