'use strict';

var Collection = require('ampersand-collection');
var SubCollection = require('ampersand-subcollection');
var React = require('react');
var merge = require('lodash.merge');
var view = require('./view');
var constructCollection = require('../util/ensureInstance').collection;

function bindIfFn(fn, ctx) {
  if (typeof fn === 'function') {
    return fn.bind(ctx);
  }
  return fn;
}

module.exports = function(config) {
  if (config == null) {
    throw new Error('config parameter is required');
  }
  if (config.itemView == null) {
    throw new Error('itemView attribute is required');
  }
  var configCollection = config.collection;
  delete config.collection;

  // items = array of item views
  // collection = ampersand collection
  var CollectionViewMixin = {
    collectionName: 'modelView',
    propTypes: {
      collection: React.PropTypes.oneOfType([
        React.PropTypes.func,
        React.PropTypes.object,
        React.PropTypes.instanceOf(Collection)
      ]),
      data: React.PropTypes.arrayOf(React.PropTypes.object),
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
    },

    // most options can be passed via config or props
    // props takes precedence
    getDefaultProps: function(){
      return {
        collection: configCollection,
        data: config.data,
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
      this._initialize(this.props);
      this._computeItemsWithContext();
    },

    componentWillReceiveProps: function(nextProps) {
      this._configureItems(nextProps);
    },

    componentWillUpdate: function(){
      this._computeItemsWithContext(true);
    },

    _collectionFetchFailed: function(m, res) {
      var notFound = res.status === 404 || res.status === 204;
      var handled404 = notFound && this.collectionNotFound;
      if (this.collectionFetchFailed) {
        this.collectionFetchFailed.apply(this, arguments);
      }
      if (handled404) {
        this.collectionNotFound.apply(this, arguments);
      }

      this.collection = null;
      if (!this.collectionFetchFailed && !handled404) {
        throw new Error('Collection fetch failed with a ' + res.status);
      }
    },

    _initialize: function(props) {
      // get sync and create collection based on model
      // model passed in via props or config
      var collection = constructCollection(props.collection, props);

      var setCollection = (function() {
        this.collection = collection;
        // create items sub-collection
        this._items = new SubCollection(this.collection);
        this._configureItems(props);
        // TODO: remove events on prop change switch up or destroy
        this._items.on('add change remove sort reset', this.tryUpdate);
        if (this.collectionDidFetch) {
          this.collectionDidFetch();
        }
        this.tryUpdate();
      }).bind(this);

      // TODO: override all sync behavior to run errors and success
      // through our hooks
      if (collection._needsInitialFetch) {
        collection.fetch({
          success: setCollection,
          error: this._collectionFetchFailed
        });
      } else {
        setCollection();
      }
    },

    // internal fn to sync props to shadow collection
    _configureItems: function(props) {
      if (typeof props !== 'object') {
        throw new Error('_configureItems called with invalid props');
      }
      // not initialized yet
      if (!this._items) {
        return;
      }
      this._items.configure({
        where: props.where,
        filter: props.filter,
        limit: props.limit,
        offset: props.offset,
        comparator: bindIfFn(props.sort, this)
      }, true);
    },

    // internal fn to sync this.items with collection
    _computeItemsWithContext: function(runFilters) {
      var runTheTrap = this._computeItems.bind(this, runFilters);
      React.withContext(this.context, runTheTrap);
    },
    _computeItems: function(runFilters) {
      // nothing to compute, data hasnt been constructed yet
      if (!this._items) {
        return;
      }

      // TODO: switch to transform when available
      // https://github.com/AmpersandJS/ampersand-subcollection/issues/31
      if (runFilters) {
        this._items.off('add change remove sort', this.tryUpdate);
        this._items._runFilters();
        this._items.on('add change remove sort', this.tryUpdate);
      }
      this.items = this._items.map(function(m, idx) {
        var fissionProps = {
          model: m,
          index: idx,
          key: (m.id || m.cid)
        };

        // if itemview props transform, use that merged w/ defaults
        // otherwise just defaults
        var itemProps = this.getItemViewProps ?
          merge(this.getItemViewProps(m, idx), fissionProps) :
          fissionProps;

        return this.itemView(itemProps);
      }, this);
    }
  };

  return view(config, [CollectionViewMixin]);
};