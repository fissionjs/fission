## Browserify bundling



### Browserify

```bash
$ browserify myapp.js > start.js
```


### gulp

```js
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


gulp.task('bundle', function() {

  var bCache = {};
  var b = browserify(paths.coffeeSrc, {
    debug: true,
    insertGlobals: false,
    cache: bCache,
  });
  b.bundle()
    .pipe(source('myapp.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./public'));
});


```
