var app=angular.module("MyApp");

app.directive('pwCheck', [function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
          var firstPassword = '#' + attrs.pwCheck;
          elem.add(firstPassword).on('keyup', function () {
            scope.$apply(function () {
              var v = elem.val()===$(firstPassword).val();
              ctrl.$setValidity('pwmatch', v);
            });
          });
        }
      }
    }]);

app.factory('User', function(){
	
	var user = {
	        email: '',
	        roles:[],
	        admin:false
	    };
    
    return {
        getEmail: function () {
            return user.email;
        },
        setEmail: function (email) {
            user.email = email;
        },
        getRoles: function () {
            return user.roles;
        },
        setRoles: function (roles) {
            user.roles = roles;
        },
        getAdmin: function () {
            return user.admin;
        },
        setAdmin: function (admin) {
            user.admin = admin;
        }
    };
   
});




app.controller("utilisateurController",function($scope,$http,$mdDialog,$mdMedia){
	
	$scope.pageCourante = 1;
	$scope.pageSize= 3;
	$scope.pages = [];
	$scope.users =[];
	
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
		var dataObj = {
				"nom": $scope.nom,
				"username": $scope.email1,
				"password": $scope.password
		};	
	  
	  
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
			console.log("error");
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
						  
						  var user = {
								  "username":$scope.emaill,
								  "nom":$scope.nomm,
								  "password":$scope.passwordd,
								  "active":1
						  }
						  
						 
						  
						  $http({
							    method: 'PUT',
							    url: url,
							    data: user,
							    headers: {'Content-Type': 'application/json'}
							}).then(function(response) {
								
									console.log(response)
									$scope.message = response;
									$scope.success=true;
								    $scope.message.success="l'utilisateur "+$scope.nom+" a été modifié par "+$scope.nomm+"  avec succès";
									//$mdDialog.hide();
									$route.reload();
								
								
						    }, 
						    function(response) { // optional
						    	$scope.error=true;
								$scope.message.error="l'utilisateur n'a pas été modifié !";
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



app.controller("interventionController",function($scope,$http,$window,User){
  $scope.intervention = null;
  $scope.pageInterventions=[];
  $scope.pageCourante = 1;
  $scope.pageSize= 5;
  $scope.pages = [];
  $scope.error = false;
  $scope.success = false;
  $scope.clients=[];
  $scope.natures=[];
  $scope.lieux =[];
  $scope.villes=[];
  $scope.selected = false;
  $scope.activitesEmployer=[];
  $scope.admin=false;
  
  
  
  
  $scope.mySplit = function(string, nb) {
	    var array = string.split(' ');
	    return array[nb];
	};
	
	
	$scope.checkBoth = function(){
		console.log("heuredeb "+ $scope.heureDebut);
		console.log("heureFin "+ $scope.heureFin);
		if(( typeof $scope.heureDebut  ===  'undefined') || ( typeof $scope.heureFin === 'undefined')){
			console.log("unditest");
			$scope.selected = false;
		}else{
			console.log("afficherTest");
			$scope.calculerDuree();
			$scope.selected = true;
		}
	};
  
  $scope.chargerUser = function(){
	  
	  var url1  = "/ActivitesEmployerByMail/"+$scope.user.email;
	  $http({
	      method: 'GET',
	      url: url1
	   }).then(function (success){
		   $scope.pageCourante = 0;
			  $scope.user = success;
			  $scope.chargerInterventions();
	   },function (error){
		   $scope.errorMessage = data.message;
		  	$scope.compte = null;
	   });
  };
  
  $scope.submitForm = function(isValid) {

	    // check to make sure the form is completely valid
	    if (isValid && ($scope.selectedItem !=null)) {
	    	$scope.error = false;
	     $scope.saveIntervention();
	    }else{
	    	$scope.error = true;
	    	
	    }

	  };
	  

	  
 $scope.calculerDuree = function(){
	 var dateDebut = moment($scope.dateDebut).format("DD/MM/YYYY HH:mm:ss");
	  var heureDebut = moment($scope.heureDebut).format("DD/MM/YYYY HH:mm:ss");
	   var heureFin  = moment($scope.heureFin).format("DD/MM/YYYY HH:mm:ss");
	   
	   var dateDebut1 = moment(dateDebut,"DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY");
	   var heureDebut1 = moment(heureDebut,"DD/MM/YYYY HH:mm:ss").format("HH:mm:ss");
	   var heureFin1 = moment(heureFin,"DD/MM/YYYY HH:mm:ss").format("HH:mm:ss");
	   
	   
	   var dateDebut2 = dateDebut1.concat(" "+heureDebut1); 
	   var dateMinuit = moment(dateDebut1, "DD/MM/YYYY").add(1, 'days').format("DD/MM/YYYY").concat(" "+"00:00:01");
	 
	   var duree="";
	   var dateFin;
	   
	   if((moment(heureDebut ,"DD/MM/YYYY HH:mm:ss").isBefore(moment(heureFin,"DD/MM/YYYY HH:mm:ss"))) && (moment(dateDebut ,"DD/MM/YYYY HH:mm:ss").isBefore(moment(dateMinuit,"DD/MM/YYYY HH:mm:ss")))){
			  var s= moment.utc(moment(heureFin ,"DD/MM/YYYY HH:mm:ss").diff(moment(heureDebut,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
			  duree=s;
			  console.log("durree avant 1 jour = "+s);
			  dateFin = dateDebut1.concat(" "+heureFin1);
			  console.log("date Fin same = "+dateFin);
			}else{
				var s= moment.utc(moment(heureFin ,"DD/MM/YYYY HH:mm:ss").diff(moment(heureDebut,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
				duree=s;  
				console.log("duree fin apres 1day  "+s);
				dateFin=moment(dateDebut1, "DD/MM/YYYY").add(1, 'days').format("DD/MM/YYYY").concat(" "+heureFin1);
				console.log("date fin apres 1day  "+dateFin);
			}
	   $scope.duree =duree;
	   $scope.dateFinale = dateFin;
 }  
  
  $scope.saveIntervention = function(){
	  var dateDebut = moment($scope.dateDebut).format("DD/MM/YYYY HH:mm:ss");
	  var heureDebut = moment($scope.heureDebut).format("DD/MM/YYYY HH:mm:ss");
	   var heureFin  = moment($scope.heureFin).format("DD/MM/YYYY HH:mm:ss");
	   
	   var dateDebut1 = moment(dateDebut,"DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY");
	   var heureDebut1 = moment(heureDebut,"DD/MM/YYYY HH:mm:ss").format("HH:mm:ss");
	   var heureFin1 = moment(heureFin,"DD/MM/YYYY HH:mm:ss").format("HH:mm:ss");
	   
	   
	   var dateDebut2 = dateDebut1.concat(" "+heureDebut1); 
	   var dateMinuit = moment(dateDebut1, "DD/MM/YYYY").add(1, 'days').format("DD/MM/YYYY").concat(" "+"00:00:01");
	 
	   var duree="";
	   var dateFin;
	   
	   if((moment(heureDebut ,"DD/MM/YYYY HH:mm:ss").isBefore(moment(heureFin,"DD/MM/YYYY HH:mm:ss"))) && (moment(dateDebut ,"DD/MM/YYYY HH:mm:ss").isBefore(moment(dateMinuit,"DD/MM/YYYY HH:mm:ss")))){
			  var s= moment.utc(moment(heureFin ,"DD/MM/YYYY HH:mm:ss").diff(moment(heureDebut,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
			  duree=s;
			  console.log("durree avant 1 jour = "+s);
			  dateFin = dateDebut1.concat(" "+heureFin1);
			  console.log("date Fin same = "+dateFin);
			}else{
				var s= moment.utc(moment(heureFin ,"DD/MM/YYYY HH:mm:ss").diff(moment(heureDebut,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
				duree=s;  
				console.log("duree fin apres 1day  "+s);
				dateFin=moment(dateDebut1, "DD/MM/YYYY").add(1, 'days').format("DD/MM/YYYY").concat(" "+heureFin1);
				console.log("date fin apres 1day  "+dateFin);
			}
	   
	   var params = "dateDebut="+dateDebut2+"&dateFin="+dateFin+"&heureDebut="+heureDebut1+"&heureFin="+heureFin1+"&client="+$scope.client
	      +"&nature="+$scope.nature+"&descProjet="+$scope.descProjet +"&" +
	      		"="+$scope.nature+"&ville="+$scope.ville+"&duree="+duree;
		  
		  console.log("date1="+params);
		  
		  var client ={"id":$scope.selectedItem.id}
		  var nature = {"id":$scope.nature};
		  
		  var lieu = {"id":$scope.lieu};
		  var ville = {"id":$scope.ville};
		  
		  var type = {"id":$scope.type};
		  
		  var mail = User.getEmail();
		  
		  console.log("mail "+mail);
		  var user = {
				  "username":mail
		  }
		  
		  var dataObj = {
					"dateDebut": dateDebut2,
					"dateFin": dateFin,
					"heureDebut": heureDebut1,
					"heureFin":heureFin1,
					"client":client,
					"nature":nature,
					"descProjet":$scope.descProjet,
					"lieu":lieu,
					"ville":ville,
					"type":type,
					"duree":duree,
					"user":user
			};	
		  
		  $scope.message={
				  "error" : "erreur",
				  "success":"success"
			  };
		  
		  console.log("dataObj"+ JSON.stringify(dataObj));
		  
		  $http({
			    method: 'POST',
			    url: '/ActivitesEmployer',
			    data: dataObj,
			    headers: {'Content-Type': 'application/json'}
			}).then(function(response) {
				if(response.data!=""){
					console.log(response)
					$scope.message = response;
					$scope.reset();
					$scope.success=true;
				    $scope.message.success="Votre intervention a été ajouté avec succès";
					//$mdDialog.hide();
					$route.reload();
				}else{
					console.log("between");
					$scope.success=false;
					$scope.error=true;
					$scope.message.error="Vous ne pouvez pas faire deux interventions en même temps !";
					console.log(response);
				}
				
		    }, 
		    function(response) { // optional
		    	$scope.error=true;
				$scope.message.error="Votre intervention n'a pas été ajouté !";
				console.log(response);
		    });
		  
		 
  };
  
  	$scope.reset = function(){
  		$scope.dateDebut = null;
  		$scope.heureDebut = null;
  		$scope.heureFin = null;
  		$scope.selectedItem = null;
  		$scope.client = "";
  		$scope.nature ="";
  		$scope.descProjet="";
  		$scope.lieu="";
  		$scope.ville="";
  		$scope.duree="";
  		$scope.success=false;
  		$scope.selected = false;
  		$scope.error=false;
  		
  	}
  	
  	$scope.home = function(){
  		$window.location.href = '/index';
  	}
  	  
  	
  	
  	
  		$http({
	      method: 'GET',
	      url: "/clients1"
	   }).then(function (success){
		   //console.log(JSON.stringify(response));
		   $scope.clients = success.data;
	   },function (error){
		  $scope.errorMessage = error.message;	
	   });
  		
  		
  		$http({
  	      method: 'GET',
  	      url: "/natures1"
  	   }).then(function (success){
  		   $scope.natures = success.data;
  		   console.log("natures " + $scope.natures);
  	   },function (error){
  		   $scope.errorMessage = error.message;	
  	   });
  	
	  
	  
  		$http({
  	      method: 'GET',
  	      url: "/lieux1"
  	   }).then(function (success){
  		   $scope.lieux = success.data;
  	   },function (error){
  		   $scope.errorMessage = error.message;	
  	   });
	  
  		$http({
  	      method: 'GET',
  	      url: "/villes"
  	   }).then(function (success){
  		   
  		   $scope.villes = success.data;
  	   },function (error){
  		   $scope.errorMessage = error.message;	
  	   });
  		
  		$http({
    	      method: 'GET',
    	      url: "/types1"
    	   }).then(function (success){
    		   
    		   $scope.types = success.data;
    	   },function (error){
    		   $scope.errorMessage = error.message;	
    	   });
  		
  		
  		
  		$scope.chargerUser = function(){
  			
  		  var url1 = "/getLoggedUser";
  		  $http({
  		      method: 'GET',
  		      url: url1
  		   }).then(function (success){
  			   console.log("succ ",JSON.stringify(success));
  			   $scope.nomUser = success.data.nom;
  			   $scope.emailUser = success.data.username;
  			   $scope.rolesUser = success.data.roles;
  			   console.log("role user"+ $scope.rolesUser);
  			   
  			   User.setEmail(success.data.username);
  			   console.log("userFactory "+User.getEmail());
  			   User.setRoles(success.data.roles);
  			  
			   $scope.chargerInterventions();
			   
  				  
  		   },function (error){
  			   $scope.errorMessage = success.data.message;	
  		   });
  		  
  		 
  	  };
  	  
  	  $scope.checkAdmin = function(){
  		  
  		  console.log("checkAdmin");
  		  angular.forEach(User.getRoles(), function(value, key) {
  			  console.log("keeeeey = "+key + ': ' + value);
  			  
  			  if(value === "ROLE_admin"){
  				  User.setAdmin(true);
  				  $scope.admin = true;
  			  }
  			});
  	  }
  		
  		  $scope.chargerUser();
  		
	  
	  
	  $scope.goToPage = function(p){
			
			 
			$scope.pageCourante = p;
			$scope.currentPage = p;
			$scope.chargerInterventions();
		 };
	  
	  
	  	  
	  var mail1 = User.getEmail();
		 
		 $scope.chargerInterventions = function(){
			 console.log("charger Interventions BY MAIL");
			 var url1 = "/ActivitesEmployerByMail?email="+User.getEmail()+"&page="+$scope.pageCourante+"&size="+$scope.pageSize;
			 
			 $http({
			      method: 'GET',
			      url: url1
			   }).then(function (success){
				   console.log("succ2 ",JSON.stringify(success));
				   $scope.activitesEmployer = success.data;
					  $scope.currentPage = $scope.pageCourante;
					  console.log("Page courante "+$scope.currentPage);
					  //$scope.pageSize = 1;
					  $scope.totale = success.data.totalActiviterEmployer;
					  console.log("totalActiviteEmployer ",$scope.totale);
					  console.log("Total "+$scope.totale);
			   },function (error){
				   $scope.errorMessage = success.data.message;	
			   });
		 };
		 
		 
		 $scope.query = function(searchText) {
			 console.log("Seach query");
			 var url1 = "/clients2?client="+searchText;
			 
			 
			 return $http({
			      method: 'GET',
			      url: url1
			   }).then(function (success){
				   return success.data;
			   },function(error){
				   console.log("eroor",error);
			   });
			  };
			  
			  
			  $scope.whatClassIsIt= function(someValue){
				  console.log("somevalue "+someValue);
				     if(someValue=="Réaliser"){
				    	 console.log("réaliser")
				            return "label label-success"
				     }else if(someValue=="Planifier")
				         return "label label-info";
				     
				    }
			
 
 
 
}); 


app.controller("chargerAllInterventions",function($scope,$http,User,$window){
	
	$scope.nomUser = null;
	$scope.emailUser = null;
	$scope.rolesUser =[];
	$scope.admin = false;
		
	$scope.chargerUser = function(){
		
		  var url1 = "/getLoggedUser";
		  $http({
		      method: 'GET',
		      url: url1
		   }).then(function (success){
			   console.log("succ ",JSON.stringify(success));
			   $scope.nomUser = success.data.nom;
			   $scope.emailUser = success.data.username;
			   $scope.rolesUser = success.data.roles;
			   console.log("role user"+ $scope.rolesUser);
			   
			   User.setEmail(success.data.username);
			   console.log("userFactory "+User.getEmail());
			   User.setRoles(success.data.roles);
			   $scope.checkAdmin();
				  
		   },function (error){
			   $scope.errorMessage = success.data.message;	
		   });
		  
		 
	  };
	  
	  $scope.checkAdmin = function(){
		  
		  console.log("checkAdmin");
		  angular.forEach(User.getRoles(), function(value, key) {
			  console.log("keeeeey = "+key + ': ' + value);
			  
			  if(value === "ROLE_admin"){
				  User.setAdmin(true);
				  $scope.admin = true;
			  }
			});
	  }
	  
	  
	  
	  $scope.chargerUser();
	  
	
  $scope.intervention = null;
  $scope.pageInterventions=[];
  $scope.pageCourante = 1;
  $scope.pageSize= 5;
  $scope.pages = [];
  $scope.error = false;
  $scope.success = false;
  $scope.clients=[];
  $scope.natures=[];
  $scope.lieux =[];
  $scope.villes=[];
  $scope.selected = false;
  $scope.activitesEmployes=[];
  $scope.admin=false;
  

  	
  	$scope.home = function(){
  		$window.location.href = '/index';
  	}
  	  
 	  		
  		$scope.chargerUser = function(){
  			
  		  var url1 = "/getLoggedUser";
  		  $http({
  		      method: 'GET',
  		      url: url1
  		   }).then(function (success){
  			   console.log("succ ",JSON.stringify(success));
  			   $scope.nomUser = success.data.nom;
  			   $scope.emailUser = success.data.username;
  			   $scope.rolesUser = success.data.roles;
  			   console.log("role user"+ $scope.rolesUser);
  			   
  			   User.setEmail(success.data.username);
  			   console.log("userFactory "+User.getEmail());
  			   User.setRoles(success.data.roles);
  			   
				   $scope.chargerAllInterventions();
			  
  				  
  		   },function (error){
  			   $scope.errorMessage = success.data.message;	
  		   });
  		  
  		 
  	  };
  	  
  	  
  		
  		  $scope.chargerUser();
  		
	  
	  
	  
	  $scope.chargerAllInterventions = function(){
		  console.log("chargerAllInterventions");
		  var url1 = "/ActivitesEmployer?page="+$scope.pageCourante+"&size="+$scope.pageSize;
		  $http({
		      method: 'GET',
		      url: url1
		   }).then(function (success){
			   console.log("succAll ",JSON.stringify(success));
			   $scope.activitesEmployes = success.data;
				  $scope.currentPage = $scope.pageCourante;
				  
				  console.log("Page courante "+$scope.currentPage);
				  //$scope.pageSize = 1;
				  $scope.totale = success.data.totalActiviterEmployer;
				  console.log("totalActiviteEmployer ",$scope.totale);
				  console.log("Total "+$scope.totale);
		   },function (error){
			   $scope.errorMessage = success.data.message;	
		   });
		  
		 
	  };
	  
	 
	  
	  $scope.goToPage = function(p){
			
			 
			$scope.pageCourante = p;
			$scope.currentPage = p;
			$scope.chargerAllInterventions();
		 };
	  
	  
	  	  
			
 
 
 
}); 




