fission = require './vendor/fission'
routes = require './routes'

Fission = fission.start
  routes: routes
  #sync: plugin

module.exports = Fission