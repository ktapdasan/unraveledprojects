var demoApp = angular.module('onload', ['ngRoute']);

window.fbAsyncInit = function() {
	FB.init({
		appId      : '1104670912912517',
		xfbml      : true,
		version    : 'v2.7'
	});
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

demoApp.config(function($routeProvider) {             
	$routeProvider
	.when('/',             {                 
		controller: 'HomeController',
		templateUrl: 'template/home.html'             
	})             
	.when('/data',
	{                 
		controller: 'SimpleController',                 
		templateUrl:'template/data.html'             
	})
	.when('/LoginVIA',
	{                 
		controller: 'FacebookController',                 
		templateUrl:'template/flogin.html'             
	})                   
	.otherwise({ redirectTo:'/'});         
}); 
