'use strict';

var Model = require('ampersand-model');
var React = require('react');
var view = require('./view');
var constructModel = require('../util/ensureInstance').model;

module.exports = function(config) {
  if (config == null) {
    throw new Error('config parameter is required');
  }

  var ModelViewMixin = {
    displayName: 'modelView',
    propTypes: {
      model: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.instanceOf(Model)
      ]),
      data: React.PropTypes.object,
      routeIdAttribute: React.PropTypes.string
    },

    // most options can be passed via config or props
    // props takes precedence
    getDefaultProps: function(){
      return {
        model: config.model,
        data: config.data,
        routeIdAttribute: config.routeIdAttribute
      };
    },

    componentWillMount: function() {
      this._initialize();
    },

    componentWillReceiveProps: function(nextProps) {
      var routeIdAttribute = this.getParams()[this.props.routeIdAttribute];
      if (nextProps.id !== this.props.id ||
        routeIdAttribute && routeIdAttribute !== this.model.getId()) {
        this._initialize();
      }
    },

    modelFetchFailed: function(m, err) {
      if (config.modelFetchFailed) {
        return config.modelFetchFailed.apply(this, arguments);
      }
      throw new Error('Model fetch failed: ' + err);
    },

    _initialize: function() {
      // TODO: wtf
      var routeIdAttribute = this.getParams()[this.props.routeIdAttribute];
      if (routeIdAttribute) {
        this.props.id = routeIdAttribute;
      }

      var model = constructModel(this.props.model, this.props);

      // no model specified in props or config
      if (!model) {
        throw new Error('modelView never got a model');
      }

      var setModel = (function(){
        this.model = model;
        this.listenTo(this.model, 'change', this.tryUpdate);
        if (this.modelDidFetch) {
          this.modelDidFetch();
        }
        this.tryUpdate();
      }).bind(this);

      if (model._needsInitialFetch) {
        model.fetch({
          success: setModel,
          error: this.modelFetchFailed
        });
      } else {
        setModel();
      }
    }
  };

  return view(config, [ModelViewMixin]);
};