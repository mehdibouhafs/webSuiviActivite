var app=angular.module("MyApp");

app.controller("clientController",function($scope,$http,$mdDialog,$mdMedia){
	$scope.pageCourante = 1;
	$scope.pageSize= 3;
	$scope.pages = [];
	$scope.users =[];
	
	$scope.submitForm = function(isValid) {

	    // check to make sure the form is completely valid
	    if (isValid) {
	    	$scope.error = false;
	    	console.log("valide Nom "+$scope.client);
	    	$scope.creerClient();
	     
	    }else{
	    	console.log("error Nom "+$scope.client);
	    	$scope.error = true;
	    	
	    }

	  };
	
	
	
	$scope.creerClient = function(){
		var dataObj = {
				"client": $scope.client
				
		};	
	  
	  
	  $http({
		    method: 'POST',
		    url: '/clients',
		    data: dataObj,
		    headers: {'Content-Type': 'application/json'}
		}).then(function(response) {
			console.log("lol "+response)
			$scope.message = response;
			$scope.success=true;
			$scope.message.success="Le client " +$scope.client+" a été ajouté avec succès";
			$scope.reset();
			$scope.chargerAllClients();
	    },function(response) { // optional
	    	//$scope.error=true;
			//$scope.message.error="L'utilisateur n'a pas été ajouté !";
			console.log("error");
	    });
	}
	
	$scope.reset = function(){
		$scope.client = null;
		$scope.success=false;
  		$scope.error=false;
	}
	
	
	$scope.chargerAllClients = function(){
		
		  var url1 = "/clients?page="+$scope.pageCourante+"&size="+$scope.pageSize;
		  $http({
		      method: 'GET',
		      url: url1
		   }).then(function (success){
			   console.log("succ ",JSON.stringify(success));
			   $scope.clients = success.data;
				  $scope.currentPage = $scope.pageCourante;
				  console.log("Page courante "+$scope.currentPage);
				  //$scope.pageSize = 1;
				  $scope.totale = success.data.totalClients;
				  
		   },function (error){
			   $scope.errorMessage = success.data.message;	
		   });
		  
		 
	  };
	  
	  $scope.chargerAllClients();
	  
	  
	  $scope.goToPage = function(p){
			 
			$scope.pageCourante = p;
			$scope.currentPage = p;
			$scope.chargerAllClients();
		 };
		 
		 $scope.showAdvanced = function(ev,client) {
			    $mdDialog.show({
			      controller: DialogController,
			      templateUrl: '/protected/dialogClient.html',
			      parent: angular.element(document.body),
			      locals: {
			    	  items: client
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
			  
		  
		  $scope.modifier = function(client,$event){
			  console.log("client "+client.client);
				 $scope.clientt = client
				 $scope.showAdvanced($event,$scope.clientt);
			 };
			 
			 
			 function DialogController($scope,$http,$mdDialog,$mdMedia,items,$route){	
					
					$scope.clientt = items.client;
					
					$scope.client = items;
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
						  console.log("client " + $scope.client);
						  var url = "/clients/"+$scope.client.id;
						  console.log("url " +url);
						  
						  console.log("clientt " +$scope.clientt);
						  
						  var client = {
								  "client":$scope.clientt
						  }
						  
						 
						  
						  $http({
							    method: 'PUT',
							    url: url,
							    data: client,
							    headers: {'Content-Type': 'application/json'}
							}).then(function(response) {
								
									console.log(response)
									$scope.message = response;
									$scope.success=true;
								    $scope.message.success="le client "+$scope.client.client+" a été modifié par "+$scope.clientt+"  avec succès";
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