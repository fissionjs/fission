Collection = require 'ampersand-collection'
underscoreMixin = require 'ampersand-collection-underscore-mixin'

module.exports = (model) ->

  # just a collection wrapper
  if model.isCollection
    col = Collection.extend model

  #TODO: figure out best way to do model check
  else
    col = Collection.extend underscoreMixin,
      model: model

      # TODO deal with sync option translation
      #url: inst.urlRoot

  #else
  #  throw new Error "fission#createCollection: Model or Collection specified invalid: #{model}"

  return col
