'use strict';

var ListenerMixin = require('./ListenerMixin');
var Collection = require('ampersand-collection');
var SubCollection = require('ampersand-subcollection');
var React = require('react');
var merge = require('lodash.merge');
var url = require('url');

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
      query: React.PropTypes.object,
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

    // most options can be passed via config or props
    // props takes precedence
    getDefaultProps: function(){
      return {
        collection: config.collection,
        query: config.query,
        offset: config.offset,
        limit: config.limit,
        where: config.where,
        filter: config.filter,
        filters: config.filters,
        watch: config.watch,
        sort: config.sort
      };
    },

    // on component mount we initialize everything
    componentWillMount: function() {
      // collection passed in either via props or config
      // since this.props.collection = this.collection by default
      if (this.props.collection != null) {
        this.collection = this.props.collection;
        this._renderItems();
      } else {
        // collection needs to be constructed
        this.collection = new ctor();
        this.collection.sync = sync;

        // if query is defined, build querystring and 
        // append to sync url
        if (this.props.query != null) {          
          this.collection.url = combineQS(this.collection.url, this.props.query);
        }

        this.collection.fetch({
          success: this._renderItems,
          error: function(err) {
            // TODO: real error management on views
            console.log('fetch error', err);
          }
        });
      }

      // first mount, create items sub-collection
      this._items = new SubCollection(this.collection);
      this._configureItems(this.props);

      // on any add/change/remove we should re-render
      this.listenTo(this._items, 'add change remove sort', this._renderItems);
    },

    componentWillReceiveProps: function(nextProps) {
      this._configureItems(nextProps);
    },

    // internal fn to sync this.items and re-render
    _renderItems: function() {
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

    // internal fn to sync
    _configureItems: function(props) {
      if (typeof props !== 'object') {
        throw new Error('_configureItems called with invalid props');
      }
      this._items.configure({
        where: props.where,
        filter: props.filter,
        limit: props.limit,
        offset: props.offset,
        comparator: props.sort
      }, true);
      this._renderItems();
    }
  };

  return this.view(config, [CollectionViewMixin]);
};

// take a url and merge a query object into it
function combineQS(url, query){
  var parsed = url.parse(url, true);
  delete parsed.search;
  parsed.query = merge(parsed.query, query);
  return url.format(parsed);
}