// Copyright 2012/2013 de Gustavo Steinberg, Flavio Soares, Pierre Andrews, Gustavo Salazar Torres, Thomaz Abramo
//
// Este arquivo é parte do programa Vigia Político. O projeto Vigia
// Político é um software livre; você pode redistribuí-lo e/ou
// modificá-lo dentro dos termos da GNU Affero General Public License
// como publicada pela Fundação do Software Livre (FSF); na versão 3 da
// Licença. Este programa é distribuído na esperança que possa ser útil,
// mas SEM NENHUMA GARANTIA; sem uma garantia implícita de ADEQUAÇÃO a
// qualquer MERCADO ou APLICAÇÃO EM PARTICULAR. Veja a licença para
// maiores detalhes. Você deve ter recebido uma cópia da GNU Affero
// General Public License, sob o título "LICENCA.txt", junto com este
// programa, se não, acesse http://www.gnu.org/licenses/


'use strict';

// to use Angular 1.2, add 'ngRoute' to angular.module array

angular.module('vigiaPoliticoApp', ['ngResource','truncate','flash'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/user_auth.html',
        controller: 'AuthorizationCtrl'
      })
      // .when('/', {
      //   templateUrl: 'views/user_home.html',
      //   controller: 'UserInfoCtrl'
      // })
      //TODO: Is there any way to match a regex on url?
      .when('/register', {
        templateUrl: 'views/step1.html',
        controller: 'RegisterUserCtrl'
      })
      .when('/step1', {
        templateUrl: 'views/step1.html',
        controller: 'RegisterUserCtrl'
      })
      .when('/step2', {
        templateUrl: 'views/step2.html',
        controller: 'RegisterUserCtrl'
      })
      .when('/step3', {
        templateUrl: 'views/step3.html',
        controller: 'RegisterUserCtrl'
      })
      .when('/step4', {
        templateUrl: 'views/step4.html',
        controller: 'RegisterUserCtrl'
      })
	  .when('/step5', {
        templateUrl: 'views/step5.html',
        controller: 'RegisterUserCtrl'
      })
      .when('/user_home', {
        templateUrl: 'views/user_home.html',
        controller: 'UserInfoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
