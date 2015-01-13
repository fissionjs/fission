'use strict';

var ListenerMixin = require('./ListenerMixin');
var Collection = require('ampersand-collection');
var SubCollection = require('ampersand-subcollection');
var React = require('react');
var merge = require('lodash.merge');
var Qs = require('qs');

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
      offset: React.PropTypes.number,
      limit: React.PropTypes.number,
      where: React.PropTypes.object,
      filter: React.PropTypes.func,
      filters: React.PropTypes.arrayOf(React.PropTypes.func),
      watch: React.PropTypes.arrayOf(React.PropTypes.string),
      sort: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.func
      ])
      // TODO: id 
    },

    getDefaultProps: function(){
      return {
        collection: config.collection,
        offset: undefined,
        limit: undefined
      };
    },

    renderItems: function() {
      // TODO: switch to map when available
      // https://github.com/AmpersandJS/ampersand-subcollection/issues/31
      this.items = this._items.map(function(m, idx) {
        var fissionProps = {
          model: m,
          index: idx,
          key: m.cid
        };

        // if itemview props transform, use that merged w/ defaults
        // otherwise just defaults
        var itemProps = this.getItemViewProps
          ? merge(this.getItemViewProps(m, idx), fissionProps)
          : fissionProps;

        return this.itemView(itemProps);
      }, this);

      if (this.isMounted()) {
        this.forceUpdate(); 
      }
    },
    componentWillMount: function() {
      // collection passed in either via props or config
      // since this.props.collection = this.collection by default
      if (this.props.collection != null) {
        this.collection = this.props.collection;
        this.renderItems();
      } else {
        // collection needs to be constructed
        this.collection = new ctor();
        this.collection.sync = sync;

        // if query is defined, build querystring and 
        // append to sync url
        if (this.props.query != null) {          
          var qs = '?' + Qs.stringify(this.props.query);
          this.collection.url += qs;
        }

        this.collection.fetch({
          success: this.renderItems,
          error: function(err) {
            // TODO: real error management on views
            console.log('fetch error', err);
          }
        });
      }

      // first mount, create items sub-collection
      this._items = new SubCollection(this.collection, {
        where: this.props.where,
        filter: this.props.filter,
        limit: this.props.limit,
        offset: this.props.offset,
        comparator: this.props.sort
      });

      // on any add/change/remove/sort we should re-render
      this.listenTo(this._items, 'add change remove sort', this.renderItems);
    }
  };

  return this.view(config, [CollectionViewMixin]);
};
