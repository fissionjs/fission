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


#### Routing params

Params on routes (/users/:1234) will be passed to the View, and from there passed to the Model.

With a route /users/1234 the router will take the URL param.id `1234` and pass it to the model as model.id


```js
var router = fission.router;
var UserView = require('views/UserView');

router.route('/users/:id',{
  view: UserView,
  el: 'content'
});

```

#### Routing options `(Object)`

##### view:
Fission view
```
type: Function / String
required: true
```

##### el:
Element to display the view
```
type: String
required: true
```

##### title:
Page title
```
type: String
required: false
default: null
```

##### continue:
Continue to the next route
```
type: String
required: false
default: false
```
