fission = require '../vendor/fission'

console.log fission

module.exports =

  fission.model
    props:
      text: 'string'
    url: '/v1/todos'
 