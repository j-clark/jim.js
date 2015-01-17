(function() {
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
