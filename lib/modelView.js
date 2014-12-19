'use strict';

var ListenerMixin = require('./ListenerMixin');
var Model = require('ampersand-model');
var React = require('react');

module.exports = function(config) {
  if (config == null) {
    throw new Error('config parameter is required');
  }

  var ModelViewMixin = {
    mixins: [ListenerMixin],
    propTypes: {
      model: React.PropTypes.instanceOf(Model),
    },
    componentWillMount: function() {
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

      // not sure why this needs to be wrapped and called directly
      var update = function(){ this.forceUpdate(); }.bind(this);

      this.listenTo(this.model, 'change', update);
      return this.model;
    }
  };

  return this.view(config, [ModelViewMixin]);
};