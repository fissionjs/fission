'use strict';

var ListenerMixin = require('./ListenerMixin');

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
    renderItems: function() {
      this.items = this.collection.map(function(m) {
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
      if (this.collection != null) {
        this.renderItems();
        return;
      }

      // collection needs to be constructed
      this.collection = new ctor();
      this.collection.sync = sync;
      this.collection.fetch({
        success: function(){
          renderItems();
          this.listenTo(this.collection, 'add change remove', this.renderItems)
        },
        error: function(err) {
          // TODO: real error management on views
          console.log('fetch error', err);
        }
      });
    }
  };

  return this.view(config, [CollectionViewMixin]);
};
