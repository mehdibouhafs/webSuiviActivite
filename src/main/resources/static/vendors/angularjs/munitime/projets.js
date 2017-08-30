
var app=angular.module("MyApp");


app.controller("projetsController",function($scope,$http,$route,User,$window,$mdDialog,$mdMedia,$filter){
	
  	$scope.updateFilteredList = function() {
		    $scope.filteredList = $filter("filter")($scope.projets, $scope.query4);
	};
	  
	  
	 $scope.config = {
			    itemsPerPage: 20,
			    maxPages: 1
			  };
	
	  $scope.chargerAllProjets = function(){
		  console.log("chargerAllProjets");
		  var url1 = "/projet1";
		  $http({
		      method: 'GET',
		      url: url1
		   }).then(function (success){
			   console.log("succAll Projets =  ",JSON.stringify(success));
			   $scope.projets = success.data;
				  //$scope.currentPage = $scope.pageCourante;
				  
				  
				  $scope.filteredList = $scope.projets;
				  //console.log("Page courante "+$scope.currentPage);
				  //$scope.pageSize = 1;
				  //$scope.totale = success.data.totalActiviterEmployer;
				  //console.log("totalActiviteEmployer ",$scope.totale);
				  //console.log("Total "+$scope.totale);
		   },function (error){
			   $scope.errorMessage = success.data.message;	
		   });
		  
		 
	  };
	  
	  
	  
	  
	  $scope.chargerValideProjets = function() {
		  
		  $http({
 	  	      method: 'GET',
 	  	      url: "/projetByStatut?statutProjet=1"
 	  	   }).then(function (success){
 	  		   $scope.projets = success.data;
 	  		  $scope.filteredList = $scope.projets;
 	  		$scope.updateFilteredList();
 	  	   },function (error){
 	  		   $scope.errorMessage = error.message;	
 	  	   });
	  
	  };
	  
	  $scope.chargerClotureProjets = function() {
		  
		  $http({
 	  	      method: 'GET',
 	  	      url: "/projetByStatut?statutProjet=0"
 	  	   }).then(function (success){
 	  		   $scope.projets = success.data;
 	  		$scope.filteredList = $scope.projets;
 	  		$scope.updateFilteredList();
 	  	   },function (error){
 	  		   $scope.errorMessage = error.message;	
 	  	   });
	  
	  };
	  
	
	  
	 
      $scope.chargerAllProjets();
	  $scope.statut1 = "";  
	
      $scope.whatClassIsIt2= function(someValue){
  			 
		     if(someValue==1){
		    	
		    	  
		            return "label label-success"
		     }else if(someValue==0){
		    	 
		    	
		         return "label label-danger";
		     }
		     
		    };
	  
     $scope.update1 = function(item){
    	 console.log("item "+ JSON.stringify(item));
    	 var url = "/projete/"+item.id;
		  console.log("url " +url);
		  console.log("projets " +$scope.projet);
		  
		 
		  $scope.message = {
				  "success":"success",
				  "error" :"error"
		  }
		  
		  item.statutProjet = 0;
		  var obj = item;
		  
		  
		  $http({
			    method: 'PUT',
			    url: url,
			    data:obj,
			    headers: {'Content-Type': 'application/json'}
			}).then(function(response) {
					console.log("response 1 "+response)
					//$scope.message = response;
					//$scope.success=true;
				    //$scope.message.success="le projet "+item.projet+" a été modifié avec succès";
					//$mdDialog.hide();
					$route.reload();
				
				
		    }, 
		    function(response) { // optional
		    	console.log("response "+response);
		    	//$scope.error=true;
				//$scope.message.error="le projet n'a pas été modfié !";
				
		    });
     }
     
     $scope.update2 = function(item){
    	 console.log("item "+ JSON.stringify(item));
    	 var url = "/projete/"+item.id;
		  console.log("url " +url);
		  
		  
		 
		  $scope.message = {
				  "success":"success",
				  "error" :"error"
		  }
		  
		  item.statutProjet = 1;
		  var obj = item;
		  
		  
		  $http({
			    method: 'PUT',
			    url: url,
			    data:obj,
			    headers: {'Content-Type': 'application/json'}
			}).then(function(response) {
					console.log("response 1 "+response)
					//$scope.message = response;
					//$scope.success=true;
				    //$scope.message.success="le projet "+item.projet+" a été modifié avec succès";
					//$mdDialog.hide();
					$route.reload();
				
				
		    }, 
		    function(response) { // optional
		    	console.log("response "+response);
		    	//$scope.error=true;
				//$scope.message.error="le projet n'a pas été modfié !";
				
		    });
     }
	  	  
			
 
 
 
}); 