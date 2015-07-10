'use strict';

var React = require('react');

function renderRoute(renderTarget, Handler, state){
  console.log('hasClass', Handler);
  var toRender = React.createElement(Handler, state);
  return React.render(toRender, renderTarget);
}

module.exports = renderRoute;