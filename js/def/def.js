(function() {
  window.jim = {
    def: def,
    definitionCache: {},
    getterCache: {}
  };

  function def(property, definition) {
    _cacheDefinition(property, definition);
    jim.getterCache[property] = _buildGetter(property);

    if (!jim.context.hasOwnProperty(property)) {
      Object.defineProperty(jim.context, property, {
        get: function() {
          return jim.getterCache[property].bind(jim.context)();
        }
      });
    }
  }

  function _cacheDefinition(property, definition) {
    jim.definitionCache[property] = definition;
  }

  function _buildGetter(property) {
    var definition = jim.definitionCache[property];
    if (typeof definition === 'function') {
      return definition;
    } else {
      return function() {
        return definition;
      };
    }
  }

  beforeEach(function() {
    jim.context = this;
  });
})();
