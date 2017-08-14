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

app.controller("countController",function($scope,$http,User){	
	
	
	
	$scope.countNb = null;
	
	
	
	
	 var url = "/countActiviterEmployer?email="+User.getEmail();
	$http({
	    method: 'GET',
	    url: url
	 }).then(function (success){
		   console.log("successCount ",JSON.stringify(success));
		   $scope.statistics = success.data;
			$scope.nbActiviterRealiser = $scope.statistics.nbActiviterRealiser;
			$scope.nbActiviterPlannifier = $scope.statistics.nbActiviterPlannifier;
			$scope.nbClient = $scope.statistics.nbClient;
			$scope.nbNature = $scope.statistics.nbNature;
			
			  
	 },function (error){
		   $scope.errorMessage = success.data.message;	
	 });
	
});


 app.controller("histogrammeController",function($scope,$http){	
	 $scope.myChartObject = {};
	    
	    $scope.myChartObject.type = "ColumnChart";
	    
	    $scope.onions = [
	        {v: "Juillet"},
	        {v: 3},
	    ];

	    $scope.myChartObject.data = {"cols": [
	        {id: "t", label: "Topping", type: "string"},
	        {id: "s", label: "Nb interventions", type: "number"}
	    ], "rows": [
	        {c: [
	            {v: "Juin"},
	            {v: 10},
	        ]},
	        {c: $scope.onions},
	        {c: [
	            {v: "Aout"},
	            {v: 31}
	        ]},
	        {c: [
	            {v: "Septembre"},
	            {v: 1},
	        ]},
	        {c: [
	            {v: "Octobre"},
	            {v: 2},
	        ]}
	    ]};

	    $scope.myChartObject.options = {
	        'title': 'Nombre d\'interventions pour les 5 derniers mois :'
	    };
	 
	});
 
 
	 
 	app.controller("GenericChartCtrl",function($scope,$http){		 
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
		     {c: [
		         {v: "AFINASYS"},
		         {v: 3},
		     ]},
		     {c: $scope.onions},
		     {c: [
		         {v: "ANAPEC"},
		         {v: 31}
		     ]},
		     {c: [
		         {v: "ASSURANCES BENNOUNA"},
		         {v: 1},
		     ]},
		     {c: [
		         {v: "ATTIJARI INTERNATIONAL BANK"},
		         {v: 2},
		     ]}
		 ]};
		
		 $scope.myChartObject.options = {
		     'title': 'Nombre d\'interventions par client :'
		 };

 	});
 	
 	app.controller("HideSeriesController",function($scope,$http){
 	        // Properties
 	        $scope.myChartObject = {};
 	        //Methods
 	        $scope.hideSeries = hideSeries;
 	        
 	       $scope.init =function() {
	            $scope.myChartObject.type = "LineChart";
	            $scope.myChartObject.displayed = false;
	            $scope.myChartObject.data = {
	                "cols": [{
	                    id: "month",
	                    label: "Month",
	                    type: "string"
	                }, {
	                    id: "BANQUE POPULAIRE DE CASA-id",
	                    label: "BANQUE POPULAIRE DE CASA",
	                    type: "number"
	                }, {
	                    id: "ANAPEC-id",
	                    label: "ANAPEC",
	                    type: "number"
	                }, {
	                    id: "ASSURANCES BENNOUNA-id",
	                    label: "ASSURANCES BENNOUNA",
	                    type: "number"
	                }, {
	                    id: "AFINASYS-id",
	                    label: "AFINASYS",
	                    type: "number"
	                }],
	                "rows": [{
	                    c: [{
	                        v: "January"
	                    }, {
	                        v: 19,
	                        f: "42"
	                    }, {
	                        v: 12,
	                        f: "12"
	                    }, {
	                        v: 7,
	                        f: "7"
	                    }, {
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
	                }]
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
 	
 	
 	app.controller("GenericChartCtroler",function($scope,$http){		 
 		$scope.myChartObject = {};
 	    
 	    $scope.myChartObject.type = "BarChart";
 	    
 	    $scope.onions = [
 	        {v: "Onions"},
 	        {v: 3},
 	    ];

 	    $scope.myChartObject.data = {"cols": [
 	        {id: "t", label: "Topping", type: "string"},
 	        {id: "s", label: "Slices", type: "number"}
 	    ], "rows": [
 	        {c: [
 	            {v: "Mushrooms"},
 	            {v: 3},
 	        ]},
 	        {c: $scope.onions},
 	        {c: [
 	            {v: "Olives"},
 	            {v: 31}
 	        ]},
 	        {c: [
 	            {v: "Zucchini"},
 	            {v: 1},
 	        ]},
 	        {c: [
 	            {v: "Pepperoni"},
 	            {v: 2},
 	        ]}
 	    ]};

 	    $scope.myChartObject.options = {
 	        'title': 'How Much Pizza I Ate Last Night'
 	    };

	});



