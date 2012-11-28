'use strict';

var cidadoAutomaticoApp = angular.module('cidadoAutomaticoApp', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/enviar_mensagem/:leiId', {
        templateUrl: 'views/enviar_mensagem.html',
        controller: 'EnviarMensagemCtrl'
      })
      .when('/selecionar_convidar', {
        templateUrl: 'views/selecionar_convidar.html',
        controller: 'SelecionarConvidarCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

cidadoAutomaticoApp.filter('levelString',
						   function() {
							   return function(level) {
								   switch(level) {
								   case 1: return "contra";
								   case 2: return "parcialmente contra";
								   case 3: return "abstren&ccedil;&atilde;o";
								   case 4: return "parcialmente a favor";
								   case 5: return "a favor";
								   }
								   return "";
							   };
						   });
cidadoAutomaticoApp.filter('levelClass',
						   function() {
							   return function(level) {
								   switch(level) {
								   case 1: return "opposite";
								   case 2: return "halfOpposite";
								   case 3: return "abstention";
								   case 4: return "halfFavorable";
								   case 5: return "favorable";
								   }
								   return "";
							   };
						   }
);

cidadoAutomaticoApp.filter('capitalize',
						   function() {
							   return function(string) {
								   if(string != undefined)
									   return string.charAt(0).toUpperCase() + string.slice(1);
								   return "";
							   };
						   });
cidadoAutomaticoApp.filter('deputyLogo', function() {
	return function(deputado) {
		if(deputado != null) {
			var names = deputado.name.split(' ');
			var name = encodeURI(names[0].toLowerCase() + names[names.length-1].toLowerCase());
			return "http://www.camara.gov.br/internet/deputado/bandep/"+name+".jpg";
		}
		return "./img/icon-member.jpg";
	};
});
