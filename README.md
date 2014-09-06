[![Code Climate](https://codeclimate.com/github/j-clark/jim.js/badges/gpa.svg)](https://codeclimate.com/github/j-clark/jim.js) [![Build Status](https://travis-ci.org/j-clark/jim.js.svg?branch=master)](https://travis-ci.org/j-clark/jim.js)

# Jasmine IMproved
**A suite of Jasmine helpers to make testing your JavaScript a little nicer**

## Examples
### jim.def
```javascript
describe('using jim.def', function() {
  describe('defining a static property', function(){
    jim.def('staticProperty', 'staticProperty');

    it('adds the static property to the user context object', function() {
      expect(this.staticProperty).toEqual('staticProperty');
    });
  });

  describe('defining a variable property with a function', function() {
    jim.def('variableProperty', function() { return this.value; });
    jim.def('value', 'original value');

    it('allows dependent properties to be defined after', function() {
      expect(this.variableProperty).toEqual('original value');
    })

    describe('overriding the value of the dependent property', function() {
      jim.def('value', 'new value');

      it('uses the overridden value', function() {
        expect(this.variableProperty).toEqual('new value');
      });
    });
  });
});
```
