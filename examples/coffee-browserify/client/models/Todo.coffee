fission = require '../app'

module.exports =

  fission.model
    props:
      text: 'string'
      done: 'boolean'
    url: '/v1/todos'
