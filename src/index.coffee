module.exports =

  class Fission

    constructor: (@opts) ->

    router: require './router'

    model: require './model'
    view: require './view'
    modelView: require './modelView'
    collectionView: require './collectionView'

    createCollection: require './createCollection'
    getSync: require './getSync'
    alias: require './alias'

    middleware:
      auth:    require './middleware/auth'
      clearFB: require './middleware/clearFB'
      log:     require './middleware/log'

    mixins:
      Listener: require './ListenerMixin'

    React: require 'react'
