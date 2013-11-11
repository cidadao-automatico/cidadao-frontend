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
	  .controller('UserInfoCtrl',['$scope','$rootScope','flash','UserAuthorization','User','LawRegion', 'Tag','Congressman','Law','Vote',
	   function ($scope, $rootScope, flash, UserAuthorization, User, LawRegion, Tag, Congressman, Law, Vote) {
	    
	  	$scope.configPageChanged=[false,false,false]

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
	    
		$scope.regionsChanged = function(){
			$scope.configPageChanged[0]=true
		}

		$scope.tagsChanged = function(){
			$scope.configPageChanged[1]=true
		}

		$scope.repsChanged = function(){
			$scope.configPageChanged[2]=true
		}

		$scope.plusConfigBox_visible = false;
		
		$scope.show_config_plusBox = function(pageType)
		{
				
			if (pageType=="Places")
			{
				step1()
			} else if (pageType=="Tags")
			{
				step2()
			} else if (pageType=="Representatives")
			{
				step3()
			} else if (pageType=="Laws")
			{
				step4()
			}

			var show_box=$("#configBox_plus");
			var box_selected=$("#configBox_plus_"+pageType);
			
			if ($scope.plusConfigBox_visible==false){
				show_box.show();
			}

			show_box.children().hide()
			box_selected.show();
			$("#configBox_plus_fecharBtn").show();
			$scope.plusConfigBox_visible = true;
		}
		
		$scope.hide_config_plusBox = function(){
			console.log($scope.configPageChanged)
			if ($scope.configPageChanged[0])
			{
				saveRegions()
			}
			if ($scope.configPageChanged[1])
			{
				saveTags()
			}
			if ($scope.configPageChanged[2])
			{
				saveCongressman()
			}
			// var anyPageChanged=_.filter($scope.configPageChanged, function(configPage){
	  //   		return configPage==true
	  //   	})
	  //   	$scope.configPageChanged=[false,false,false]
	  //   	if (anyPageChanged.length>0)
	  //   	{
	  //   		$rootScope.$emit('fetchMoreRecommendedLaws')
	  //   	}
	    	// console.log(anyPageChanged.length)
			$scope.plusConfigBox_visible = false;
			$("#configBox_plus").children().hide();
			$("#configBox_plus").hide();
			$("#configBox_plus_fecharBtn").hide();
		}
		
		$scope.show_configBoxButton = function(botao)
	    {
			// console.log(botao);
	     	var botao_select = $("#configBoxbtn_"+ botao)
		 	botao_select.show();
		}
		
		$scope.hide_configBoxButton = function(botao)
	    {
			// console.log(botao);
	     	var botao_select = $("#configBoxbtn_"+ botao)
		 	botao_select.hide();
		}
		
		$scope.vote = function(rate, law)
	    {
	      	var extended=$("#law_container_"+law.stdCode+"_proposals")
	      	extended.hide("slow")
	      	Vote.save({id: law.id, rate: rate})

	    }

	    function saveRegions()
	    {

	      User.saveRegions({regions: $scope.allRegions}, function(result){
	      	$scope.regions = User.regions()
	      	$rootScope.$broadcast('reloadRecommendedLaws')
	      })
	    }

	    function saveTags()
	    {
	      User.saveTags({tags: $scope.allTags}, function(result){
	      	$scope.tags=User.tags()
	      	$rootScope.$broadcast('reloadRecommendedLaws')
	      })
	    }

	    function saveCongressman()
	    {
	    	var selectedCongressman=_.filter($scope.allCongressman, function(congressman){
	    		return congressman.enabled==true
	    	})
	    
	      User.saveRepresentatives({congressmanList: selectedCongressman}, function(result){
	      	$scope.representatives = User.representatives()
	      	$rootScope.$broadcast('reloadRecommendedLaws')
	      })

	    }

		
		function step1(){
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
	

  

    function step2() {
      if(!_.isNull($scope.user) && !_.isUndefined($scope.user))
      {
        $scope.allTags = Tag.query(function(allTagsResult){
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

    function step3(){
     if(!_.isNull($scope.user) && !_.isUndefined($scope.user))
      {
        $scope.allCongressman = Congressman.query(function(allCongressmanResult){
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
  

	
	// $scope.show_config_plusBox = function(type){
	// var show_box=$("#configBox_plus");
	// var box_selected=$("#configBox_plus_"+type);
	
	// if ($scope.plusConfigBox_visible==false){
	// show_box.show();
	// }
	// show_box.children().hide()
	// box_selected.show();
	// $("#configBox_plus_fecharBtn").show();
	// $scope.plusConfigBox_visible = true;
	// }
	
	// $scope.hide_config_plusBox = function(){
	// $scope.plusConfigBox_visible = false;
	// $("#configBox_plus").children().hide();
	// $("#configBox_plus").hide();
	// $("#configBox_plus_fecharBtn").hide();
	// }
	
	// $scope.show_configBoxButton = function(botao)
 //    {
	
 //     var botao_select = $("#configBoxbtn_"+ botao)
	//  botao_select.show();
	// }
	
	// $scope.hide_configBoxButton = function(botao)
 //    {
	
 //     var botao_select = $("#configBoxbtn_"+ botao)
	//  botao_select.hide();
	// }
	
	// $scope.vote = function(rate, law)
 //    {
 //      var extended=$("#law_container_"+law.stdCode+"_proposals")
 //           extended.hide("slow")
 //      Vote.save({id: law.id, rate: rate})

 //  }

    function step4(){
      
      if(!_.isNull($scope.user) && !_.isUndefined($scope.user))
      {
	  $scope.laws=[]
        $scope.laws = Law.laws_for_vote()
      } 
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
	}]);
