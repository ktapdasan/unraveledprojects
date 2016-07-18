var demoApp = angular.module('onload', ['ngRoute']);


demoApp.config(function($routeProvider) {             
	$routeProvider
	.when('/home',             {                 
		controller: 'HomeController',
		templateUrl: 'template/home.html'             
	})             
	.when('/data',
	{                 
		controller: 'SimpleController',                 
		templateUrl:'template/data.html'             
	})             
	.otherwise({ redirectTo:'/home'});         
}); 
var originalTimeout = window.setTimeout;
window.setTimeout = function(callback){
    console.log(callback);
    return originalTimeout.apply(this, arguments);
};