## Collection View
### fission#collectionView

collectionView gets an array of `this.items` - the collections' models rendered into their `itemView`.

```js
var User = require('../models/User');

var UserItem = fission.modelView({
  model: User,
  render: function(){
    div({className: "match"},
    img({src: this.model.get('content')
    }));

  }

});

fission.collectionView({
  model: User,
  itemView: UserItem,

  render: function() {
    if (this.items.length === 0) {
      return span(null, 'No Users right now!');
    }
    return this.items;
  }
});
```

Each Item in the ItemView gets an implicit `key` (`Item.key`) added based on the `Model.id`
This key is required for React to keep state of the DOM Components.
