Collection = require 'ampersand-collection'
underscoreMixin = require 'ampersand-collection-underscore-mixin'

module.exports = (model) ->

  unless model.sync?
    if @opts.sync?
      if typeof @opts.sync is 'object'
        if @opts.sync.plugin?
          model.sync = @opts.sync.plugin
        else
          throw new Error 'Invalid sync plugin'
      else if typeof @opts.sync is 'function'
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

    conf =
      model: model

    inst = new model()
    conf.url = inst.url()

    col = Collection.extend underscoreMixin, model.sync, conf

  return col