app.factory('ProductFactory', function($http, $location){
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


    factory.add_product = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Product/add_product.php', 
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

    factory.update_stocks = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Product/update_stocks.php', 
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

    factory.gift_certificate_data = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Product/gift_certificate_data.php', 
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

    factory.add_supplier = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Product/add_supplier.php', 
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

    factory.edit_product_data = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Product/edit_product_data.php', 
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

    factory.edit_supplier_data = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Product/edit_supplier_data.php', 
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

    factory.delete_product_data = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Product/delete_product_data.php', 
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

    factory.delete_supplier_data = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Product/delete_supplier_data.php', 
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

    factory.request_product_order = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Product/request_product_order.php', 
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

    factory.approve_order_request = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Product/approve_order_request.php', 
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

    factory.disapprove_order_request = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Product/disapprove_order_request.php', 
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

    factory.tender_product = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Product/tender_product.php', 
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

    factory.get_product_data = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Product/get_product_data.php', 
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

    factory.get_product_data = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Product/get_product_data.php', 
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

    factory.get_reports = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Product/get_reports.php', 
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

    factory.get_request_order_data = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Product/get_request_order_data.php', 
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

    factory.get_all_products = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Product/get_all_products.php', 
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

    factory.get_supplier_data = function(data){
        var promise = $http({
            url:'./FUNCTIONS/Product/get_supplier_data.php', 
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
