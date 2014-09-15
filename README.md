#Fission [![NPM version][npm-image]][npm-url]  [![Build Status][travis-image]][travis-url]


#### Models

Models are just wrappers around [ampersand models](https://github.com/AmpersandJS/ampersand-model)
Model properties are defined at creation via `props`.

```js

var model = fission.model({

  props: {
    text: 'string',
    done: 'boolean',
    id: 'string'
  },
  url: '/v1/todos'
});

model.text = 'Mr Fission';
model.save();

```

#### Collections
Collections are not needed to be created manually they will be created implicitly/internally at runtime.

#### Routing

[Pagejs](http://visionmedia.github.io/page.js/) is used for routing.

```js
var router = fission.router;
var MatchesView = require('components/Match/Matches.view');
var MatchView = require('components/Match/Match.view');
router.use(fission.middleware.log);

router.route('/', {
  view: MatchesView,
  el: 'content'
});

router.route('/match/:id', {
  view: MatchView,
  el: 'content'
});

```
Props **id** is passed into the model as it's id.

#### Collection View

collectionView gets an array of **this.items** - the collections' models rendered into their **itemView**

```js

var Match = require('models/Match');

var MatchItem = fission.modelView({
  model: Match,
  render: function(){
    div({className: "match"},
    img({src: this.model.get('content')
    }));

  }

});

fission.collectionView({
  model: Match,
  itemView: MatchItem,

  render: function() {
    if (this.items.length === 0) {
      return span(null, 'No Matches right now!');
    }
    return this.items;
  }
});

```

#### Model View

render gets **this.model** - a reference to the associated model either when model or id is passed into **props** or via *id* **params** from the router.

```js

var Match = require('models/Match');

fission.modelView({
  model: Match,

  dislike: function() {
    this.model.liked = false;
    this.model.save();
  },
  like: function() {
    this.model.liked = true;
    this.model.save();
  },
  render: function() {
    var user = this.model.get('name');
    return span(null, 'name: ' + user);
  }
});

```

## Plugins

#### Sync
Sync methods can be swapped out on initialization of Fission with plugins.

```js
var Fission = require('fission');
var LocalStorageSync = require('fission-sync-localstorage');
var fission = new Fission({
  sync: LocalStorageSync
});

```

**fission sync plugins on npm should be prefixed with fission-sync**


[travis-url]: https://travis-ci.org/fissionjs/fission
[travis-image]: https://travis-ci.org/fissionjs/fission.png?branch=master

[npm-url]: https://npmjs.org/package/fission
[npm-image]: http://img.shields.io/npm/v/fission.svg
