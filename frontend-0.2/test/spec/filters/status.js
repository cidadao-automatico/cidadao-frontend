'use strict';

describe('Filter: status', function () {

  // load the filter's module
  beforeEach(module('vigiaPoliticoApp'));

  // initialize a new instance of the filter before each test
  var status;
  beforeEach(inject(function ($filter) {
    status = $filter('status');
  }));

  it('should return the input prefixed with "status filter:"', function () {
    var levels={ }
    levels[0]="em vota&ccedil;&atilde;o"
    levels[1]='votado'    
    levels[2]='unknown'

    var parsedKey=0
    for (var key in levels)
    {
      parsedKey=parseInt(key);
      expect(status(parsedKey)).toBe(levels[key]);  
    }

  });

});
