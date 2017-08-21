var app=angular.module("MyApp");



app.controller("typeController",function($scope,$http,$mdDialog,$mdMedia){
	$scope.pageCourante = 1;
	$scope.pageSize= 3;
	$scope.pages = [];
	$scope.types =[];
	
	$scope.submitForm = function(isValid) {

	    // check to make sure the form is completely valid
	    if (isValid) {
	    	$scope.error = false;
	    	console.log("valide type "+$scope.type);
	    	$scope.creerType();
	     
	    }else{
	    	console.log("error type "+$scope.type);
	    	$scope.error = true;
	    	
	    }

	  };
	
	
	
	$scope.creerType = function(){
		var dataObj = {
				"type": $scope.type
		};	
	  $scope.message = {
			  "success":"success",
			  "error" :"error"
	  }
	  
	  $http({
		    method: 'POST',
		    url: '/types',
		    data: dataObj,
		    headers: {'Content-Type': 'application/json'}
		}).then(function(response) {
			console.log("lol "+response)
			$scope.message = response;
			$scope.success=true;
			$scope.message.success="Le statut de l'intérvention : " +$scope.type+" a été ajouté avec succès";
			$scope.reset();
			$scope.chargerAllTypes();
	    },function(response) { // optional
	    	$scope.error=true;
			$scope.message.error="Le statut n'a pas été ajouté !";
			console.log("error");
	    });
	}
	
	$scope.reset = function(){
		$scope.type = null;
		$scope.success=false;
  		$scope.error=false;
		
	}
	
	
	$scope.chargerAllTypes = function(){
		
		  var url1 = "/types?page="+$scope.pageCourante+"&size="+$scope.pageSize;
		  $http({
		      method: 'GET',
		      url: url1
		   }).then(function (success){
			   console.log("succAll ",JSON.stringify(success));
			   $scope.types = success.data;
				  $scope.currentPage = $scope.pageCourante;
				  console.log("Page courante "+$scope.currentPage);
				  //$scope.pageSize = 1;
				  $scope.totale = success.data.totalNatures;
				  
		   },function (error){
			   $scope.errorMessage = success.data.message;	
		   });
		  
		 
	  };
	  
	  $scope.chargerAllTypes();
	  
	  
	  $scope.goToPage = function(p){
			 
			$scope.pageCourante = p;
			$scope.currentPage = p;
			$scope.chargerAllTypes();
		 };
		 
		 $scope.showAdvanced = function(ev,type) {
			    $mdDialog.show({
			      controller: DialogController,
			      templateUrl: '/protected/dialogType.html',
			      parent: angular.element(document.body),
			      locals: {
			    	  items: type
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
			  
		  
		  $scope.modifier = function(type,$event){
			  console.log("type "+type.type);
				 $scope.typee = type
				 $scope.showAdvanced($event,$scope.typee);
			 };
			 
			 
			 function DialogController($scope,$http,$mdDialog,$mdMedia,items,$route){	
					
					$scope.typee = items.type;
					
					$scope.type = items;
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
						  console.log("type " + $scope.type);
						  var url = "/types/"+$scope.type.id;
						  console.log("url " +url);
						  
						  console.log("typee " +$scope.typee);
						  
						  var type = {
								  "type":$scope.typee
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
								    $scope.message.success="le statut "+$scope.type.type+" a été modifié par "+$scope.typee+"  avec succès";
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