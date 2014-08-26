router = require './router'
#fission = require './fission'

module.exports = ({sync, routes}) ->
 
  window.FissionApp =  
    get: ->
      sync: sync
      foo: 'bar'

  #if sync? 
  #  inject sync strategy

  if routes?
    router.route path, conf for path, conf of routes.routes
    router.use middleware for middleware in routes.use?
    router.start routes.config
