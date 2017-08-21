var app = angular.module('MyApp', ['angular-table','angular-tabs','chart.js','googlechart','ngMaterial','ngSanitize','ui.select','ngRoute','mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module','oc.lazyLoad','ngMaterialDatePicker','bw.paging']);
//angular.module('mwl.calendar.docs') //you will need to declare your module with the dependencies ['mwl.calendar', 'ui.bootstrap', 'ngAnimate']

app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider.when('/Allinterventions',{templateUrl:'/protected//Allinterventions.html'});
	$routeProvider.when('/mesinterventions',{templateUrl:'/protected//mesinterventions.html'});
	$routeProvider.when('/nouvelleIntervention',{templateUrl:'/protected/nouvelleIntervention.html'});
	$routeProvider.when('/nouveauClient',{templateUrl:'/protected/nouveauClient.html'});
	$routeProvider.when('/nouveauUtilisateur',{templateUrl:'/protected/nouveauUtilisateur.html'});
	$routeProvider.when('/moncalendrier',{templateUrl:'/protected/calendar.html'});
	$routeProvider.when('/adminCalendar',{templateUrl:'/protected/adminCalendar.html'});
	$routeProvider.when('/interventionGroupe',{templateUrl:'/protected/interventionGroupe.html'});
	
	$routeProvider.when('/nouvelleNature',{templateUrl:'/protected/nouvelleNature.html'});
	$routeProvider.when('/profile',{templateUrl:'/protected/profile.html'});
	$routeProvider.when('/help',{templateUrl:'/protected/help.html'});
	$routeProvider.when('/mesinterventions',{templateUrl:'/protected/mesinterventions.html'});
	$routeProvider.when('/index',{templateUrl:'/protected/home.html'});
	$routeProvider.when('/nouveauLieu',{templateUrl:'/protected/nouveauLieu.html'});
	$routeProvider.when('/nouveauStatut',{templateUrl:'/protected/nouveauStatut.html'});
	$routeProvider.when('/nouveauClient',{templateUrl:'/protected/nouveauClient.html'});
	$routeProvider.when('/nouveauProjet',{templateUrl:'/protected/nouveauProjet.html'});
	$routeProvider.when('/nouveauJour',{templateUrl:'/protected/nouveauJour.html'});
	$routeProvider.otherwise('/index');
	$locationProvider.html5Mode({enabled:true,requireBase:false});
}
	
]);



app.filter('propsFilter', function() {
	  return function(items, props) {
	    var out = [];

	    if (angular.isArray(items)) {
	      var keys = Object.keys(props);

	      items.forEach(function(item) {
	        var itemMatches = false;

	        for (var i = 0; i < keys.length; i++) {
	          var prop = keys[i];
	          var text = props[prop].toLowerCase();
	          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
	            itemMatches = true;
	            break;
	          }
	        }

	        if (itemMatches) {
	          out.push(item);
	        }
	      });
	    } else {
	      // Let the output be the input untouched
	      out = items;
	    }

	    return out;
	  };
	});

app.filter('split', function() {
    return function(input, splitChar, splitIndex) {
        // do some bounds checking here to ensure it has that index
        return input.split(splitChar)[splitIndex];
    }
});


app.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
}])

app.factory('User', function(){
	
	var user = {
	        email: '',
	        roles:[],
	        groupe:'',
	        admin:false,
	        chefgroupe:false
	    };
    
    return {
        getEmail: function () {
            return user.email;
        },
        setEmail: function (email) {
            user.email = email;
        },
        getGroupe: function () {
            return user.groupe;
        },
        setGroupe: function (groupe) {
            user.groupe = groupe;
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
        },
        getChefgroupe: function () {
            return user.chefgroupe;
        },
        setChefgroupe: function (chefgroupe) {
            user.chefgroupe = chefgroupe;
        }
    };
   
});

app.factory('Dated', function(){
	
	var dated = {
	        dateDebut: '',
	        dateFin:''
	    };
    
    return {
        getDatedDateDebut: function () {
            return dated.dateDebut;
        },
        setDatedDateDebut: function (date) {
            dated.dateDebut = date;
        },
        getDatedDateFin: function () {
            return dated.dateFin;
        },
        setDatedDateFin: function (dateFin) {
            dated.dateFin = dateFin;
        }
    };
   
});



