fission = require './vendor/fission'
routes = require './routes'

Fission = fission
  routes: routes
  #sync: 
  #  plugin: plugin
  #  urlRoot: '/v1' 