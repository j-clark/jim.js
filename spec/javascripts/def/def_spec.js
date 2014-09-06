describe('jim.def', function() {
  describe('defining a simple property', function() {
    beforeEach(function() {
      jim.def('literalValue', 'literalValue');
    });

    it('creates it as a property on the user context object', function() {
      expect(this.literalValue).toEqual('literalValue');
    });
  });

  describe('defining a property with a function', function() {
    beforeEach(function() {
      jim.def('firstDefinedProp', function() {
        return this.secondDefinedProp;
      });

      jim.def('secondDefinedProp', 'secondDefinedProp');
    });

    it('accepts a function returning the future-defined expression', function() {
      expect(this.firstDefinedProp).toEqual('secondDefinedProp');
    });
  });
});
