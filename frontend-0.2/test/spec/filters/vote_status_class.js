'use strict';

describe('Filter: voteStatusClass', function () {

  // load the filter's module
  beforeEach(module('vigiaPoliticoApp'));

  // initialize a new instance of the filter before each test
  var voteStatusClass;
  beforeEach(inject(function ($filter) {
    voteStatusClass = $filter('voteStatusClass');
  }));

  it('should return "rated" when vote is above 0', function () {
    var lei = { yourvote: 1}
    expect(voteStatusClass(lei)).toBe('rated');
  });

  it('should return "estimated" when vote is below 0', function () {
    var lei = { yourvote: -1}
    expect(voteStatusClass(lei)).toBe('estimated');
  });

  it('should return "" when vote is equal to 0', function () {
    var lei = { yourvote: 0}
    expect(voteStatusClass(lei)).toBe('');
  });

});
