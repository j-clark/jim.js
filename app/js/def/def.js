(function() {
  'use strict';

  function def(property, definition) {
    beforeEach(function() {
      Object.defineProperty(this, property, {
        get: _buildGetter(property, definition),
        configurable: true
      });
    });
  }

  function _buildGetter(property, definition) {
    if (typeof definition === 'function') {
      return definition;
    } else {
      return function() {
        return definition;
      };
    }
  }

  window.def = def;
})();
