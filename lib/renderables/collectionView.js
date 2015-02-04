'use strict';

var Collection = require('ampersand-collection');
var SubCollection = require('ampersand-subcollection');
var React = require('react');
var merge = require('lodash.merge');
var isArray = require('is-array');
var view = require('./view');
var combineQS = require('../util/combineQS');
var collection = require('../data/collection');

module.exports = function(config) {
  if (config == null) {
    throw new Error('config parameter is required');
  }
  if (config.itemView == null) {
    throw new Error('itemView attribute is required');
  }

  // items = array of item views
  // collection = ampersand collection
  var CollectionViewMixin = {
    propTypes: {
      model: React.PropTypes.func,
      collection: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.object),
        React.PropTypes.instanceOf(Collection)
      ]),
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
        model: config.model,
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
      this._initialize();
      this._renderItems();
    },

    componentWillReceiveProps: function(nextProps) {
      this._configureItems(nextProps);
    },

    _initialize: function() {
      // make sure model is supplied
      if (this.props.model == null) {
        throw new Error('Model is required');
      }

      // get sync and create collection based on model
      // model passed in via props or config
      var ctor = collection(this.props.model);

      // collection passed in either via props or config
      // since this.props.collection = this.collection by default
      if (this.props.collection != null) {
        if (isArray(this.props.collection)) {
          this.collection = new ctor(this.props.collection);
        } else {
          this.collection = this.props.collection;
        }
      } else {
        // collection needs to be constructed
        this.collection = new ctor();

        // TODO: break this out into a collection mixin
        // if query is defined, build querystring and
        // append to sync url
        if (this.props.query != null) {
          this.collection.url = combineQS(
            this.collection.url,
            this.props.query
          );
        }

        // TODO: error handling and event hooks
        this.collection.fetch();
      }

      // first mount, create items sub-collection
      this._items = new SubCollection(this.collection);
      this._configureItems(this.props);

      // on any add/change/remove we should re-render
      this.listenTo(this._items, 'add change remove sort', this._renderItems);
    },

    // internal fn to sync props to shadow collection
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
    },

    // internal fn to sync this.items with collection and re-render
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
        var itemProps = this.getItemViewProps ?
          merge(this.getItemViewProps(m, idx), fissionProps) :
          fissionProps;

        return this.itemView(itemProps);
      }, this);

      this.tryUpdate();
    }
  };

  return view(config, [CollectionViewMixin]);
};