describe('jim.def', function() {
  describe('defining a simple property', function() {
    jim.def('literalValue', 'literalValue');

    it('creates it as a property on the user context object', function() {
      expect(this.literalValue).toEqual('literalValue');
    });
  });

  describe('defining a property with a function', function() {
    jim.def('firstDefinedProp', function firstDefinedProp() {
      return this.secondDefinedProp;
    });

    jim.def('secondDefinedProp', 'secondDefinedProp');

    it('accepts a function returning the future-defined expression', function() {
      expect(this.firstDefinedProp).toEqual('secondDefinedProp');
    });
  });

  describe('overwriting the property definition', function() {
    jim.def('property', 'original definition');

    context('when the property definition is not overridden', function() {
      it('uses the original definition on the first invocation', function() {
        expect(this.property).toEqual('original definition');
      });
    });

    context('when the property definition is overridden', function() {
      jim.def('property', function() {
        return this.overriddenDefinition;
      });

      jim.def('overriddenDefinition', 'overridden definition');

      it('uses the overridden definition', function() {
        expect(this.property).toEqual('overridden definition');
      });
    });
  });
});
