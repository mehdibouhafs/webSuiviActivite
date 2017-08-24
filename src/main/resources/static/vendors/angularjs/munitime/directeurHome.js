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


app.run(function($rootScope) {
    /*
        Receive emitted message and broadcast it.
        Event names must be distinct or browser will blow up!
    */
    $rootScope.$on('handleEmit', function(event, args) {
        $rootScope.$broadcast('handleBroadcast', args);
    });
});

app.controller("countController2",function($scope,$http,User){	
	
	
	$scope.countNb = null;
	
	$scope.chargerUser = function(){
		console.log(" / countActiviterEmployer2");
		var url = "/countActiviterEmployer2";
		$http({
		    method: 'GET',
		    url: url
		 }).then(function (success){
			   console.log("successCount2 ",JSON.stringify(success));
			   $scope.statistics = success.data;
				$scope.nbActiviterRealiser = $scope.statistics.nbActiviterRealiser;
				$scope.nbActiviterPlannifier = $scope.statistics.nbActiviterPlannifier;
				$scope.nbClient = $scope.statistics.nbClient;
				$scope.nbNature = $scope.statistics.nbNature;
				$scope.tauxActuel = $scope.statistics.tauxActuel;
				console.log("EMIT EMIT EMIT ");
				 $scope.$emit('handleEmit', {statictics: $scope.statistics});

		 },function (error){
			   $scope.errorMessage = success.data.message;	
		 });
	};
	$scope.chargerUser();
	
	 
	
});


 app.controller("histogrammeController2",function($scope,$http){	
	 
	 
	 
	 $scope.$on('handleBroadcast', function(event, args) {
		 
		 
		        
		  	console.log("Handle Brodcast");
		  	console.log("args " + JSON.stringify(args));
			 	$scope.myChartObject = {};
			    
			    $scope.myChartObject.type = "ColumnChart";
			    
			    var thisMonth =  moment().format('MMMM');
			    var lastMonth =  moment().subtract(1, "month").startOf("month").format('MMMM');
			    var lastlastMonth =  moment().subtract(2, "month").startOf("month").format('MMMM');
			    var lastlastlastMonth =  moment().subtract(3, "month").startOf("month").format('MMMM');
			    console.log("this Month "+ thisMonth + " lastMonth "+lastMonth + " lastlast "+lastlastMonth+" lastlastlast "+lastlastlastMonth);
			    
			    
			   
			    $scope.onions = [
			        {v: lastlastMonth},
			        {v: args.statictics.nbInterventionMois2},
			    ];
		
			    $scope.myChartObject.data = {"cols": [
			        {id: "t", label: "Topping", type: "string"},
			        {id: "s", label: "Nb interventions", type: "number"}
			    ], "rows": [
			        {c: [
			            {v: lastlastlastMonth},
			            {v: args.statictics.nbInterventionMois1},
			        ]},
			        {c: $scope.onions},
			        {c: [
			            {v: lastMonth},
			            {v: args.statictics.nbInterventionMois3}
			        ]},
			        {c: [
			            {v: thisMonth},
			            {v: args.statictics.nbInterventionMois4},
			        ]}
			    ]};
		
			    $scope.myChartObject.options = {
			        'title': 'Nombre d\'interventions pour les 4 derniers mois :'
			    };
		    
		  });
	 
	});
 
 
	 
 	app.controller("GenericChartCtrl3",function($scope,$http){		
 		
 		 $scope.$on('handleBroadcast', function(event, args) {
	 		
			 $scope.myChartObject = {};
			 
			 $scope.myChartObject.type = "PieChart";
			 
			 $scope.onions = [
			     {v: "BANQUE POPULAIRE DE CASA"},
			     {v: 3},
			 ];
			 
			 $scope.myChartObject.data = {"cols": [
			     {id: "t", label: "Topping", type: "string"},
			     {id: "s", label: "Nb d\'interventions", type: "number"}
			 ], "rows": [
			     
			 ]};
			 
			 
			 for(var i=0 ;i<args.statictics.clientStatistics.length;i++){
				 
				 $scope.myChartObject.data.rows.push({
			    		"c":[]
			    	});
				 $scope.myChartObject.data.rows[i].c.push({
			    		"v": args.statictics.clientStatistics[i].client
			    		
			    	});
				 
				 $scope.myChartObject.data.rows[i].c.push({
					 "v": args.statictics.clientStatistics[i].nbInterventions1
			    		
			    	})
				
			 }
			
			 /*$scope.myChartObject.data = {"cols": [
			     {id: "t", label: "Topping", type: "string"},
			     {id: "s", label: "Nb d\'interventions", type: "number"}
			 ], "rows": [
			     {c: [
			         {v: args.statictics.clientStatistics[0].client},
			         {v: args.statictics.clientStatistics[0].nbInterventions1},
			     ]},
			     {c: $scope.onions},
			     {c: [
			         {v: args.statictics.clientStatistics[1].client},
			         {v: args.statictics.clientStatistics[1].nbInterventions1}
			     ]},
			     {c: [
			         {v: args.statictics.clientStatistics[2].client},
			         {v: args.statictics.clientStatistics[2].nbInterventions1},
			     ]},
			     
			 ]};*/
			
			 $scope.myChartObject.options = {
			     'title': 'Nombre d\'interventions par client :'
			 };
			 
			 console.log("myVar11 "+JSON.stringify($scope.myChartObject.data));
 		});

 	});
 	
 	app.controller("GenericChartCtrl4",function($scope,$http){		
 		
		 $scope.$on('handleBroadcast', function(event, args) {
	 		
			 $scope.myChartObject = {};
			 
			 $scope.myChartObject.type = "PieChart";
			
			 
			 $scope.myChartObject.data = {"cols": [
			     {id: "t", label: "Topping", type: "string"},
			     {id: "s", label: "Nb d\'interventions", type: "number"}
			 ], "rows": [
			     
			 ]};
			 
			 
			 for(var i=0 ;i<args.statictics.natureStatistics.length;i++){
				 
				 $scope.myChartObject.data.rows.push({
			    		"c":[]
			    	});
				 $scope.myChartObject.data.rows[i].c.push({
			    		"v": args.statictics.natureStatistics[i].nature
			    		
			    	});
				 
				 $scope.myChartObject.data.rows[i].c.push({
					 "v": args.statictics.natureStatistics[i].nbInterventionsNature
			    		
			    	})
				
			 }
			
			 /*$scope.myChartObject.data = {"cols": [
			     {id: "t", label: "Topping", type: "string"},
			     {id: "s", label: "Nb d\'interventions", type: "number"}
			 ], "rows": [
			     {c: [
			         {v: args.statictics.clientStatistics[0].client},
			         {v: args.statictics.clientStatistics[0].nbInterventions1},
			     ]},
			     {c: $scope.onions},
			     {c: [
			         {v: args.statictics.clientStatistics[1].client},
			         {v: args.statictics.clientStatistics[1].nbInterventions1}
			     ]},
			     {c: [
			         {v: args.statictics.clientStatistics[2].client},
			         {v: args.statictics.clientStatistics[2].nbInterventions1},
			     ]},
			     
			 ]};*/
			
			 $scope.myChartObject.options = {
			     'title': 'Nombre d\'interventions par nature  :'
			 };
			 
			 console.log("myVar11 "+JSON.stringify($scope.myChartObject.data));
		});

	});
 	
 	app.controller("HideSeriesController2",function($scope,$http){
 		
 		
 		$scope.$on('handleBroadcast', function(event, args) {
 		
 	        // Properties
 	        $scope.myChartObject = {};
 	        //Methods
 	        $scope.hideSeries = hideSeries;
 	        
 	       $scope.init =function() {
	            $scope.myChartObject.type = "LineChart";
	            $scope.myChartObject.displayed = false;
	            var thisMonth =  moment().format('MMMM');
			    var lastMonth =  moment().subtract(1, "month").startOf("month").format('MMMM');
			    var lastlastMonth =  moment().subtract(2, "month").startOf("month").format('MMMM');
			    var lastlastlastMonth =  moment().subtract(3, "month").startOf("month").format('MMMM');
			    
			  /*  $scope.myChartObject.data = {
			    		cols : [],
			    		rows :[
			    			
			    		]
			    };
			    
			    console.log("init init" + args.statictics.clientStatistics);
			    
			    $scope.myChartObject.data.cols.push({ 
			        "id" : "month",
			        "label"  : "Month",
			        "type"       : "string" 
			    });
			    
			    console.log("args.statictics v " + args.statictics.clientStatistics.length);
			    for(var i = 0 ;i<3 ;i++){
			    	console.log("ilol "+i);
			   
			    	$scope.myChartObject.data.cols.push({
			    		"id" : args.statictics.clientStatistics[i].client+"-id",
			    		"label"  : args.statictics.clientStatistics[i].client,
			    		"type"   : "number" 
			    	});
			    	
			    	$scope.myChartObject.data.rows.push({
			    		"c":[]
			    	});
			    	
			    	
			    };
			    
			    for(var i=0;i<3;i++){
			    	
				    	if(i==0){
				    		console.log("i "+i);
				    		$scope.myChartObject.data.rows[0].c.push({
					    		"v": "mois1"
					    	});
				    		$scope.myChartObject.data.rows[0].c.push({
					    		"v": 10
					    	});
				    	}else{
				    		$scope.myChartObject.data.rows[0].c.push({
					    		"v":8
					    	});
				    	}
			    	
			    };
			    
			    for(var i=3;i<6;i++){
			    	
			    	if(i==3){
			    		console.log("i "+i);
			    		$scope.myChartObject.data.rows[1].c.push({
				    		"v": "mois2"
				    	});
			    		$scope.myChartObject.data.rows[1].c.push({
				    		"v": 13
				    	});
			    	}else{
			    		$scope.myChartObject.data.rows[1].c.push({
				    		"v": 14
				    	});
			    	}
		    	
		    };
		    
		    for(var i=6;i<9;i++){
		    	
		    	if(i==6){
		    		console.log("i "+i);
		    		$scope.myChartObject.data.rows[2].c.push({
			    		"v": "mois3"
			    	});
		    		$scope.myChartObject.data.rows[2].c.push({
			    		"v": 22
			    	});
		    	}else{
		    		$scope.myChartObject.data.rows[2].c.push({
			    		"v": 30
			    	});
		    	}
		    };
		    	
			    console.log("myVar "+JSON.stringify($scope.myChartObject.data));*/
			    
			    
			    
			    
	            $scope.myChartObject.data = {
	                "cols": [
	                {
	                    id: "month",
	                    label: "Month",
	                    type: "string"
	                },
	                {
	                    id: "BANQUE POPULAIRE DE CASA-id",
	                    label: "BANQUE POPULAIRE DE CASA",
	                    type: "number"
	                }, 
	                {
	                    id: "ANAPEC-id",
	                    label: "ANAPEC",
	                    type: "number"
	                },
	                {
	                    id: "ASSURANCES BENNOUNA-id",
	                    label: "ASSURANCES BENNOUNA",
	                    type: "number"
	                },
	                {
	                    id: "ASSURANCES mehdi-id",
	                    label: "ASSURANCES mehdi",
	                    type: "number"
	                },
	                {
	                    id: "AFINASYS-id",
	                    label: "AFINASYS",
	                    type: "number"
	                }
	                	],
	                "rows": [
	                	{
	                    c: [
	                     {
	                        v: "January"
	                    },
	                    {
	                        v: 19,
	                        f: "42"
	                    },
	                    {
	                        v: 12,
	                      
	                    }, 
	                    {
	                        v: 7,
	                        
	                    }, 
	                    {
	                        v: 4
	                    }]
	                }, {
	                    c: [{
	                        v: "February"
	                    }, {
	                        v: 13
	                    }, {
	                        v: 1,
	                        f: "1"
	                    }, {
	                        v: 12
	                    }, {
	                        v: 2
	                    }]

	                }, {
	                    c: [{
	                        v: "March"
	                    }, {
	                        v: 24
	                    }, {
	                        v: 5
	                    }, {
	                        v: 11
	                    }, {
	                        v: 6
	                    }]
	                }
	               
	                ]
	            };
	            
	       
 	      };
 	       $scope.init();

			 	        function hideSeries(selectedItem) {
			 	            var col = selectedItem.column;
			 	            if (selectedItem.row === null) {
			 	                if ($scope.myChartObject.view.columns[col] == col) {
			 	                    $scope.myChartObject.view.columns[col] = {
			 	                        label: $scope.myChartObject.data.cols[col].label,
			 	                        type: $scope.myChartObject.data.cols[col].type,
			 	                        calc: function() {
			 	                            return null;
			 	                        }
			 	                    };
			 	                    $scope.myChartObject.options.colors[col - 1] = '#CCCCCC';
			 	                }
			 	                else {
			 	                    $scope.myChartObject.view.columns[col] = col;
			 	                    $scope.myChartObject.options.colors[col - 1] = $scope.myChartObject.options.defaultColors[col - 1];
			 	                }
			 	            }
			 	        };
			
			 	            
			 	            $scope.myChartObject.options = {
			 	                "title": "Intervention par mois",
			 	                "colors": ['#0000FF', '#009900', '#CC0000', '#DD9900'],
			 	                "defaultColors": ['#0000FF', '#009900', '#CC0000', '#DD9900'],
			 	                "isStacked": "true",
			 	                "fill": 20,
			 	                "displayExactValues": true,
			 	                "vAxis": {
			 	                    "title": "Intervention",
			 	                    "gridlines": {
			 	                        "count": 10
			 	                    }
			 	                },
			 	                "hAxis": {
			 	                    "title": "Date"
			 	                }
			 	            };
			
			 	            $scope.myChartObject.view = {
			 	                columns: [0, 1, 2, 3, 4]
			 	            };
			 		
 			});
 	    });
 	
 	
 	
 	
 	
 	
 	
 	app.controller("LineChartCtroler2",function($scope,$http){	
 		
 		$scope.$on('handleBroadcast', function(event, args) {
 		
 			var thisMonth =  moment().format('MMMM');
		    var lastMonth =  moment().subtract(1, "month").startOf("month").format('MMMM');
		    var lastlastMonth =  moment().subtract(2, "month").startOf("month").format('MMMM');
		    
	 		$scope.myChartObject = {
	                'type': 'ComboChart',
	                'data': {
		                "cols": [
			                {
			                    id: "month",
			                    label: "Month",
			                    type: "string"
			                },
			                {
			                    id: "Taux requis id",
			                    label: "Taux en jour homme ",
			                    type: "number"
			                }, 
			                {
			                    id: "Taux Productivitéd",
			                    label: "Taux de productivité",
			                    type: "number"
			                }
			                
			                	],
			                "rows": [
			                	{
			                    c: [
			                     {
			                        v: lastlastMonth
			                    },
			                    {
			                        v: args.statictics.dureeStatistics[2].taux,
			                        
			                    },
			                    {
			                        v: args.statictics.dureeStatistics[2].nbhoursMonth,
			                      
			                    }, 
			                    ]
			                }, {
			                    c: [{
			                        v: lastMonth
			                    }, {
			                        v: args.statictics.dureeStatistics[1].taux,
			                    }, {
			                        v: args.statictics.dureeStatistics[1].nbhoursMonth,
			                        
			                    }]
	
			                }, {
			                    c: [{
			                        v: thisMonth
			                    }, {
			                        v: args.statictics.dureeStatistics[0].taux,
			                    }, {
			                        v: args.statictics.dureeStatistics[0].nbhoursMonth,
			                    }]
			                }
			               
			                ]
			            },
	                'options': {
	                    'title': 'Taux de productivité par rapport au taux requis',
	                    'isStacked': true
	                    
	
	                }
	            };
 		});
 	
 	});



