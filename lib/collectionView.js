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
      // TODO: id 
    },

    getDefaultProps: function(){
      return {
        collection: config.collection
      };
    },
   renderItems: function() {
      this.items = this.collection.map(function(m) {
        // allow for passing props to items
        return function(props){
          props = props || {};
          props.model = m;
          props.key = m.cid;
          return this.itemView(
            props
          );
        }.bind(this);
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
        this.collection = this.props.collection;
        this.renderItems();
      } else {
        // collection needs to be constructed
        this.collection = new ctor();
        this.collection.sync = sync;

        // if an id query is specified, append to url
        // [used for specifying collection's parent]
        // (obviously this needs to be more flexible)
        if (this.props.id != null) {
          this.collection.url += '?id=' + this.props.id;
        }

        this.collection.fetch({
          success: this.renderItems,
          error: function(err) {
            // TODO: real error management on views
            console.log('fetch error', err);
          }
        });
      }
      this.listenTo(this.collection, 'add change remove', this.renderItems);
    }
  };

  return this.view(config, [CollectionViewMixin]);
};
