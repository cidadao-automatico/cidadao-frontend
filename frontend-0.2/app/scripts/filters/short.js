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

angular.module('vigiaPoliticoApp')
.filter('short', function () {
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
