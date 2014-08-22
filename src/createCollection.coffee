Collection = require 'ampersand-collection'
underscoreMixin = require 'ampersand-collection-underscore-mixin'
app = {}

module.exports = (model) ->

  if !app.sync?
    app.sync = require 'ampersand-collection-rest-mixin'

  # just a collection wrapper
  if model.isCollection
    col = Collection.extend model

  #TODO: figure out best way to do model check
  else

    conf = 
      model: model

    inst = new model()
    
    if inst.url?
      conf.url = inst.url

    col = Collection.extend underscoreMixin, app.sync, conf

      # TODO deal with sync option translation
      #url: inst.urlRoot

  #else
  #  throw new Error "fission#createCollection: Model or Collection specified invalid: #{model}"

  return col
