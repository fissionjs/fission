view = require './view'
createCollection = require './createCollection'
ListenerMixin = require './ListenerMixin'

module.exports = (config) ->

  CollectionViewMixin =
    mixins: [ListenerMixin]
    renderItems: ->
      if @itemView?
        @items = @collection.map (m) =>
          return @itemView
            model: m
            key: m.id
      @forceUpdate()
    componentWillMount: ->
      unless @collection?
        ctor = createCollection config.model
        @collection = new ctor
        @collection.fetch success: =>
          @renderItems()

          @listenTo @collection, 'add change remove', (e) =>
            @renderItems()
      else
        # TODO: check if collection is an
        # instance of a constructor
        # construct and call fetch if constructor
        @renderItems()

  # valid the options given
  unless @collection? or @model?
    throw new Error 'Requires either collection or model attribute'

  config.mixins ?= []
  config.mixins.push CollectionViewMixin
  return view config
