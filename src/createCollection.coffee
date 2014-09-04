Collection = require 'ampersand-collection'
underscoreMixin = require 'ampersand-collection-underscore-mixin'

module.exports = (model) ->

  unless model.sync?
    model.sync = require 'ampersand-collection-rest-mixin'

  # just a collection wrapper
  if model.isCollection
    col = Collection.extend model

  #TODO: figure out best way to do model check
  else

    conf =
      model: model

    inst = new model()
    conf.url = inst.url()

    col = Collection.extend underscoreMixin, model.sync, conf

  return col
