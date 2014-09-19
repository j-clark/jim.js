describe('double', function() {
  'use strict';

  describe('defining methods and return values', function() {
    def('double', double('someDouble', { getFive: 5 }));

    it('works', function() {
      expect(this.double.getFive()).toEqual(5);
    });
  });
});

