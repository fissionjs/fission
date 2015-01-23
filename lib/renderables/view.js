'use strict';

var Router = require('react-router');
var component = require('./component');
var ListenerMixin = require('../mixins/Listener');
var SugarMixin = require('../mixins/Sugar');

module.exports = function(config, mixins) {
  return component(config, [
    ListenerMixin,
    SugarMixin,
    Router.State,
    Router.Navigation
  ]);
};