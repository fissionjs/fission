Collection = require 'ampersand-collection'
underscoreMixin = require 'ampersand-collection-underscore-mixin'

module.exports = (model) ->

  unless model.sync?
    if @opts.sync?
      if typeof @opts.sync is 'object'
        if @opts.sync.plugin?
          model.sync = @opts.sync.plugin
        else
          model.sync = @opts.sync
      else
        throw new Error 'Invalid sync adapter'
    else
      model.sync = require 'ampersand-collection-rest-mixin'

  # just a collection wrapper
  if model.isCollection
    col = Collection.extend model

  #TODO: figure out best way to do model check
  else

    inst = new model()
    conf =
      model: model
      url: inst.url()

    col = Collection.extend underscoreMixin, model.sync, conf

  return col
