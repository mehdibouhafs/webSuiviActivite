var app=angular.module("MyApp");
app.controller("calendarGroupe",function($scope, $window, $ocLazyLoad, calendarConfig, moment,alert,$http,User,$mdDialog,$mdMedia){
	
	 var vm = this;
	$scope.nomUser = null;
	$scope.emailUser = null;
	$scope.rolesUser =[];
	$scope.admin = false;
	vm.userSelected = [];
		
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
			   $scope.chargerAllInterventions();
				  
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
	  
	  $scope.logout = function(){
		  var url1 = "/logout";
		  $http({
		      method: 'GET',
		      url: url1
		   }).then(function (success){
			   console.log("succ ",JSON.stringify(success));
			    
		   },function (error){
			   $scope.errorMessage = success.data.message;	
		   });
	  };
	  
	  $scope.chargerUser();
	  
	  
	 

	    //These variables MUST be set as a minimum for the calendar to work
	    vm.calendarView = 'month';
	    vm.dayViewEventWidth = 300;
	    vm.viewDate = new Date();
	    calendarConfig.calendarTitle="Toutes les interventions";
	    calendarConfig.dateFormatter = 'moment'; // use moment instead of angular for formatting dates
	    var originali18n = angular.copy(calendarConfig.i18nStrings);
	    calendarConfig.i18nStrings.weekNumber = 'Semaine {week}';
	    calendarConfig.dateFormatter = 'moment';
	    var originalFormat = calendarConfig.dateFormats.hour;
	    calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';
	    //calendarConfig.showTimesOnWeekView = true;

	    $window.moment = $window.moment || moment;
	    $ocLazyLoad.load('fr.js').then(function() {
	        moment.locale('fr', {

	          months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	          monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	          weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	          weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	          weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	          longDateFormat : {
	              LT : 'HH:mm',
	              LTS : 'HH:mm:ss',
	              L : 'DD/MM/YYYY',
	              LL : 'D MMMM YYYY',
	              LLL : 'D MMMM YYYY HH:mm',
	              LLLL : 'dddd D MMMM YYYY HH:mm'
	          },
	          week: {
	            dow: 1 // Monday is the first day of the week
	          },
	          calendar : {
	              sameDay: '[Aujourd\'hui à] LT',
	              nextDay: '[Demain à] LT',
	              nextWeek: 'dddd [à] LT',
	              lastDay: '[Hier à] LT',
	              lastWeek: 'dddd [dernier à] LT',
	              sameElse: 'L'
	          },
	          relativeTime : {
	              future : 'dans %s',
	              past : 'il y a %s',
	              s : 'quelques secondes',
	              m : 'une minute',
	              mm : '%d minutes',
	              h : 'une heure',
	              hh : '%d heures',
	              d : 'un jour',
	              dd : '%d jours',
	              M : 'un mois',
	              MM : '%d mois',
	              y : 'un an',
	              yy : '%d ans'
	          },
	          ordinalParse: /\d{1,2}(er|)/,
	          ordinal : function (number) {
	              return number + (number === 1 ? 'er' : '');
	          }
	           
	          

	        });
	        
	      });

	    $scope.$on('$destroy', function() {
	      moment.locale('en');
	      calendarConfig.i18nStrings = originali18n;
	      calendarConfig.dateFormats.hour = originalFormat; // reset for other demos
	    });
	    var actions = [];
	    
	    
	    vm.events = [];
	    
	    
	    

	    vm.cellIsOpen = true;

	    vm.addEvent = function() {
	      vm.events.push({
	        title: 'New event',
	        startsAt: moment().startOf('day').toDate(),
	        endsAt: moment().endOf('day').toDate(),
	        color: calendarConfig.colorTypes.important,
	        
	      });
	    };
		  
		  $scope.showEventAdmin = function(activiteEmploye) {
			  console.log("activi "+activiteEmploye);
			    $mdDialog.show({
			      controller: showEventAdminController,
			      templateUrl: '/protected/dialogShowEvent.html',
			      parent: angular.element(document.body),
			      clickOutsideToClose:true,
			      fullscreen:true,
			      locals: {
			    	  items: activiteEmploye
			       },
			      
			     // Only for -xs, -sm breakpoints.
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
			  
			  
	    /* showEventAdmin Calendrier */
			  
	    vm.eventClicked = function(event) {
	    	$http({
			    method: 'GET',
			    url: "ActivitesEmploye?id="+$scope.mySplit(event.title,1),
			    headers: {'Content-Type': 'application/json'}
			}).then(function(response) {
					
					$scope.activiterEmployer = response.data;
					console.log(" respGetActiEmpl3 "+JSON.stringify($scope.activiterEmployer));
					$scope.success=true;
					
					 $scope.showEventAdmin(response.data);
                    //alert.show('Edited ', $scope.activiterEmployer);
				
		    }, 
		    function(response) { // optional
				console.log(response);
		    });
	    };

	    
	    
	    

	    vm.eventTimesChanged = function(event) {
	      alert.show('Dropped or resized', event);
	    };

	    vm.toggle = function($event, field, event) {
	      $event.preventDefault();
	      $event.stopPropagation();
	      event[field] = !event[field];
	    };
	    
	    /* Click sur les buttons du calendrier */

	    vm.timespanClicked = function(date, cell) {

	      if (vm.calendarView === 'month') {
	        if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
	          vm.cellIsOpen = false;
	        } else {
	          vm.cellIsOpen = true;
	          vm.viewDate = date;
	        }
	      } else if (vm.calendarView === 'year') {
	        if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
	          vm.cellIsOpen = false;
	        } else {
	          vm.cellIsOpen = true;
	          vm.viewDate = date;
	        }
	      }

	    };	   
		    $scope.users =[];

			$scope.chargerAllUsers = function(){
				
				  var url1 = "/allUserGroupe?idGroupe="+User.getGroupe()+"&email="+User.getEmail();
				  $http({
				      method: 'GET',
				      url: url1
				   }).then(function (success){
					   console.log("succALlUsers ",JSON.stringify(success));
					   vm.users = success.data;
						  $scope.currentPage = $scope.pageCourante;
						  console.log("Page courante "+$scope.currentPage);
						  //$scope.pageSize = 1;
						  $scope.totale = success.data.totalUsers;
						  
				   },function (error){
					   $scope.errorMessage = success.data.message;	
				   });
				  
				 
			  };
			  
			  $scope.chargerAllUsers(); 
			  
				  
				  $scope.chargerAllInterventions = function(){
				      console.log("chargerAllInterventionsByEmail");
				      console.log("User "+User.getEmail());
				      var url1 = "/ActivitesEmployeGroupe?codeGroupe="+User.getGroupe()+"&email="+User.getEmail();
				      $http({
				          method: 'GET',
				          url: url1
				       }).then(function (success){
				         console.log("succ ",JSON.stringify(success));
				          $scope.activitesEmployer = success.data;
				          //$scope.currentPage = $scope.pageCourante;
				          
				         
				          $scope.chargerEvent();
				          //$scope.pageSize = 1;
				          //$scope.totale = success.data.totalActiviterEmployer;
				          //console.log("totalActiviteEmployer ",$scope.totale);
				          //console.log("Total "+$scope.totale);
				       },function (error){
				         $scope.errorMessage = success.data.message;  
				       });
				      
				    };
				    
				    	
				      $scope.modifier = function(activiteEmploye){
							  console.log("activiteEmploye "+activiteEmploye.dateDebut);
								 $scope.activiteEmploye = activiteEmploye
								 updateEventAdminCalendar($scope.activiteEmploye);
							 };
							 
							 
					   $scope.supprimer = function(activiteEmploye){
							  console.log("activiteEmploye "+activiteEmploye.dateDebut);
								 $scope.activiteEmploye = activiteEmploye
								 deleteEventAdmin($scope.activiteEmploye);
							 };
							 
							  
							  
				  $scope.mySplit = function(string, nb,sep) {
				        var array = string.split(',');
				        return array[nb];
				    }

				    $scope.chargerEvent = function(){
				    	
				    	vm.events = [];
				    	console.log("ActiviteEmployer ",$scope.activitesEmployer);
				    	console.log("color "+getRandomColor());
				    	console.log("Size= ",$scope.activitesEmployer.length);
				    	
				    	for(var i=0;i<=$scope.activitesEmployer.length-1;i++){
				    		var color = getRandomColor();
				    		
				    		
				    		var title =' <p hidden>,' +$scope.activitesEmployer[i].id+',</p><i class="fa fa-user"></i> <span style="margin-left: 5px;"> '+$scope.activitesEmployer[i].user.nom+'     </span><i class="fa fa-building" style="margin-left: 5px;></i> <span style="margin-left: 5px;"> '+$scope.activitesEmployer[i].client.client+'</span><i class="fa fa-suitcase"  style="margin-left: 5px;"></i><span  style="margin-left: 5px;">Nature :  '+$scope.activitesEmployer[i].nature.nature +'</span><i class="fa fa-tasks"  style="margin-left: 5px;"></i><span  style="margin-left: 5px;"> Action:  '+$scope.activitesEmployer[i].descProjet+'</span><i class="fa fa-clock-o"  style="margin-left: 5px;"></i><span  style="margin-left: 5px;"> durée :  '+ $scope.activitesEmployer[i].dureeFormated;
					    	var color1;
				    		
					     if($scope.activitesEmployer[i].typeActivite == "AP"){
				    			
				    			if($scope.activitesEmployer[i].type.type == "Réalisée"){
				    				color1 = '#70FFE7';
				    			}else{
				    				color1 = '#C6F9FF';
				    			}
					    		
					    	}else{
				    			if($scope.activitesEmployer[i].type.type == "Réalisée"){
				    				color1 = '#FFF8BC';
				    			}else{
				    				color1 = '#FFD7FA';
				    			}
					    	}
				    		
					     
				    		vm.events.push({
					            title:  title,
					            startsAt: moment($scope.activitesEmployer[i].dateDebut ,"DD/MM/YYYY hh:mm:ss"),
					            endsAt: moment($scope.activitesEmployer[i].dateFin ,"DD/MM/YYYY hh:mm:ss"),
					            color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
					                primary: color1, // the primary event color (should be darker than secondary)
					                secondary: color1 // the secondary event color (should be lighter than primary)
					              },
					              actions: [{
					                  label:'<i class=\'glyphicon glyphicon-pencil\'></i>',
					                  onClick: function(args) {
					                	console.log(JSON.stringify(args));
					                	console.log("idSplit  "+$scope.mySplit(args.calendarEvent.title,1));
					                	//console.log("idSplit  "+$scope.mySplit(args.calendarEvent.actions[0].label,1));
					                	
					                	$http({
					        			    method: 'GET',
					        			    url: "ActivitesEmploye?id="+$scope.mySplit(args.calendarEvent.title,1),
					        			    headers: {'Content-Type': 'application/json'}
					        			}).then(function(response) {
					        					
					        					$scope.activiterEmployer = response.data;
					        					console.log(" respGetActiEmpl1 "+$scope.activiterEmployer);
					        					$scope.success=true;
					        					$scope.modifier($scope.activiterEmployer);
							                    //alert.show('Edited ', $scope.activiterEmployer);
					        				
					        		    }, 
					        		    function(response) { // optional
					        				console.log(response);
					        		    });
					                	
					                	
					                  }
					                },
					                 {
					                    label: '<i class=\'glyphicon glyphicon-remove\'></i>',
					                    onClick: function(args) {
					                    	
					                    	$http({
						        			    method: 'GET',
						        			    url: "ActivitesEmploye?id="+$scope.mySplit(args.calendarEvent.title,1),
						        			    headers: {'Content-Type': 'application/json'}
						        			}).then(function(response) {
						        					
						        					$scope.activiterEmployer = response.data;
						        					console.log(" respGetActiEmpl1 "+$scope.activiterEmployer);
						        					$scope.success=true;
						        					$scope.supprimer($scope.activiterEmployer);
								                    //alert.show('Edited ', $scope.activiterEmployer);
						        				
						        		    }, 
						        		    function(response) { // optional
						        				console.log(response);
						        		    });
					                 }
					                }
					          ],
					            draggable: false, //Allow an event to be dragged and dropped
					    	    resizable: false, //Allow an event to be resizable
					    	    incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
					    	    recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
					    	    cssClass: 'a-css-class-name', //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
					    	    allDay: false // set to true to display the event as an all day event on the day view
					            });
				    	}
				    	
				    	
				    	
				   };
				   
				   
				   $scope.chargerAllInterventionsFiltred = function(){
					      console.log("chargerAllInterventionsFiltred");
					      console.log("User "+User.getEmail());
					      console.log("users selected "+JSON.stringify(vm.userSelected));
					      
					      var emails="";
					      for(var i=0;i<=vm.userSelected.length-1;i++){
					    	  emails = emails+vm.userSelected[i].username;
					    	  if(i<vm.userSelected.length-1){
					    		  emails = emails+",";
					    	  }
					      }
					      console.log("emails"+emails);
					      if(emails!=""){
					      var url1 = "/ActivitesEmployersFiltred/"+emails+"/";
					      $http({
					          method: 'GET',
					          url: url1
					       }).then(function (success){
					         console.log("succ ",JSON.stringify(success));
					          $scope.activitesEmployer = success.data;
					          //$scope.currentPage = $scope.pageCourante;
					          $scope.chargerEvent();
					          //$scope.pageSize = 1;
					          //$scope.totale = success.data.totalActiviterEmployer;
					          //console.log("totalActiviteEmployer ",$scope.totale);
					          //console.log("Total "+$scope.totale);
					       },function (error){
					         $scope.errorMessage = success.data.message;  
					       });
					      }else{
					    	  $scope.chargerAllInterventions();
					      }
					      
					    };
	   
});