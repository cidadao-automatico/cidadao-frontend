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
    var text = 'angularjs';
    expect(status(text)).toBe('status filter: ' + text);
  });

});
