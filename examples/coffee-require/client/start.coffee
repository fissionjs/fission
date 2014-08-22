define (require) ->
  
  Fission = require 'vendor/fission'
  console.log Fission
  routes = require './routes'
  console.log "start"
  Fission.start
    routes: routes
    #sync: plugin

  #return Fission