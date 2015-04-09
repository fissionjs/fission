# Component Documentation

Creates a React component. `fission.component` is different from `React.createClass` in a few ways - this will document the differences, for any other behavior you should consult the [React documentation](https://facebook.github.io/react/docs/component-specs.html).

## fission.component(config)

```js
var fission = require('fission');
var DOM = fission.DOM;

var Timer = fission.component({
  init: function(){
    return {
      elapsed: 0
    };
  },
  mounted: function(){
    this.interval = setInterval(this.tick, 1000);
  },
  unmounting: function(){
    clearInterval(this.interval);
  },

  tick: function(){
    this.updateState({
      elapsed: function(curr) {
        return ++curr;
      }
    });
  },
  render: function(){
    var elapsedTxt = 'Seconds Elapsed: ' + this.state.elapsed;
    return DOM.div({
      className: 'timer-component'
    }, elapsedTxt);
  }
});
```

### Configuration

The configuration object you pass to fission.component is the [same object you would pass to React.createClass](https://facebook.github.io/react/docs/component-specs.html), but with a few added aliases and nice things.

#### props

Type: `object`

This object is used to validate properties passed to the component. Alias for [propTypes](https://facebook.github.io/react/docs/component-specs.html#proptypes). Used in conjuction with `fission.PropTypes` which is an alias for [React.PropTypes](https://facebook.github.io/react/docs/reusable-components.html)

```js
var fission = require('fission');
var types = fission.PropTypes;

var DummyUser = fission.component({
  props: {
    name: types.string.isRequired,
    age: types.number,
    profile: types.shape({
      location: types.string,
      bio: types.string
    })
  },
  // ...
});
```

#### init

Type: `function`

This function is called to get the default state before attempting to mount. Alias for [getInitialState](https://facebook.github.io/react/docs/component-specs.html#getinitialstate).

```js
var fission = require('fission');

var DummyComponent = fission.component({
  init: function(){
    return {
      elapsed: 123
    };
  },
  mounting: function(){
    console.log(this.state.elapsed); // 123
  }
  // ...
});
```

#### mounting

Type: `function`

This function is called when your component is preparing to mount. Alias for [componentWillMount](https://facebook.github.io/react/docs/component-specs.html#componentwillmount).

```js
var fission = require('fission');

var DummyComponent = fission.component({
  mounting: function(){
    console.log('Preparing to go to the DOM');
    // Do some initialization
  },
  // ...
});
```

#### mounted

Type: `function`

This function is called when your component has been mounted. Alias for [componentDidMount](https://facebook.github.io/react/docs/component-specs.html#componentdidmount).

```js
var fission = require('fission');

var DummyComponent = fission.component({
  mounted: function(){
    console.log('We are on the DOM');
    console.log('Our node =', this.getDOMNode());
  },
  // ...
});
```

#### unmounting

Type: `function`

This function is called when your component is preparing to unmount (be destroyed). Alias for [componentWillUnmount](https://facebook.github.io/react/docs/component-specs.html#componentwillunmount).

```js
var fission = require('fission');

var DummyComponent = fission.component({
  unmounting: function(){
    console.log('Preparing to be destroyed');
    // Do some cleanup...
  },
  // ...
});
```

#### css

Type: `string`

On first mount of your component, this CSS for it will be added to the page. This makes it easy to modularize your stylesheets per-component and also ensures that style conflicts don't happen between components.

##### Using a string

```js
var fission = require('fission');
var DOM = fission.DOM;

var styles = '.dummy-component { font-size: 20px; }';

var DummyComponent = fission.component({
  css: styles,
  render: function(){
    return DOM.div({
      className: 'dummy-component'
    }, 'Hello World!');
  }
});
```

##### Using a pre-processor

You don't want to put a bunch of CSS in your JS file, so you will probably use some browserify middleware. This example uses stylify which compiles the stylus into CSS and exports it as a string.

```js
var fission = require('fission');
var styles = require('./DummyComponent.styl');
var DOM = fission.DOM;

var DummyComponent = fission.component({
  css: styles,
  render: function(){
    return DOM.div({
      className: 'dummy-component'
    }, 'Hello World!');
  }
});
```

### Pure Rendering

By default, React will re-render on any state or prop change even if the value is the same.

```js
// Re-renders 3 times
this.setState({a: 123});
this.setState({a: 123});
this.setState({a: 123});
```

fission employs a new `shouldComponentUpdate` function that ensures your component won't re-render unless there has actually been a state or prop change - even on nested objects and arrays (or arrays of objects with objects of arrays of objects, you get the point).

```js
var fission = require('fission');

var Counter = fission.component({
  init: function(){
    return {
      count: 0
    };
  },
  mounted: function(){
    // Calls render 1 time
    this.setState({count: 123});
    this.setState({count: 123});
    this.setState({count: 123});
  },
  // ...
});
```

Make sure your render function only gets its data from sanctioned source: (`this.props`, `this.state`, `this.items`, `this.model`, etc.).

If for some reason you absolutely need to disable this behavior (you have global state), you can mark your component as impure.

```js
var fission = require('fission');

var Counter = fission.component({
  impure: true,
  init: function(){
    return {
      count: 0
    };
  },
  mounted: function(){
    // Calls render 3 times
    this.setState({count: 123});
    this.setState({count: 123});
    this.setState({count: 123});
  },
  // ...
});
```

### Immutability Helpers

fission incorporates the React immutability helpers into the core of it's component system.

Components have access to an `updateState` function that lets you perform high-performance immutable operations on component state. This makes it extremely easy to update nested state which helps the Pure rendering mechanism determine if a render is needed.

```js
var fission = require('fission');
var DOM = fission.DOM;

var Counter = fission.component({
  init: function(){
    return {
      count: 0
    };
  },
  increment: function(){
    this.updateState({
      count: function(curr) {
        return ++curr;
      }
    });
  },
  render: function(){
    return DOM.div({
      onClick: this.increment
    }, this.state.count);
  }
});
```