(function() {
  define(function(require) {
    var middleware, router, _ref;
    _ref = require('vendor/fission'), router = _ref.router, middleware = _ref.middleware;
<<<<<<< HEAD
    router.route('/', {
=======
    console.log(router);
    router.config({
      click: true,
      dispatch: true,
      popstate: true
    });
    router.route('/foo', {
>>>>>>> upstream/master
      title: "Welcome",
      view: require('pages/Todo/Todo.view'),
      el: 'content',
      "continue": false
    });
    return router;
  });

}).call(this);
