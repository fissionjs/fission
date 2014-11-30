'use strict';

var ListenerMixin = require('./ListenerMixin');
var Collection = require('ampersand-collection');
var React = require('react');

module.exports = function(config) {
  if (config == null) {
    throw new Error('config parameter is required');
  }
  if (config.model == null) {
    throw new Error('model attribute is required');
  }
  if (config.itemView == null) {
    throw new Error('itemView attribute is required');
  }

  var sync = this.getSync(config.model);
  var ctor = this.createCollection(config.model);
  
  // items = array of item views
  // collection = ampersand collection
  var CollectionViewMixin = {
    mixins: [ListenerMixin],
    propTypes: {
      collection: React.PropTypes.instanceOf(Collection),
    },

    getDefaultProps: function(){
      return {
        collection: config.collection
      };
    },
    renderItems: function() {
      this.items = this.props.collection.map(function(m) {
        return this.itemView({
          model: m,
          key: m.cid
        });
      }, this);

      this.forceUpdate();
    },
    componentWillMount: function() {
      // first mount, create items array
      if (this.items == null) {
        this.items = [];
      }

      // collection passed in
      if (this.props.collection != null) {
        this.renderItems();
      } else {
        // collection needs to be constructed
        this.props.collection = new ctor();
        this.props.collection.sync = sync;
        this.props.collection.fetch({
          success: this.renderItems,
          error: function(err) {
            // TODO: real error management on views
            console.log('fetch error', err);
          }
        });
      }
      this.listenTo(this.props.collection, 'add change remove', this.renderItems);
    }
  };

  return this.view(config, [CollectionViewMixin]);
};
