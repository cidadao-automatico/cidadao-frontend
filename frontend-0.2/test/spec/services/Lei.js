'use strict';

describe('Service: Lei', function () {

  // load the service's module
  beforeEach(module('vigiaPoliticoApp'));

  // instantiate service
  var Lei;
  beforeEach(inject(function (_Lei_) {
    Lei = _Lei_;
  }));

  it('should do something', function () {
    expect(!!Lei).toBe(true);
  });

});
