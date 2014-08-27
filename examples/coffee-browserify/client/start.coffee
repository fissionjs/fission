fission = require './vendor/fission'
routes = require './routes'

fission.start
  routes: routes
  #sync: 
  #  plugin: plugin
  #  urlRoot: '/v1' 