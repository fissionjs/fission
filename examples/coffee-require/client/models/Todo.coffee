define (require) ->

  fission = require 'vendor/fission'
  console.log fission

  fission.model
    props:
      text: 'string'
    url: '/v1/todos'
 