'use strict';

describe('Filter: short', function () {

  // load the filter's module
  beforeEach(module('vigiaPoliticoApp'));

  // initialize a new instance of the filter before each test
  var short;
  beforeEach(inject(function ($filter) {
    short = $filter('short');
  }));

  it('should return the same string when it has less than 200 characters', function () {
    var text = 'angular';    
    expect(short(text)).toBe(text);
  });

  it('should return the same followed by "&hellip;" when it has more than 200 characters', function () {
    var text = 'angular';
    for (var i=0;i<40;i++)
    {
      text = text.concat(" angular")
    }
    var expectedValue='angular angular angular angular angular angular angular'+
    ' angular angular angular angular angular angular angular angular angular angular angular angular angular angular angular angular angular angular angular&hellip;'
    expect(short(text)).toBe(expectedValue);
  });

});
