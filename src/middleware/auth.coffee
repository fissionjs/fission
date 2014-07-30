module.exports = (me) ->
  return (ctx, next) ->
    return next() if me?
    return next() if window.location.pathname is '/login'
    window.location = '/login'
    next()