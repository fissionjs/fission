## modelViews
### fission#modelView

Refer to [Model](model.md) for Model reference.

The render function gets `this.model` - a reference to the associated model.
The model is automatically fetched based on the [Sync](sync.md) method used.
The modelView's ID attribute is passed into props or via `id params` from the router.

```js
var User = require('../models/user');

fission.modelView({
  model: User,

  render: function() {
    var user = this.model.get('name');
    return span({}, 'name: ' + user);
  }
});

```


The model's ID is taken from the route via [Router](router.md) and passed directly to the Sync method.

