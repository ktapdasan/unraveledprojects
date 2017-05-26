app.controller('HomeController', function($scope,SessionFactory,md5) {
	
	init();

	function init(){
        var promise = SessionFactory.getsession();
        promise.then(function(data){
            var _id = md5.createHash('user_random_key');
            $scope.user_random_key = data.data[_id];
            // get_user();
        })
        .then(null, function(data){
            window.location = './login.html';
        });
    }

});

