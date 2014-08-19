define (require) ->
  
  Fission = require 'fission'
  localstorage = require 'fission-localstorage'
  routes = require './routes'

  fission = Fission
    sync: localstorage
    routes: routes

  fission.start()
