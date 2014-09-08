(function() {
  'use strict';

  window.jim = {
    def: def,
    definitionCache: {},
    getterCache: {}
  };

  function def(property, definition) {
    beforeEach(function() {
      _defineProperty(property, definition);
    });
  }

  function _defineProperty(property, definition) {
    _cacheDefinition(property, definition);
    jim.getterCache[property] = _buildGetter(property);

    if (!jim.context.hasOwnProperty(property)) {
      Object.defineProperty(jim.context, property, {
        get: function() {
          return _.bind(jim.getterCache[property], jim.context)();
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
