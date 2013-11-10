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

angular.module('vigiaPoliticoApp').
  factory('User', ['$resource',function ($resource) {
    // Service logic
    // ...
    

    // Public API here
    return $resource('user/:suffix', {}, {
        query: {responseType: 'json'},
        recommended_laws: {method: 'GET', params: { suffix: 'recommend_laws'}, isArray: true, responseType: 'json'},
        randow_laws: {method: 'GET', params: { suffix: 'randow_laws'}, isArray: true, responseType: 'json'},
        regions: {method: 'GET', params: { suffix: 'regions'}, isArray: true, responseType: 'json'},
        saveRegions: {method: 'POST', params: { suffix: 'regions'}, isArray: true, responseType: 'json'},
        saveTags: {method: 'POST', params: { suffix: 'tags'}, isArray: true, responseType: 'json'},
        saveRepresentatives: {method: 'POST', params: { suffix: 'representatives'}, isArray: true, responseType: 'json'},
        tags: {method: 'GET', params: { suffix: 'tags'}, isArray: true, responseType: 'json'},
        representatives: {method: 'GET', params: { suffix: 'representatives'}, isArray: true, responseType: 'json'},
        updateConfigured: {method: 'POST', params: { suffix: 'configured'}, isArray: true, responseType: 'json'},
        votes: {method: 'GET', params: { suffix: 'votes'}, isArray: true, responseType: 'json'}
      });
  }]);
