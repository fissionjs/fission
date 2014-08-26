router = require './router'

module.exports = ({sync, routes}) ->

  #if sync?
  #  inject sync strategy

  if routes?
    router.route path, conf for path, conf of routes.routes
    router.use middleware for middleware in routes.use
    router.start routes.config
