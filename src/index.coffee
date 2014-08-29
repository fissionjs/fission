createCollection = require './createCollection'

module.exports =

  class Fission

    constructor: (@opts) ->
      console.log "opts . sync"
      console.log @opts.sync

    bar: require './bar'
    foo: ->
      console.log @opts

    start: require './start'
    router: require './router'

    model: require './model'
    view: require './view'
    modelView: require './modelView'
    collectionView: require './collectionView'

    createCollection: require './createCollection'
    alias: require './alias'

    middleware:
      auth:    require './middleware/auth'
      clearFB: require './middleware/clearFB'
      log:     require './middleware/log'

    mixins:
      Listener: require './ListenerMixin'

    React: require 'react'
