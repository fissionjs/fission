// https://github.com/facebook/react/issues/945
// Modified from: https://github.com/facebook/react/blob/master/src/test/phantomjs-shims.js

(function (){
  if (!Function.prototype.bind) {
    Function.prototype.bind = function(context) {
      var slice = Array.prototype.slice;
      var self = this;
      var args = slice.call(arguments, 1);

      function bound() {
        var invokedAsConstructor = self.prototype && (this instanceof self);
        return self.apply(
          !invokedAsConstructor && context || this,
          args.concat(slice.call(arguments))
        );
      }
      bound.prototype = self.prototype;
      return bound;
    };
  }
})();
