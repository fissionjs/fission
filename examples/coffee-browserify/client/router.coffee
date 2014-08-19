{router, middleware} = require './vendor/fission'
IndexView = require './pages/Index/Index.View'

router.route '/',
  title: "Welcome"
  view: IndexView
  el: 'content'
  continue: false

module.exports = router
