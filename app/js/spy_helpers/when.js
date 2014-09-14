(function() {
  'use strict';

  jasmine.SpyStrategy.prototype.when = function() {
    var expectedArgs = Array.prototype.slice.call(arguments);
    var spyCallFake = this.callFake;

    // such a hack
    var spy = this.callThrough();

    return {
      thenReturn: function thenReturn(returnValue) {
        spy.thenReturns = spy.thenReturns || [];
        spy.thenReturns.push(buildThenReturn(expectedArgs, returnValue));

        return spyCallFake(function() {
          var actualArgs = Array.prototype.slice.call(arguments);

          for(var i = 0; i < spy.thenReturns.length; i++) {
            var result = spy.thenReturns[i](actualArgs);

            if(typeof result !== 'undefined') {
              return result;
            }
          }
        });
      }
    };
  };

  function buildThenReturn(expectedArgs, returnValue) {
    return function(actualArgs) {

      for(var i = 0; i < expectedArgs.length; i++) {
        var expectedArg = expectedArgs[i];
        if(expectedArg.jasmineMatches) {
          if(!expectedArg.jasmineMatches(actualArgs[i])) {
            return;
          }
        } else if(expectedArgs[i] !== actualArgs[i]) {
          return;
        }
      }

      return returnValue;
    };
  }
})();
