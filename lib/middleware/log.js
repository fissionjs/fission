'use strict';

module.exports = function(ctx, next) {
  console.log('Routing called', ctx);
  return next();
};
