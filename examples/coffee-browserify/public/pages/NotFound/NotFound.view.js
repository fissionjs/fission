(function() {
  define(function(require) {
    var div, i, p, _ref;
    _ref = React.DOM, div = _ref.div, i = _ref.i, p = _ref.p;
    return React.createClass({
      render: function() {
        return div({
          className: 'icon message'
        }, i({
          className: 'attention icon'
        }), div({
          className: 'content'
        }, div({
          className: 'header'
        }, 'Page not found'), p('The page you tried to reach does not exist. Sorry about that.')));
      }
    });
  });

}).call(this);
