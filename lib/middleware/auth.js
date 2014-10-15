/* globals window */
'use strict';

module.exports = function(me) {
  return function(ctx, next) {
    if (me != null) {
      return next();
    }
    if (window.location.pathname === '/login') {
      return next();
    }
    window.location = '/login';
    return next();
  };
};
