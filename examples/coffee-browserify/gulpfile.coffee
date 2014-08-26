path = require 'path'
gulp = require 'gulp'
uglify = require 'gulp-uglify'
reload = require 'gulp-livereload'
autowatch = require 'gulp-autowatch'
source = require 'vinyl-source-stream'
buffer = require 'vinyl-buffer'

coffeeify = require 'coffeeify'
browserify = require 'browserify'

# paths
paths =
  coffeeSrc: './client/start.coffee'
  coffee: './client/**/*.coffee'
  html: './client/*.html'
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
    .pipe gulp.dest './public'
    .pipe reload()

gulp.task 'watch', ->
  autowatch gulp, paths

gulp.task 'html', ->
  gulp.src paths.html
  .pipe gulp.dest paths.public

gulp.task 'default', ['coffee', 'html', 'server', 'watch']
