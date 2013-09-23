'use strict';

describe('Filter: levelString', function () {

  // load the filter's module
  beforeEach(module('vigiaPoliticoApp'));

  // initialize a new instance of the filter before each test
  var levelString;
  beforeEach(inject(function ($filter) {
    levelString = $filter('levelString');
  }));

  it('should return the correct string according to input level', function () {
    var levels={ }
    levels[1]='contra'
    levels[2]='parcialmente contra'
    levels[3]='abstenção'
    levels[4]='parcialmente a favor'
    levels[5]='a favor'
    levels[6]=''
    var parsedKey=0
    for (var key in levels)
    {
      parsedKey=parseInt(key);
      expect(levelString(parsedKey)).toBe(levels[key]);  
    }
  });

});
