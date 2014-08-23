(function() {
  define(function(require) {
    var middleware, router, _ref;
    _ref = require('vendor/fission'), router = _ref.router, middleware = _ref.middleware;
    router.route('/', {
      title: "Welcome",
      view: require('pages/Todo/Todo.view'),
      el: 'content',
      "continue": false
    });
    return router;
  });

}).call(this);
