fission = require '../vendor/fission'

module.exports = ->
  fission.model
    name: 'Todo'
    url: '/v1/todo'
