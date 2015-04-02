'use strict';

var Model = require('ampersand-model');
var React = require('react');
var merge = require('lodash.merge');
var view = require('./view');
var constructModel = require('../util/ensureInstance').model;

module.exports = function(config) {
  if (config == null) {
    throw new Error('config parameter is required');
  }
  var configModel = config.model;
  delete config.model;

  var ModelViewMixin = {
    displayName: 'modelView',
    propTypes: {
      index: React.PropTypes.number,
      model: React.PropTypes.oneOfType([
        React.PropTypes.func,
        React.PropTypes.object,
        React.PropTypes.instanceOf(Model)
      ]),
      data: React.PropTypes.object,
      routeIdAttribute: React.PropTypes.string,
      query: React.PropTypes.object
    },

    // most options can be passed via config or props
    // props takes precedence
    getDefaultProps: function(){
      return {
        model: configModel,
        data: config.data,
        routeIdAttribute: (config.routeIdAttribute || 'id')
      };
    },

    componentWillMount: function() {
      this._initialize(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
      if (!this.model) {
        return;
      }
      // TODO: check if routeIdAttribute changed
      // if the next route id changed, redo the model
      // sometimes views get recycled
      var nextRouteIdAttribute = this.getParams()[nextProps.routeIdAttribute];
      if (nextRouteIdAttribute !== this.model[nextProps.routeIdAttribute]) {
        this._initialize(nextProps);
      }
    },

    _modelFetchFailed: function(m, res) {
      var notFound = res.status === 404 || res.status === 204;
      var handled404 = notFound && this.modelNotFound;
      if (this.modelFetchFailed) {
        this.modelFetchFailed.apply(this, arguments);
      }
      if (handled404) {
        this.modelNotFound.apply(this, arguments);
      }

      this.model = null;
      if (!this.modelFetchFailed && !handled404) {
        throw new Error('Model fetch failed with a ' + res.status);
      }
    },

    _initialize: function(props) {
      // TODO: wtf
      var routeIdAttribute = this.getParams()[props.routeIdAttribute];
      var options = props;
      if (routeIdAttribute) {
        options = merge({
          id: routeIdAttribute
        }, options);
      }

      var model = constructModel(props.model, options);

      // no model specified in props or config
      if (!model) {
        throw new Error('modelView never got a model');
      }

      var setModel = (function(){
        this.model = model;
        // TODO: remove events on prop change switch up or destroy
        this.model.on('change', this.tryUpdate);
        if (this.modelDidFetch) {
          this.modelDidFetch();
        }
        this.tryUpdate();
      }).bind(this);

      if (model._needsInitialFetch) {
        model.fetch({
          success: setModel,
          error: this._modelFetchFailed
        });
      } else {
        setModel();
      }
    }
  };

  return view(config, [ModelViewMixin]);
};