var app=angular.module("MyApp");
app.controller("utilisateurController",function($scope,$http,$mdDialog,$mdMedia){
	
	var vm = this;
	$scope.pageCourante = 1;
	$scope.pageSize= 3;
	$scope.pages = [];
	$scope.users =[];
	vm.roleSelected=[];
	
	$scope.submitForm = function(isValid) {

	    // check to make sure the form is completely valid
	    if (isValid) {
	    	$scope.error = false;
	    	console.log("valide Nom "+$scope.nom + "email "+$scope.email1 +"password "+$scope.password);
	    	$scope.creerUtilisateur();
	     
	    }else{
	    	console.log("error Nom "+$scope.nom + "email "+$scope.email1 +"password "+$scope.password);
	    	$scope.error = true;
	    	
	    }

	  };
	
	
	
	$scope.creerUtilisateur = function(){
		
		var groupe = {
				"codeGroupe":$scope.groupe
		}
		
		var dataObj = {
				"nom": $scope.nom,
				"username": $scope.email1,
				"password": $scope.password,
				"groupe":groupe,
				 "roles":vm.roleSelected
		};	
		
		console.log("Dataobj " + JSON.stringify(dataObj));
		console.log("Roles " + vm.roleSelected.length);
	  
	  $http({
		    method: 'POST',
		    url: '/users',
		    data: dataObj,
		    headers: {'Content-Type': 'application/json'}
		}).then(function(response) {
			console.log("lol "+response)
			$scope.message = response;
			$scope.success=true;
			$scope.message.success="L'utilisateur " +$scope.nom+"a été ajouté avec succès";
			$scope.reset();
			$scope.chargerAllUsers();
	    },function(response) { // optional
	    	//$scope.error=true;
			//$scope.message.error="L'utilisateur n'a pas été ajouté !";
			console.log("errororate");
	    });
	}
	
	$scope.reset = function(){
		$scope.nom = null;
		$scope.email1=null;
		$scope.password =null;
		$scope.password1=null;
		$scope.success=false;
  		$scope.error=false;
	}
	
	$http({
	      method: 'GET',
	      url: "/groupe"
	   }).then(function (success){
		   //console.log(JSON.stringify(response));
		   $scope.groupes = success.data;
	   },function (error){
		  $scope.errorMessage = error.message;	
	   });
	
	$http({
	      method: 'GET',
	      url: "/role"
	   }).then(function (success){
		   //console.log(JSON.stringify(response));
		   $scope.roles = success.data;
	   },function (error){
		  $scope.errorMessage = error.message;	
	   });
	
	
	$scope.chargerAllUsers = function(){
		
		  var url1 = "/users?page="+$scope.pageCourante+"&size="+$scope.pageSize;
		  $http({
		      method: 'GET',
		      url: url1
		   }).then(function (success){
			   console.log("succ ",JSON.stringify(success));
			   $scope.users = success.data;
				  $scope.currentPage = $scope.pageCourante;
				  console.log("Page courante "+$scope.currentPage);
				  //$scope.pageSize = 1;
				  $scope.totale = success.data.totalUsers;
				  
		   },function (error){
			   $scope.errorMessage = success.data.message;	
		   });
		  
		 
	  };
	  
	  $scope.chargerAllUsers();
	  
	  
	  $scope.goToPage = function(p){
			 
			$scope.pageCourante = p;
			$scope.currentPage = p;
			$scope.chargerAllUsers();
		 };
		 
		 
		 $scope.showAdvanced = function(ev,user) {
			    $mdDialog.show({
			      controller: DialogController,
			      templateUrl: '/protected/dialogUser.html',
			      parent: angular.element(document.body),
			      locals: {
			    	  items: user
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
			  
		  
		  $scope.modifier = function(user,$event){
			  console.log("user "+user.username);
				 $scope.userr = user
				 $scope.showAdvanced($event,$scope.userr);
			 };
			 
			 
			 function DialogController($scope,$http,$mdDialog,$mdMedia,items,$route){	
					
					
					
					$scope.nomm = items.nom;
					$scope.emaill = items.username;
					$scope.email = items.username;
					$scope.nom = items.nom;
					console.log("items groupe " + items.groupe.codeGroupe);
					$scope.groupe = items.groupe.codeGroupe;
					$scope.roleSelected = items.roles;
					
					$scope.user = items;
					$scope.submitForm = function(isValid) {

					    // check to make sure the form is completely valid
					    if (isValid) {
					    	console.log("ISVALID");
					    	$scope.error = false;
					     $scope.updateStatutIntervention();
					    }else{
					    	console.log("Not Valide");
					    	$scope.error = true;
					    	
					    }

					  };
					  
					  
					  
					  $scope.updateStatutIntervention = function(){
						  console.log("user " + $scope.user);
						  var url = "/users/"+$scope.email;
						  console.log("url " +url);
						  
						  console.log("userr " +$scope.userr);
						  
						  var groupe = {
									"codeGroupe":$scope.groupe
							};
							
							var dataObj = {
									"nom": $scope.nom,
									"username": $scope.email1,
									"password": $scope.passwordd,
									"groupe":groupe,
									 "roles":$scope.roleSelected
							};	
						  
						 
						  
						  $http({
							    method: 'PUT',
							    url: url,
							    data: dataObj,
							    headers: {'Content-Type': 'application/json'}
							}).then(function(response) {
								
									console.log(response)
									$scope.message = response;
									$scope.success=true;
								    $scope.message.success="collaborateur modifié avec succès";
									//$mdDialog.hide();
									$route.reload();
								
								
						    }, 
						    function(response) { // optional
						    	$scope.error=true;
								$scope.message.error="l'utilisateur n'a pas été modifié !";
								console.log(response);
						    });
					  };
					  
					  $http({
					      method: 'GET',
					      url: "/groupe"
					   }).then(function (success){
						   //console.log(JSON.stringify(response));
						   $scope.groupes = success.data;
					   },function (error){
						  $scope.errorMessage = error.message;	
					   });
					
					$http({
					      method: 'GET',
					      url: "/role"
					   }).then(function (success){
						   //console.log(JSON.stringify(response));
						   $scope.roles = success.data;
					   },function (error){
						  $scope.errorMessage = error.message;	
					   });
					  
				  
				  
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