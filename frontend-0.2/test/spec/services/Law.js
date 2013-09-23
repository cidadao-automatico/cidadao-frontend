'use strict';

describe('Service: Law', function () {

  // // load the service's module
    beforeEach(module('vigiaPoliticoApp'));

  // // instantiate service
   var Law;
   beforeEach(inject(function (_Law_) {
     Law = _Law_;
   }));

   it('should do something', function () {
     expect(!!Law).toBe(true);
   });

});
