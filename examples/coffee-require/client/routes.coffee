define (require) ->

  {router, middleware} = require 'vendor/fission'

  console.log router

  router.config
    click: true
    dispatch: true
    popstate: true

  router.route '/foo',
    title: "Welcome"
    view: require 'pages/Todo/Todo.view'
    el: 'content'
    continue: false


  return router
