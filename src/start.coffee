router = require './router'
#fission = require './fission'

module.exports = ({sync, routes}) ->
 
  if !sync?
    sync = require 'ampersand-collection-rest-mixin'

  window.Fission =  
    sync: sync
    foo: 'bar'

  #if sync? 
  #  inject sync strategy

  if routes?
    router.route path, conf for path, conf of routes.routes
    router.use middleware for middleware in routes.use?
    router.start routes.config
