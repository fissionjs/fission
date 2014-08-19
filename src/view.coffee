alias = require './alias'
React = require 'react'

module.exports = (config) ->
  return React.createClass alias(config)
