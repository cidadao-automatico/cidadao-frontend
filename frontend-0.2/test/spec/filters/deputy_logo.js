'use strict';

describe('Filter: deputyLogo', function () {

  // load the filter's module
  beforeEach(module('vigiaPoliticoApp'));

  // initialize a new instance of the filter before each test
  var deputyLogo;
  beforeEach(inject(function ($filter) {
    deputyLogo = $filter('deputyLogo');
  }));

  it('should return the input prefixed with "deputyLogo filter:"', function () {
    var deputy={}
    expect(deputyLogo(deputy)).toBe('./img/icon-member.jpg');
  });

});
