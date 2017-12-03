app.factory('UserFactory', function($http, $location){
    var factory = {};
    
    factory.get_user = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Users/get_user.php', 
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data : data
        }) 

        return promise;
    };

    factory.upload_picture = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Users/upload_picture.php', 
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data : data
        }) 

        return promise;
    };

    factory.get_uploaded_picture = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Users/get_uploaded_picture.php', 
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data : data
        }) 

        return promise;
    };

    factory.submit_chat = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Users/submit_chat.php', 
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data : data
        }) 

        return promise;
    };

    factory.get_chat_all = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Users/get_chat_all.php', 
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data : data
        }) 

        return promise;
    };

    factory.get_updated_chat = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Users/get_updated_chat.php', 
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data : data
        }) 

        return promise;
    };


    return factory;
})
