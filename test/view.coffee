view = require '../src/view'

module.exports = 

  "View should produce the right output": ->

    v = view 
      init: -> 
      mounting: -> 
      mounted: ->
      unmounting: ->
      render: ->

    v.should.be.instanceof Function
    v.should.have.property 'originalSpec'
