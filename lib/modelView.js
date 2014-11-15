'use strict';

var ListenerMixin = require('./ListenerMixin');
var Model = require('ampersand-model');

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
        this.model.fetch();
      }

      // no model specified in props or config
      if (!this.model) {
        throw new Error('modelView never got a model');
      }
      this.listenTo(this.model, 'change', this.forceUpdate);
      return this.model;
    }
  };

  return this.view(config, [ModelViewMixin]);
};