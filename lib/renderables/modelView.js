'use strict';

var Model = require('ampersand-model');
var React = require('react');
var view = require('./view');

function constructModel(Model, id) {
  var model = new Model();
  model.id = id;

  // set id attrib to id - needed for fetching
  if (model.idAttribute !== undefined) {
    model[model.idAttribute] = id;
  }
  return model;
}

module.exports = function(config) {
  if (config == null) {
    throw new Error('config parameter is required');
  }

  var ModelViewMixin = {
    propTypes: {
      model: React.PropTypes.instanceOf(Model)
    },

    // most options can be passed via config or props
    // props takes precedence
    getDefaultProps: function(){
      return {};
    },

    componentWillMount: function() {
      this._initialize();
    },

    componentWillReceiveProps: function(nextProps) {
      var routeParamId = this.getParams()[this.routeParamKey];
      if (nextProps.id !== this.props.id ||
        routeParamId && routeParamId !== this.model.id) {
        this._initialize();
      }
    },

    _initialize: function() {
      var routeParamId = this.getParams()[this.routeParamKey];

      // collection view passing in model
      if (this.props.model != null) {
        this.model = this.props.model;
      // collection is passing in params
      // TODO: remove this if nobody uses it soon
      } else if (this.props && this.props.id != null) {
        this.model = constructModel(config.model, this.props.id);
        // TODO: error handling and event hooks
        this.model.fetch();
      } else if (routeParamId) {
        this.model = constructModel(config.model, routeParamId);
        // TODO: error handling and event hooks
        this.model.fetch();
      }

      // no model specified in props or config
      if (!this.model) {
        throw new Error('modelView never got a model');
      }

      this.listenTo(this.model, 'change', this.tryUpdate);
    }
  };

  return view(config, [ModelViewMixin]);
};