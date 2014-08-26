fission = require './vendor/fission'
routes = require './routes'

console.log fission

fission.start
  routes: routes
  #sync: 
  #  plugin: plugin
  #  urlRoot: '/v1' 