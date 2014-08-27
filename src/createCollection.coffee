Collection = require 'ampersand-collection'
underscoreMixin = require 'ampersand-collection-underscore-mixin'
app = {}

module.exports = (model) ->

  if !model.sync?
    model.sync = window.Fission.sync

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

  #else
  #  throw new Error "fission#createCollection: Model or Collection specified invalid: #{model}"

  return col
