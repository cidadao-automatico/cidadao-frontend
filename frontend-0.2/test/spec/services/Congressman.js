'use strict';

describe('Service: Congressman', function () {

  // load the service's module
  beforeEach(module('vigiaPoliticoApp'));

  // instantiate service
  var Congressman;
  beforeEach(inject(function (_Congressman_) {
    Congressman = _Congressman_;
  }));

  it('should do something', function () {
    expect(!!Congressman).toBe(true);
  });

});
