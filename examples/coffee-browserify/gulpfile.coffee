path = require 'path'
gulp = require 'gulp'
jade = require 'gulp-jade'
gutil = require 'gulp-util'
cache = require 'gulp-cached'
jshint = require 'gulp-jshint'
coffee = require 'gulp-coffee'
stylus = require 'gulp-stylus'
uglify = require 'gulp-uglify'
concat = require 'gulp-concat'
plumber = require 'gulp-plumber'
reload = require 'gulp-livereload'
coffeeify = require 'gulp-coffeeify'
autowatch = require 'gulp-autowatch'


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
  gulp.src paths.coffeeSrc
    .pipe plumber()
    .pipe coffeeify()
    .pipe gulp.dest './public'
    .pipe reload()

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
