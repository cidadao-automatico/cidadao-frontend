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
  .controller('LawsDashboardCtrl', function ($scope, User, UserAuthorization) {
  
    $scope.page = 1;
	$scope.teste_interface = true;
    
	if($scope.teste_interface == false){
  	$scope.user = UserAuthorization.get(function(result){
  		$scope.laws=User.recommended_laws({page: $scope.page});
		  $scope.representatives = User.representatives()
  		  console.log($scope.laws)
  	})
	}
	

    //#FIXME: Seria legal utilizar Angular ngshow e nghide
	
    $scope.showExtendedLaw = function(lawId)
    {
      var normal=$("#law_container_"+lawId+"_normal")
      var extended=$("#law_container_"+lawId+"_extended")
      normal.slideToggle("slow");
      extended.slideToggle("slow");
	  var hide_titles=$("#lawTitles_"+lawId);
	  hide_titles.hide();
	  var show_titles=$("#lawTitlesExt_"+lawId);
	  show_titles.show();
    }

    $scope.hideExtendedLaw = function(lawId)
    {
      var normal=$("#law_container_"+lawId+"_normal")
      var extended=$("#law_container_"+lawId+"_extended")
      normal.slideToggle("slow");
	  normal.show();
      extended.slideToggle("slow");
	  var hide_titles=$("#lawTitles_"+lawId);
	  hide_titles.show();
	  var show_titles=$("#lawTitlesExt_"+lawId);
	  show_titles.hide();
    }

    $scope.vote = function(rate, law)
    {
	console.log (law);

	 var btn =$("#btn_"+rate+"_"+law.stdCode);
	 
	 console.log ("#btn_"+rate+"_"+law.stdCode);
	switch(rate){
	  case "0":
	  
	  btn.toggleClass("voteBtn_contra");
	  
	   break;
	  case "1":
	   btn.toggleClass("voteBtn_parcontra");
	  break;
		case "2":
	   btn.toggleClass("voteBtn_abstencao");
		
	  break;
	  case "3":
	    btn.toggleClass("voteBtn_parfavor");
		
	  break;
	  case "4":
	    btn.toggleClass("voteBtn_afavor");
	 break;
	  }
    }
	
	$scope.hide_law_text = function(law_stdCode){
	
	var hide_element=$(".hd"+law_stdCode)
	var show_actions=$("#user_actions_"+law_stdCode);
    hide_element.slideUp(10);
	   
	  show_actions.slideUp(10);
	   var show_titles=$("#lawTitles_"+law_stdCode);
	  show_titles.hide();
	 }
	  
	 $scope.show_law_text = function(law_stdCode){
		
	var hide_element=$(".hd"+law_stdCode)
     // hide_element.show("fast")
	  hide_element.slideDown("slow");
	  var show_actions=$("#user_actions_"+law_stdCode);
	  show_actions.slideDown();
	  var hide_titles=$("#lawTitles_"+law_stdCode);
	  hide_titles.slideDown();
	  }
	  
	  
	 $scope.hide_allText = function(){
	var hide_element=$(".hideable")
      hide_element.hide() 
	  $('#example').tooltip();
	  $("[data-toggle=popover]").popover({
    html: true, 
	content: function() {
          return $('#popover-content').html();
        }
      });
	  
	  }
	  
	  $scope.show_firstHeader = function() {
	var hide_element=$(".hd"+law_stdCode)
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
	   
	   $scope.laws=[{"description":"Acrescenta parágrafos ao art. 17 da Constituição, para definir o caráter nacional como condição para o registro dos partidos políticos no Tribunal Superior Eleitoral.", "typeId":"319", "url":"http://www.camara.gov.br/proposicoesWeb/prop_mostrarintegra?codteor=533062&filename=PEC+210/2007", "typePrefix":"PEC", "stdCode":"1111", "year":"2013"}, {"description":"Acrescenta parágrafos ao art. 17 da Constituição, para definir o caráter nacional como condição para o registro dos partidos políticos no Tribunal Superior Eleitoral.", "typeId":"319", "typePrefix":"PEC", "stdCode":"1311", "year":"2013"}]; 
	   

	  
	   }
  });
  

