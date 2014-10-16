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
