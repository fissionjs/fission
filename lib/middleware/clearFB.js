/* globals window, document */
'use strict';

module.exports = function(ctx, next) {
  var scroll;
  if (window.location.hash && window.location.hash === '#_=_') {
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, null, window.location.href.split('#')[0]);
    } else {
      scroll = {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
      };
      window.location.hash = '';
      document.body.scrollTop = scroll.top;
      document.body.scrollLeft = scroll.left;
    }
  }
  return next();
};
