Model = require 'ampersand-model'

module.exports = (model) ->

  if !model.url? then model.url = '/'
  model.urlRoot = model.url
  delete model.url

  model.sync = @getSync model

  m = Model.extend model
  
  return m
