gulp       = require 'gulp'
uglify     = require 'gulp-uglify'
rename     = require 'gulp-rename'
sourcemaps = require 'gulp-sourcemaps'
gif        = require 'gulp-if'
lr         = require 'gulp-livereload'
coffeeify  = require 'gulp-coffeeify'
autowatch  = require 'gulp-autowatch'
open       = require 'gulp-open'
concat     = require 'gulp-concat'

mocha = require 'gulp-mocha'

paths =
  coffee: 'src/**/*.coffee'
  coffeeSrc: 'src/index.coffee'
  test: 'test/main.coffee'

gulp.task 'watch', ->
  autowatch gulp, paths

gulp.task 'test', ->
  gulp.src paths.test
    .pipe coffeeify()
    .pipe concat 'main.js'
    .pipe gulp.dest 'test/browser'

gulp.task 'test:browser', ['test'], ->
  gulp.src './test/browser/index.html'
    .pipe open()

gulp.task 'coffee', ->
  gulp.src paths.coffeeSrc
    .pipe sourcemaps.init()
    .pipe coffeeify()
    .pipe sourcemaps.write()
    .pipe rename 'fission.js'
    .pipe gulp.dest 'examples/coffee-require/client/vendor'
    .pipe gulp.dest 'examples/coffee-browserify/client/vendor'
    .pipe gulp.dest 'dist'
    .pipe uglify()
    .pipe rename 'fission.min.js'
    .pipe gulp.dest 'dist'
    .pipe lr()

gulp.task 'default', ['coffee', 'test', 'watch']
