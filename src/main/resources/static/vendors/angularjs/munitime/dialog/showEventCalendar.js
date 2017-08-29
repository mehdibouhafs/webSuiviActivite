 var app=angular.module("MyApp");
function showEventController($scope, $mdDialog,$route,items,User,$http) {
			   
			
			  $scope.userName = "mon intervention";
			  
			  $scope.typeActivite = {type:""};
			  if(items.typeActivite === "AS"){
				  $scope.typeActivite.type="Support";
				  $scope.support1 = items.support;
			  }else{
				  $scope.typeActivite.type="Projet";
				  $scope.projet = items.projet.id;
			  }
			 
			  console.log("DialogControllerShowed click event User " );
			  
			 // var dateDebut = moment(items.dateDebut ,"DD/MM/YYYY HH:mm:ss").toDate();
			  //var dateDebutVrai =  moment(dateDebut, "DD/MM/YYYY").add(1, 'days').format("DD/MM/YYYY");
			  $scope.dateDebut = items.dateDebut;
			  
			  
			  $scope.selected=true;
			  $scope.duree = items.duree;
			  $scope.id = items.id;
			  console.log("Dated.getDatedDateDebut() "+items.dateDebut);
			  console.log("Dated.getDatedDateFin() "+items.dateFin);
			  
			  
			  var dateFin0 =items.dateFin;
			  var heureDebut = moment(items.dateDebut,'dd/MM/YYYY HH:mm:ss').subtract(1, 'seconds');
			  
			  console.log("Heure debut " + heureDebut);
			  console.log("Date fin 0 " + dateFin0);
			  var dateFin = moment(dateFin0,'DD/MM/YYYY HH:mm:ss').add(1, 'seconds');
			   
			   
			   
			  
			  $scope.heureDebut =moment(heureDebut ,"DD/MM/YYYY HH:mm:ss").toDate();
			  
			  
			  
			  $scope.duree1 = items.dureeFormated;
			  
			  
			  $scope.heureFin = moment(dateFin,"DD/MM/YYYY HH:mm:ss").toDate();
			  console.log("heure Fin " + $scope.heureFin);
			  $scope.dateFin = moment(dateFin).format("DD/MM/YYYY HH:mm:ss");
			  console.log("date Fin " + $scope.dateFin);
			  $scope.selectedItem = items.client;
			
			  $scope.nature = items.nature.id;
			  console.log("nature1 " + JSON.stringify(items.nature));
			  $scope.ville = items.ville.id;
			 
			  $scope.descProjet = items.descProjet;
			  $scope.lieu = items.lieu.id;
			  $scope.type = items.type.id;
			  
			  $scope.dateFinale = $scope.dateFin;
			  
			 	   
			  
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
		 		      url: "/natures3"
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
		  
		  function getRandomColor() {
	    	  var letters = '0123456789ABCDEF';
	    	  var color = '#';
	    	  for (var i = 0; i < 6; i++) {
	    	    color += letters[Math.floor(Math.random() * 16)];
	    	  }
	    	  return color;
	    	}