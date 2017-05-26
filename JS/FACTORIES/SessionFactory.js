app.factory('SessionFactory', function($http, $location){
    var factory = {};
    
    factory.getsession = function(){
        var promise = $http({
            url:'./FUNCTIONS/Session/getsession.php',
            method: 'GET'
        })

        return promise;
    };

    // factory.logout = function(){
    //     var promise = $http({
    //         url:'./FUNCTIONS/Session/deletesession.php',
    //         method: 'GET'
    //     })

    //     return promise;
    // };

    return factory;
})
