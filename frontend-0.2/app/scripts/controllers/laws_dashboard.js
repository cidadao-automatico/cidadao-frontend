'use strict';

angular.module('vigiaPoliticoApp')
  .controller('LawsDashboardCtrl', function ($scope, User, UserAuthorization) {
    $scope.page = 1;

  	$scope.user = UserAuthorization.get(function(result){
  		$scope.laws=User.recommended_laws({page: $scope.page});
		
  		  console.log($scope.laws)
  	})
	
	
	// -----------------------------------------  DADOS FAKES
	/*$scope.laws=[{"description":"Acrescenta parágrafos ao art. 17 da Constituição, para definir o caráter nacional como condição para o registro dos partidos políticos no Tribunal Superior Eleitoral.", "typeId":"319", "typePrefix":"PEC", "stdCode":"1111", "year":"2013"}, 
	{"description":"Acrescenta parágrafos ao art. 17 da Constituição, para definir o caráter nacional como condição para o registro dos partidos políticos no Tribunal Superior Eleitoral.", "typeId":"319", "typePrefix":"PEC", "stdCode":"1311", "year":"2013"}]; */
	// ------------------------------------
	
	
    //#FIXME: Seria legal utilizar Angular ngshow e nghide
	
    $scope.showExtendedLaw = function(lawId)
    {
      var normal=$("#law_container_"+lawId+"_normal")
      var extended=$("#law_container_"+lawId+"_extended")
      normal.slideToggle("slow");
      extended.slideToggle("slow");
	  
    }

    $scope.hideExtendedLaw = function(lawId)
    {
      var normal=$("#law_container_"+lawId+"_normal")
      var extended=$("#law_container_"+lawId+"_extended")
      normal.slideToggle("slow");
	  normal.show();
      extended.slideToggle("slow");
    }

    $scope.vote = function(rate, law)
    {

    }
	
	$scope.hide_law_text = function(law_stdCode){
var hide_element=$(".hd"+law_stdCode)
       hide_element.slideUp("slow");
	  }
	  
	  	$scope.show_law_text = function(law_stdCode){
var hide_element=$(".hd"+law_stdCode)
     // hide_element.show("fast")
	  hide_element.slideDown("slow");
	  }
	  
	  	  	$scope.hide_allText = function(){
var hide_element=$(".hideable")
      hide_element.hide()
	  	 var std_firstCode = $scope.laws[0]["stdCode"]
	  var hide_header=$(".hdHeader"+std_firstCode)
	  hide_header.show("fast")
	  }
	  
	  $scope.show_firstHeader = function() {

	  }
	  
  });
