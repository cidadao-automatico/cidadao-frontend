'use strict';

describe('Service: LawRegion', function () {

  // load the service's module
  beforeEach(module('vigiaPoliticoApp'));

  // instantiate service
  var LawRegion;
  beforeEach(inject(function (_LawRegion_) {
    LawRegion = _LawRegion_;
  }));

  it('should do something', function () {
    expect(!!LawRegion).toBe(true);
  });

});
