#fission


#### Collection View 
collectionView gets an array of @items - the collections' models rendered into their *itemView*

```js

var Match = require('models/Match');
var MatchItem = require('components/MatchItem/MatchItem.view');

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

model view

```js

var Match = require('models/Match');

fission.modelView({
  model: Match,

  dislike: function() {
    this.model.save({liked: false}, {patch: true});
  },
  like: function() {
    this.model.save({liked: true}, {patch: true});
  },
  render: function() {
    var user = this.model.get('name');
    return span(null, 'name: ' + name);
  }
});

```

#### Model 

model is just a wrapper around backbone model, only difference is you specify *url* vs *urlRoot* simply because i find the latter confusing with the way we use these.  Collections are not needed to be created manually they will be created implicitly/internally at runtime

```js

fission.model({
  idAttribute: '_id',
  name: 'Match',
  url: '/v1/matches'
});

```
