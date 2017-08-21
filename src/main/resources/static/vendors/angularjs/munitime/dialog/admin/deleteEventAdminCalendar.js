var app=angular.module("MyApp");
function deleteEventAdminController($scope, $mdDialog,$route,items,$http) {
				 
				  $scope.userName = "mon intervention"
				 
				  //var dateDebutVrai =  moment(dateDebut, "DD/MM/YYYY").add(1, 'days').format("DD/MM/YYYY");
				  $scope.dateDebut = items.dateDebut;
				  
				  $scope.id = items.id;
				 
				  var heureDebut = moment(items.dateDebut,'DD/MM/YYYY HH:mm:ss').subtract(1, 'seconds');
				  var dateFin0 =items.dateFin;
				  var dateFin = moment(dateFin0,'DD/MM/YYYY HH:mm:ss').add(1, 'seconds');
				  
				  
				  $scope.heureDebut =moment(heureDebut,"DD/MM/YYYY HH:mm:ss").toDate()
				  
				  $scope.heureFin =moment(dateFin,"DD/MM/YYYY HH:mm:ss").toDate();
				  
				  $scope.selected = true;
				  $scope.duree1 = items.dureeFormated;
				  
				  
				  $scope.dateFin = moment( dateFin).format("DD/MM/YYYY HH:mm:ss");
				  
				  $scope.selectedItem = items.client;
				
				  $scope.nature = items.nature.id;
				  console.log("nature1 " + JSON.stringify(items.nature));
				  $scope.ville = items.ville.id;
				  $scope.descProjet = items.descProjet;
				  $scope.projet = items.projet.id;
				  $scope.lieu = items.lieu.id;
				  $scope.type = items.type.id;
				  
				  $scope.dateFinale = $scope.dateFin;
				  
				  
				 
				  
				
					
					
				  
				  $scope.deleteIntervention = function(){
					  
						  
						 
						  $scope.message={
								  "error" : "erreur",
								  "success":"success"
							  };
						  
						  
						  $http({
							    method: 'DELETE',
							    url: '/ActivitesEmployer/'+$scope.id+'/',
							    headers: {'Content-Type': 'application/json'}
							}).then(function(response) {
								console.log("Response DELETE "+JSON.stringify(response));
									$scope.message = response;
									$scope.success=true;
								    $scope.message.success="Votre intervention a été supprimé avec succès";
									//$mdDialog.hide();
									$route.reload();
								
						    }, 
						    function(response) { // optional
						    	$scope.error=true;
								$scope.message.error="Votre intervention n'a pas été supprimé !";
								console.log(response);
						    });
						  
						 
				  };
				  
				  
				  
				  function loadData(){
				 		
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
			 	  	      url: "/projet1"
			 	  	   }).then(function (success){
			 	  		   $scope.projets = success.data;
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
			 }
				  
				  
				  loadData(); 
				   
				  
				  
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