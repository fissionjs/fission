'use strict';

var merge = require('lodash.merge');
var url = require('url');

// take a url and merge a query object into it
module.exports = function(modelUrl, query){
  var parsed = url.parse(modelUrl, true);
  delete parsed.search;
  parsed.query = merge(parsed.query, query);
  return url.format(parsed);
};