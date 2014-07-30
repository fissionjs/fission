module.exports = (ctx, next) ->
  if window.location.hash and window.location.hash is '#_=_'
    if window.history and window.history.replaceState
      window.history.replaceState null, null, window.location.href.split('#')[0]
    else
      # Prevent scrolling by storing the page's current scroll offset
      scroll =
        top: document.body.scrollTop
        left: document.body.scrollLeft

      window.location.hash = ''

      # Restore the scroll offset, should be flicker free
      document.body.scrollTop = scroll.top
      document.body.scrollLeft = scroll.left
  next()