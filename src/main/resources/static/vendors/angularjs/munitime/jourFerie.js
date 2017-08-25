var app=angular.module("MyApp");



app.controller("jourController",function($scope,$http,$mdDialog,$mdMedia){
	$scope.pageCourante = 1;
	$scope.pageSize= 3;
	$scope.pages = [];
	$scope.dateExcludeds =[];
	
	$scope.submitForm = function(isValid) {

	    // check to make sure the form is completely valid
	    if (isValid) {
	    	$scope.error = false;
	    	console.log("valide Nom "+$scope.dateExcluded);
	    	$scope.creerLieu();
	     
	    }else{
	    	console.log("error Nom "+$scope.dateExcluded);
	    	$scope.error = true;
	    	
	    }

	  };

	
	$scope.creerLieu = function(){
		
		console.log("jour ferie " + moment($scope.dateExcludede).format("DD/MM/YYYY"));
		
		var dataObj = {
				"dateExcluded": moment($scope.dateExcludede).format("DD/MM/YYYY"),
				"intitule":$scope.intitule
				
		};	
	  
		$scope.message = {
				  "success":"success",
				  "error" :"error"
		  }
	  
	  $http({
		    method: 'POST',
		    url: '/dateExcluded',
		    data: dataObj,
		    headers: {'Content-Type': 'application/json'}
		}).then(function(response) {
			
			$scope.message = response;
			$scope.success=true;
			$scope.message.success="Le jour férié : " +$scope.intitule+" a été ajouté avec succès";
		
			$scope.reset();
			$scope.chargerAllDateExcluded();
	    },function(response) { // optional
	    	$scope.error=true;
			$scope.message.error="L'utilisateur n'a pas été ajouté !";
			console.log("error");
	    });
	}
	
	$scope.reset = function(){
		$scope.dateExcludede = null;
		//$scope.success=false;
  		//$scope.error=false;
	}
	
	
	$scope.chargerAllDateExcluded = function(){
		
		  var url1 = "/chargerAll?page="+$scope.pageCourante+"&size="+$scope.pageSize;
		  $http({
		      method: 'GET',
		      url: url1
		   }).then(function (success){
			   console.log("succ ",JSON.stringify(success));
			   $scope.dateExcludeds = success.data;
				  $scope.currentPage = $scope.pageCourante;
				  console.log("Page courante "+$scope.currentPage);
				  //$scope.pageSize = 1;
				  $scope.totale = success.data.totalDateExlcudeds;
				  
		   },function (error){
			   $scope.errorMessage = success.data.message;	
		   });
		  
		 
	  };
	  
	  $scope.chargerAllDateExcluded();
	  
	  
	  $scope.goToPage = function(p){
			 
			$scope.pageCourante = p;
			$scope.currentPage = p;
			$scope.chargerAllDateExcluded();
		 };
		 
		 $scope.showAdvanced = function(ev,dateExcluded) {
			    $mdDialog.show({
			      controller: DialogController,
			      templateUrl: '/protected/dialogJourFerie.html',
			      parent: angular.element(document.body),
			      locals: {
			    	  items: dateExcluded
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
			  
		  
		  $scope.modifier = function(dateExcluded,$event){
			  console.log("type "+dateExcluded.dateExcluded);
				 $scope.dateExcludedd = dateExcluded
				 $scope.showAdvanced($event,$scope.dateExcludedd);
			 };
			 
			 
			 function DialogController($scope,$http,$mdDialog,$mdMedia,items,$route){	
					
					$scope.dateExcludedd = items.dateExcluded;
					$scope.dateExcludeddd = $scope.dateExcludedd;
					
					$scope.dateExcluded = items;
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
						  console.log("dateExcludedd 2 " + $scope.dateExcludedd);
						  
						  console.log(" moment2 " + moment($scope.dateExcludedd,"DD/MM/YYYY").format("DD-MM-YYYY"));
						  var url = "/dateExcludede?lastDateExcluded="+$scope.dateExcludedd+"&dateExcluded="+moment($scope.dateExcludeddd).format("DD-MM-YYYY");
						  console.log("url " +url);

						  
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
								    $scope.message.success="le jour férié "+$scope.dateExcluded.dateExcluded+" a été modifié avec succès";
									//$mdDialog.hide();
									$route.reload();
								
								
						    }, 
						    function(response) { // optional
						    	console.log("response "+response);
						    	$scope.error=true;
								$scope.message.error="le jour férié n'a pas été modfié !";
								
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