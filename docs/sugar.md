## Sugar
### Fission #view #modelView #collectionView

Fission uses aliasing to normalize the React API's nomenclature.

> React's API:

```js

fission.view({
  getInitialState: function() {

  },
  componentWillMount: function() {

  },
  componentDidMount: function() {

  },
  componentWillUnmount: function() {

  },
  render: function() {

  }
});

```



> Fission's API:

```js

fission.view({
  init: function() {

  },
  mounting: function() {

  },
  mounted: function() {

  },
  unmounting: function() {

  },
  render: function() {

  }
});

```

All of React's core component functions will work along side Fission's.


