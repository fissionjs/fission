Fission = require './vendor/fission'
#routes = require './routes'

fission = new Fission
  sync: -> console.log 'test'

module.exports = fission