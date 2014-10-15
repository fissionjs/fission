Collection = require 'ampersand-collection'
underscoreMixin = require 'ampersand-collection-underscore-mixin'
adapter = require 'ampersand-sync-adapter'

module.exports = (model) ->

  # just a collection wrapper
  if model.isCollection
    col = Collection.extend model

  #TODO: figure out best way to do model check
  else

    inst = new model()
    conf =
      model: model
      url: inst.url()

    col = Collection.extend underscoreMixin, adapter, conf

  return col
