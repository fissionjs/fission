define (require) ->

  {router, middleware} = require 'vendor/fission'

<<<<<<< HEAD
  #router.config 
  #  click: true
  #  dispatch: true
  #  popstate: true
=======
  console.log router

  router.config
    click: true
    dispatch: true
    popstate: true
>>>>>>> upstream/master

  router.route '/',
    title: "Welcome"
    view: require 'pages/Todo/Todo.view'
    el: 'content'
    continue: false


  return router
