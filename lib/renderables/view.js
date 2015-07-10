'use strict';

var Router = require('../router');
var isArray = require('is-array');
var component = require('./component');

var fissionMixins = [
  Router.mixins.State,
  Router.mixins.Navigation
];

// a view is just a component but with a few more mixins added
module.exports = function(config, mixins) {
  if (mixins && !isArray(mixins)) {
    throw new Error('mixins must be an array');
  }
  return component(config, (mixins || []).concat(fissionMixins));
};