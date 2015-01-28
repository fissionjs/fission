'use strict';

var React = require('react');
var isArray = require('is-array');
var alias = require('../util/alias');

// a view is a react component + some aliases
// TODO: what happens when mixins have mixins?
// do they get aliased?
module.exports = function(config, mixins) {
  var vu = alias(config);
  if (isArray(mixins)) {
    vu.mixins = mixins.concat(vu.mixins);
  }
  vu.mixins = vu.mixins.map(alias);

  return React.createFactory(React.createClass(vu));
};