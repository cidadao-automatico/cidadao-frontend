'use strict';

var cidadoAutomaticoApp = angular.module('cidadoAutomaticoApp', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/pl/:leiId/enviar_mensagem', {
        templateUrl: 'views/enviar_mensagem.html',
        controller: 'EnviarMensagemCtrl'
      })
      .when('/selecionar_convidar', {
        templateUrl: 'views/selecionar_convidar.html',
        controller: 'SelecionarConvidarCtrl'
      })
      .when('/pl/:leiId', {
        templateUrl: 'views/showPL.html',
        controller: 'ShowPLCtrl'
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
								   case 3: return "abstenção";
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


cidadoAutomaticoApp.filter('status', function() {
	return function(status) {
		switch(status) {
				case 1: return "votado";
				case 0: return "em vota&ccedil;&atilde;o";
			}
			return "unknown"; //TODO
	};
});

cidadoAutomaticoApp.filter('voteStatusClass', function() {
	return function(lei) {
		if(lei.yourvote > 0) {
			return "rated";
		} else if(lei.yourvote < 0) {
			return "estimated";
		}
		return "";
	};
});

cidadoAutomaticoApp.filter('short',
						   function() {
							   return function(txt, max) {
								   if(!max) {max = 200;}
								   if(txt && txt.length > max) {
									   var wrds = txt.split(' ');
									   if(wrds.length > 0) {
										   var str = wrds[0];
										   var i = 1;
										   while(str.length < max && i < wrds.length) {
											   str += ' '+wrds[i++];
										   }
										   return str+"&hellip;";
									   }
								   }
								   return txt;
							   };
});

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
		/*if(deputado != null) {
			var names = deputado.nome.split(' ');
			var name = encodeURI(names[0].toLowerCase() + names[names.length-1].toLowerCase());
			return "http://www.camara.gov.br/internet/deputado/bandep/"+name+".jpg";
		}*/
		return "./img/icon-member.jpg";
	};
});
