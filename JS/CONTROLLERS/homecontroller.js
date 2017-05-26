app.controller('HomeController', function(
                                            $scope,
                                            SessionFactory,
                                            UserFactory,
                                            md5
                                          ) 
{
	
    $scope.user = {};

	init();

	function init(){
        var promise = SessionFactory.getsession();
        promise.then(function(data){
            var _id = md5.createHash('pk');
            $scope.pk = data.data[_id];
            get_user();
        })
        .then(null, function(data){
            window.location = './login.html';
        });
    }

    function get_user(){
        var filters = {
            'pk' : $scope.pk
        };

        var promise = UserFactory.get_user(filters);
        promise.then(function(data){
            $scope.user = data.data.result[0];
            console.log($scope.user);
        })
        .then(null, function(data){
            
        });
    }

    $scope.logout = function(){
        var promise = SessionFactory.logout();
        promise.then(function(data){
            window.location = './login.html';
        })
    }

});

