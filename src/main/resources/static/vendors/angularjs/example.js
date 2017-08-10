var app = angular.module('MyApp', ['ngMaterial','ngSanitize','ui.select','ngRoute','mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module','oc.lazyLoad','ngMaterialDatePicker','bw.paging']);
//angular.module('mwl.calendar.docs') //you will need to declare your module with the dependencies ['mwl.calendar', 'ui.bootstrap', 'ngAnimate']

app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider.when('/Allinterventions',{templateUrl:'/protected//Allinterventions.html'});
	$routeProvider.when('/mesinterventions',{templateUrl:'/protected//mesinterventions.html'});
	$routeProvider.when('/nouvelleIntervention',{templateUrl:'/protected/nouvelleIntervention.html'});
	$routeProvider.when('/nouveauClient',{templateUrl:'/protected/nouveauClient.html'});
	$routeProvider.when('/nouveauUtilisateur',{templateUrl:'/protected/nouveauUtilisateur.html'});
	$routeProvider.when('/moncalendrier',{templateUrl:'/protected/calendar.html'});
	$routeProvider.when('/adminCalendar',{templateUrl:'/protected/adminCalendar.html'});
	$routeProvider.when('/nouvelleNature',{templateUrl:'/protected/nouvelleNature.html'});
	$routeProvider.when('/profile',{templateUrl:'/protected/profile.html'});
	$routeProvider.when('/help',{templateUrl:'/protected/help.html'});
	$routeProvider.when('/mesinterventions',{templateUrl:'/protected/mesinterventions.html'});
	$routeProvider.when('/index',{templateUrl:'/protected/home.html'});
	$routeProvider.when('/nouveauLieu',{templateUrl:'/protected/nouveauLieu.html'});
	$routeProvider.when('/nouveauClient',{templateUrl:'/protected/nouveauClient.html'});
	
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

	    vm.eventClicked = function(event) {
	      alert.show('Clicked', event);
	    };

	    vm.eventEdited = function(event) {
	      alert.show('Edited', event);
	    };

	    vm.eventDeleted = function(event) {
	      alert.show('Deleted', event);
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
	    
	    
	    
	    
	    
	    
	    function getRandomColor() {
	    	  var letters = '0123456789ABCDEF';
	    	  var color = '#';
	    	  for (var i = 0; i < 6; i++) {
	    	    color += letters[Math.floor(Math.random() * 16)];
	    	  }
	    	  return color;
	    	}


	    $scope.chargerEvent = function(){
	    	
	    	console.log("ActiviteEmployer ",$scope.activitesEmployer);
	    	console.log("color "+getRandomColor());
	    	console.log("Size= ",$scope.activitesEmployer.length);
	    	
	    	for(var i=0;i<=$scope.activitesEmployer.length-1;i++){
	    		var color = getRandomColor();
	    		
	    		var title = '<i class="fa fa-building"></i> <span style="margin-left: 5px;">client:  '+$scope.activitesEmployer[i].client.client+
	    		'</span><i class="fa fa-suitcase"  style="margin-left: 5px;"></i><span  style="margin-left: 5px;">action:  '+
	    		$scope.activitesEmployer[i].nature.nature +'</span><i class="fa fa-tasks"  style="margin-left: 5px;"></i><span  style="margin-left: 5px;">DescProjet:  '+
	    		$scope.activitesEmployer[i].descProjet+'</span><i class="fa fa-clock-o"  style="margin-left: 5px;"></i><span  style="margin-left: 5px;">durée :  '+ $scope.activitesEmployer[i].duree;
	    		var color1;
	    		if($scope.activitesEmployer[i].type.type == "Réaliser"){
		    		color1 = '#70FFE7';
		    	}else{
		    		color1 = '#C8EEFF';
		    	}
	    		
	    		vm.events.push({
		            title:  title,
		            startsAt: moment($scope.activitesEmployer[i].dateDebut ,"DD/MM/YYYY hh:mm:ss"),
		            endsAt: moment($scope.activitesEmployer[i].dateFin ,"DD/MM/YYYY hh:mm:ss"),
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
		  
		  function DialogController($scope, $mdDialog,$route) {
		 
			  
			  var dateDebut = moment( Dated.getDatedDateDebut() ,"DD/MM/YYYY HH:mm:ss").toDate();
			  //var dateDebutVrai =  moment(dateDebut, "DD/MM/YYYY").add(1, 'days').format("DD/MM/YYYY");
			  $scope.dateDebut = dateDebut;
			  
			  
			  
			  console.log("Dated.getDatedDateDebut() "+Dated.getDatedDateDebut());
			  console.log("Dated.getDatedDateFin() "+Dated.getDatedDateFin());
			  $scope.heureDebut =dateDebut;
			  
			  
			  
			  var time = moment.duration("00:10:00");
			  var dateFin =moment( Dated.getDatedDateFin() ,"DD/MM/YYYY HH:mm:ss").subtract(30, "minutes").toDate();
			  
			  $scope.heureFin =dateFin;
			  
			  $scope.dateFin = moment( dateFin).format("DD/MM/YYYY HH:mm:ss");
			  
			  
			  $scope.dateFinale = $scope.dateFin;
			  $scope.calculerDuree = function(){
					 var dateDebut = moment($scope.dateDebut).format("DD/MM/YYYY HH:mm:ss");
					 var dateDebut3 = moment(dateDebut).format("DD/MM/YYYY");
					 
					 var heureDebut3 = moment($scope.heureDebut,"DD/MM/YYYY HH:mm:ss").format("HH:mm:ss");
					 
					  var heureDebut = moment($scope.heureDebut).format("DD/MM/YYYY HH:mm:ss");
					   var heureFin  = moment($scope.heureFin).format("DD/MM/YYYY HH:mm:ss");
					   
					   var dateDebut1 = moment(dateDebut,"DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY");
					   var heureDebut1 = moment(heureDebut,"DD/MM/YYYY HH:mm:ss").format("HH:mm:ss");
					   var heureFin1 = moment(heureFin,"DD/MM/YYYY HH:mm:ss").format("HH:mm:ss");
					   
					   
					   var dateDebut2 = dateDebut1.concat(" "+heureDebut1); 
					   var dateMinuit = moment(dateDebut1, "DD/MM/YYYY").add(1, 'days').format("DD/MM/YYYY").concat(" "+"00:00:01");
					 
					   var duree="";
					   var dateFin = $scope.dateFin;
					   
					   if((moment(heureDebut ,"DD/MM/YYYY HH:mm:ss").isBefore(moment(heureFin,"DD/MM/YYYY HH:mm:ss"))) && (moment(dateDebut ,"DD/MM/YYYY HH:mm:ss").isBefore(moment(dateFin,"DD/MM/YYYY HH:mm:ss")))){
							  var s= moment.utc(moment(heureFin ,"DD/MM/YYYY HH:mm:ss").diff(moment(heureDebut,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
							  duree=s;
							  console.log("durree avant 1 jour = "+s);
							  dateFin = $scope.dateFin;
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
				    if (isValid && ($scope.selectedItem !=null)) {
				    	$scope.error = false;
				     $scope.saveIntervention();
				    }else{
				    	$scope.error = true;
				    	
				    }

				  };
				
			  
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
								"type":type,
								"ville":ville,
								"duree":duree,
								"user":user
						};	
					  
					  console.log("dataObj"+ JSON.stringify(dataObj));
					  $scope.message={
							  "error" : "erreur",
							  "success":"success"
						  };
					  
					  
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
		  
		  $scope.whatClassIsIt= function(someValue){
			  console.log("somevalue "+someValue);
			     if(someValue=="Réaliser"){
			    	 console.log("réaliser")
			            return "label label-success"
			     }else if(someValue=="Planifier")
			         return "label label-info";
			     
			    }

	  
	  
	
}); 
// admin










// Admin Calendar


app.controller("adminCalendar",function($scope, $window, $ocLazyLoad, calendarConfig, moment,alert,$http,User,$mdDialog){
	
	
	
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

	    vm.eventClicked = function(event) {
	      alert.show('Clicked', event);
	    };

	    vm.eventEdited = function(event) {
	      alert.show('Edited', event);
	    };

	    vm.eventDeleted = function(event) {
	      alert.show('Deleted', event);
	    };

	    vm.eventTimesChanged = function(event) {
	      alert.show('Dropped or resized', event);
	    };

	    vm.toggle = function($event, field, event) {
	      $event.preventDefault();
	      $event.stopPropagation();
	      event[field] = !event[field];
	    };

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
				
				  var url1 = "/allUsers";
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
				      var url1 = "/ActivitesEmployers";
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
				    
				    function getRandomColor() {
				    	  var letters = '0123456789ABCDEF';
				    	  var color = '#';
				    	  for (var i = 0; i < 6; i++) {
				    	    color += letters[Math.floor(Math.random() * 16)];
				    	  }
				    	  return color;
				    	}


				    $scope.chargerEvent = function(){
				    	console.log("ActiviteEmployer ",$scope.activitesEmployer);
				    	console.log("color "+getRandomColor());
				    	console.log("Size= ",$scope.activitesEmployer.length);
				    	
				    	for(var i=0;i<=$scope.activitesEmployer.length-1;i++){
				    		var color = getRandomColor();
				    		
				    		
				    		var title = '<i class="fa fa-user"></i> <span style="margin-left: 5px;"> '+$scope.activitesEmployer[i].user.nom+'     </span><i class="fa fa-building" style="margin-left: 5px;></i> <span style="margin-left: 5px;"> '+$scope.activitesEmployer[i].client.client+'</span><i class="fa fa-suitcase"  style="margin-left: 5px;"></i><span  style="margin-left: 5px;">Nature :  '+$scope.activitesEmployer[i].nature.nature +'</span><i class="fa fa-tasks"  style="margin-left: 5px;"></i><span  style="margin-left: 5px;"> Action:  '+$scope.activitesEmployer[i].descProjet+'</span><i class="fa fa-clock-o"  style="margin-left: 5px;"></i><span  style="margin-left: 5px;"> durée :  '+ $scope.activitesEmployer[i].duree;
					    	var color1;
				    		if($scope.activitesEmployer[i].type.type == "Réaliser"){
					    		color1 = '#70FFE7';
					    	}else{
					    		color1 = '#C8EEFF';
					    	}
				    		
				    		vm.events.push({
					            title:  title,
					            startsAt: moment($scope.activitesEmployer[i].dateDebut ,"DD/MM/YYYY hh:mm:ss"),
					            endsAt: moment($scope.activitesEmployer[i].dateFin ,"DD/MM/YYYY hh:mm:ss"),
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
					          
					          vm.events = [];
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







