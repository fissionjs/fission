(function() {
  define(function(require) {
    var router;
    router = require('router');
    return router.start({
      click: true,
      dispatch: true,
      popstate: true
    });
  });

}).call(this);
