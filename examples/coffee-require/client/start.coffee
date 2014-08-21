define (require) ->
  
  Fission = require 'vendor/fission'
  routes = require './routes'

  console.log "start"
  console.log Fission

  #fission = Fission
  #  routes: routes

  #fission.start()
