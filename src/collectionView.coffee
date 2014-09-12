ListenerMixin = require './ListenerMixin'

module.exports = (config) ->

  if config.model.sync
      sync = config.model.sync
    else if @opts.sync?
      if typeof @opts.sync is 'function'
        sync = @opts.sync
      else if typeof @opts.sync is 'object'
        if @opts.sync.plugin?
          sync = @opts.sync.plugin
        else
          throw new Error 'Invalid sync adapter'
    else
      sync = require 'ampersand-sync'

  ctor = @createCollection config.model

  CollectionViewMixin =
    mixins: [ListenerMixin]
    renderItems: ->
      if @itemView?
        @items = @collection.map (m) =>
          return @itemView
            model: m
            key: m.cid
      @forceUpdate()

    componentWillMount: ->
      @items ?= []
      unless @collection?
        @collection = new ctor
        @collection.sync = sync
        @collection.fetch
          success: (data) =>
            @renderItems()
          error: (err) ->
            console.log 'fetch error ', err

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
  return @view config
