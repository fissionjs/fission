fission
=======

#### Collection View 
collectionView gets an array of @items - the collections' models rendered into their *itemView*

```coffeescript
fission.collectionView
  model: require 'models/Match'
  itemView: require 'pages/Match/MatchItem/MatchItem.view'
  render: ->

    if @items.length is 0
      @items = span null, 'No Matches right now!'
    return @items
```     
     
#### Model View

model view

```coffeescript
fission.modelView
  model: require 'models/Match'
  notify: ['Date']
  dislike: -> @model.destroy()
  like: ->
    @model.save {userApproved: true}, patch: true
    @model.destroy()

  render: ->
    user = @model.get('match')
    # ...
```

#### Model 

model is just a wrapper around backbone model, only difference is you specify *url* vs *urlRoot* simply because i find the latter confusing with the way we use these.  Collections are not needed to be created manually they will be created implicitly/internally at runtime

```coffeescript  
fission.model
  idAttribute: '_id'
  name: 'Match'
  url:  '/v1/matches'
  initialize: ->
    @set 'match', new User @get 'match'
```
