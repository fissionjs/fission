{div, i, p} = React.DOM

React.createClass

module.exports = ->
  render: ->
    div {className: 'not found'},
      h1 {}, "Not Found!"
