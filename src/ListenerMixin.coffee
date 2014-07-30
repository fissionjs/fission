module.exports =
  
  listenTo: (ee, event, listener) ->
    ee.on event, listener
    return this

  removeListener: (ee, event, listener) ->
    if ee.off?
      ee.off event, listener
    else if ee.removeListener
      ee.removeListener event, listener
    return this

  componentWillMount: ->
    @listeners = []
    return

  componentWillUnmount: ->
    for l in @listeners
      @removeListener l.ee, l.event, l.listener
    return
