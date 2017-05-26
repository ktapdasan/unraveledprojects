var app = angular.module('onload', ['ngRoute','ngCookies','angular-md5','ngDialog','angularFileUpload','ui-notification']);
app.config(function($routeProvider) {             
	$routeProvider
	.when('/',             {                 
		controller: 'HomeController',
		templateUrl: 'TEMPLATE/HOME/home.html'             
	})
	.when('/bucket/pictures',             {                 
		controller: 'BucketController',
		templateUrl: 'TEMPLATE/BUCKET/pictures.html'             
	})                              
	.otherwise({ redirectTo:'/'});         
}); 
