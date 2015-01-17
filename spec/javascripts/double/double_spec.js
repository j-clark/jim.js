describe('double', function() {
  'use strict';

  describe('defining a double', function() {
    def('double', double('someDouble'));

    it('has a name for identification in test output', function() {
      expect(this.double.doubleName).toBe('someDouble');
    });

    context('with methods and simple return values', function() {
      def('double', double('someDouble', { getFive: 5 }));

      it('has a method returning the simple value', function() {
        expect(this.double.getFive()).toEqual(5);
      });

      it('is still a jasmine spy', function() {
        this.double.getFive();
        expect(this.double.getFive).toHaveBeenCalled();
      });
    });


    context('with methods and computed return values', function() {
      context('when the computed value is based on arbitrary values', function() {
        def('double', double('someDouble', { sum: function(a, b) { return a + b; } }));

        it('calls the function assigned to it', function() {
          expect(this.double.sum(1, 2)).toEqual(3);
        });

        it('is still a jasmine spy', function() {
          this.double.sum();
          expect(this.double.sum).toHaveBeenCalled();
        });
      });

      context('when the computed value operates on values on the user context object', function() {
        def('double', double('someDouble', { getValue: function() { return this.value; } }));
        def('value', 'hamburgers');

        it('binds to the user context object', function() {
          expect(this.double.getValue()).toEqual('hamburgers');
        });

        it('is still a jasmine spy', function() {
          this.double.getValue();
          expect(this.double.getValue).toHaveBeenCalled();
        });
      });
    });
  });
});

