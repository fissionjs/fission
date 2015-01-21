'use strict';

var Model = require('ampersand-model');
var React = require('react');
var ListenerMixin = require('./mixins/Listener');
var SugarMixin = require('./mixins/Sugar');

module.exports = function(config) {
  if (config == null) {
    throw new Error('config parameter is required');
  }

  var ModelViewMixin = {
    mixins: [ListenerMixin, SugarMixin],
    propTypes: {
      model: React.PropTypes.instanceOf(Model),
    },
    componentWillMount: function() {
      this._initialize();
    },

    _initialize: function() {
      // collection view passing in model
      if (this.props.model != null) {
        this.model = this.props.model;
      // router is passing in params
      } else if (this.props.params && this.props.params.id != null) {
        this.model = new config.model();
        this.model.id = this.props.params.id;

        // set id attrib to id - needed for fetching
        if (this.model.idAttribute !== undefined) {
          this.model[this.model.idAttribute] = this.props.params.id;
        }

        this.model.fetch();
      }

      // no model specified in props or config
      if (!this.model) {
        throw new Error('modelView never got a model');
      }

      this.listenTo(this.model, 'change', this.tryUpdate);
    }
  };

  return this.view(config, [ModelViewMixin]);
};