#fission


#### Collection View 
collectionView gets an array of @items - the collections' models rendered into their *itemView*

```js
fission.collectionView({
  model: require('models/Match'),
  itemView: require('pages/Match/MatchItem/MatchItem.view'),

  render: function() {
    if (this.items.length === 0) {
      this.items = span(null, 'No Matches right now!');
    }
    return this.items;
  }
});
```     
     
#### Model View

model view

```js
fission.modelView({
  model: require('models/Match'),
  notify: ['Date'],

  dislike: function() {
    return this.model.destroy();
  },
  like: function() {
    this.model.save({userApproved: true}, {patch: true});
    return this.model.destroy();
  },
  render: function() {
    var user = this.model.get('match');
    return user;
  }
});
```

#### Model 

model is just a wrapper around backbone model, only difference is you specify *url* vs *urlRoot* simply because i find the latter confusing with the way we use these.  Collections are not needed to be created manually they will be created implicitly/internally at runtime

```js
fission.model({
  idAttribute: '_id',
  name: 'Match',
  url: '/v1/matches',

  initialize: function() {
    var user = new User(this.get('match'));
    return this.set('match', user);
  }
});

```
