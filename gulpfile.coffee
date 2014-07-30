gulp       = require 'gulp'
jshint     = require 'gulp-jshint'
uglify     = require 'gulp-uglify'
rename     = require 'gulp-rename'
sourcemaps = require 'gulp-sourcemaps'
gif        = require 'gulp-if'
#lr         = require 'gulp-livereload'
merge      = require 'merge-stream'
source     = require 'vinyl-source-stream'
buffer     = require 'vinyl-buffer'
watchify   = require 'watchify'
coffeeify  = require 'coffeeify'
mocha = require 'gulp-mocha'

paths =
  coffee: 'src/**/*.coffee'
  test: 'test/**/*.coffee'

bundleCache = {}
bundler = watchify "./src/index.coffee",
  cache: bundleCache
  extensions: ['.coffee']

bundler.transform coffeeify

gulp.task 'watch', ->

  gulp.watch([paths.coffee, paths.test], ['test'])

  #bundler.on 'update', ->
  #  gulp.start ['coffee', 'test']
  

gulp.task 'test', ->
  gulp.src(paths.test)
    .pipe mocha
      reporter: 'spec'
      ui: 'exports'
     
gulp.task "coffee", (cb) ->

  # resume our actual work
  browserifyStream = bundler.bundle (

    standalone: "fission"
    debug: true
    insertGlobals: true

  )
    .pipe(source("fission.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist"))
    #.pipe(lr())
    .pipe(rename(suffix: ".min"))
    .pipe(uglify(compress:
      drop_console: true
      unsafe: true
    )).pipe(gulp.dest("dist")) #.pipe(lr())

  #lintStream = gulp.src(paths.coffee).pipe(jshint()).pipe(jshint.reporter("jshint-stylish"))

  return browserifyStream

gulp.task 'default', ['coffee', 'test', 'watch']