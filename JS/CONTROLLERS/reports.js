app.controller('Reports', function(
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
    $scope.cashier_name = {};
    $scope.tender_data_status = {};

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

    $scope.get_reports = function(){
        var filter = {
            name : $scope.form.cashier_name
        };

    var promise = ProductFactory.get_reports(filter);
    promise.then(function(data){
        $scope.tender_data = data.data.result;

        var a = 0;
            for (var i in $scope.tender_data) {
                $scope.tender_data[i].date_created = new Date($scope.tender_data[i].date_created);
                $scope.tender_data[i].date_created = $filter('date')($scope.tender_data[i].date_created, "medium");
                $scope.tender_data[i].number = a += 1;
            };

        $scope.tender_data_status = true;
/*      
            $scope.totalItems_productdata = $scope.product_data.length;

            $scope.form = {};*/
    })
    .then(null, function(data){
$scope.tender_data_status = false;

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

    $scope.print_pdf = function(){

        window.open('./FUNCTIONS/Uploads/performance_pdf.php?reports=' + JSON.stringify($scope.tender_data)
            );
}

});

