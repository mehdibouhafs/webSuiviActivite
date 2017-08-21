var app=angular.module("MyApp");



app.controller("projetController",function($scope,$http,$mdDialog,$mdMedia){
	$scope.pageCourante = 1;
	$scope.pageSize= 3;
	$scope.pages = [];
	$scope.projets =[];
	
	$scope.submitForm = function(isValid) {

	    // check to make sure the form is completely valid
	    if (isValid) {
	    	$scope.error = false;
	    	console.log("valide Nom "+$scope.projet);
	    	$scope.creerProjet();
	     
	    }else{
	    	console.log("error Nom "+$scope.projet);
	    	$scope.error = true;
	    	
	    }

	  };
	
	  
	
	
	$scope.creerProjet = function(){
		var dataObj = {
				"id":$scope.projetId,
				"projet": $scope.projet
				
		};	
	  
		$scope.message = {
				  "success":"success",
				  "error" :"error"
		  }
	  
	  $http({
		    method: 'POST',
		    url: '/projet',
		    data: dataObj,
		    headers: {'Content-Type': 'application/json'}
		}).then(function(response) {
			console.log("lol "+response);
			$scope.message = response;
			$scope.success=true;
			$scope.message.success="Le projet : " +$scope.projet+" a été ajouté avec succès";
			$scope.reset();
			$scope.chargerAllProjets();
	    },function(response) { // optional
	    	//$scope.error=true;
			//$scope.message.error="L'utilisateur n'a pas été ajouté !";
			console.log("error");
	    });
	}
	
	$scope.reset = function(){
		$scope.projetId=null;
		$scope.projet = null;
		$scope.success=false;
  		$scope.error=false;
	}
	
	
	$scope.chargerAllProjets = function(){
		
		  var url1 = "/chargerAllProjets?page="+$scope.pageCourante+"&size="+$scope.pageSize;
		  $http({
		      method: 'GET',
		      url: url1
		   }).then(function (success){
			   console.log("succ ",JSON.stringify(success));
			   $scope.projets = success.data;
			  $scope.currentPage = $scope.pageCourante;
			  console.log("Page courante "+$scope.currentPage);
			  //$scope.pageSize = 1;
			  $scope.totale = success.data.totalProjet;
				  
		   },function (error){
			   $scope.errorMessage = success.data.message;	
		   });
		  
		 
	  };
	  
	  $scope.chargerAllProjets();
	  
	  
	    $scope.goToPage = function(p){
			 
			$scope.pageCourante = p;
			$scope.currentPage = p;
			$scope.chargerAllProjets();
		 };
		 
		 $scope.showAdvanced = function(ev,projet) {
			    $mdDialog.show({
			      controller: DialogController,
			      templateUrl: '/protected/dialogProjet.html',
			      parent: angular.element(document.body),
			      locals: {
			    	  items: projet
			       },
			      targetEvent: ev,
			      clickOutsideToClose:true,
			      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
			    })
			    .then(function(answer) {
			        $scope.status = 'You said the information was "' + answer + '".';
			      }, function() {
			        $scope.status = 'You cancelled the dialog.';
			      });
			      $scope.$watch(function() {
			        return $mdMedia('xs') || $mdMedia('sm');
			      }, function(wantsFullScreen) {
			        $scope.customFullscreen = (wantsFullScreen === true);
			      });
			    
			  };
			  
		  
		  $scope.modifier = function(projet,$event){
			  console.log("type "+projet.projet);
				 $scope.projet2 = projet
				 $scope.showAdvanced($event,$scope.projet2);
			 };
			 
			 
			 function DialogController($scope,$http,$mdDialog,$mdMedia,items,$route){	
					
					$scope.projett = items.projet;
					
					$scope.projet = items;
					$scope.submitForm = function(isValid) {

					    // check to make sure the form is completely valid
					    if (isValid) {
					    	console.log("IS Valid");
					    	$scope.error = false;
					     $scope.updateStatutIntervention();
					    }else{
					    	$scope.error = true;
					    	
					    }

					  };
					  
					  
					  
					  $scope.updateStatutIntervention = function(){
						  console.log("projet " + $scope.projet);
						  var url = "/projete?id="+$scope.projet.id+"&projet="+$scope.projett;
						  console.log("url " +url);
						  console.log("projets " +$scope.projet);
						  
						 
						  $scope.message = {
								  "success":"success",
								  "error" :"error"
						  }
						  
						  
						  $http({
							    method: 'GET',
							    url: url,
							    headers: {'Content-Type': 'application/json'}
							}).then(function(response) {
								
									console.log("response 1 "+response)
									$scope.message = response;
									$scope.success=true;
								    $scope.message.success="le projet "+$scope.projet.projet+" a été modifié avec succès";
									//$mdDialog.hide();
									$route.reload();
								
								
						    }, 
						    function(response) { // optional
						    	console.log("response "+response);
						    	$scope.error=true;
								$scope.message.error="le projet n'a pas été modfié !";
								
						    });
					  };
					  
				  
				  
				    $scope.hide = function() {
				      $mdDialog.hide();
				    };

				    $scope.cancel = function() {
				      $mdDialog.cancel();
				    };

				    $scope.answer = function(answer) {
				      $mdDialog.hide(answer);
				    };
				  
				};
	
	
});