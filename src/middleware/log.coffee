module.exports = (ctx, next) ->
  console.log 'Routing called', ctx
  next()