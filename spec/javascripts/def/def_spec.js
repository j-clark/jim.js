describe('def', function() {
  'use strict';

  describe('defining a simple property', function() {
    def('literalValue', 'literalValue');

    it('creates it as a property on the user context object', function() {
      expect(this.literalValue).toEqual('literalValue');
    });
  });

  describe('defining a property with a function', function() {
    def('firstDefinedProp', function firstDefinedProp() {
      return this.secondDefinedProp;
    });

    def('secondDefinedProp', 'secondDefinedProp');

    it('accepts a function returning the future-defined expression', function() {
      expect(this.firstDefinedProp).toEqual('secondDefinedProp');
    });
  });

  describe('overwriting the property definition', function() {
    def('property', function() {
      return this.definition;
    });

    def('definition', 'original definition');

    context('when the property definition is not overridden', function() {
      it('uses the original definition on the first invocation', function() {
        expect(this.property).toEqual('original definition');
      });
    });

    context('when the property definition is overridden', function() {
      def('definition', 'overridden definition');

      it('uses the overridden definition', function() {
        expect(this.property).toEqual('overridden definition');
      });
    });
  });
});
