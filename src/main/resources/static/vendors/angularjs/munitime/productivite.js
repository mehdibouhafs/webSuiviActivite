
var app=angular.module("MyApp");


app.controller("productiviteController",function($scope,$http,$route,User,$window,$mdDialog,$mdMedia,$filter){
	
	$scope.nomUser = null;
	$scope.emailUser = null;
	$scope.rolesUser =[];
	$scope.admin = false;

	$scope.intervention = null;
	
	  $scope.dateDebut = moment().startOf('month').format("DD-MM-YYYY HH:mm:ss")
	  $scope.dateFin = moment().format("DD-MM-YYYY HH:mm:ss");
	  $scope.dateFin1 = $scope.dateFin;
	  
	  console.log("Date fin " + $scope.dateFin);
	  $scope.minDate =  $scope.dateDebut;
	
    $scope.changeDebut = function (){
	  console.log("changerDebut  ");
		$scope.minDate = $scope.dateDebut;
		$scope.chargerAllTauxUsers();
	}
	
	$scope.changeFin = function (){
		$scope.dateFin1 = moment($scope.dateFin).format("DD-MM-YYYY HH:mm:ss");
		 $scope.chargerAllTauxUsers();
	}
	
	$scope.displayDialogDateDebut = function () {
	      mdcDateTimeDialog.show({
	        //maxDate: $scope.maxDate,
	    	date:true,
	        time: false
	      })
	        .then(function (date) {
	          
	          $scope.dateDebut=date;
	         
	         
	         
	        });
	    };
	    
	    $scope.displayDialogDateFin = function () {
	        mdcDateTimeDialog.show({
	          //maxDate: $scope.maxDate,
	      	  date:true,
	          time: false,
	          minDate: $scope.minDate
	        })
	          .then(function (date) {
	        	  $scope.dateFin = date;
	        	 
	            
	          });
	      };
	   

 

  

  
 
  
  	$scope.home = function(){
  		$window.location.href = '/index';
  	}
  	  
  		$scope.updateFilteredList = function() {
		    $scope.filteredList = $filter("filter")($scope.tauxUser, $scope.query3);
	};
	  
	  
	 $scope.config = {
			    itemsPerPage: 20,
			    maxPages: 1
			  };
	
	  $scope.chargerAllTauxUsers = function(){
		  console.log("charger Taux Users Interventions");
		
		  var url1 = "/ActiviterEmployerTauxByDate?dateDebut="+moment($scope.dateDebut).format("DD-MM-YYYY HH:mm:ss")+"&dateFin="+$scope.dateFin1;
		  $http({
		      method: 'GET',
		      url: url1
		   }).then(function (success){
			   console.log("succTauxUsers ",JSON.stringify(success));
			   $scope.tauxUser = success.data;  
			   $scope.filteredList = $scope.tauxUser;
			  
				  
		   },function (error){
			   $scope.errorMessage = success.data.message;	
		   });
		  
		 
	  };
	  
	  $scope.chargerAllTauxUsers();

		  
	
		
	   
      $scope.checkBoth = function(){ //MODIFIED checked
  		//console.log("CHECK BOTH ONE");
  		if($scope.changerFin == true){
  			console.log("Trueeee");
  			$scope.dateFin = $scope.dateDebut;
  		}
  		$scope.minDate =  $scope.dateDebut;
  		
  		
  		if((typeof $scope.dateFinale == 'undefined')){
  			console.log(" dateFinale undefined");
  		}else{
  			
  			$scope.chargerAllTauxUsers();
  			
  		}
  	};

			  
	 
	  

		 
		
	  
	  
	  	  
			
 
 
 
}); 