'use strict';

describe('Service: UserAuthorization', function () {

  // load the service's module
  beforeEach(module('vigiaPoliticoApp'));

  // instantiate service
  var UserAuthorization;
  beforeEach(inject(function (_UserAuthorization_) {
    UserAuthorization = _UserAuthorization_;
  }));

  it('should do something', function () {
    expect(!!UserAuthorization).toBe(true);
  });

});
