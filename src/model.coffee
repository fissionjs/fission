Backbone = require 'backbone'

module.exports = (model) ->
  model.urlRoot = model.url
  delete model.url
  m = Backbone.Model.extend model,
    modelType: model.name
  m.prototype.getType = -> "model"
  return m
