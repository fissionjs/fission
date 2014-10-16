## Views
### fission#view

Views are extensions of `React.createClass` with added [sugar](sugar.md).


The view in it's most basic form has one main React function which takes React.DOM elements: `render`.

```js

var DOM = fission.React.DOM;
fission.view({
  render: function() {
    return DOM.div({}, 'simple view');
  }
});

```



Views can be created as components and inserted into the DOM where needed.

```js
var DOM = fission.React.DOM;

var Header = fission.view({
  render: function() {
    return DOM.h1({}, 'Header');
  }
});

var Footer = fission.view({
  render: function() {
    return DOM.footer({className: 'footer wide green'}, 'Footer');
  }
});


var Main = fission.view({
  render: function() {
    return DOM.div({},
      Header();
      Footer();
    )
  }
});

```
