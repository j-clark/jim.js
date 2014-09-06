describe('jim.def', function() {
  beforeEach(function() {
    this.jimContext = {};
    jim.context = this.jimContext;
  });

  describe('simple properties', function() {
    context('when it is a literal value', function() {
      beforeEach(function() {
        jim.def('literalValue', 'literalValue');
      });

      it('creates it as a property on the user context object', function() {
        expect(this.jimContext.literalValue).toEqual('literalValue');
      });
    });

    context('when it is a variable in scope', function() {
      beforeEach(function() {
        var variableInScope = 'variableInScope';
        jim.def('variableInScope', variableInScope);
      });

      it('creates it as a property on the user context object', function() {
        expect(this.jimContext.variableInScope).toEqual('variableInScope');
      });
    });
  });

  describe('future-defined properties', function() {
    beforeEach(function() {
      jim.def('firstDefinedProp', function() {
        return this.secondDefinedProp;
      });

      jim.def('secondDefinedProp', 'secondDefinedProp');
    });

    it('accepts a function returning the future-defined expression', function() {
      expect(this.jimContext.firstDefinedProp).toEqual('secondDefinedProp');
    });
  });
});
