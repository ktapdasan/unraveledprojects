var app = angular.module('onload', [
								'ngRoute',
								'ngCookies',
								'angular-md5',
								'ngDialog',
								'angularFileUpload',
								'ui-notification',
								'ui.bootstrap',
								'ae-datetimepicker'
								]);


app.config(function($routeProvider) {             
	$routeProvider
	.when('/',             {                 
		controller: 'HomeController',
		templateUrl: 'TEMPLATE/HOME/home.html'             
	})
	.when('/Sales',             {                 
		controller: 'HomeController',
		templateUrl: 'TEMPLATE/HOME/sales.html'             
	})
	.when('/Admin',             {                 
		controller: 'Product',
		templateUrl: 'TEMPLATE/HOME/admin.html'             
	})
	.when('/bucket/pictures',             {                 
		controller: 'BucketController',
		templateUrl: 'TEMPLATE/BUCKET/pictures.html'             
	})                              
	.otherwise({ redirectTo:'/'});         
}); 
