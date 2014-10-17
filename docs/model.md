#### Models
### fission#model

Models are just wrappers around [ampersand models](https://github.com/AmpersandJS/ampersand-model)
Model properties (Schema) are defined at creation via `props`.

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

Full documentation relating to the Model can be found [here](https://github.com/AmpersandJS/ampersand-model/blob/master/README.md)

When used in a [modelView](modelView.md) the model.id is taken from the view's params, or from the `router.route`.
