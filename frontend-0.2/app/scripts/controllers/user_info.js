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
  .controller('UserInfoCtrl', function ($scope, flash, UserAuthorization, User) {
    
	// - DESCOMENTAR ACIMA
    $scope.user = UserAuthorization.get(function(result){
    	if (!result.configured)
        {
        	User.updateConfigured()        	
        	window.location="#/step1"
      	}else
      	{
      		$scope.regions = User.regions()
        	$scope.representatives = User.representatives()
        	$scope.votes = User.votes()
        	$scope.tags=User.tags()
      	}
    }, function(error){
      flash("alert","Por favor faça login ou cadastre-se clicando no botão Facebook")
      window.location="#/"
    })
    
	
	 $scope.show_configBoxButton = function(botao)
    {
	console.log(botao);
     var botao_select = $("#configBoxbtn_"+ botao)
	 console.log('teste');
	 
     botao_select.show();
	}
	
		 $scope.hide_configBoxButton = function(botao)
    {
	console.log(botao);
     var botao_select = $("#configBoxbtn_"+ botao)
	 console.log('teste');
	 
     botao_select.hide();
	}
	
	// - COMENTAR AQUI NA HORA QUE FOR DAR PUSH
	// $scope.regions = [{"description":"São Paulo", "enabled":"true"}, {"description":"Rio de Janeiro"}]
    // ---- 
});