app.controller("calendar",function($scope, $window, $ocLazyLoad, calendarConfig, moment,alert,$http,User,$mdDialog,Dated,$mdMedia,$location){
		
	console.log("Calendar Controller");
	var vm = this;
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
			   User.setGroupe(success.data.groupe.codeGroupe)
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
		  
		  $window.location = "/logout";
	  };
	  
	  $scope.chargerUser();
	  

	    //These variables MUST be set as a minimum for the calendar to work
	    vm.calendarView = 'day';
	   
	    //vm.viewDate = moment().startOf('month').toDate();
	    vm.viewDate = new Date();
	    calendarConfig.calendarTitle="Mes interventions";
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
	      calendarConfig.dateFormats.hour = originalFormat;
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
	    
	   
	    
	    
	    $scope.showEventClicked = function(activiteEmploye) {
	    	
		    $mdDialog.show({
		      controller: showEventController,
		      templateUrl: '/protected/dialogShowEvent.html',
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
		  		  
		  vm.eventClicked = function(event) {
		    	$http({
				    method: 'GET',
				    url: "ActivitesEmploye?id="+$scope.mySplit(event.title,1),
				    headers: {'Content-Type': 'application/json'}
				}).then(function(response) {
						
						$scope.activiterEmployer = response.data;
						console.log("respGetActiEmpl2 "+JSON.stringify($scope.activiterEmployer));
						$scope.success=true;
						
						 $scope.showEventClicked($scope.activiterEmployer);
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

	   

	    

	    $scope.chargerAllInterventions = function(){
	      console.log("chargerAllInterventionsByEmail");
	      console.log("User "+User.getEmail());
	      var url1 = "/ActivitesEmployerAllByMail?email="+User.getEmail();
	      $http({
	          method: 'GET',
	          url: url1
	       }).then(function (success){
	          console.log("succAll Interventions  ",JSON.stringify(success));
	          $scope.activitesEmployer = success.data;
	          //$scope.currentPage = $scope.pageCourante;
	          
	          vm.events = [];
	          $scope.chargerEvent();
	          
	       },function (error){
	         $scope.errorMessage = success.data.message;  
	       });
	      
	    };
	    
	    
	    
	    
	    
	    
	    

	    $scope.mySplit = function(string, nb,sep) {
	        var array = string.split(',');
	        return array[nb];
	    }
	    
	    $scope.getActiviterEmployer = function(id){
	    	$http({
			    method: 'GET',
			    url: "ActivitesEmploye?id="+id,
			    headers: {'Content-Type': 'application/json'}
			}).then(function(response) {
					
					$scope.activiterEmployer = response.data;
					$scope.success=true;		
				
		    }, 
		    function(response) { // optional
				console.log(response);
		    });
	    };
	    
	    
	   
	    
	    updateEventAdminCalendar = function(activiteEmploye) {
		    $mdDialog.show({
		      controller: UpdateEventAdminCalendarController,
		      templateUrl: '/protected/dialogUpdateEvent.html',
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
		  
		  deleteEventAdmin = function(activiteEmploye) {
			    $mdDialog.show({
			      controller: deleteEventAdminController,
			      templateUrl: '/protected/dialogDeleteEvent.html',
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
	    
	    $scope.modifier = function(activiteEmploye){
			  //console.log("activiteEmploye "+activiteEmploye.dateDebut);
				 $scope.activiteEmploye = activiteEmploye
				 updateEventAdminCalendar($scope.activiteEmploye);
			 };
			 
			 
	   $scope.supprimer = function(activiteEmploye){
			  //console.log("activiteEmploye "+activiteEmploye.dateDebut);
				 $scope.activiteEmploye = activiteEmploye
				 deleteEventAdmin($scope.activiteEmploye);
			 };
			 
			 
			 
			 
			 
			 
			  
			 
			 
			 
			  $scope.whatClassIsIt= function(someValue){
				
				     if(someValue=="Réaliser"){
				    	 
				            return "label label-success"
				     }else if(someValue=="Planifier")
				         return "label label-info";
				     
				    }
	    
	    
	    
	    $scope.chargerEvent = function(){
	    	
	    
	    	
	    	for(var i=0;i<=$scope.activitesEmployer.length-1;i++){
	    		var color = getRandomColor();
	    		
	    		var title = '<p hidden>,' +$scope.activitesEmployer[i].id+',</p><i class="fa fa-building"></i> <span style="margin-left: 5px;">client:  '+$scope.activitesEmployer[i].client.client+
	    		'</span><i class="fa fa-suitcase"  style="margin-left: 5px;"></i><span  style="margin-left: 5px;">action:  '+
	    		$scope.activitesEmployer[i].nature.nature +'</span><i class="fa fa-tasks"  style="margin-left: 5px;"></i><span  style="margin-left: 5px;">DescProjet:  '+
	    		$scope.activitesEmployer[i].descProjet+'</span><i class="fa fa-clock-o"  style="margin-left: 5px;"></i><span  style="margin-left: 5px;">durée :  '+ $scope.activitesEmployer[i].dureeFormated;
	    		var color1;
	    		if($scope.activitesEmployer[i].type.type == "Réaliser"){
		    		color1 = '#70FFE7';
		    	}else{
		    		color1 = '#C8EEFF';
		    	}
	    		
	    		var id = i;
	    		console.log("id "+id);
	    		if(moment($scope.activitesEmployer[id].dateDebut ,"DD/MM/YYYY hh:mm:ss").isAfter(moment().clone().subtract(7, 'days').startOf('day'))){
		    		vm.events.push({
			            title:  title,
			            startsAt: moment($scope.activitesEmployer[id].dateDebut ,"DD/MM/YYYY hh:mm:ss"),
			            endsAt: moment($scope.activitesEmployer[id].dateFin ,"DD/MM/YYYY hh:mm:ss"),
			            color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
			                primary: color1, // the primary event color (should be darker than secondary)
			                secondary: color1 // the secondary event color (should be lighter than primary)
			              },
			              
			          actions: [{
			                  label:'<p hidden> '+$scope.activitesEmployer[i].id+'</p><i class=\'glyphicon glyphicon-pencil\'></i>',
			                  onClick: function(args) {
			                	  
			                	//console.log("idSplit  "+$scope.mySplit(args.calendarEvent.actions[0].label,1));
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
			                    label: '<p hidden>' +$scope.activitesEmployer[i].id+'</p><i class=\'glyphicon glyphicon-remove\'></i>',
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
	    		}else{
	    			vm.events.push({
			            title:  title,
			            startsAt: moment($scope.activitesEmployer[id].dateDebut ,"DD/MM/YYYY hh:mm:ss"),
			            endsAt: moment($scope.activitesEmployer[id].dateFin ,"DD/MM/YYYY hh:mm:ss"),
			            color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
			                primary: color1, // the primary event color (should be darker than secondary)
			                secondary: color1 // the secondary event color (should be lighter than primary)
			              },  
			            draggable: false, //Allow an event to be dragged and dropped
			    	    resizable: false, //Allow an event to be resizable
			    	    incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
			    	    recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
			    	    cssClass: 'a-css-class-name', //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
			    	    allDay: false // set to true to display the event as an all day event on the day view
			            });
	    		}
	    	}
	    	
	    	
	    	
	    	
	    	
	   };
	   
	   vm.timespanClicked = function(date,cell) {
		   
		   
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
		      }/*else if (vm.calendarView === 'day') {
			   	  
			      $scope.lastDateClicked = date;
			      
			      var dateDebut = moment($scope.lastDateClicked).format("DD/MM/YYYY HH:mm:ss");
			      
			      Dated.setDatedDateDebut(dateDebut);
			      //vm.events = [];
			      $scope.showAdvanced();
			      */
			      
		   
		   
		   
		  
		};
		
		
		vm.rangeSelected = function(startDate, endDate) {
		      vm.firstDateClicked = startDate;
		      vm.lastDateClicked = endDate;
		      
		      var dateDebut = moment(vm.firstDateClicked).format("DD/MM/YYYY HH:mm:ss");
		     
		      
		      Dated.setDatedDateDebut(dateDebut);
		      
		      var dateFin = moment(vm.lastDateClicked).format("DD/MM/YYYY HH:mm:ss");
		      
		      Dated.setDatedDateFin(dateFin);
		      
		      $scope.showAdvanced();
		      
		    };
		
		
		
			
		$scope.showAdvanced = function(ev) {
		    $mdDialog.show({
		      controller: DialogController,
		      templateUrl: '/protected/dialogEvent.html',
		      parent: angular.element(document.body),
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
		  
		 
		  
		  whatClassIsIt= function(someValue){
			  
			     if(someValue=="Réaliser"){
			    	
			            return "label label-success"
			     }else if(someValue=="Planifier")
			         return "label label-info";
			     
			    }

	  
	  
	
}); 
// admin










// Admin Calendar









