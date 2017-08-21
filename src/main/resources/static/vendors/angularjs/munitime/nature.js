var app=angular.module("MyApp");

app.controller("natureController",function($scope,$http,$mdDialog,$mdMedia){
	$scope.pageCourante = 1;
	$scope.pageSize= 3;
	$scope.pages = [];
	$scope.natures =[];
	
	$scope.submitForm = function(isValid) {

	    // check to make sure the form is completely valid
	    if (isValid) {
	    	$scope.error = false;
	    	console.log("valide Nom "+$scope.nature);
	    	$scope.creerUtilisateur();
	     
	    }else{
	    	console.log("error Nom "+$scope.nature);
	    	$scope.error = true;
	    	
	    }

	  };
	
	
	
	$scope.creerUtilisateur = function(){
		var dataObj = {
				"nature": $scope.nature
		};	
	  
	  
	  $http({
		    method: 'POST',
		    url: '/natures',
		    data: dataObj,
		    headers: {'Content-Type': 'application/json'}
		}).then(function(response) {
			console.log("lol "+response)
			$scope.message = response;
			$scope.success=true;
			$scope.message.success="La nature d'intérvention : " +$scope.nature+" a été ajouté avec succès";
			$scope.reset();
			$scope.chargerAllNatures();
	    },function(response) { // optional
	    	//$scope.error=true;
			//$scope.message.error="L'utilisateur n'a pas été ajouté !";
			console.log("error");
	    });
	}
	
	$scope.reset = function(){
		$scope.nature = null;
		$scope.success=false;
  		$scope.error=false;
		
	}
	
	
	$scope.chargerAllNatures = function(){
		
		  var url1 = "/natures?page="+$scope.pageCourante+"&size="+$scope.pageSize;
		  $http({
		      method: 'GET',
		      url: url1
		   }).then(function (success){
			   console.log("succ ",JSON.stringify(success));
			   $scope.natures = success.data;
				  $scope.currentPage = $scope.pageCourante;
				  console.log("Page courante "+$scope.currentPage);
				  //$scope.pageSize = 1;
				  $scope.totale = success.data.totalNatures;
				  
		   },function (error){
			   $scope.errorMessage = success.data.message;	
		   });
		  
		 
	  };
	  
	  $scope.chargerAllNatures();
	  
	  
	  $scope.goToPage = function(p){
			 
			$scope.pageCourante = p;
			$scope.currentPage = p;
			$scope.chargerAllNatures();
		 };
		 
		 
		 
		 $scope.showAdvanced = function(ev,nature) {
			    $mdDialog.show({
			      controller: DialogController,
			      templateUrl: '/protected/dialogNature.html',
			      parent: angular.element(document.body),
			      locals: {
			    	  items: nature
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
			  
		  
		  $scope.modifier = function(nature,$event){
			  console.log("nature "+nature.nature);
				 $scope.naturee = nature
				 $scope.showAdvanced($event,$scope.naturee);
			 };
			 
			 
			 function DialogController($scope,$http,$mdDialog,$mdMedia,items,$route){	
					
					$scope.naturee = items.nature;
					
					$scope.nature = items;
					$scope.submitForm = function(isValid) {

					    // check to make sure the form is completely valid
					    if (isValid) {
					    	$scope.error = false;
					     $scope.updateStatutIntervention();
					    }else{
					    	$scope.error = true;
					    	
					    }

					  };
					  
					  
					  
					  $scope.updateStatutIntervention = function(){
						  console.log("nature " + $scope.nature);
						  var url = "/natures/"+$scope.nature.id;
						  console.log("url " +url);
						  
						  console.log("typee " +$scope.naturee);
						  
						  var type = {
								  "nature":$scope.naturee
						  }
						  
						 
						  
						  $http({
							    method: 'PUT',
							    url: url,
							    data: type,
							    headers: {'Content-Type': 'application/json'}
							}).then(function(response) {
								
									console.log(response)
									$scope.message = response;
									$scope.success=true;
								    $scope.message.success="la nature "+$scope.nature.nature+" a été modifié par "+$scope.naturee+"  avec succès";
									//$mdDialog.hide();
									$route.reload();
								
								
						    }, 
						    function(response) { // optional
						    	$scope.error=true;
								$scope.message.error="le statut n'a pas été ajouté !";
								console.log(response);
						    });
					  }
					  
				  
				  
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