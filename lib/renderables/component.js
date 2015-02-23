'use strict';

var React = require('react');
var isArray = require('is-array');
var PureMixin = require('./mixins/Pure');
var alias = require('../util/alias');

var fissionMixins = [
  PureMixin
];

// a view is a react component + some aliases
// TODO: what happens when mixins have mixins?
// do they get aliased?
module.exports = function(config, mixins) {
  if (mixins && !isArray(mixins)) {
    throw new Error('mixins must be an array');
  }
  var vu = alias(config);
  var allMixins = (mixins || []).concat(fissionMixins).map(alias);
  vu.mixins = allMixins.concat(vu.mixins);

  return React.createFactory(React.createClass(vu));
};