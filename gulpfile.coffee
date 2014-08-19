gulp       = require 'gulp'
jshint     = require 'gulp-jshint'
uglify     = require 'gulp-uglify'
rename     = require 'gulp-rename'
sourcemaps = require 'gulp-sourcemaps'
gif        = require 'gulp-if'
lr         = require 'gulp-livereload'
watchify   = require 'watchify'
coffeeify  = require 'gulp-coffeeify'
autowatch  = require 'gulp-autowatch'

mocha = require 'gulp-mocha'

paths =
  coffee: 'src/**/*.coffee'
  coffeeSrc: 'src/index.coffee'
  test: 'test/**/*.coffee'

gulp.task 'watch', ->
  autowatch gulp, paths


gulp.task 'test', ->
  #gulp.src(paths.test)
  #  .pipe mocha
  #    reporter: 'spec'
  #    ui: 'exports'

gulp.task 'coffee', ->
  gulp.src paths.coffeeSrc
    .pipe sourcemaps.init()
    .pipe coffeeify()
    .pipe sourcemaps.write()
    .pipe rename 'fission.js'
    .pipe gulp.dest 'examples/coffee-require/client/vendor'
    .pipe gulp.dest 'dist'
    .pipe uglify()
    .pipe rename 'fission.min.js'
    .pipe gulp.dest 'dist'
    .pipe lr()

gulp.task 'default', ['coffee', 'test', 'watch']
