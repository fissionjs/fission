define (require) ->

  {router, middleware} = require 'vendor/fission'

  #router.config 
  #  click: true
  #  dispatch: true
  #  popstate: true

  router.route '/',
    title: "Welcome"
    view: require 'pages/Todo/Todo.view'
    el: 'content'
    continue: false


  return router
