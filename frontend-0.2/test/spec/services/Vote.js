'use strict';

describe('Service: Vote', function () {

  // load the service's module
  beforeEach(module('vigiaPoliticoApp'));

  // instantiate service
  var Vote;
  beforeEach(inject(function (_Vote_) {
    Vote = _Vote_;
  }));

  it('should do something', function () {
    expect(!!Vote).toBe(true);
  });

});
