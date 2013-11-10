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
  .controller('LawsDashboardCtrl',['$scope','$rootScope','User','UserAuthorization', 
  	function ($scope, $rootScope, User, UserAuthorization) {
  
  
    $scope.page = 1;
	$scope.teste_interface = false;
    
	if($scope.teste_interface == false){
  	$scope.user = UserAuthorization.get(function(result){
  		$scope.laws=User.recommended_laws({page: $scope.page}, function(result){
  			console.log(result)			
  			$scope.representatives = User.representatives()
  		  	
  		});
		  
  	})
	}

	$scope.$on('reloadRecommendedLaws', function(eventObj, args){
		$scope.laws=[]
		$scope.laws=User.recommended_laws({page: $scope.page})
		// eventObj.stopPropagation()
	})
	
	$scope.$on('colorizeVariable', function(eventObj, args){
		internal_color_extBtn(law);
		internal_color_btn(law);
	})
	
	
	
	//FIXME: Gambearra total, use filters!
	$scope.mapRateToClass = function(rate){
		if (rate==1)
			return "contra"
		else if(rate==2)
			return "parcontra"
		else if (rate==3)
			return "abstencao"
		else if (rate==4)
			return "parfavor"
		else if (rate==5)
			return "afavor"
	}	

	$scope.mapRateToText = function(rate){
		if (rate==1)
			return "contra"
		else if(rate==2)
			return "parc. contra"
		else if (rate==3)
			return "abstenção"
		else if (rate==4)
			return "parc. favor"
		else if (rate==5)
			return "a favor"
	}	

	$scope.loadMoreLaws = function (){
		$scope.page=$scope.page+1
		User.recommended_laws({page: $scope.page}, function(result){
			$scope.laws=$scope.laws.concat(result)
		})
	}

    //#FIXME: Seria legal utilizar Angular ngshow e nghide
	
    $scope.showExtendedLaw = function(lawId)
    {
	console.log(lawId);
      var normal=$("#law_container_"+lawId+"_normal");
      var extended=$("#law_container_"+lawId+"_extended");
      normal.slideToggle("slow");
      extended.slideToggle("slow");
	  var hide_titles=$("#lawTitles_"+lawId);
	  hide_titles.hide();
	  var show_titles=$("#lawTitlesExt_"+lawId);
	  show_titles.show();
    }

    $scope.hideExtendedLaw = function(lawId)
    {
      var normal=$("#law_container_"+lawId+"_normal");
      var extended=$("#law_container_"+lawId+"_extended");
      normal.slideToggle("slow");
	  normal.show();
      extended.slideToggle("slow");
	  //var hide_titles=$("#lawTitles_"+lawId);
	 // hide_titles.show();
	 var show_titles=$("#lawTitlesExt_"+lawId);
	 if (show_titles.is(":visible") ){
	    show_titles.hide();
     }
	 }

	 
	 
    $scope.vote = function(rate, law)
    {
    Vote.save({id:law.lawProposal.id, rate: law.vote.rate}, function(result){
    $rootScope.$broadcast('colorizeVariable',law) 
	})
    }
	
	
	
	$scope.hide_law_text = function(law_stdCode){
	 console.log("aqui");
		var hide_element=$(".hd"+law_stdCode)
		var show_actions=$("#user_actions_"+law_stdCode);
		var hide_titles=$("#lawTitles_"+law_stdCode);
		
		if (hide_element.is(":visible") ){
			hide_element.slideUp();
		}
		if (show_actions.is(":visible") ){
			show_actions.slideUp();
		}
		if (hide_titles.is(":visible") ){
			hide_titles.hide();
		}
	}
	  
	 $scope.show_law_text = function(law_stdCode){
		
	 // hide_element.show("fast")
	 var hide_element=$(".hd"+law_stdCode)
	 var show_actions=$("#user_actions_"+law_stdCode);
	 var hide_titles=$("#lawTitles_"+law_stdCode);
	 if (hide_element.is(":hidden") ){
	 hide_element.slideDown();
	 }
	 if (show_actions.is(":hidden") ){
	 show_actions.slideDown();
	 }
	 if (hide_titles.is(":hidden") ){
	 hide_titles.show();

	}
	}
	  
	  
	 $scope.hide_allText = function(){
	
	 	var hide_element=$(".hideable")
	 	hide_element.hide() 
	 }
	  
	  	  
	  $scope.show_firstHeader = function() {
	//var hide_element=$(".hd"+law_stdCode)
	  }
	  
	   $scope.show_ExtLaw_things = function(law_stdCode){
	  var show_actions=$("#lawTitlesExt_"+law_stdCode);
	  show_actions.show();
	  var show_titles=$("#lawTitles_"+law_stdCode);
	  show_titles.hide();
	  }
	  
	  $scope.hide_ExtLaw_things = function(law_stdCode){
	  var show_actions=$("#lawTitlesExt_"+law_stdCode);
	  show_actions.hide();
	  }
	  
	  
	 $scope.show_congressmanBox = function(lawId,position){
	 
	   var show_box=$("#congressmanOpinionBox_"+lawId);
	   show_box.css({ "display": 'inline-block'});
	  $("#law_container_"+(lawId)+"_extended" ).css( "height", "360px" );
	   show_box.slideDown();
	  console.log(position);

	  switch(position){
	  case "0":
	  $scope.congressmanByLaw_opinion = $scope.CongressmanContra;
	  show_box.css({ "border-color": '#CC4141'});
	  break;
	  case "1":
	    $scope.congressmanByLaw_opinion = $scope.CongressmanParContra;
		show_box.css({ "border-color": '#F4777C'});
	  break;
		case "2":
	    $scope.congressmanByLaw_opinion = $scope.CongressmanAbstenção; 
		show_box.css({ "border-color": '#C8C8C8'});
	  break;
	  case "3":
	    $scope.congressmanByLaw_opinion = $scope.CongressmanParFavor;
		show_box.css({ "border-color": '#E5FF75'});
	  break;
	  case "4":
	    $scope.congressmanByLaw_opinion = $scope.CongressmanFavor;
		show_box.css({ "border-color": '#B1CC41'});
	  break;
	  }
	}
	
	$scope.color_btn = function(law){
	internal_color_btn(law);
	}
	
	
	function internal_color_btn (law){
	var btn = $("#rateBtn_compact_"+law.lawProposal.stdCode);
	var pRate = law.vote.predictedRate;
	var rate = law.vote.predictedRate;
	console.log(law.vote.rate.lenght);
	if (law.vote.rate){
	$("#qMark_userOpinionBtn_"+law.lawProposal.stdCode).hide();
		if (rate==1){
			
			btn.addClass( "voteBtn_contra" );}
		else if(rate==2){
			
			btn.addClass( "voteBtn_parcontra" );}
		else if (rate==3){
		btn.addClass( "voteBtn_abstencao" );
			}
		else if (rate==4){
			
			btn.addClass( "voteBtn_parfavor" );}
		else if (rate==5){
			
			btn.addClass( "voteBtn_afavor" );}
	}
	else{
	if (pRate==1){
		btn.addClass( "voteBtn_contra_pr" );}
		else if(pRate==2){
			
			btn.addClass( "voteBtn_parcontra_pr" );}
		else if (pRate==3){
		btn.addClass( "voteBtn_abstencao_pr" );
			}
		else if (pRate==4){
			
			btn.addClass( "voteBtn_parfavor_pr" );}
		else if (pRate==5){
			
			btn.addClass( "voteBtn_afavor_pr" );}
	}	
	}
	
$scope.colorClassName = function(rate){
		if (rate==1)
			return "contra"
		else if(rate==2)
			return "parcontra"
		else if (rate==3)
			return "abstencao"
		else if (rate==4)
			return "parfavor"
		else if (rate==5)
			return "afavor"
	}
	
	$scope.color_extBtn = function(law){
   internal_color_extBtn(law);
}
	
	function internal_color_extBtn(law){
	 var rate = law.vote.rate;
	 for(var i=0;i<5;i++){
	 var btn = $("#btn_"+i+("_")+law.lawProposal.stdCode);
	 btn.removeClass( "voteBtn_contra" )
	  btn.removeClass( "voteBtn_parcontra" )
	   btn.removeClass( "voteBtn_abstencao" )
	    btn.removeClass( "voteBtn_parfavor" )
		 btn.removeClass( "voteBtn_afavor" );}
	 
	if (law.vote.rate){
		if (rate==1){
		var btn = $("#btn_"+(rate-1)+("_")+law.lawProposal.stdCode);
		btn.addClass( "voteBtn_contra" );}
		else if(rate==2){
		var btn = $("#btn_"+(rate-1)+("_")+law.lawProposal.stdCode);
		btn.addClass( "voteBtn_parcontra" );}
		else if (rate==3){
		var btn = $("#btn_"+(rate-1)+("_")+law.lawProposal.stdCode);
		btn.addClass( "voteBtn_abstencao" );}
		else if (rate==4){
		var btn = $("#btn_"+(rate-1)+("_")+law.lawProposal.stdCode);
		btn.addClass( "voteBtn_parfavor" );}
		else if (rate==5){
		var btn = $("#btn_"+(rate-1)+("_")+law.lawProposal.stdCode);
		btn.addClass( "voteBtn_afavor" );}
	}
	}
	  
	 $scope.hide_congressmanBox = function(lawId){
	  var show_box=$("#congressmanOpinionBox_"+lawId);
	   show_box.css({ "display": 'inline-block'});
	 $( "#law_container_"+(lawId)+"_extended" ).css( "height", "230px" );
	   show_box.hide();
	   }
	   

	   
	   // dados fakes
	   if($scope.teste_interface)
	   {
	   
	   $scope.CongressmanContra=[{"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Roberto", "lastName" : "João Pereira Freire"}}, {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Roberto", "lastName" : "João Pereira Freire"}}, {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Roberto", "lastName" : "João Pereira Freire"}}, {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Roberto", "lastName" : "João Pereira Freire"}}]
	   
	   $scope.representatives = $scope.CongressmanContra;
	   
	   $scope.CongressmanParContra=[{"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Antonio ", "lastName" : "Da Conceição Costa Ferreira"}},{"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}},{"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}}]
	   
	   $scope.CongressmanAbstenção=[{"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/73434.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Roberto", "lastName" : "João Pereira Freire"}},{"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}},{"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}}]
	   
	   $scope.CongressmanParFavor=[
	   {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Mauro Ribeiro Lopes", "lastName" : ""}},
	   {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}},
	   {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}},
	   {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}},
	   {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}},
	   {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}},
	   {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}},
	   {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}},
	   {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}},
	   {"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}}
	   ]
	   $scope.CongressmanFavor=[{"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Marcelo", "lastName" : "João Pereira Freire"}},{"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Fulano", "lastName" : "da Silva"}},{"congressmanInfo":{"photoUrl":"http://www.camara.gov.br/internet/deputado/bandep/172711.jpg","shortName":"asdasdasd"}, "user":{"id":"1","firstName": "Maria", "lastName" : "da Silva"}}]
	   
	   $scope.laws=[{lawProposal: { description: "Regulamenta o art. 146-A da Constituição Federal, estabelecendo critérios especiais de tributação destinados a prevenir desequilíbrios da concorrência.", id: '30251', prefix: 'PLP', priorityStatus: 'Votação a médio prazo',regionId: 1, stdCode: "121", url: "http://www.camara.gov.br/proposicoesWeb/prop_mostrarintegra?codteor=952353", year: 2011}, representatives:[{congressmanInfo: {congressId: 522008,email: "",homePageUrl: "",partyId: 27,phoneNumber: "3215-5648",photoUrl: "http://www.camara.gov.br/internet/deputado/bandep/74319.jpg",shortName: "Paes Landim ",userId: 1381}, vote:{predictedRate:2, rate:"" }}],vote:{predictedRate:1, rate:""}},
	   
	   {lawProposal: { description: "Regulamenta o art. 146-A da Constituição Federal, estabelecendo critérios especiais de tributação destinados a prevenir desequilíbrios da concorrência.", id: '30251', prefix: 'PLP', priorityStatus: 'Votação a médio prazo',regionId: 1, stdCode: "1321", url: "http://www.camara.gov.br/proposicoesWeb/prop_mostrarintegra?codteor=952353", year: 2011}, representatives:[{congressmanInfo: {congressId: 522008,email: "",homePageUrl: "",partyId: 27,phoneNumber: "3215-5648",photoUrl: "http://www.camara.gov.br/internet/deputado/bandep/74319.jpg",shortName: "Paes Landim ",userId: 1381}, vote:{predictedRate:2, rate:"" }}],vote:{predictedRate:5, rate:"5"}}]; 
	   

	  
	   }
  }]);
  

