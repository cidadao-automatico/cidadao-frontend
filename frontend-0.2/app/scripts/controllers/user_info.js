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
    
	$scope.teste_interface = false;
	
	if($scope.teste_interface == false){
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
	}
    
	$scope.plusConfigBox_visible = false;
	
	$scope.show_config_plusBox = function(type){
	var show_box=$("#configBox_plus");
	var box_selected=$("#configBox_plus_"+type);
	
	if ($scope.plusConfigBox_visible==false){
	show_box.show();
	}
	show_box.children().hide()
	box_selected.show();
	$("#configBox_plus_fecharBtn").show();
	$scope.plusConfigBox_visible = true;
	}
	
	$scope.hide_config_plusBox = function(){
	$scope.plusConfigBox_visible = false;
	$("#configBox_plus").children().hide();
	$("#configBox_plus").hide();
	$("#configBox_plus_fecharBtn").hide();
	}
	
	$scope.show_configBoxButton = function(botao)
    {
	
     var botao_select = $("#configBoxbtn_"+ botao)
	 botao_select.show();
	}
	
	$scope.hide_configBoxButton = function(botao)
    {
	
     var botao_select = $("#configBoxbtn_"+ botao)
	 botao_select.hide();
	}
	
	$scope.vote = function(rate, law)
    {
      var extended=$("#law_container_"+law.stdCode+"_proposals")
           extended.hide("slow")
      Vote.save({id: law.id, rate: rate})

    }
	
	
	
	if($scope.teste_interface){
	
	$scope.regions = [{"description":"São Paulo", "enabled":"true"}, {"description":"Rio de Janeiro"}];
	
	$scope.tags = [{"name":"Saude"}, {"name":"Educação"}, {"name":"Árvores"}, {"name":"Meio Ambiente"}]; 
	
	
	$scope.representatives=[
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Roberto", "lastName" : "João Pereira Freire"}},
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/74016.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Antonio", "lastName" : "Da Conceição Costa Ferreira "}},
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}},
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}},
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}},
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}}];
	
////////////////////////// PUXADOS 
	
	$scope.allRegions = [{"description":"Brasil"}, {"description":"São Paulo"}, {"description":"Rio de Janeiro"}]
		  
	  $scope.allCongressman=[
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Roberto", "lastName" : "João Pereira Freire"}},
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/74016.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Antonio", "lastName" : "Da Conceição Costa Ferreira "}},
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}},
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}},
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}},
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}}, 
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Roberto", "lastName" : "João Pereira Freire"}}, 
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Roberto", "lastName" : "João Pereira Freire"}},
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/73474.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Luci", "lastName" : "Teresinha Koswoski Choinacki"}},
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Roberto", "lastName" : "João Pereira Freire"}},
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Roberto", "lastName" : "João Pereira Freire"}},
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Roberto", "lastName" : "João Pereira Freire"}}, 
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Roberto", "lastName" : "João Pereira Freire"}}, 
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Roberto", "lastName" : "João Pereira Freire"}}, 
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Roberto", "lastName" : "João Pereira Freire"}},
	  {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/73474.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Luci", "lastName" : "Teresinha Koswoski Choinacki"}}
	  ]
	  ;
	  $scope.allTags = [{"name":"Saude"}, {"name":"Educação"}, {"name":"Árvores"}, {"name":"Meio Ambiente"}]; 
	  
	  $scope.laws=[{"description":"Acrescenta parágrafos ao art. 17 da Constituição, para definir o caráter nacional como condição para o registro dos partidos políticos no Tribunal Superior Eleitoral.", "typeId":"319", "url":"http://www.camara.gov.br/proposicoesWeb/prop_mostrarintegra?codteor=533062&filename=PEC+210/2007", "typePrefix":"PEC", "stdCode":"1111", "year":"2013"}, {"description":"Acrescenta parágrafos ao art. 17 da Constituição, para definir o caráter nacional como condição para o registro dos partidos políticos no Tribunal Superior Eleitoral.", "typeId":"319", "typePrefix":"PEC", "stdCode":"1311", "year":"2013"}];
				  
	}
});
