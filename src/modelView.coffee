ListenerMixin = require './ListenerMixin'
view = require './view'

module.exports = (config) ->

  ModelViewMixin =
    mixins: [ListenerMixin]
    componentWillMount: ->
      console.log "will mount"
      console.log @props
      # item view
      if @props.model?
        @model = @props.model
      # model instance view
      else if @props.params?.id?
        @model = new config.model
        @model.set(@model.idAttribute, @props.params.id)
        @listenTo @model, 'change', =>
          console.log "MODEL CHANGE"
          @forceUpdate()
        @model.fetch()

  # validate the options given
  unless config.model?
    throw new Error 'Missing model attribute'

  config.mixins ?= []
  config.mixins.push ModelViewMixin
  return view config
