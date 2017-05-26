var app = angular.module('onload', ['ngRoute','ngCookies','angular-md5',]);
app.config(function($routeProvider) {             
	$routeProvider
	.when('/',             {                 
		controller: 'HomeController',
		templateUrl: 'TEMPLATE/HOME/home.html'             
	})                              
	.otherwise({ redirectTo:'/'});         
}); 
