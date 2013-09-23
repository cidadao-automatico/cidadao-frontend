'use strict';

angular.module('vigiaPoliticoApp')
  .filter('deputyLogo', function () {
    return function(deputado) {
		/*if(deputado != null) {
			var names = deputado.nome.split(' ');
			var name = encodeURI(names[0].toLowerCase() + names[names.length-1].toLowerCase());
			return "http://www.camara.gov.br/internet/deputado/bandep/"+name+".jpg";
		}*/
		return "./img/icon-member.jpg";
	};
  });
