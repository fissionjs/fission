<div align="center">
  <img src="https://raw.githubusercontent.com/fissionjs/artwork/master/logo.png" height="150px">
</div>
#Fission [![NPM version][npm-image]][npm-url]  [![Build Status][travis-image]][travis-url]


Fission is a [Reactjs](http://facebook.github.io/react/) framework for creating efficient modular UI applications.

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
```shell
$ npm install --save fission
```

### Getting Started
Please read our [Getting Started](docs/gettingStarted.md) guide and view our [Examples](https://github.com/fissionjs/examples).

### Documentation
The [Documentation](docs/README.md) is split out based on action or function name.

### Contributing
Please contribute! We especially will accept pull requests for documentation and examples.


[travis-url]: https://travis-ci.org/fissionjs/fission
[travis-image]: https://travis-ci.org/fissionjs/fission.png?branch=master

[npm-url]: https://npmjs.org/package/fission
[npm-image]: http://img.shields.io/npm/v/fission.svg


### License [MIT](LICENSE.md)
