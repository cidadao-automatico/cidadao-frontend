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
