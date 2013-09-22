'use strict';

describe('Filter: voteStatusClass', function () {

  // load the filter's module
  beforeEach(module('vigiaPoliticoApp'));

  // initialize a new instance of the filter before each test
  var voteStatusClass;
  beforeEach(inject(function ($filter) {
    voteStatusClass = $filter('voteStatusClass');
  }));

  it('should return the input prefixed with "voteStatusClass filter:"', function () {
    var text = 'angularjs';
    expect(voteStatusClass(text)).toBe('voteStatusClass filter: ' + text);
  });

});
