module.exports = (config) ->

    aliases =
      init: 'getInitialState'
      mounting: 'componentWillMount'
      mounted: 'componentDidMount'
      unmounting: 'componentWillUnmount'

    # for each alias when the config has the alias fn
    # point the original fn to the alias fn defined

    for k, v of aliases when config[k]?
      config[v] ?= config[k]

    config.mixins ?= []
    
    return config