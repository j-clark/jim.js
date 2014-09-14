describe('.when', function() {
  'use strict';

  def('spy', function() {
    return jasmine.createSpy('spy');
  });

  describe('the arguments passed to when', function() {
    context('when they are all passed to the spy in the right order', function() {
      beforeEach(function() {
        this.arg1 = 'arg1';
        this.arg2 = 'arg2';

        this.spy.and.when(this.arg1, this.arg2).thenReturn('return value');
      });

      describe('.thenReturn', function() {
        it('returns the value passed to .thenReturn', function() {
          expect(this.spy(this.arg1, this.arg2)).toEqual('return value');
        });
      });
    });
  });

  describe('chaining whens', function() {
    beforeEach(function() {
      this.spy
        .and.when('first setup').thenReturn('first return')
        .and.when('second setup').thenReturn('second return');
    });

    it('keeps track of all setups', function() {
      expect(this.spy('first setup')).toEqual('first return');
      expect(this.spy('second setup')).toEqual('second return');
    });
  });

  describe('using `jasmine.any`', function() {
    beforeEach(function() {
      this.spy.and.when(jasmine.any(Object)).thenReturn('got object');
      this.spy.and.when(jasmine.any(String)).thenReturn('got string');
      this.spy.and.when(jasmine.any(Number)).thenReturn('got number');
      this.spy.and.when(jasmine.any(Function)).thenReturn('got function');
      this.spy.and.when(jasmine.any(Boolean)).thenReturn('got boolean');
    });

    it('matches as you would expect', function() {
      expect(this.spy({ key: 'val' })).toEqual('got object');
      expect(this.spy('123')).toEqual('got string');
      expect(this.spy(123)).toEqual('got number');
      expect(this.spy(function() {})).toEqual('got function');
      expect(this.spy(jasmine.createSpy('function'))).toEqual('got function');
      expect(this.spy(true)).toEqual('got boolean');
      expect(this.spy(false)).toEqual('got boolean');
    });
  });

  describe('using `jasmine.objectContaining`', function() {
    beforeEach(function() {
      this.spy.and.when(jasmine.objectContaining({ key: 'val' })).thenReturn('hamburgers');
    });

    it('matches as you would expect', function() {
      expect(this.spy({ key: 'val', foo: ['bar'] })).toEqual('hamburgers');
      expect(this.spy({ key: 'value', foo: ['bar'] })).toBeUndefined();
    });
  });
});
