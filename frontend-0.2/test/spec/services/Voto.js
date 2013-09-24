'use strict';

describe('Service: Voto', function () {

  // load the service's module
  beforeEach(module('vigiaPoliticoApp'));

  // instantiate service
  var Voto;
  beforeEach(inject(function (_Voto_) {
    Voto = _Voto_;
  }));

  it('should do something', function () {
    expect(!!Voto).toBe(true);
  });

});
