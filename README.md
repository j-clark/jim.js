[![Code Climate](https://codeclimate.com/github/j-clark/jim.js/badges/gpa.svg)](https://codeclimate.com/github/j-clark/jim.js) [![Build Status](https://travis-ci.org/j-clark/jim.js.svg?branch=master)](https://travis-ci.org/j-clark/jim.js)

# Jasmine IMproved
**A suite of Jasmine helpers to make testing your JavaScript a little nicer**

### def
Set up test variables for use later.

The first argument to `def` will be a property on the jasmine user context (`this`) object. If you pass a function for the definition of this property, it will not be executed until the property is accessed. This allows you to lazily define properties and to define properties that rely on properties which are defined in later, nested contexts.

```javascript
describe('using def', function() {
  describe('defining a static property', function() {
    def('staticProperty', 'staticProperty');

    it('adds the static property to the user context object', function() {
      expect(this.staticProperty).toEqual('staticProperty');
    });
  });

  describe('defining a variable property with a function', function() {
    def('variableProperty', function() { return this.value; });
    def('value', 'original value');

    it('allows dependent properties to be defined after', function() {
      expect(this.variableProperty).toEqual('original value');
    })

    describe('overriding the value of the dependent property', function() {
      def('value', 'new value');

      it('uses the overridden value', function() {
        expect(this.variableProperty).toEqual('new value');
      });
    });
  });
});
```

### when..thenReturn
Set up spy return values based on arguments passed to the spy.

`when` is chainable to allow you configure multiple argument list -> return value pairs.

```javascript
describe('.when', function() {
  def('spy', function() { return jasmine.createSpy('spy'); });

  describe('passing expectedArgs and an associated returnValue', function() {
    beforeEach(function() {
      this.spy
        .and.when(jasmine.any(String), 'arg2')
        .thenReturn('return value one')
        .and.when(jasmine.objectContaining({ key: 'val' }), 'arg2')
        .thenReturn('return value two');
    });

    describe('when `actualArgs` match `expectedArgs` exactly', function() {
      it('returns the configured returnValue', function() {
        expect(this.spy('arg1', 'arg2')).toEqual('return value one');
      });
    });

    describe('when expectedArgs match actualArgs[0..n]', function() {
      it('returns the configured returnvalue', function() {
        expect(this.spy({ key: 'val', foo: 'bar' }, 'arg2', 'arg3')).toEqual('return value two');
      });
    });

    describe('when expectedArgs does not match actualArgs[0..n]', function() {
      it('returns undefined', function() {
        expect(this.spy('arg2', 'arg3')).toBeUndefined();
      });
    });
  });
});
```

```
describe('double', function() {
  describe('defining a double', function() {
    def('double', double('someDouble'));

    it('has a name for identification in test output', function() {
      expect(this.double.doubleName).toBe('someDouble');
    });

    describe('with methods and simple return values', function() {
      def('double', double('someDouble', { getFive: 5 }));

      it('has a method returning the simple value', function() {
        expect(this.double.getFive()).toEqual(5);
      });

      it('is still a jasmine spy', function() {
        this.double.getFive();
        expect(this.double.getFive).toHaveBeenCalled();
      });
    });


    describe('with methods and computed return values', function() {
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
```
