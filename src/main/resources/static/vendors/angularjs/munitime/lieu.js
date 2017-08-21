var app=angular.module("MyApp");



app.controller("lieuController",function($scope,$http,$mdDialog,$mdMedia){
	$scope.pageCourante = 1;
	$scope.pageSize= 3;
	$scope.pages = [];
	$scope.lieux =[];
	
	$scope.submitForm = function(isValid) {

	    // check to make sure the form is completely valid
	    if (isValid) {
	    	$scope.error = false;
	    	console.log("valide Nom "+$scope.client);
	    	$scope.creerLieu();
	     
	    }else{
	    	console.log("error Nom "+$scope.client);
	    	$scope.error = true;
	    	
	    }

	  };
	
	  
	
	
	$scope.creerLieu = function(){
		var dataObj = {
				"lieu": $scope.lieu
				
		};	
	  
		$scope.message = {
				  "success":"success",
				  "error" :"error"
		  }
	  
	  $http({
		    method: 'POST',
		    url: '/lieux',
		    data: dataObj,
		    headers: {'Content-Type': 'application/json'}
		}).then(function(response) {
			console.log("lol "+response)
			$scope.message = response;
			$scope.success=true;
			$scope.message.success="Le lieu : " +$scope.lieu+" a été ajouté avec succès";
			$scope.reset();
			$scope.chargerAllLieux();
	    },function(response) { // optional
	    	//$scope.error=true;
			//$scope.message.error="L'utilisateur n'a pas été ajouté !";
			console.log("error");
	    });
	}
	
	$scope.reset = function(){
		$scope.lieu = null;
		$scope.success=false;
  		$scope.error=false;
	}
	
	
	$scope.chargerAllLieux = function(){
		
		  var url1 = "/lieux?page="+$scope.pageCourante+"&size="+$scope.pageSize;
		  $http({
		      method: 'GET',
		      url: url1
		   }).then(function (success){
			   console.log("succ ",JSON.stringify(success));
			   $scope.lieux = success.data;
				  $scope.currentPage = $scope.pageCourante;
				  console.log("Page courante "+$scope.currentPage);
				  //$scope.pageSize = 1;
				  $scope.totale = success.data.totalLieux;
				  
		   },function (error){
			   $scope.errorMessage = success.data.message;	
		   });
		  
		 
	  };
	  
	  $scope.chargerAllLieux();
	  
	  
	  $scope.goToPage = function(p){
			 
			$scope.pageCourante = p;
			$scope.currentPage = p;
			$scope.chargerAllLieux();
		 };
		 
		 $scope.showAdvanced = function(ev,lieu) {
			    $mdDialog.show({
			      controller: DialogController,
			      templateUrl: '/protected/dialogLieu.html',
			      parent: angular.element(document.body),
			      locals: {
			    	  items: lieu
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
			  
		  
		  $scope.modifier = function(lieu,$event){
			  console.log("type "+lieu.lieu);
				 $scope.lieuu = lieu
				 $scope.showAdvanced($event,$scope.lieuu);
			 };
			 
			 
			 function DialogController($scope,$http,$mdDialog,$mdMedia,items,$route){	
					
					$scope.lieuu = items.lieu;
					
					$scope.lieu = items;
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
						  console.log("lieu " + $scope.lieu);
						  var url = "/lieuse?id="+$scope.lieu.id+"&lieu="+$scope.lieuu;
						  console.log("url " +url);
						  console.log("lieux " +$scope.lieuu);
						  
						  var lieu = {
								  "lieu":$scope.lieuu
						  }
						  
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
								    $scope.message.success="le lieu "+$scope.lieu.lieu+" a été modifié par "+$scope.lieuu+"  avec succès";
									//$mdDialog.hide();
									$route.reload();
								
								
						    }, 
						    function(response) { // optional
						    	console.log("response "+response);
						    	$scope.error=true;
								$scope.message.error="le lieu n'a pas été modfié !";
								
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