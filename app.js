// Main Service Address:    https://openweathermap.org/api
// Apikey:                  5168196ac6e229e811f210f5d2296243
// Endpoint:                http://api.openweathermap.org/data/2.5/forecast/daily?APPID=5168196ac6e229e811f210f5d2296243

// MAIN MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource'])

    // ROUTER
    .config(function($routeProvider){
        
        $routeProvider
        
        .when('/', {
            templateUrl: 'pages/home.htm',
            controller: 'homeController'
        })
        .when('/forecast', {
            templateUrl: 'pages/forecast.htm',
            controller: 'forecastController' 
        })
        
    })

    // SERVICE
    .service('cityService', function() {
        
        this.city = 'London,us';
        
    })

    // CONTROLLERS
    .controller('homeController', ['$scope', 'cityService', 
            function($scope, cityService){
        
        $scope.city = cityService.city;
        
        $scope.$watch('city', function(){
            cityService.city = $scope.city;
        });
        
        console.log($scope);
    
    }])
    .controller('forecastController', ['$scope', '$resource', 'cityService', 
            function($scope, $resource, cityService){
     
        $scope.city = cityService.city;
        
        $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast",
             { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
                
        $scope.weatherResults = $scope.weatherAPI.get({ q: $scope.city, appid: "dcc7f84cf2c99ffbc45d639f53712ba7"});
                
                
        console.log($scope.weatherResults);
        
    }]);

