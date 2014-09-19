(function() {
  'use strict';

  function double(identifier, definitions) {
    var methods, spy;

    if(definitions) {
      methods = Object.keys(definitions);
      spy = jasmine.createSpyObj(identifier, methods);
      methods.forEach(function(method) {
        spy[method].and.returnValue(definitions[method]);
      });
    } else {
      spy = jasmine.createSpyObj(identifier, ['asdf']);
    }

    return spy;
  }

  window.double = double;
})();
