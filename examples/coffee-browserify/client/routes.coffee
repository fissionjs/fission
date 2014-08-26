IndexView = require './pages/Index/Index.View'

module.exports =
  routes:

    '/':
      title: "Welcome"
      view: IndexView
      el: 'content'
      continue: false