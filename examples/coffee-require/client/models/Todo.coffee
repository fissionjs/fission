define (require) ->

  fission = require 'vendor/fission'
 
  fission.model
    name: 'Todo'
    url: '/v1/todo'
 