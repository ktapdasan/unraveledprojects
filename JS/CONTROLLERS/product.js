app.controller('Product', function(
                                            $scope,
                                            SessionFactory,
                                            UserFactory,
                                            ProductFactory,
                                            md5,
                                            $filter,
                                            ngDialog
                                          ) 
{
	
    $scope.user = {};

    $scope.form = {};
    $scope.filter = {};
    $scope.modal = {};

    $scope.viewby_productdata = 4;
    $scope.currentPage_productdata = 4;
    $scope.itemsPerPage_productdata = $scope.viewby_productdata;
    $scope.maxSize = 5;

    $scope.viewby_supplierdata = 4;
    $scope.currentPage_supplierdata = 4;
    $scope.itemsPerPage_supplierdata = $scope.viewby_supplierdata;
    $scope.maxSize = 5;

    $scope.viewby_orderdata = 4;
    $scope.currentPage_orderdata = 4;
    $scope.itemsPerPage_orderdata = $scope.viewby_orderdata;
    $scope.maxSize = 5;

	init();

    $scope.vm = {};
    $scope.vm.options = {format: 'YYYY/MM/DD HH:mm', showClear: true};

	function init(){
        var promise = SessionFactory.getsession();
        promise.then(function(data){
            var _id = md5.createHash('pk');
            $scope.pk = data.data[_id];
            get_user();
            DEFAULTDATES();
            makeid();

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
            get_product_data();
            get_supplier_data();
            get_request_order_data();

        })
        .then(null, function(data){
            
        });
    }

    function DEFAULTDATES(){
        var today = new Date();

        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        today = yyyy+'-'+mm+'-'+dd;


        $scope.filter.product_expiration = new Date();
    }

    function getMonday(d) {
        var d = new Date(d);
        var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1);

        var new_date = new Date(d.setDate(diff));
        var dd = new_date.getDate();
        var mm = new_date.getMonth()+1;
        var yyyy = new_date.getFullYear();

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        var monday = yyyy+'-'+mm+'-'+dd;

        return monday;
    }

    function get_product_data(){

    var promise = ProductFactory.get_product_data();
    promise.then(function(data){
        $scope.product_data = data.data.result;

        var a = 0;
            for (var i in $scope.product_data) {
                $scope.product_data[i].product_product_expiration = new Date($scope.product_data[i].product_product_expiration);
                $scope.product_data[i].product_product_expiration = $filter('date')($scope.product_data[i].product_product_expiration, "mediumDate");
                $scope.product_data[i].date_created = new Date($scope.product_data[i].date_created);
                $scope.product_data[i].number = a += 1;
            };

            $scope.totalItems_productdata = $scope.product_data.length;

            $scope.form = {};
    })
    .then(null, function(data){


    });
}

$scope.setPage_productdata = function (pageNo) {
    $scope.currentPage_productdata = pageNo;
};

$scope.pageChanged_productdata = function() {
    console.log('Page changed to: ' + $scope.currentPage_productdata);
};

$scope.setItemsPerPage_productdata = function(num) {
    $scope.itemsPerPage_productdata = num;
    $scope.currentPage_productdata = 1; //reset to first paghe
}

function get_supplier_data(){

    var promise = ProductFactory.get_supplier_data();
    promise.then(function(data){
        $scope.supplier_data = data.data.result;
        console.log($scope.supplier_data);

        var a = 0;
            for (var i in $scope.supplier_data) {
                $scope.supplier_data[i].date_created = new Date($scope.supplier_data[i].date_created);
                $scope.supplier_data[i].number = a += 1;
            };

            $scope.totalItems_supplierdata = $scope.supplier_data.length;

            $scope.form = {};
    })
    .then(null, function(data){


    });
}


$scope.setPage_supplierdata = function (pageNo) {
    $scope.currentPage_supplierdata = pageNo;
};

$scope.pageChanged_supplierdata = function() {
    console.log('Page changed to: ' + $scope.currentPage_supplierdata);
};

$scope.setItemsPerPage_supplierdata = function(num) {
    $scope.itemsPerPage_supplierdata = num;
    $scope.currentPage_supplierdata = 1; //reset to first paghe
}

function get_request_order_data(){

    var promise = ProductFactory.get_request_order_data();
    promise.then(function(data){
        $scope.request_data = data.data.result;
        console.log($scope.request_data);

        var a = 0;
            for (var i in $scope.request_data) {
                $scope.request_data[i].date_created = new Date($scope.request_data[i].date_created);
                $scope.request_data[i].number = a += 1;
            };

            $scope.totalItems_orderdata = $scope.request_data.length;

            $scope.form = {};
    })
    .then(null, function(data){


    });
}

$scope.setPage_orderdata = function (pageNo) {
    $scope.currentPage_orderdata = pageNo;
};

$scope.pageChanged_orderdata = function() {
    console.log('Page changed to: ' + $scope.currentPage_orderdata);
};

$scope.setItemsPerPage_orderdata = function(num) {
    $scope.itemsPerPage_orderdata = num;
    $scope.currentPage_orderdata = 1; //reset to first paghe
}
    $scope.logout = function(){
        var promise = SessionFactory.logout();
        promise.then(function(data){
            window.location = './login.html';
        })
    }

    $scope.add_product = function(){

        $scope.form.product_expiration = $filter('date')($scope.filter.product_expiration, "mediumDate");

    var datas = {
        product_name : $scope.form.product_name,
        product_bar_code : $scope.form.product_bar_code,
        product_stocks : $scope.form.product_stocks,
        product_srp : $scope.form.srp,
        product_price : $scope.form.product_price,
        product_product_expiration : $scope.form.product_expiration,
        product_supplier : $scope.form.product_supplier

    }

    var promise = ProductFactory.add_product(datas);
    promise.then(function(data){
        var notify = $.notify('You have succesfully added the product', { allow_dismiss: true });
            get_product_data();
})
    .then(null, function(data){
    var notify = $.notify('Oops there something wrong!', { allow_dismiss: true });

    });
}

    $scope.edit_product_data = function(v){
    var index = $scope.product_data.indexOf(v);

    $scope.modal = {
        title : 'Update Product',
        save : 'Update',
        close : 'Cancel',
        product_name : $scope.product_data[index].product_name,
        product_bar_code : $scope.product_data[index].product_bar_code,
        product_stocks : $scope.product_data[index].product_stocks,
        product_price : $scope.product_data[index].product_price,
        product_expiration : $scope.product_data[index].product_product_expiration,
        product_srp : $scope.product_data[index].product_srp,
        product_supplier : $scope.product_data[index].product_supplier
     };

    ngDialog.openConfirm({
        template: 'EditMyProfile',
        className: 'ngdialog-theme-plain dialogwidth400',
        preCloseCallback: function(value) {
            var nestedConfirmDialog;
            if($scope.modal.product_name == '' || $scope.modal.product_bar_code == '' || $scope.modal.product_stocks == '' || $scope.modal.product_price == ''){
            
                var notify = $.notify('There is a blank encoded product data', {'type': 'danger', allow_dismiss: true });
                return false;
            }
            return nestedConfirmDialog;
        },
        scope: $scope,
        showClose: false
    })
.then(function(value){
    return false;
}, function(value){


    $scope.modal.new_product_date_expiration = $filter('date')($scope.modal.product_expiration._d, "medium");

    var datas = {
        pk : $scope.product_data[index].pk,
        product_name : $scope.modal.product_name,
        product_bar_code : $scope.modal.product_bar_code,
        product_stocks : $scope.modal.product_stocks,
        product_price : $scope.modal.product_price,
        product_srp : $scope.modal.product_srp,
        product_expiration : $scope.modal.new_product_date_expiration,
        supplier_code_name : $scope.modal.supplier_code_name,
        product_supplier : $scope.modal.product_supplier
    }

    var promise = ProductFactory.edit_product_data(datas);
    promise.then(function(data){
        var notify = $.notify('You have succesfully added the product', { 'type': 'success', allow_dismiss: true });
            get_product_data();
})
    .then(null, function(data){
    var notify = $.notify('Oops there something wrong!', { 'type': 'danger', allow_dismiss: true });

    });
});
}

    $scope.delete_product_data = function(v){
        var index = $scope.product_data.indexOf(v);


        $scope.modal = {
        title : 'Please input a pin',
        save : 'Delete',
        close : 'Cancel'
        }     

        ngDialog.openConfirm({
        template: 'InputPinModal',
        className: 'ngdialog-theme-plain dialogwidth400',
        preCloseCallback: function(value) {
            var nestedConfirmDialog;
                $scope.form.pin = md5.createHash($scope.modal.pin);
            if($scope.form.pin != $scope.user.superior_pin){
                var notify = $.notify('The Pin is incorrect!', {'type': 'danger', allow_dismiss: true });
                return false;
            }
            return nestedConfirmDialog;
        },
        scope: $scope,
        showClose: false
    })
.then(function(value){
    return false;
}, function(value){

    var datas = {
        pk : $scope.product_data[index].pk
    }


    var promise = ProductFactory.delete_product_data(datas);
    promise.then(function(data){
        var notify = $.notify('You have succesfully deleted the product', { 'type': 'success', allow_dismiss: true });
            get_product_data();
})
    .then(null, function(data){
    var notify = $.notify('Oops there something wrong!', { 'type': 'danger', allow_dismiss: true });

    });
    });
}


    $scope.add_supplier = function(){

    var datas = {
        supplier_name : $scope.form.supplier_name,
        supplier_address : $scope.form.supplier_address,
        supplier_contact_number : $scope.form.supplier_contact_number,
        supplier_contact_person : $scope.form.supplier_contact_person,
        supplier_code_name : $scope.form.supplier_code_name
    }

    var promise = ProductFactory.add_supplier(datas);
    promise.then(function(data){
        var notify = $.notify('You have succesfully added a new supplier', { allow_dismiss: true });
            get_supplier_data();
})
    .then(null, function(data){
    var notify = $.notify('Oops there something wrong!', { allow_dismiss: true });

    });
}

    $scope.edit_supplier_data = function(v){
    var index = $scope.supplier_data.indexOf(v);

    $scope.modal = {
        title : 'Update Supplier Data',
        save : 'Update',
        close : 'Cancel',
        supplier_name : $scope.supplier_data[index].supplier_name,
        supplier_address : $scope.supplier_data[index].supplier_address,
        supplier_contact_number : $scope.supplier_data[index].supplier_contact_number,
        supplier_contact_person : $scope.supplier_data[index].supplier_contact_person,
        supplier_code_name : $scope.supplier_data[index].supplier_code_name
     };

    ngDialog.openConfirm({
        template: 'EditSupplierData',
        className: 'ngdialog-theme-plain dialogwidth400',
        preCloseCallback: function(value) {
            var nestedConfirmDialog;
            if($scope.modal.supplier_name == '' || $scope.modal.supplier_address == '' || $scope.modal.supplier_contact_number == '' || $scope.modal.supplier_contact_person == ''){
            
                var notify = $.notify('There is a blank encoded product data', {'type': 'danger', allow_dismiss: true });
                return false;
            }
            return nestedConfirmDialog;
        },
        scope: $scope,
        showClose: false
    })
.then(function(value){
    return false;
}, function(value){

    var datas = {
        pk : $scope.supplier_data[index].pk,
        supplier_name : $scope.modal.supplier_name,
        supplier_address : $scope.modal.supplier_address,
        supplier_contact_number : $scope.modal.supplier_contact_number,
        supplier_contact_person : $scope.modal.supplier_contact_person,
        supplier_code_name : $scope.modal.supplier_code_name
    }


    var promise = ProductFactory.edit_supplier_data(datas);
    promise.then(function(data){
        var notify = $.notify('You have succesfully added the product', { 'type': 'success', allow_dismiss: true });
            get_supplier_data();
})
    .then(null, function(data){
    var notify = $.notify('Oops there something wrong!', { 'type': 'danger', allow_dismiss: true });

    });
});
}

function makeid() {
  var text = "";
  var text2 = "";
  var text3 = "";
  var finalnumber = "";

  var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var possible2 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var possible3 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (var i = 0; i < 5; i++){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    text2 += possible2.charAt(Math.floor(Math.random() * possible2.length));
    text3 += possible3.charAt(Math.floor(Math.random() * possible3.length));
}
    finalnumber = text+"-"+text2+"-"+text3;
    $scope.form.finalnumber = finalnumber;
}

    $scope.request_product_order = function(v){
        var index = $scope.product_data.indexOf(v);
        makeid();

    $scope.modal = {
        title : 'Request Product Order',
        save : 'Request',
        close : 'Cancel',
        finalnumber : $scope.form.finalnumber
     };

    ngDialog.openConfirm({
        template: 'RequestOrderDataModal',
        className: 'ngdialog-theme-plain dialogwidth400',
        preCloseCallback: function(value) {
            var nestedConfirmDialog;
            if($scope.modal.product_quantity == '' || $scope.modal.product_date_needed == '' || $scope.modal.product_market_price == ''){
                var notify = $.notify('There is a blank encoded product request data', {'type': 'danger', allow_dismiss: true });
                return false;
            }
            return nestedConfirmDialog;
        },
        scope: $scope,
        showClose: false
    })
.then(function(value){
    return false;
}, function(value){
    $scope.modal.new_product_date_needed = $filter('date')($scope.modal.product_date_needed._d, "medium");
    var datas = {
        pk : $scope.product_data[index].pk,
        product_finalnumber : $scope.modal.finalnumber,
        product_quantity : $scope.modal.product_quantity,
        product_date_needed : $scope.modal.new_product_date_needed,
        product_market_price : $scope.modal.product_market_price
    }

    var promise = ProductFactory.request_product_order(datas);
    promise.then(function(data){
        var notify = $.notify('You have succesfully added the product', { 'type': 'success', allow_dismiss: true });
            get_supplier_data();
})
    .then(null, function(data){
    var notify = $.notify('Oops there something wrong!', { 'type': 'danger', allow_dismiss: true });

    });
});
}

    $scope.delete_supplier_data = function(v){
        var index = $scope.supplier_data.indexOf(v);


    var datas = {
        pk : $scope.supplier_data[index].pk
    }


    var promise = ProductFactory.delete_supplier_data(datas);
    promise.then(function(data){
        var notify = $.notify('You have succesfully deleted the supplier', { 'type': 'success', allow_dismiss: true });
            get_supplier_data();
})
    .then(null, function(data){
    var notify = $.notify('Oops there something wrong!', { 'type': 'danger', allow_dismiss: true });

    });
}

    $scope.approve_order_request = function(v){
        var index = $scope.request_data.indexOf(v);


    var datas = {
        pk : $scope.request_data[index].pk
    }


    var promise = ProductFactory.approve_order_request(datas);
    promise.then(function(data){
        var notify = $.notify('You have succesfully approved the request order', { 'type': 'success', allow_dismiss: true });
            get_request_order_data();
})
    .then(null, function(data){
    var notify = $.notify('Oops there something wrong!', { 'type': 'danger', allow_dismiss: true });

    });
}

    $scope.disapprove_order_request = function(v){
        var index = $scope.request_data.indexOf(v);


    var datas = {
        pk : $scope.request_data[index].pk
    }


    var promise = ProductFactory.disapprove_order_request(datas);
    promise.then(function(data){
        var notify = $.notify('You have succesfully disapproved the request order', { 'type': 'success', allow_dismiss: true });
            get_request_order_data();
})
    .then(null, function(data){
    var notify = $.notify('Oops there something wrong!', { 'type': 'danger', allow_dismiss: true });

    });
}

});

