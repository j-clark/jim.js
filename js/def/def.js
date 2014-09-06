(function() {
  window.jim = {
    def: def
  };

  function def(property, definition) {
    Object.defineProperty(jim.context, property, {
      get: _buildGetter(definition)
    });
  }

  function _buildGetter(definition) {
    if (typeof definition === 'function') {
      return definition;
    } else {
      return function() {
        return definition;
      };
    }
  }
})();
