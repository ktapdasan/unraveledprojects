var app = angular.module('onload', [
								'ngRoute',
								'ngCookies',
								'angular-md5',
								'ngDialog',
								'angularFileUpload',
								'ui-notification',
								'ui.bootstrap',
								'ae-datetimepicker',
								'angucomplete-alt'
								]);


app.config(function($routeProvider) {             
	$routeProvider
	.when('/',             
	{                 
		controller: 'Product',
		templateUrl: 'TEMPLATE/HOME/sales.html'             
	})
	.when('/Sales',             
	{                 
		controller: 'Product',
		templateUrl: 'TEMPLATE/HOME/sales.html'             
	})
	.when('/User',             
	{                 
		controller: 'Product',
		templateUrl: 'TEMPLATE/HOME/usermanagement.html'             
	})
	.when('/Admin',             
	{                 
		controller: 'Product',
		templateUrl: 'TEMPLATE/HOME/admin.html'             
	})
	.when('/Report',             
	{                 
		controller: 'Reports',
		templateUrl: 'TEMPLATE/HOME/report.html'             
	})
	.when('/BestSelling',             
	{                 
		controller: 'Reports',
		templateUrl: 'TEMPLATE/HOME/bestselling.html'             
	})
	.when('/ReceiptBackup',             
	{                 
		controller: 'Reports',
		templateUrl: 'TEMPLATE/HOME/receiptbackup.html'             
	})
	.when('/bucket/pictures',             
	{                 
		controller: 'BucketController',
		templateUrl: 'TEMPLATE/BUCKET/pictures.html'             
	})                              
	.otherwise({ redirectTo:'/'});         
}); 
