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




app.controller("interventionController",function($scope,$http,$window,User,$mdDialog,$route,$mdMedia,$filter,mdcDateTimeDialog){
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
  
  
  $scope.typeActivite = {type:"Projet"};
  
  $scope.support = {numDemande:"",objet:"",identifiant:"",dateDemande:"",contrat:""};
  
  $scope.support1 = {numDemande:"",objet:"",identifiant:"",dateDemande:"",contrat:""};
 
  $scope.updateProjets = function(){
	  if($scope.typeActivite.type === "Projet" && $scope.selectedItem.codeClient != null){
		  $http({
 	  	      method: 'GET',
 	  	      url: "/projetByClient?codeClient="+$scope.selectedItem.codeClient+"&statutProjet=1"
 	  	   }).then(function (success){
 	  		   console.log("projetByClient?codeClient="+$scope.selectedItem.codeClient);
 	  		   $scope.projets = success.data;
 	  	   },function (error){
 	  		   $scope.errorMessage = error.message;	
 	  	   });
 		  
	  }
  }
  
  $scope.loadInformationsSupport = function(){
	
	  if($scope.support.numDemande.length === 0){
		 
		  $scope.informationError = false;
	  }else{
		  $http({
		      method: 'GET',
		      url: "/getSupport?numDemande="+$scope.support.numDemande
		   }).then(function (success){
			   console.log("support " + JSON.stringify(success.data));
			   $scope.support1 = success.data;
			   
			   if( $scope.support1.numDemande !=null){
			   $scope.informationError=false;
			   $scope.informations = true;
			   $scope.selectedItem= $scope.support1.client;
			   
			   console.log("support " + $scope.support);
			   }else{
				   $scope.informations = false;
				   $scope.informationError=true;
			   }
		   },function (error){
			   $scope.errorMessage = error.message;	
		   });
	  }
	  
  }
  
  $scope.initSupport = function(){
	  $scope.informationError=false;
	  $scope.typeActivite.type="Support";
	  $http({
		      method: 'GET',
		      url: "/natures2"
		   }).then(function (success){
			   $scope.natures = success.data;
			   console.log("natures " + $scope.natures);
		   },function (error){
			   $scope.errorMessage = error.message;	
		   });
	  
  }
  
  $scope.initProjet = function(){
	  $scope.informationError=false;
	   $scope.informations = false;
	  $scope.typeActivite.type="Projet";
	  $scope.support.numDemande = null;
		$http({
		      method: 'GET',
		      url: "/natures3"
		   }).then(function (success){
			   $scope.natures = success.data;
			   console.log("natures " + $scope.natures);
		   },function (error){
			   $scope.errorMessage = error.message;	
		   });
  }
  
  
  $scope.mySplit = function(string, nb) {
	    var array = string.split(' ');
	    return array[nb];
	};
	
	
	$scope.changeDebut = function (){
		
		$scope.changerFin = true;
		$scope.checkBoth();
	}
	
	$scope.changeFin = function (){
		console.log("changerfin False ");
		$scope.changerFin = false;
		
		$scope.checkBoth();
	}
	
	$scope.displayDialogDateDebut = function () {
	      mdcDateTimeDialog.show({
	        //maxDate: $scope.maxDate,
	    	date:true,
	        time: false
	      })
	        .then(function (date) {
	          
	          $scope.dateDebut=date;
	          $scope.changeDebut();
	         
	         
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
	        	  $scope.dateFinale = date;
	        	  $scope.changeFin();
	            
	          });
	      };
	
	
	$scope.displayDialogHeureDebut = function () {
	      mdcDateTimeDialog.show({
	        //maxDate: $scope.maxDate,
	    	date:false,
	        time: true
	      })
	        .then(function (date) {
	          var heureDebut = moment(date).format("DD/MM/YYYY HH:mm");
	          $scope.heureDebut= moment(heureDebut,"DD/MM/YYYY HH:mm").toDate();
	          $scope.checkBoth();
	         
	        });
	    };
	    
	    $scope.displayDialogHeureFin = function () {
	        mdcDateTimeDialog.show({
	          //maxDate: $scope.maxDate,
	      	  date:false,
	          time: true,
	          minDate: $scope.dateTimeStart
	        })
	          .then(function (date) {
	        	  var heureFin = moment(date).format("DD/MM/YYYY HH:mm");
	        	  $scope.heureFin = moment(heureFin,"DD/MM/YYYY HH:mm").toDate();
	        	  $scope.checkBoth();
	          });
	      };
	
	$scope.checkBoth = function(){ //MODIFIED checked
		//console.log("CHECK BOTH ONE");
		if($scope.changerFin == true){
			console.log("Trueeee");
			$scope.dateFinale = $scope.dateDebut;
		}
		$scope.minDate =  $scope.dateDebut;
		$scope.dateTimeStart = $scope.heureDebut;
		
		if(( typeof $scope.heureDebut  ===  'undefined') || ( typeof $scope.heureFin === 'undefined') || (typeof $scope.dateDebut === 'undefined') || (typeof $scope.dateFinale == 'undefined')){
			//console.log("unditest");
			$scope.selected = false;
		}else{
			console.log("heuredeb "+ $scope.heureDebut);
			console.log("heureFin "+ $scope.heureFin);
			//console.log("afficherTest");
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
	    if (isValid && ($scope.selectedItem !=null) && ($scope.selected == true) ) {
	    	
	    	if(($scope.typeActivite.type=="Support" && $scope.informations==true ) ||$scope.typeActivite.type=="Projet" ){
	    		$scope.error = false;
	    	
	    		$scope.saveIntervention();
	    	}else{
	    		$scope.error = true;
	    	}
	    	
	    }else{
	    	console.log("Not valid");
	    	$scope.error = true;
	    	
	    }

	  };
	  
	  
	  $scope.update1 = function(o){
 		   
		  console.log("clicked " + o);
		  var mail = User.getEmail();
		  
		  var type = {
				  "id" : 1
		  }
		 
		  if(o.typeActivite === "AP"){
			  
			  var dataObj = {
					     "typeActivite": "AP",
						"dateDebut":moment(o.dateDebut,"DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"),
						"dateFin": moment(o.dateFin,"DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"),
						"heureDebut": o.heureDebut,
						"heureFin":o.heureFin,
						"client":o.client,
						"nature":o.nature,
						"descProjet":o.descProjet,
						"dureeFormated":o.dureeFormated,
						"lieu":o.lieu,
						"projet":o.projet,
						"type":type,
						"ville":o.ville,
						"duree":o.duree,
						"user":o.user
						
				};	  
		  }else{
			 
			  var dataObj = {
					    "typeActivite": "AS",
						"dateDebut":o.dateDebut,
						"dateFin": o.dateFin,
						"heureDebut": o.heureDebut,
						"heureFin":o.heureFin,
						"client":o.client,
						"nature":o.nature,
						"descProjet":o.descProjet,
						"dureeFormated":o.dureeFormated,
						"lieu":o.lieu,
						"support":o.support,
						"type":type,
						"ville":o.ville,
						"duree":o.duree,
						"user":o.user
				};	  
		  }
		  
		  
		  
		  console.log("dataObj"+ JSON.stringify(dataObj));
		  $scope.message={
				  "error" : "erreur",
				  "success":"success"
			  };
		  
		  
		  $http({
			    method: 'PUT',
			    url: '/ActivitesEmployer/'+o.id+'/',
			    data: dataObj,
			    headers: {'Content-Type': 'application/json'}
			}).then(function(response) {
				console.log("Response PUT "+JSON.stringify(response));
				if(response.config.data!=""){
					
					$scope.message = response;
					
					$scope.success=true;
				    //$scope.message.success="Votre intervention a été modifé avec succès";
					//$mdDialog.hide();
					$route.reload();
				}else{
					//console.log("between");
					//$scope.success=false;
					//$scope.error=true;
					//$scope.message.error="Vous ne pouvez pas faire deux interventions en même temps !";
					//console.log(response);
				}
				
				
		    }, 
		    function(response) { // optional
		    	$scope.error=true;
				$scope.message.error="Votre intervention n'a pas été ajouté !";
				console.log(response);
		    });
		  
		 
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
			    $scope.message.success="Votre intervention a été supprimé avec succès";
				
				$route.reload();
				$mdDialog.hide();
			
	    }, 
	    function(response) { // optional
	    	$scope.error=true;
			$scope.message.error="Votre intervention n'a pas été supprimé !";
			console.log(response);
	   });
   };
	  	
 $scope.calculerDuree = function(){ // modifié 2
	  var dateDebut = moment($scope.dateDebut).format("DD/MM/YYYY HH:mm:ss");
	  var heureDebut = moment($scope.heureDebut).format("DD/MM/YYYY HH:mm:ss");
	  var heureFin  = moment($scope.heureFin).format("DD/MM/YYYY HH:mm:ss");
	  var dateFinale =  moment($scope.dateFinale).format("DD/MM/YYYY HH:mm:ss");
	   
	   var dateDebut1 = moment(dateDebut,"DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY");
	   var dateFinale1 = moment(dateFinale,"DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY");
	   var heureDebut1 = moment(heureDebut,"DD/MM/YYYY HH:mm:ss").format("HH:mm:ss");
	   var heureFin1 = moment(heureFin,"DD/MM/YYYY HH:mm:ss").format("HH:mm:ss");
	   
	   
	   var dateDebut2 = dateDebut1.concat(" "+heureDebut1);
	  
	  $scope.dateDebut6 = dateDebut2;
	 
	   var dateFin2 = dateFinale1.concat(" "+heureFin1)
	  $scope.dateFin6 = dateFin2;
	  $scope.heureDebut6 = heureDebut1;
	  $scope.heureFin6 = heureFin1;
	  
	 
	   var duree="";
	   var dateFin;
	   var ms = moment(dateFin2,"DD/MM/YYYY HH:mm:ss").diff(moment(dateDebut2,"DD/MM/YYYY HH:mm:ss"));
	   
	   var duration = moment.duration(moment(dateFin2,"DD/MM/YYYY HH:mm:ss").diff(moment(dateDebut2,"DD/MM/YYYY HH:mm:ss")));
	   
	   var d = moment.duration(ms);
	   var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
	   
	   //duree = moment.utc(moment(dateFin2 ,"DD/MM/YYYY HH:mm:ss").diff(moment(dateDebut2,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
	   //$scope.duree = $scope.timeConversion(ms);
	   
	   $scope.duree = s;
	   var dur="";
	   	   
	   
	 var totalSeconds = ms / 1000;
     var days = Math.floor(totalSeconds / 86400); // 86400 = 24 hours * 60 minutes * 60 seconds per day
     var hours = Math.floor((totalSeconds % 86400) / 3600); // 3600 = 60 minutes * 60 seconds per day
     var minutes = Math.floor((totalSeconds % 3600) / 60);
	   
	   if(duration.asDays()>1){
		   dur = duration.asDays() +" jour(s)";
	   }
	   if(duration.asHours()>1){
		   dur = dur.concat(" "+duration.asHours()+" heure(s)");
	   }
	   if(duration.asMinutes()<60){
		 dur = dur.concat(" "+duration.asMinutes()+" minute(s)");
	   }
	   $scope.duree1 = days +" jour(s) "+ hours +" heure(s) " + minutes+" minute(s)";
	   
	  
	   
 }; 
	  	 

  
  $scope.saveIntervention = function(){
	 
	  var client ={"id":$scope.selectedItem.id}
	  var nature = {"id":$scope.nature};
	  
	  var lieu = {"id":$scope.lieu};
	  var ville = {"id":$scope.ville};
	  
	  var type = {"id":$scope.type};
	  
	  var projet = {"id":$scope.projet};
	  
	  var mail = User.getEmail();
	  
	  console.log("mail "+mail);
	  var user = {
			  "username":mail
	  }
	  
	   var dateDebut5 = moment($scope.dateDebut6,'DD/MM/YYYY HH:mm:ss').add(1, 'seconds');
	   var dateFin5 = moment($scope.dateFin6,'DD/MM/YYYY HH:mm:ss').subtract(1, 'seconds');
	  
	   var dateDebut6 = moment(dateDebut5,"DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
	   var dateFin6 = moment(dateFin5,"DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");;
	   console.log("dateDebut6 "+dateDebut6);
	   console.log("dateFIN6 "+dateFin6);
	   
	   var heureDebut6 =$scope.heureDebut6;
		   
	   var heureFin6 =$scope.heureFin6;
	   console.log("HeureFin6 "+heureFin6);
	   
	   var support = {
				  "numDemande":$scope.support.numDemande
		  }
	   
	   if($scope.typeActivite.type == "Projet"){
		  var dataObj = {
				    "typeActivite": "AP",
					"dateDebut": dateDebut6,
					"dateFin": dateFin6,
					"heureDebut": heureDebut6,
					"heureFin": heureFin6,
					"client":client,
					"nature":nature,
					"descProjet":$scope.descProjet,
					"dureeFormated":$scope.duree1,
					"lieu":lieu,
					"type":type,
					"ville":ville,
					"projet":projet,
					"duree":$scope.duree,
					"user":user
			};	
	   }else{
		   var dataObj = {
				    "typeActivite": "AS",
					"dateDebut": dateDebut6,
					"dateFin": dateFin6,
					"heureDebut": heureDebut6,
					"heureFin": heureFin6,
					"client":client,
					"nature":nature,
					"descProjet":$scope.descProjet,
					"dureeFormated":$scope.duree1,
					"lieu":lieu,
					"type":type,
					"ville":ville,
					"support":support,
					"duree":$scope.duree,
					"user":user
			};	
	   }
	  
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
				console.log("response post "+ JSON.stringify(response));
			if(response.data!=""){
				console.log(response)
				$scope.message = response;
				$scope.reset();
				$scope.success=true;
			    $scope.message.success="Votre intervention a été ajouté avec succès";
				//$mdDialog.hide();
				//$route.reload();
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
  		$scope.initProjet();
  		$scope.type=null;
  		$scope.dateDebut = null;
  		$scope.heureDebut = null;
  		$scope.dateFinale = null;
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
  	  
  	
  	
  	
  		loadData();
  		
  		 
  		
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
  	  
  	  
  		
  		  $scope.chargerUser();
  		
	  
	  
	  $scope.goToPage = function(p){
			
			 
			$scope.pageCourante = p;
			$scope.currentPage = p;
			$scope.chargerInterventions();
		 };
		 
		 
		 
		 
	$scope.updateFilteredList = function() {
		    $scope.filteredList = $filter("filter")($scope.activitesEmployer, $scope.query2);
	};
	  
	
	  
	  	  
	  var mail1 = User.getEmail();
	  
	  $scope.config = {
			    itemsPerPage: 20,
			    maxPages: 1
			  };
		 
		 $scope.chargerInterventions = function(){
			 console.log("charger Interventions BY MAIL");
			 var url1 = "/ActivitesEmployerAllByMail?email="+User.getEmail(); //just by email
			 var j = 0;
			 $http({
			      method: 'GET',
			      url: url1
			   }).then(function (success){
				   console.log("succ2 ",JSON.stringify(success));
				   $scope.activitesEmployer = success.data;
				   j++;
					   for(var i=0; i<$scope.activitesEmployer.length;i++){
						  
						   console.log(" VW "+ $scope.activitesEmployer[i].dateDebut);
						   var dateDebut = moment($scope.activitesEmployer[i].dateDebut,'DD/MM/YYYY HH:mm:ss').subtract(1, 'seconds');
						   var dateFin = moment($scope.activitesEmployer[i].dateFin,'DD/MM/YYYY HH:mm:ss').add(1, 'seconds');
						   $scope.activitesEmployer[i].dateDebut=moment(dateDebut,'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
						   $scope.activitesEmployer[i].dateFin=moment(dateFin,'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
						   $scope.activitesEmployer[i].heureDebut = moment($scope.activitesEmployer[i].heureDebut,'HH:mm:ss').format('HH:mm');
						   $scope.activitesEmployer[i].heureFin = moment( $scope.activitesEmployer[i].heureFin,'HH:mm:ss').format('HH:mm');
						   $scope.activitesEmployer[i].duree= moment($scope.activitesEmployer[i].duree,'HH:mm:ss').format('HH:mm:ss');
						   if($scope.activitesEmployer[i].typeActivite === "AS"){
							  
							   $scope.activitesEmployer[i].projet.projet = $scope.activitesEmployer[i].support.objet;
						   }
						   
					   }
					   console.log("Hire "+ JSON.stringify($scope.activitesEmployer));
			   
			      $scope.filteredList = $scope.activitesEmployer;
				  //$scope.currentPage = $scope.pageCourante;
				 
				  //$scope.pageSize = 1;
				  //$scope.totale = success.data.totalActiviterEmployer;
				  //console.log("totalActiviteEmployer ",$scope.totale);
				  //console.log("Total "+$scope.totale);
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
		
		     if(someValue=="Réalisée"){
		    	 
		            return "label label-success"
		     }else if(someValue=="Planifiée")
		         return "label label-info";
		     
		    };
		    
			    
	    $scope.updateEventTableInterventions = function(activiteEmploye) {
		    $mdDialog.show({
		      controller: UpdateEventCalendarController,
		      templateUrl: '/protected/dialogUpdateEvent2.html',
		      parent: angular.element(document.body),
		      clickOutsideToClose:true,
		      fullscreen:true,
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
    	 //console.log("activiteEmploye "+activiteEmploye.dateDebut);
		 $scope.activiteEmploye = activiteEmploye
		 $scope.updateEventTableInterventions($scope.activiteEmploye);
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
 
 
 
}); 







