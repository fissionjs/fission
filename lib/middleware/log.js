(function() {
  module.exports = function(ctx, next) {
    console.log('Routing called', ctx);
    return next();
  };

}).call(this);
