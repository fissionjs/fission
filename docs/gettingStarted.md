# Getting Started

### Fission is a framework for creating React applications


A Fission application has three main components:
- View
- Router
- Model

The [Examples](https://github.com/fissionjs/examples) show several applications using fission.



## Creating a Fission application

**Create a root file `index.html`**
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <link rel="stylesheet" href='/app.css'>
  </head>
  <body>
    <div id='content'></div>
    <script src='/start.js'></script>
  </body>
</html>

```

**Create a main entry point for the application (fission instance) `app.js`**

Require Fission and create a new instance of Fission.
```js
var Fission = require('fission');
fission = new Fission();

module.exports = fission;

```

**Create a View `views/index.js`**

```js
// Require the fission instance
var fission = require('../app');
// Require the React DOM
var DOM = fission.React.DOM;

// Export a function which returns the view
module.exports = function() {
  // Return a view
  return fission.view({
    // React's render
    render: function() {
      return DOM.div({
        className: 'main'
      },
        DOM.h1({},'Welcome'));
    }
  });
};


```


**Create a router `router.js`**

```js
// Require the fission instance:
var fission = require('./app');

// Require the views:
var IndexView = require('./views/index');

// Create a route for /
fission.router.route('/', {
  title: 'Welcome',  // page title
  view: IndexView, // required view
  el: 'content' // html element to inject the views in
});

// Other routes ... //


// Start the router
fission.router.start();
```

**Bundle the application**

Use gulp, or browserify:

`browserify:`
```bash
$ browserify router.js > start.js
```

**Serve the application**

Use gulp, or python:

`python`

```bash
$ python -m SimpleHTTPServer
```


This example can be found [here](https://github.com/fissionjs/examples/tree/master/simple/gettingStarted)
