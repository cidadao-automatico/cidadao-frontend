'use strict';

describe('Service: LawTag', function () {

  // load the service's module
  beforeEach(module('vigiaPoliticoApp'));

  // instantiate service
  var LawTag;
  beforeEach(inject(function (_LawTag_) {
    LawTag = _LawTag_;
  }));

  it('should do something', function () {
    expect(!!LawTag).toBe(true);
  });

});
