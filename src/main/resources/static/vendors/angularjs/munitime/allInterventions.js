
var app=angular.module("MyApp");


app.controller("chargerAllInterventions",function($scope,$http,$route,User,$window,$mdDialog,$mdMedia,$filter){
	
	$scope.nomUser = null;
	$scope.emailUser = null;
	$scope.rolesUser =[];
	$scope.admin = false;
		

	  
	
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
  		
  		$scope.updateFilteredList = function() {
		    $scope.filteredList = $filter("filter")($scope.activitesEmployes1, $scope.query3);
	};
	  
	  
	 $scope.config = {
			    itemsPerPage: 20,
			    maxPages: 1
			  };
	
	  $scope.chargerAllInterventions = function(){
		  console.log("chargerAllInterventions");
		  var url1 = "/ActivitesEmployers";
		  $http({
		      method: 'GET',
		      url: url1
		   }).then(function (success){
			   //console.log("succAll ",JSON.stringify(success));
			   $scope.activitesEmployes1 = success.data;
				  //$scope.currentPage = $scope.pageCourante;
				  for(var i=0; i<$scope.activitesEmployes1.length ;i++){
					   console.log(" VW "+ $scope.activitesEmployes1[i].dateDebut);
					   var dateDebut = moment($scope.activitesEmployes1[i].dateDebut,'DD/MM/YYYY HH:mm:ss').subtract(1, 'seconds');
					   var dateFin = moment($scope.activitesEmployes1[i].dateFin,'DD/MM/YYYY HH:mm:ss').add(1, 'seconds');
					   $scope.activitesEmployes1[i].dateDebut=moment(dateDebut,'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
					   $scope.activitesEmployes1[i].dateFin=moment(dateFin,'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
				   }
				  
				  $scope.filteredList = $scope.activitesEmployes1;
				  //console.log("Page courante "+$scope.currentPage);
				  //$scope.pageSize = 1;
				  //$scope.totale = success.data.totalActiviterEmployer;
				  //console.log("totalActiviteEmployer ",$scope.totale);
				  //console.log("Total "+$scope.totale);
		   },function (error){
			   $scope.errorMessage = success.data.message;	
		   });
		  
		 
	  };
	  
	  $scope.updateAllInterventionsAdminTableau = function(activiteEmploye) {
		    $mdDialog.show({
		      controller: UpdateEventCalendarController,
		      templateUrl: '/protected/dialogUpdateEvent2.html',
		      parent: angular.element(document.body),
		      locals: {
		    	  items: activiteEmploye
		       },
		      
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
		  
		    


	    
		$scope.updateEtat =function(activiteEmploye){
			 console.log("activiteEmploye "+activiteEmploye.dateDebut);
			 $scope.activiteEmploye = activiteEmploye
			 $scope.updateAllInterventionsAdminTableau($scope.activiteEmploye);
		};
		
		$scope.delete1 = function(o){
	  		 $scope.message={
					  "error" : "erreur",
					  "success":"success"
				  };
			  
			  $http({
				    method: 'DELETE',
				    url: '/ActivitesEmployer/'+o.id+'/',
				    headers: {'Content-Type': 'application/json'}
				}).then(function(response) {
					console.log("Response DELETE "+JSON.stringify(response));
						$scope.message = response;
						$scope.success=true;
					   // $scope.message.success="Votre intervention a été supprimé avec succès";
						
						$route.reload();
						//$mdDialog.hide();
					
			    }, 
			    function(response) { // optional
			    	$scope.error=true;
					$scope.message.error="Votre intervention n'a pas été supprimé !";
					console.log(response);
			    });
	  	};
			  
	 
	  
	  $scope.goToPage = function(p){
			
			 
			$scope.pageCourante = p;
			$scope.currentPage = p;
			$scope.chargerAllInterventions();
		 };
		 
		 
		
	  
	  
	  	  
			
 
 
 
}); 