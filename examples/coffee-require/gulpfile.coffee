# core
gulp  = require 'gulp'
gutil = require 'gulp-util'

# stream utilities
gif  = require 'gulp-if'
path = require 'path'

# plugins
htmlmin  = require 'gulp-minify-html'
react    = require 'gulp-react'
coffee   = require 'gulp-coffee'
stylus   = require 'gulp-stylus'
concat   = require 'gulp-concat'
uglify   = require 'gulp-uglify'
csso     = require 'gulp-csso'
reload   = require 'gulp-livereload'
cache    = require 'gulp-cached'
jshint   = require 'gulp-jshint'
jsonlint = require 'gulp-jsonlint'
cmq      = require 'gulp-combine-media-queries'
plumber  = require 'gulp-plumber'
autoprefixer = require 'autoprefixer-stylus'

# misc
nib = require 'nib'
autowatch = require 'gulp-autowatch'

cssSupport = [
  'last 5 versions',
  '> 1%',
  'ie 8', 'ie 7',
  'Android', 'Android 4',
  'BlackBerry 10'
]

# paths
paths =
  vendor: './client/vendor/**/*'
  img: './client/img/**/*'
  fonts: './client/fonts/**/*'
  coffee: './client/**/*.coffee'
  stylus: './client/**/*.styl'
  html: './client/**/*.html'

# im going to break this out into a module
# so this will become about two lines
gulp.task 'server', (cb) ->
  reloader = reload()
  require('./start')
  return

# javascript
gulp.task 'coffee', ->
  gulp.src(paths.coffee)
    .pipe(cache('coffee'))
    .pipe(plumber())
    .pipe(coffee())
    .pipe(gif(gutil.env.production, uglify()))
    .pipe(gulp.dest('./public'))
    .pipe reload()

# styles
gulp.task 'stylus', ->
  gulp.src(paths.stylus)
    .pipe(stylus({
      use: [
        nib(),
        autoprefixer(cssSupport, {cascade: true})
      ]
    }))
    .pipe(concat('app.css'))
    .pipe(gif(gutil.env.production, csso()))
    .pipe(gulp.dest('./public'))
    .pipe reload()

gulp.task 'html', ->
  gulp.src(paths.html)
    .pipe(cache('html'))
    .pipe(gif(gutil.env.production, htmlmin()))
    .pipe(gulp.dest('./public'))
    .pipe reload()

gulp.task 'vendor', ->
  gulp.src(paths.vendor)
    .pipe(cache('vendor'))
    .pipe(gulp.dest('./public/vendor'))
    .pipe reload()

gulp.task 'img', ->
  gulp.src(paths.img)
    .pipe(cache('img'))
    .pipe(gulp.dest('./public/img'))
    .pipe reload()

gulp.task 'fonts', ->
  gulp.src(paths.fonts)
    .pipe(cache('fonts'))
    .pipe(gulp.dest('./public/fonts'))
    .pipe reload()

gulp.task 'watch', ->
  autowatch gulp, paths


gulp.task 'css', ['stylus']
gulp.task 'js', ['coffee']
gulp.task 'static', ['html', 'vendor', 'img', 'fonts']
gulp.task 'default', ['js', 'css', 'static', 'server', 'watch']
