app.controller('Product', function(
                                    $scope,
                                    SessionFactory,
                                    UserFactory,
                                    ProductFactory,
                                    md5,
                                    $filter,
                                    ngDialog,
                                    $route
                                    ) 
{

    $scope.user = {};

    $scope.form = {};
    $scope.filter = {};
    $scope.tender_voided = {};
    $scope.tender_voided.count = 0;
    $scope.submit_datas = {};
    $scope.check_item_data_status = {};
    $scope.stock_amount_finalized = 0;
    $scope.stock_amount_pk = {};
    $scope.stock_amount = 0;
    $scope.cash_status = false;
    $scope.gift_status = false;
    $scope.discount = false;
    $scope.tender_status = false;
    $scope.discount_amounts = 0;
    $scope.amount_senior = 0;
    $scope.product_total_tempo = 0;
    $scope.net_amount = 0;
    $scope.vat = 0;
    $scope.change = 0;
    $scope.cash = 0;
    $scope.number = 0;
    $scope.number_total = 0;
    $scope.product_total_temporary = 0;
    $scope.product_total = 0;
    $scope.modal = {};
    $scope.tender_data = [];

    $scope.cashier = {};

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

    $scope.viewby_user_data = 4;
    $scope.currentPage_user_data = 4;
    $scope.itemsPerPage_user_data = $scope.viewby_user_data;
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
            maketransaction_number();
            makeuser_id();

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
            get_added_user_data();

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
        $scope.form.product_expiration = new Date();
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

    function get_added_user_data(){

        var promise = ProductFactory.get_added_user_data();
        promise.then(function(data){
            $scope.added_user_data = data.data.result;

            console.log($scope.added_user_data);

/*var a = 0;
for (var i in $scope.product_data) {
$scope.product_data[i].product_product_expiration = new Date($scope.product_data[i].product_product_expiration);
$scope.product_data[i].product_product_expiration = $filter('date')($scope.product_data[i].product_product_expiration, "mediumDate");
$scope.product_data[i].date_created = new Date($scope.product_data[i].date_created);
$scope.product_data[i].number = a += 1;
};*/

for (var x in $scope.added_user_data) {
    if ($scope.added_user_data[x].user_type == 2) {
        $scope.added_user_data[x].user_type = 'Cashier';
    };
    if ($scope.added_user_data[x].user_type == 1) {
        $scope.added_user_data[x].user_type = 'Admin';
    };
};

$scope.totalItems_user_data = $scope.added_user_data.length;

$scope.form = {};
})
        .then(null, function(data){


        });
    }

    $scope.setPage_user_data = function (pageNo) {
        $scope.currentPage_user_data = pageNo;
    };

    $scope.pageChanged_user_data = function() {
        console.log('Page changed to: ' + $scope.currentPage_user_data);
    };

    $scope.setItemsPerPage_user_data = function(num) {
        $scope.itemsPerPage_user_data = num;
$scope.currentPage_user_data = 1; //reset to first paghe
}

$scope.search = function(){
    if ($scope.form.search == "") {
        get_product_data();
    }

    var filters = {
        wildcard : $scope.form.search
    };
    console.log(filters);

    var promise = ProductFactory.get_product_data_search(filters);
    promise.then(function(data){
        $scope.product_data = data.data.result;
        console.log($scope.product_data);

        var a = 0;
        for (var i in $scope.product_data) {
            $scope.product_data[i].product_product_expiration = new Date($scope.product_data[i].product_product_expiration);
            $scope.product_data[i].product_product_expiration = $filter('date')($scope.product_data[i].product_product_expiration, "mediumDate");
            $scope.product_data[i].date_created = new Date($scope.product_data[i].date_created);
            $scope.product_data[i].number = a += 1;
        };

        var x = .12;
        for (var i in $scope.product_data) {
            $scope.form.vat_wamount = x * $scope.product_data[i].product_srp;
            $scope.product_data[i].wamount1 = parseFloat($scope.product_data[i].product_srp) + parseFloat($scope.form.vat_wamount);
            $scope.product_data[i].wamount3 = parseFloat($scope.product_data[i].wamount1).toFixed(2);
            console.log($scope.product_data[i].wamount);
        };

        for (var z in $scope.product_data) {
            if ($scope.product_data[z].product_status == '(OLD)') {
                $scope.product_data[z].product_status_color = 1;
                $scope.product_data[z].product_status_color1 = 'red';
            }
            if ($scope.product_data[z].product_status == '(NEW)') {
                $scope.product_data[z].product_status_color = 1;
                $scope.product_data[z].product_status_color1 = 'green';
            }
        };

        $scope.totalItems_productdata = $scope.product_data.length;
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

function get_product_data(){

    var promise = ProductFactory.get_product_data();
    promise.then(function(data){
        $scope.product_data = data.data.result;
        console.log($scope.product_data);

        var a = 0;
        for (var i in $scope.product_data) {
            $scope.product_data[i].product_product_expiration = new Date($scope.product_data[i].product_product_expiration);
            $scope.product_data[i].product_product_expiration = $filter('date')($scope.product_data[i].product_product_expiration, "mediumDate");
            $scope.product_data[i].date_created = new Date($scope.product_data[i].date_created);
            $scope.product_data[i].number = a += 1;
        };

        var x = .12;
        for (var i in $scope.product_data) {
            $scope.form.vat_wamount = x * $scope.product_data[i].product_srp;
            $scope.product_data[i].wamount1 = parseFloat($scope.product_data[i].product_srp) + parseFloat($scope.form.vat_wamount);
            $scope.product_data[i].wamount3 = parseFloat($scope.product_data[i].wamount1).toFixed(2);
            console.log($scope.product_data[i].wamount);
        };

        for (var z in $scope.product_data) {
            if ($scope.product_data[z].product_status == '(OLD)') {
                $scope.product_data[z].product_status_color = 1;
                $scope.product_data[z].product_status_color1 = 'red';
            }
            if ($scope.product_data[z].product_status == '(NEW)') {
                $scope.product_data[z].product_status_color = 1;
                $scope.product_data[z].product_status_color1 = 'green';
            }
        };

        $scope.totalItems_productdata = $scope.product_data.length;
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
        /*console.log($scope.supplier_data);*/

        var a = 0;
        for (var i in $scope.supplier_data) {
            $scope.supplier_data[i].date_created = new Date($scope.supplier_data[i].date_created);
            $scope.supplier_data[i].number = a += 1;
        };

        $scope.totalItems_supplierdata = $scope.supplier_data.length;

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

$scope.search_supplier = function(){
    if ($scope.form.search_supplier1 == "") {
        get_supplier_data();
    }

    var filters = {
        wildcard : $scope.form.search_supplier1
    };
    console.log(filters);

    var promise = ProductFactory.get_supplier_data_search(filters);
    promise.then(function(data){
        $scope.supplier_data = data.data.result;
        /*console.log($scope.supplier_data);*/

        var a = 0;
        for (var i in $scope.supplier_data) {
            $scope.supplier_data[i].date_created = new Date($scope.supplier_data[i].date_created);
            $scope.supplier_data[i].number = a += 1;
        };

        $scope.totalItems_supplierdata = $scope.supplier_data.length;
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
        /*console.log($scope.request_data);*/

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

$scope.check_item = function(){

    var filters = {
        wildcard : $scope.form.product_bar_code
    };
    console.log(filters);

    var promise = ProductFactory.get_check_item(filters);
    promise.then(function(data){
        $scope.check_item_data_status = true;
        $scope.check_item_data = data.data.result;



        for (var i in $scope.check_item_data) {
            if ($scope.form.product_bar_code == $scope.check_item_data[i].product_bar_code) {
                $scope.form.x = $scope.check_item_data[i].pk;
                $scope.form.product_status_new = '(NEW)';
                $scope.form.product_status_1 = '(NEW/OLD)';
                $scope.add_product();
            };
        };

    })
    .then(null, function(data){
        $scope.check_item_data_status = false;
        $scope.form.product_status = 1; 
        $scope.add_product();
    });
}

$scope.add_product = function(){

    $scope.form.product_expiration = $filter('date')($scope.form.product_expiration, "mediumDate");


    if ($scope.form.product_status == 1) {
        $scope.form.product_status_new = '(NEW)';
    }else{
        $scope.form.product_status_new = '(NEW)';
        $scope.form.product_status_1 = '(NEW/OLD)';
    }
    var datas = {
        product_name : $scope.form.product_name,
        product_bar_code : $scope.form.product_bar_code,
        product_stocks : $scope.form.product_stocks,
        product_srp : $scope.form.srp,
        product_price : $scope.form.product_price,
        product_product_expiration : $scope.form.product_expiration,
        product_supplier : $scope.form.product_supplier,
        product_receipt_name : $scope.form.receipt_name,
        product_status : $scope.form.product_status_new,
        product_status_1 : $scope.form.product_status_1,
        product_status_pk : $scope.form.x,
        product_or_number : $scope.form.or_number
    }

    console.log(datas);

    var promise = ProductFactory.add_product(datas);    
    promise.then(function(data){
        var notify = $.notify('You have succesfully added the product', { allow_dismiss: true });
        get_product_data();
        $route.reload();

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
        product_supplier : $scope.product_data[index].product_supplier,
        receipt_name : $scope.product_data[index].product_receipt_name,
        or_number : $scope.product_data[index].product_or_number
    };

    ngDialog.openConfirm({
        template: 'EditMyProfile',
        className: 'ngdialog-theme-plain dialogwidth500',
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
            product_srp : $scope.modal.product_srp,
            product_bar_code : $scope.modal.product_bar_code,
            product_stocks : $scope.modal.product_stocks,
            product_price : $scope.modal.product_price,
            product_expiration : $scope.modal.new_product_date_expiration,
            supplier_code_name : $scope.modal.supplier_code_name,
            product_supplier : $scope.modal.product_supplier,
            product_receipt_name : $scope.modal.receipt_name,
            product_or_number : $scope.modal.or_number
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

function makeuser_id() {
    var text = "201700";
    var text2 = "";
    var text3 = "";
    var finalnumber = "";
    var final_user_id = "";

    var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var possible2 = "0123456789";

    for (var i = 0; i < 3; i++){
        text2 += possible2.charAt(Math.floor(Math.random() * possible2.length));
    }
    final_user_id = text+text2;
    $scope.modal.final_user_id = final_user_id;
    /*console.log($scope.modal.final_user_id);*/
}

$scope.add_user = function(){


    $scope.modal = {
        title : 'Add User',
        save : 'Add',
        close : 'Cancel',
        final_user_id: $scope.modal.final_user_id
    }     

    ngDialog.openConfirm({
        template: 'EditUser',
        className: 'ngdialog-theme-plain dialogwidth500',
        preCloseCallback: function(value) {
            var nestedConfirmDialog;
            if($scope.modal.first_password != $scope.modal.confirm_password){
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

        $scope.modal.new_password = md5.createHash($scope.modal.first_password);

        var promise = ProductFactory.add_user($scope.modal);
        promise.then(function(data){
            var notify = $.notify('You have succesfully added a new user', { 'type': 'success', allow_dismiss: true });
            get_added_user_data();
            $route.reload();
        })
        .then(null, function(data){
            var notify = $.notify('Oops there is something wrong!', { 'type': 'danger', allow_dismiss: true });

        });
    });
}

$scope.edit_user = function(v){
    var index = $scope.added_user_data.indexOf(v);

    if ($scope.added_user_data[index].user_type == 'Cashier') {
        $scope.modal.user_type = '2';
    };
    if ($scope.added_user_data[index].user_type == 'Admin') {
        $scope.modal.user_type = '1';
    };

    /*console.log($scope.modal.user_type);*/


    $scope.modal = {
        title : 'Edit User',
        save : 'Add',
        close : 'Cancel',
        first_name: $scope.added_user_data[index].first_name,
        middle_name: $scope.added_user_data[index].middle_name,
        last_name: $scope.added_user_data[index].last_name,
        final_user_id: $scope.added_user_data[index].user_id,
        user_type: $scope.modal.user_type,
        confirm_password: $scope.added_user_data[index].password,
        first_password: $scope.added_user_data[index].password
    }     

    ngDialog.openConfirm({
        template: 'UpdateUser',
        className: 'ngdialog-theme-plain dialogwidth500',
        preCloseCallback: function(value) {
            var nestedConfirmDialog;
            if($scope.modal.first_password != $scope.modal.confirm_password){
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
        if ($scope.modal.first_password == $scope.added_user_data[index].password) {
            $scope.super_final_password = $scope.modal.first_password;
        }else if ($scope.modal.first_password != $scope.added_user_data[index].password) {
            $scope.super_final_password = md5.createHash($scope.modal.first_password)
        };
        $scope.modal.new_password = $scope.super_final_password;
        $scope.modal.user_idd = $scope.added_user_data[index].user_id;
        var promise = ProductFactory.edit_user($scope.modal);
        promise.then(function(data){
            var notify = $.notify('You have succesfully updated the user', { 'type': 'success', allow_dismiss: true });
            get_added_user_data();
        })
        .then(null, function(data){
            var notify = $.notify('Oops there is something wrong!', { 'type': 'danger', allow_dismiss: true });

        });
    });
}

$scope.delete_user = function(v){
    var index = $scope.added_user_data.indexOf(v);


    $scope.modal.user_idd = $scope.added_user_data[index].user_id;
    var promise = ProductFactory.delete_user($scope.modal);
    promise.then(function(data){
        var notify = $.notify('You have succesfully deleted the user', { 'type': 'success', allow_dismiss: true });
        get_added_user_data();
    })
    .then(null, function(data){
        var notify = $.notify('Oops there is something wrong!', { 'type': 'danger', allow_dismiss: true });

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
            var notify = $.notify('Oops there is something wrong!', { 'type': 'danger', allow_dismiss: true });

        });
    });
}

function maketransaction_number() {
    var transact_number = "";

    var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var possible2 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < 10; i++){
        transact_number += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    $scope.form.transact_number = transact_number;
}

$scope.tender_product = function(test){

    $scope.product_total_tempo = 0;
    maketransaction_number();

    if (test == undefined || test == null || test == ' ' || test == " ") {
        return false;
    };


    $scope.tender_data.push(test.description);
    for (var i in $scope.tender_data) {
        $scope.tender_data[i].product_price = parseFloat($scope.tender_data[i].product_price);
        if ($scope.tender_data[i].status == true || $scope.tender_data[i].status == undefined) {
        }else{
            $scope.tender_data[i].status = false;
        };
    };

    /*$scope.number = $scope.tender_data[i].number;*/

/* for (var k in $scope.tender_data){
if ($scope.tender_data[k].product_retail_price != undefined) {
if ($scope.tender_data[k].tempo_status == true || test == undefined){
$scope.product_total_tempo += parseInt($scope.tender_data[k].product_retail_price);
$scope.product_total_temporary = $scope.product_total_tempo;
console.log($scope.product_total_temporary);
};
};
};*/
/*
for (var o in $scope.tender_data) {
if ($scope.tender_data[k].tempo_status == true || test == undefined){
$scope.product_total_tempo += parseInt($scope.tender_data[k].product_retail_price);
$scope.product_total_temporary = $scope.product_total_tempo;
};*/


}

$scope.temporary = function(){

    $scope.product_total_tempo = 0;
    $scope.number = 0;

/*if ($scope.tender_data[k].tempo_status == true) {
$scope.tender_data[i].product_price = 0;
};*/

for (var k in $scope.tender_data){
    $scope.product_total_tempo += $scope.tender_data[k].product_retail_price;
    $scope.product_total_temporary = $scope.product_total_tempo;
    $scope.number += $scope.tender_data[k].product_quantity;
    $scope.number_total = $scope.number;
    /*console.log($scope.tender_data[k].product_retail_price);*/
};


}

$scope.discount_amount = function(){

    $scope.discount = true;

    var notify = $.notify('You have succesfully added a Senior Citizen Discount', { allow_dismiss: true });


}

$scope.pay_gift_cert = function(){

/*if($scope.modal.supplier_name == '' || $scope.modal.supplier_address == '' || $scope.modal.supplier_contact_number == '' || $scope.modal.supplier_contact_person == ''){

var notify = $.notify('There is a blank encoded product data', {'type': 'danger', allow_dismiss: true });
return false;
}*/

$scope.modal = {
    title : 'Accept Gift Certificate',
    save : 'Tender',
    close : 'Cancel'
};

ngDialog.openConfirm({
    template: 'GiftModal',
    className: 'ngdialog-theme-plain dialogwidth400',
    preCloseCallback: function(value) {
        var nestedConfirmDialog;
        if ($scope.modal.gc_name == '' || $scope.modal.gc_name == "" || $scope.modal.gc_name == NaN || $scope.modal.gc_name == null || $scope.modal.gc_name == 0.00 || $scope.modal.gc_name == undefined || $scope.modal.product_gc_name == 'NaN') {
            var notify = $.notify('Oops there something wrong with gift certificate name!', {'type': 'danger',  allow_dismiss: true });
            return false;
        };

        if ($scope.modal.gc_code == '' || $scope.modal.gc_code == "" || $scope.modal.gc_code == NaN || $scope.modal.gc_code == null || $scope.modal.gc_code == 0.00 || $scope.modal.gc_code == undefined || $scope.modal.product_gc_code == 'NaN') {
            var notify = $.notify('Oops there something wrong with gift certificate code!', {'type': 'danger',  allow_dismiss: true });
            return false;
        };

        if ($scope.modal.gc_amount == '' || $scope.modal.gc_amount == "" || $scope.modal.gc_amount == NaN || $scope.modal.gc_amount == null || $scope.modal.gc_amount == 0.00 || $scope.modal.gc_amount == undefined || $scope.modal.product_gc_amount == 'NaN') {
            var notify = $.notify('Oops there something wrong with gift certificate amount!', {'type': 'danger',  allow_dismiss: true });
            return false;
        };
        return nestedConfirmDialog;
    },
    scope: $scope,
    showClose: false
})
.then(function(value){
    return false;
}, function(value){

    $scope.modal = {
        cashier_user_id : $scope.user.user_id,
        gc_name : $scope.modal.gc_name, 
        gc_code : $scope.modal.gc_code,
        gc_amount : $scope.modal.gc_amount
    };

    $scope.cash = $scope.modal.gc_amount;
    $scope.cash_status = true;
    $scope.gift_status = true;

    var promise = ProductFactory.gift_certificate_data($scope.modal);
    promise.then(function(data){
        var notify = $.notify('You have succesfully added the gift certificate', { 'type': 'success', allow_dismiss: true });
        get_supplier_data();
    })
    .then(null, function(data){
        var notify = $.notify('Oops there something wrong!', { 'type': 'danger', allow_dismiss: true });

    });

});

}

$scope.stock_checker = function(k){

    var stock_quantity
    stock_quantity = $scope.tender_data[k].product_quantity;
    var prd_stcks
    prd_stcks = $scope.tender_data[k].product_stocks;
    var datax
    datax = $scope.tender_data[k].pk;


    $scope.stock_amount_pk = datax;

    $scope.stock_amount = parseInt($scope.tender_data[k].product_stocks) - parseInt(stock_quantity) ;
    $scope.stock_amount_finalized = $scope.stock_amount;
    if ($scope.stock_amount <= 0) {

        $scope.modal = {
            title : 'URGENT!',
            close : 'Close'
        }     

        ngDialog.openConfirm({
            template: 'AdviceModal',
            className: 'ngdialog-theme-plain dialogwidth400',
            preCloseCallback: function(value) {
                var nestedConfirmDialog;
                return nestedConfirmDialog;
            },
            scope: $scope,
            showClose: false
        })
        .then(function(value){
            return false;
        }, function(value){

        });

    };

    if (stock_quantity > prd_stcks) {
        $scope.modal = {
            title : 'URGENT!',
            close : 'Close'
        }     

        ngDialog.openConfirm({
            template: 'AdviceExceedModal',
            className: 'ngdialog-theme-plain dialogwidth400',
            preCloseCallback: function(value) {
                var nestedConfirmDialog;
                return nestedConfirmDialog;
            },
            scope: $scope,
            showClose: false
        })
        .then(function(value){
            return false;
        }, function(value){
        });
    };

/*var data = {
stock_amount : $scope.stock_amount,
pk : datax
}
var promise = ProductFactory.update_stocks(data);
promise.then(function(data){
})
.then(null, function(data){

});*/

}

$scope.cancel_transaction = function(){

    $scope.modal = {
        title : 'Please input a pin',
        save : 'Confirm',
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
            $route.reload();
            return nestedConfirmDialog;
        },
        scope: $scope,
        showClose: false
    })
    .then(function(value){
        return false;
    }, function(value){

    });

}

$scope.next_transaction = function(){
    $route.reload();
}

$scope.check_amount = function(cash){
    if (cash < $scope.product_total_temporary) {
        var notify = $.notify('Oops your money is not enough!', { allow_dismiss: true });
        $scope.cash_status=false;
        return false;
    }; 

}

$scope.void_product = function(k){

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
            if ($scope.form.pin == $scope.user.superior_pin) {
                $scope.tender_voided.count += 1;
                $scope.tender_voided.value = $scope.tender_data[k].product_retail_price;
                $scope.tender_data[k].product_retail_price = 0;
                $scope.tender_data[k].product_quantity = 0;
                $scope.tender_data[k].status = false;
                $scope.tender_data.splice(k, 1);
                $scope.product_total_temporary = $scope.product_total_temporary - $scope.tender_voided.value;
            }else{
                var notify = $.notify('Oops wrong pincode!', { allow_dismiss: true });
                return false;
            };
            return nestedConfirmDialog;
        },
        scope: $scope,
        showClose: false
    })
.then(function(value){
    return false;
}, function(value){

});

}

/*$scope.stock_finalizer = function(){

var stock_quantity
stock_quantity = $scope.tender_data.product_quantity;
var prd_stcks
prd_stcks = $scope.tender_data.product_stocks;
for (var i in tender_data) {
stock_quantity = $scope.tender_data[i].product_quantity;
prd_stcks = $scope.tender_data[i].product_stocks;
};
$scope.stock_amount = parseInt($scope.tender_data.product_stocks) - parseInt(stock_quantity) ;

console.log(stock_quantity);
console.log(prd_stcks);
console.log($scope.stock_amount);

}*/

$scope.tender_product_final = function(){
    maketransaction_number();

    var b = 0;
    var g = 0;
    for (var i in $scope.tender_data) {
        b = parseFloat($scope.tender_data[i].product_quantity) * parseFloat($scope.tender_data[i].product_retail_price); 
        $scope.tender_data[i].tempo_total = b.toFixed(2);
        $scope.tender_data[i].tempor_total = $scope.tender_data[i].product_retail_price.toFixed(2); 
        g += $scope.tender_data[i].product_quantity; 
        $scope.form.product_count = g;
    };

    $scope.form.totaaal = 0;
    for (var k in $scope.tender_data) {
        $scope.form.totaaal += parseFloat($scope.tender_data[k].tempo_total);
        $scope.form.final_totaal = $scope.form.totaaal.toFixed(2);
    };

/*
var stock_quantity
var prd_stcks*/


for (var z in $scope.tender_data){
    $scope.product_total += parseFloat($scope.tender_data[z].product_retail_price);
};

for (var o in $scope.tender_data) {
    $scope.tender_data[o].product_price = $scope.tender_data[o].product_price.toFixed(2);
    /*console.log($scope.tender_data[o].product_price);*/
};

/*for (var o in $scope.tender_data){
stock_quantity = $scope.tender_data[o].product_quantity;
prd_stcks = $scope.tender_data[o].product_stocks;
$scope.stock_amount = parseInt(prd_stcks) - parseInt(stock_quantity) ;
};

console.log(stock_quantity);
console.log(prd_stcks);
console.log($scope.stock_amount);*/

var vat1
vat1 = parseFloat($scope.product_total) * .12 / 1.12;
$scope.vat = vat1.toFixed(2);
var net_amnt
net_amnt = parseFloat($scope.product_total) - vat1;
$scope.net_amount = net_amnt.toFixed(2);

var dscnt_amnt
var amnt_snr
if ($scope.discount == true) {
    dscnt_amnt = net_amnt * .20;
    $scope.discount_amounts = dscnt_amnt.toFixed(2);
    amnt_snr = net_amnt - dscnt_amnt;
    $scope.amount_senior = amnt_snr.toFixed(2);
    /*console.log($scope.amount_senior);  */
    $scope.product_total = $scope.amount_senior;
}else{
    $scope.discount_amounts = 0;
};

if ($scope.cash_status == true) {
    $scope.cash_status = false;
};

var temp_change
temp_change = parseFloat($scope.cash)  - parseFloat($scope.product_total);
$scope.change = temp_change.toFixed(2);

var r
var e
e = parseFloat($scope.cash);
r = e.toFixed(2);
$scope.form.r = r;
var w
var q
w = parseFloat($scope.product_total);
q = w.toFixed(2);
$scope.form.q = q;

if ($scope.gift_status == true) {
    $scope.form.r_name = 'Gift Certificate'
}else{
    $scope.form.r_name = 'Cash'
};


if ($scope.modal.gc_amount == undefined) {
    $scope.modal.gc_amount = 0;
    $scope.modal.gc_name = 'none';
    $scope.modal.gc_code = 'none';
}else if ($scope.modal.gc_amount != undefined) {
    $scope.change = 0;
};

var data = {
    product_transaction_number : $scope.form.transact_number,
    cashier_user_id : $scope.user.user_id,
    data : JSON.stringify($scope.tender_data),
    vat_percentage : 12,
    net_amount : $scope.net_amount,
    vat : $scope.vat,
    discount : $scope.discount_amounts,
    change : $scope.change,
    gc_amount : $scope.modal.gc_amount,
    gc_name : $scope.modal.gc_name, 
    gc_code : $scope.modal.gc_code,
    cash : $scope.form.r,
    total : $scope.form.q,
    stock_amount_finalized : $scope.stock_amount_finalized,
    stock_amount_pk : $scope.stock_amount_pk,
    void_count : $scope.tender_voided.count,
    r_name : $scope.form.r_name
};


if (data.total == '' || data.total == "" || data.total == NaN || data.total == null || data.total == 0.00 || data.total == undefined || data.product_total == 'NaN') {
    var notify = $.notify('Oops there something wrong with total!', {'type': 'danger',  allow_dismiss: true });
    tender_status = true;
    return false;
};
if (data.net_amount == '' || data.net_amount == "" || data.net_amount == NaN || data.net_amount == null || data.net_amount == undefined || data.net_amount == 'NaN') {
    var notify = $.notify('Oops there something wrong with net amount value!', {'type': 'danger' , allow_dismiss: true });
    tender_status = true;
    return false;
};
if (data.vat == '' || data.vat == "" || data.vat == NaN || data.vat == null || data.vat == undefined || data.vat == 'NaN') {
    var notify = $.notify('Oops there something wrong with vat value!', {'type': 'danger' , allow_dismiss: true });
    tender_status = true;
    return false;
};
if (data.change == NaN || data.change == null || data.change == undefined || data.change == 'NaN') {
    var notify = $.notify('Oops there something wrong with change value!', {'type': 'danger' , allow_dismiss: true });
    tender_status = true;
    return false;
};
if (data.cash == '' || data.cash == "" || data.cash == NaN || data.cash == null || data.cash == undefined || data.cash == 'NaN') {
    var notify = $.notify('Oops there something wrong with cash value!', {'type': 'danger' ,  allow_dismiss: true });
    tender_status = true;
    return false;
};
/*if (data.total == '' || data.total == "" || data.total == NaN || data.total == null || data.total == undefined || data.total == 'NaN') {
var notify = $.notify('Oops there something wrong with total value!', { allow_dismiss: true });
$scope.tender_status = true;
return false;
};*/
$scope.filter.product_expiration = $filter('date')($scope.filter.product_expiration, "medium");
/*console.log($scope.tender_data);
console.log(data);*/
$scope.gift_status = true;
var promise = ProductFactory.tender_product(data);
promise.then(function(data){
    window.open('./FUNCTIONS/Uploads/receipt.php?reports=' + JSON.stringify($scope.tender_data) + '&total=' + $scope.form.final_totaal 
        + '&user_id_fname=' + $scope.user.first_name 
        + '&user_id_lname=' + $scope.user.last_name 
        + '&date_time=' + $scope.filter.product_expiration 
        + '&TI=' + $scope.form.transact_number
        + '&count=' + g
        + '&net_amnt=' + $scope.net_amount
        + '&vat=' + $scope.vat
        + '&change=' + $scope.change
        + '&total=' + q
        + '&change=' + $scope.change
        + '&discount=' + $scope.discount_amounts
        + '&cash=' + r
        + '&rname=' + $scope.form.r_name
        );
})
.then(null, function(data){

});
}

$scope.send_receipt = function(){

    $scope.modal = {
        title : 'Send Receipt Via E-mail',
        save : 'Send',
        close : 'Cancel'
    };

    ngDialog.openConfirm({
        template: 'SendReceiptModal',
        className: 'ngdialog-theme-plain dialogwidth400',
        scope: $scope,
        showClose: false
    })
    .then(function(value){
        return false;
    }, function(value){

        if ($scope.gift_status == true) {
            $scope.form.r_name = 'Gift Certificate'
        }else{
            $scope.form.r_name = 'Cash'
        };

        $scope.submit_datas = {
            product_transaction_number : $scope.form.transact_number,
            cashier_user_id : $scope.user.user_id,
            data : JSON.stringify($scope.tender_data),
            vat_percentage : 12,
            net_amount : $scope.net_amount,
            stock_amount_finalized : $scope.stock_amount_finalized,
            stock_amount_pk : $scope.stock_amount_pk,
            void_count : $scope.tender_voided.count,
            email : $scope.modal.email,
            user_id_fname : $scope.user.first_name,
            user_id_lname : $scope.user.last_name ,
            date_time :$scope.filter.product_expiration,
            TI : $scope.form.transact_number,
            count : $scope.form.product_count,
            message: '<p>Dear Customer,</p><div>&nbsp;</div><div>Attached is your official receipt. Thank you for shopping with us and see you very soon!</div><div>&nbsp;</div><div>For feedback and inquiries do not hesitate to email us via the email address written in the official receipt.</div><div>&nbsp;</div><div>Thank you!</div><div>&nbsp;</div><div>GoSari Team</div>',
            vat : $scope.vat,
            change :  $scope.change,
            total :  $scope.form.q,
            discount : $scope.discount_amounts,
            cash : $scope.form.r,
            r_name: $scope.form.r_name
        };

        var notify = $.notify('Please wait for the receipt to be send', { 'type': 'warning', allow_dismiss: true });

        var promise = ProductFactory.submit_toemail($scope.submit_datas);
        promise.then(function(data){
            var notify = $.notify('You have succesfully send the receipt', { 'type': 'success', allow_dismiss: true });

        })
        .then(null, function(data){
            var notify = $.notify('Oops there something wrong!', { 'type': 'danger', allow_dismiss: true });

        });

    });

}

$scope.get_all_products = function(){
    get_all_products();
}

function get_all_products(){

    if ($scope.filter.searchstring == undefined || $scope.filter.searchstring == '' || $scope.filter.searchstring == null) {
        $scope.filter.searchstring = undefined;
    }

    var filters = {
        wildcard : $scope.filter.searchstring
    };

    var promise = ProductFactory.get_all_products(filters);
    promise.then(function(data){
        $scope.product_data = data.data.result;

    })
    .then(null, function(data){
        $scope.result_status = 'maybe';
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
        className: 'ngdialog-theme-plain dialogwidth500',
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
            var notify = $.notify('You have succesfully updated the product', { 'type': 'success', allow_dismiss: true });
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

    for (var i = 0; i < 5; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        text2 += possible2.charAt(Math.floor(Math.random() * possible2.length));
    }
    finalnumber = text+"-"+text2;
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
            product_name : $scope.product_data[index].product_name,
            product_finalnumber : $scope.modal.finalnumber,
            product_quantity : $scope.modal.product_quantity,
            product_date_needed : $scope.modal.new_product_date_needed,
            product_market_price : $scope.modal.product_market_price
        }

        var promise = ProductFactory.request_product_order(datas);
        promise.then(function(data){
            var notify = $.notify('You have succesfully requested the product', { 'type': 'success', allow_dismiss: true });
            get_request_order_data();
        })
        .then(null, function(data){
            var notify = $.notify('Oops there something wrong!', { 'type': 'danger', allow_dismiss: true });

        });
    });
}

$scope.delete_supplier_data = function(v){
    var index = $scope.supplier_data.indexOf(v);

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

