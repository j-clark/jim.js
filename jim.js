(function() {
  'use strict';

  var definitionCache,
      jimContext;

  beforeEach(function() {
    definitionCache = {};
    jimContext = this;
  });

  function def(property, definition) {
    beforeEach(function() {
      Object.defineProperty(this, property, {
        get: _buildGetter(property, definition),
        configurable: true
      });
    });
  }

  function _buildGetter(property, definition) {
    return function() {
      if(!definitionCache[property]) {
        definitionCache[property] = _.isFunction(definition) ? _.bind(definition, jimContext)() : definition;
      }

      return definitionCache[property];
    };
  }

  window.def = def;
})();
;(function() {
  'use strict';

  function double(identifier, definitions) {
    var methods, spy;

    if(definitions) {
      methods = Object.keys(definitions);
      spy = jasmine.createSpyObj(identifier, methods);
      addMethodsToSpy(spy, definitions);
    } else {
      spy = {};
    }

    spy.doubleName = identifier;
    return spy;
  }

  function addMethodsToSpy(spy, definitions) {
    var methods = Object.keys(definitions);

    beforeEach(function() {
      var jimContext = this;

      methods.forEach(function(method) {
        if(typeof definitions[method] === 'function') {
          spy[method].and.callFake(_.bind(definitions[method], jimContext));
        } else {
          spy[method].and.returnValue(definitions[method]);
        }
      });
    });
  }

  window.double = double;
})();
;(function() {
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
