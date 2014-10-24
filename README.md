<div align="center">
  <img src="https://raw.githubusercontent.com/fissionjs/artwork/master/logo.png" height="150px">
</div>
#Fission [![NPM version][npm-image]][npm-url]  [![Build Status][travis-image]][travis-url]

The [Reactjs](http://facebook.github.io/react/) Toolkit

```js

var Fission = require('fission');
var app = new Fission();
var DOM = app.React.DOM;

var View = app.view({
  render: function () {
    return DOM.h1({}, 'Fissionjs!');
  }
});

app.router.route('/',{
  view: View,
  el: 'content'
});

app.router.start();

```


### Install
```bash
$ npm install --save fission
```

### Getting Started
Please read our [Getting Started](docs/gettingStarted.md) guide and view our [Examples](https://github.com/fissionjs/examples).

### Documentation
The [Documentation](docs/README.md) is organized by action or function name.

### Contributing
Please contribute! We especially will accept pull requests for documentation and examples.

### Building
[gulp](http://gulpjs.com) is used to build.

Build all code, and produce AMD files:
```bash
$ gulp
```
Build the test bundle:
```bash
$ gulp test
```
Run the tests in the browser:
```bash
$ gulp test:browser
```

### Testing

Run tests:
```bash
$ npm test
```
Build tests:
```bash
$ gulp test
```
Run browser tests:
```bash
$ gulp test:browser
```



[travis-url]: https://travis-ci.org/fissionjs/fission
[travis-image]: https://travis-ci.org/fissionjs/fission.png?branch=master

[npm-url]: https://npmjs.org/package/fission
[npm-image]: http://img.shields.io/npm/v/fission.svg


### License [MIT](LICENSE.md)
