## Router
### fission#router

Routing uses [Pagejs](http://visionmedia.github.io/page.js/)


### router#route

Create a route

```js
var router = fission.router;
var UserView = require('views/UserView');

router.route('/',{
  view: UserView,
  el: 'content'
});
```
Options:

`view: a fission view`

`el: the element to inject the views`

Example:
```html
<div id='content'></div>
```

### router#start

Starts the router

```js
router.start();
```


#### Routing

Params on routes (/users/:1234) will be passed to the View, and from there passed to the Model.

With a route /users/1234 the router will take the URL param `1234` and pass it to the model as model.id
