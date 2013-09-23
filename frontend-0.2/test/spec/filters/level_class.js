'use strict';

describe('Filter: levelClass', function () {

  // load the filter's module
  beforeEach(module('vigiaPoliticoApp'));

  // initialize a new instance of the filter before each test
  var levelClass;
  beforeEach(inject(function ($filter) {
    levelClass = $filter('levelClass');
  }));

  it('should return the correct class according to input level', function () {
    var levels={ }
    levels[1]='opposite'
    levels[2]='halfOpposite'
    levels[3]='abstention'
    levels[4]='halfFavorable'
    levels[5]='favorable'
    levels[6]=''
    
    var parsedKey=0
    for (var key in levels)
    {
      parsedKey=parseInt(key);
      expect(levelClass(parsedKey)).toBe(levels[key]);  
    }
  });

});
