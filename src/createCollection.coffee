Collection = require 'ampersand-collection'
underscoreMixin = require 'ampersand-collection-underscore-mixin'
adapter = require 'ampersand-sync-adapter'

module.exports = (model) ->

  # just a collection wrapper
  if model.isCollection
    col = Collection.extend model

  #TODO: figure out best way to do model check
  else

    conf =
      model: model

    inst = new model()
    conf.url = inst.url()

    col = Collection.extend underscoreMixin, adapter, conf

  return col