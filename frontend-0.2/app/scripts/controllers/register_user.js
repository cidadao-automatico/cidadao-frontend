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
  .controller('RegisterUserCtrl', function ($scope, UserAuthorization,flash, LawRegion, User, Tag, Congressman, Law, Vote) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	
	$scope.teste_interface = false;
    
	if($scope.teste_interface == false){
    $scope.user = UserAuthorization.get(function(userResult){
      if (!userResult.configured)
      {
        User.updateConfigured()
        window.location="#/step1"
      }
    }, function(error){
      flash("alert","Por favor faça login ou cadastre-se clicando no botão Facebook")
      window.location="#/"
    })
	}
	

    $scope.step1 = function(){

      if(!_.isNull($scope.user) && !_.isUndefined($scope.user))
      {
        $scope.allRegions = LawRegion.query(function(allRegionsResult){ // aqui pego o array  e crio um fake
          $scope.userRegions = User.regions(function(userRegionResult){
            var mappedIds=_.map(userRegionResult, function(value) { return value["id"] })
            //FIXME: This should be done at the server, perhaps with a more clever algorithm that takes advantage of id
            _.each($scope.allRegions, function(region){
              if (_.contains(mappedIds,region["id"]))
              {
                region["enabled"]=true
              }
              else
              {
                region["enabled"]=false
              }
            })
          })  
        })
      }
    }
	

  

    $scope.step2 = function() {
      if(!_.isNull($scope.user) && !_.isUndefined($scope.user))
      {
        $scope.allTags = Tag.query(function(allTagsResult){
          console.log(allTagsResult)
          $scope.userTags = User.tags(function(userTagResult){
            var mappedIds=_.map(userTagResult, function(value) { return value["id"] })
            // FIXME: This should be done at the server, perhaps with a more clever algorithm that takes advantage of id
            _.each($scope.allTags, function(tag){
              if (_.contains(mappedIds,tag["id"]))
              {
                tag["enabled"]=true
              }
              else
              {
                tag["enabled"]=false
              }
            })
          })  
        })
      }
	   
	  }

    $scope.step3 = function(){
     if(!_.isNull($scope.user) && !_.isUndefined($scope.user))
      {
        $scope.allCongressman = Congressman.query(function(allCongressmanResult){
          console.log(allCongressmanResult)
          $scope.userRepresentatives = User.representatives(function(userRepresentativesResult){
            var mappedIds=_.map(userRepresentativesResult, function(value) { return value["user"]["id"] })
            // FIXME: This should be done at the server, perhaps with a more clever algorithm that takes advantage of id
            _.each($scope.allCongressman, function(congressman){
              if (_.contains(mappedIds,congressman["user"]["id"]))
              {
                congressman["enabled"]=true
              }
              else
              {
                congressman["enabled"]=false
              }
            })
          })  
        })
      }
    }
  

	



    $scope.step4 = function(){
      
      if(!_.isNull($scope.user) && !_.isUndefined($scope.user))
      {
        $scope.laws = Law.laws_for_vote()
      } 
    }

    //#FIXME: Seria legal utilizar Angular ngshow e nghide
    $scope.showExtendedLaw = function(lawId)
    {
      var normal=$("#law_container_"+lawId+"_normal")
      var extended=$("#law_container_"+lawId+"_extended")
      normal.hide("slow")
      extended.show("slow")
    }

    $scope.hideExtendedLaw = function(lawId)
    {
      var normal=$("#law_container_"+lawId+"_normal")
      var extended=$("#law_container_"+lawId+"_extended")
      normal.show("slow")
      extended.hide("slow")
    }

    $scope.vote = function(rate, law)
    {
      var extended=$("#law_container_"+law.stdCode+"_proposals")
      console.log(extended)
      extended.hide("slow")
      Vote.save({id: law.id, rate: rate})

    }

    $scope.saveRegions  = function(allRegions)
    {
      User.saveRegions({regions: $scope.allRegions})
    }

    $scope.saveTags  = function(allTags)
    {
      User.saveTags({tags: $scope.allTags})
    }

    $scope.saveCongressman = function(allCongressman)
    {
      User.saveRepresentatives({congressmanList: allCongressman})
    }

    $scope.register_with_facebook = function($scope)
    {
      window.location="#/user_home"
    };

    $scope.register_with_twitter = function($scope)
    {
      window.location="#/user_home"
    };
if($scope.teste_interface){
		  $scope.allRegions = [{"description":"São Paulo", "enabled":"true"}, {"description":"Rio de Janeiro"}, {"description":"Brasil"}];
		  
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
	   
		 
		
		 
		 
		 $scope.lawIndex=[{}];
}

  });
