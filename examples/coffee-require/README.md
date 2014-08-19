## Ripple

- To Install: `npm install`
- To Test: `npm test`
- `npm install -g gulp` if not already installed
- To start: `gulp` and the server will be on port `8080`

### Structure

```

/client
  /components      # global react components 
  /css             # global styles and mixins
  /img
  /models          # client side (dermis) models
  /pages           # main pages / domain-specific modules
  /vendor          # 3rd party libs

  auth.coffee      # auth check
  firebase.coffee  # firebase ref
  index.html       # main index 
  router.coffee    # routes 
  start.coffee     # app starting point

/public            # compiled client files
start.coffee       # simple express server to serve client

```

### Dermis

Dermis is the (code) name of a simple tiny framework combining React, page.js routing, Backbone models.  Dermis models in `/models` are simply Backbone models with a little bit of sugar.

Dermis includes View, CollectionView, ItemView, Models and routing.  I will get this broken out into a public (OSS) project with additional documentation this week.
