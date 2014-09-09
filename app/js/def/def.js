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
