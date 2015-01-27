'use strict';

var Router = require('fission-router');
var component = require('./component');
var ListenerMixin = require('./mixins/Listener');
var SugarMixin = require('./mixins/Sugar');

var fissionMixins = [
  ListenerMixin,
  SugarMixin,
  Router.mixins.State,
  Router.mixins.Navigation
];

// a view is just a component but with a few more mixins added
module.exports = function(config, mixins) {
  var allMixins = mixins ? fissionMixins.concat(mixins) : fissionMixins;
  return component(config, allMixins);
};