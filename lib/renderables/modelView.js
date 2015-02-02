'use strict';

var Model = require('ampersand-model');
var React = require('react');
var view = require('./view');

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
      return {
        model: config.model
      };
    },

    componentWillMount: function() {
      this._initialize();
    },

    _initialize: function() {
      // collection view passing in model
      if (this.props.model != null) {
        this.model = this.props.model;
      // router is passing in params
      // TODO: allow config of id key
      } else if (this.props && this.props.id != null) {
        this.model = new config.model();
        this.model.id = this.props.id;

        // set id attrib to id - needed for fetching
        if (this.model.idAttribute !== undefined) {
          this.model[this.model.idAttribute] = this.props.id;
        }

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