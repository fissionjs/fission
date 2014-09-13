module.exports = (model) ->

  if model.sync
      sync = model.sync
    else if @opts.sync?
      if typeof @opts.sync is 'function'
        sync = @opts.sync
      else if typeof @opts.sync is 'object'
        if @opts.sync.plugin?
          sync = @opts.sync.plugin
        else
          throw new Error 'Invalid sync adapter'
  else
    sync = require 'ampersand-sync'

  return sync