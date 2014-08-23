define (require) ->

  fission = require 'vendor/fission'

  fission.model
    props:
      text: 'string'
    url: '/v1/todos'
 