'use strict';

describe('Service: cidadaolei', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var cidadaolei;
  beforeEach(inject(function(_cidadaolei_) {
    cidadaolei = _cidadaolei_;
  }));

  it('should do something', function () {
    expect(!!cidadaolei).toBe(true);
  });

});
