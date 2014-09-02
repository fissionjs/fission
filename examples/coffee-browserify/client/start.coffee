fission = require './app'
IndexView = require './pages/Index/Index.View'

fission.router.route '/',
  title: "Welcome"
  view: IndexView
  el: 'content'
  continue: false

fission.router.start()