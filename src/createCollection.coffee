Backbone = require 'backbone'

module.exports = (model) ->

  # create collection from a model
  if model.prototype.getType() is 'model'
    inst = new model
    if !(inst instanceof Backbone.Model)
      throw new Error "fission#createCollection: Model provided not a Backbone Model"
    col = Backbone.Collection.extend
      model: model
      url: inst.urlRoot

  # just a collection wrapper
  else if model instanceof Backbone.Collection
    col = Backbone.Collection.extend model

  else
    throw new Error "fission#createCollection: Model or Collection specified invalid: #{model}"

  return col
