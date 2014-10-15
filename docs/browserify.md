## Browserify bundling



### Browserify

```bash
$ browserify myapp.js > start.js
```


### gulp

```js

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
    .pipe(gulp.dest('./public'))
    .pipe(reload());
});


```
