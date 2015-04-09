# Component Documentation

Creates a React component. `fission.component` is different from `React.createClass` in a few ways - this will document the differences, for any other behavior you should consult the React documentation.

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
  tick: function(){
    this.updateState({
      elapsed: function(curr) {
        return ++curr;
      }
    });
  },
  mounted: function(){
    this.interval = setInterval(this.tick, 1000);
  },
  unmounting: function(){
    clearInterval(this.interval);
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

The configuration object you pass as an argument to fission.component is the same object you would pass to React.createClass, but with a few added aliases and nice things.

#### props

Type: `object`

This object is used to validate properties passed to the component. Alias for `propTypes`. Used in conjuctin with `fission.PropTypes` which is an alias for `React.PropTypes`

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

#### mounting

Type: `function`

This function is called when your component is preparing to mount. Alias for `componentWillMount`.

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

This function is called when your component has been mounted. Alias for `componentDidMount`.

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

This function is called when your component is preparing to unmount (be destroyed). Alias for `componentWillUnmount`.

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

#### init

Type: `function`

This function is called to get the default state before attempting to mount. Alias for `getInitialState`.

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