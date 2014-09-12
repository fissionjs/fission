Model = require 'ampersand-model'

module.exports = (model) ->

  if !model.url? then model.url = '/'
  model.urlRoot = model.url
  delete model.url

  m = Model.extend model
  
  return m
