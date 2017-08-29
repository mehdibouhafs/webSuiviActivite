var app=angular.module("MyApp");
function UpdateEventAdminCalendarController($scope, $mdDialog,$route,items,$http,User,mdcDateTimeDialog) {
				 
				 if(User.getAdmin() && (User.getEmail() != items.user.username)){
						$scope.userName = "l'intervention de "+items.user.nom;
					 }else{
						 $scope.userName = "mon intervention";
					 }
				 
				  //var dateDebutVrai =  moment(dateDebut, "DD/MM/YYYY").add(1, 'days').format("DD/MM/YYYY");
				  $scope.dateDebut = items.dateDebut;
				  
				  $scope.id = items.id;
	  
				  
				  var heureDebut = moment(items.dateDebut,'DD/MM/YYYY HH:mm:ss').subtract(1, 'seconds');
				  var dateFin0 =items.dateFin;
				  var dateFin = moment(dateFin0,'DD/MM/YYYY HH:mm:ss').add(1, 'seconds');

				  
				  $scope.heureDebut =moment(heureDebut ,"DD/MM/YYYY HH:mm:ss").toDate();

				  $scope.duree1 = items.dureeFormated;

				  $scope.heureFin =moment(dateFin ,"DD/MM/YYYY HH:mm:ss").toDate();
				  
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
				  
				 
				  
				  $scope.calculerDuree = function(){ // modifié 2 juste pour Update
			  		  var dateDebut = $scope.dateDebut
			  		  var heureDebut = moment($scope.heureDebut).format("DD/MM/YYYY HH:mm:ss");
			  		  var heureFin  = moment($scope.heureFin).format("DD/MM/YYYY HH:mm:ss");
			  		  var dateFinale = $scope.dateFinale;
			  		  console.log("Wa DAte finale " + $scope.dateFinale);
			  		  
			  		console.log("dateDebut2 "+ dateDebut);
					console.log("dateFin2 "+ dateFinale);
					console.log("heuredeb2 "+ heureDebut);
					console.log("heureFin2 "+ heureFin);
			  		   
			  		   var dateDebut1 = moment(dateDebut,"DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY");
			  		   var dateFinale1 = moment(dateFinale,"DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY");
			  		   var heureDebut1 = moment(heureDebut,"DD/MM/YYYY HH:mm:ss").format("HH:mm:ss");
			  		   var heureFin1 = moment(heureFin,"DD/MM/YYYY HH:mm:ss").format("HH:mm:ss");
			  		   
			  		 console.log("DATEFINALE1 " + dateFinale1);
			  		   if(dateFinale1 === "Invalid date"){
			  			   console.log("Invalid Date a mehdi");
			  			   dateFinale1 = moment(dateFinale).format("DD/MM/YYYY");
			  		   }
			  		   console.log("new DateFinale1 " + dateFinale1);
			  		   
			  		   var dateDebut2 = dateDebut1.concat(" "+heureDebut1);
			  		  
			  		  $scope.dateDebut6 = dateDebut2;
			  		 
			  		   var dateFin2 = dateFinale1.concat(" "+heureFin1);
			  		  $scope.dateFin6 =  moment(dateFin2,"DD/MM/YYYY HH:mm:ss");
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
			  	 
			  	 
			  	$scope.typeActivite = {type:"Projet"};
			    
			    $scope.support = {numDemande:"",objet:"",identifiant:"",dateDemande:"",contrat:""};
			    
			    $scope.support1 = {numDemande:"",objet:"",identifiant:"",dateDemande:"",contrat:""};
			    
			    $scope.typeActivite = {type:""};
				  if(items.typeActivite === "AS"){
					  $scope.typeActivite.type="Support";
					  $scope.informations = true;
					  $http({
			 		      method: 'GET',
			 		      url: "/natures2"
			 		   }).then(function (success){
			 			   $scope.natures = success.data;
			 			   console.log("natures " + $scope.natures);
			 		   },function (error){
			 			   $scope.errorMessage = error.message;	
			 		   });
					  $scope.support1 = items.support;
					  $scope.support.numDemande = items.support.numDemande;
					  
					  console.log(" affecter");
				  }else{
					  $scope.typeActivite.type="Projet";
					  $scope.projet = items.projet.id;
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
			   
			    $scope.updateProjets = function(){
			  	  if($scope.typeActivite.type === "Projet" && $scope.selectedItem.codeClient != null){
			  		  $http({
			   	  	      method: 'GET',
			   	  	      url: "/projetByClient?codeClient="+$scope.selectedItem.codeClient
			   	  	   }).then(function (success){
			   	  		   console.log("projetByClient?codeClient="+$scope.selectedItem.codeClient);
			   	  		   $scope.projets = success.data;
			   	  	   },function (error){
			   	  		   $scope.errorMessage = error.message;	
			   	  	   });
			   		  
			  	  }
			    }
			    
			    $scope.loadInformationsSupport = function(){
			  	
			    	console.log("$scope.support.numDemande " + $scope.support.numDemande);
			    	
			  	  if($scope.support.numDemande.length === 0){
			  		 
			  		  $scope.informationError = false;
			  		 $scope.informations = false;
			  	  }else{
			  		  $http({
			  		      method: 'GET',
			  		      url: "/getSupport?numDemande="+$scope.support.numDemande
			  		   }).then(function (success){
			  			   $scope.support1 = success.data;
			  			   
			  			   if( $scope.support1.numDemande !=null){
			  			   $scope.informationError=false;
			  			   $scope.informations = true;
			  			   $scope.selectedItem= $scope.support1.client;
			  			  
			  			   }else{
			  				   $scope.informations = false;
			  				   $scope.informationError=true;
			  			   }
			  		   },function (error){
			  			   $scope.errorMessage = error.message;	
			  		   });
			  		  console.log("Else");
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
				  
					 
					 $scope.changeDebut = function (){
							
						 console.log("ChangeDebut ");
							$scope.changerFin = true;
							$scope.checkBoth();
						}
						
						$scope.changeFin = function (){
							console.log("changerfin False ");
							$scope.changerFin = false;
							$scope.dateFinale = $scope.dateFinale;
							
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
							
							$scope.minDate =  $scope.dateDebut;
							$scope.dateTimeStart = $scope.heureDebut;
							if($scope.changerFin == true){
								console.log("Trueeee");
								$scope.dateFinale = $scope.dateDebut;
							}
							
							
							if(( typeof $scope.heureDebut  ===  'undefined') || ( typeof $scope.heureFin === 'undefined') || (typeof $scope.dateDebut === 'undefined') || (typeof $scope.dateFinale == 'undefined')){
								//console.log("unditest");
								$scope.selected = false;
							}else{
								console.log("dateDebut "+ $scope.dateDebut);
								console.log("dateFin "+ $scope.dateFin);
								console.log("heuredeb "+ $scope.heureDebut);
								console.log("heureFin "+ $scope.heureFin);
								//console.log("afficherTest");
								$scope.calculerDuree();
								$scope.selected = true;
							}
						};
					
					//checkBoth
					$scope.checkBoth();
				  
				
					
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
						  
						  
						  $http({
							    method: 'PUT',
							    url: '/ActivitesEmployer/'+$scope.id+'/',
							    data: dataObj,
							    headers: {'Content-Type': 'application/json'}
							}).then(function(response) {
								console.log("Response PUT "+JSON.stringify(response));
								if(response.config.data!=""){
									
									$scope.message = response;
									//$scope.reset();
									$scope.success=true;
								    $scope.message.success="Votre intervention a été modifé avec succès";
									//$mdDialog.hide();
									$route.reload();
								}else{
									
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
			  