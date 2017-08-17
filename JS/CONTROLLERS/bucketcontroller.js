app.controller('BucketController', function(
                                            $scope,
                                            SessionFactory,
                                            UserFactory,
                                            md5,
                                            ngDialog,
                                            FileUploader,
                                            UINotification,
                                            $filter
                                            ) 
                                        {

    $scope.user = {};

    $scope.uploader = {};
    $scope.uploader.queue = {};

    $scope.uploaded_picture = {};

      $scope.viewby = 4;
      $scope.currentPage = 4;
      $scope.itemsPerPage = $scope.viewby;
      $scope.maxSize = 2;

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
            get_uploaded_picture();
        })
        .then(null, function(data){

        });
    }

    function get_uploaded_picture(){
        var filters = {
            'pk' : $scope.user.pk
        };

        var promise = UserFactory.get_uploaded_picture(filters);
        promise.then(function(data){
            $scope.uploaded_picture = data.data.result;
            for (var i in $scope.uploaded_picture){
                $scope.uploaded_picture[i].date_uploaded = new Date($scope.uploaded_picture[i].date_uploaded);
                $scope.uploaded_picture[i].date_uploaded = $filter('date')($scope.uploaded_picture[i].date_uploaded,'medium');
            } 

            $scope.totalItems = $scope.uploaded_picture.length;


        })
        .then(null, function(data){

        });
    }

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
      };

      $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
      };

    $scope.setItemsPerPage = function(num) {
      $scope.itemsPerPage = num;
      $scope.currentPage = 1; //reset to first paghe
    }

    $scope.upload_pictures = function(){
        $scope.modal = {
            title : 'Upload Picture',
            message: '',
            save : 'Save',
            close : 'Cancel'
        };

        ngDialog.openConfirm({
            template: 'UploadModal',
            className: 'ngdialog-theme-plain dialogwidth450',
            scope: $scope,
            showClose: false
        })
        .then(function(value){
            return false;
        }, function(value){
            var data = {
                picture_link : $scope.user.uploaded_picture_link,
                uploaded_by : $scope.user.pk
            }
            var promise = UserFactory.upload_picture(data);
            promise.then(function(data){ 
                 UINotification.success({
                    message: 'Picture has been uploaded succesfully', 
                    title: 'SUCCESS', 
                    delay : 5000,
                    positionY: 'top', positionX: 'right'
                });
                get_uploaded_picture();
            })
            .then(null, function(data){
               UINotification.error({
                    message: 'An error occurred. Please try again.', 
                    title: 'ERROR', 
                    delay : 5000,
                    positionY: 'top', positionX: 'right'
                });
            });        
        });
}

var uploader = $scope.uploader = new FileUploader({
    url: './FUNCTIONS/Uploads/uploader.php'
});

uploader.filters.push({
    'name': 'enforceMaxFileSize',
    'fn': function (item) {
        return item.size <= 10485760; 
    }
});

uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {

};
uploader.onAfterAddingFile = function(fileItem) {

};
uploader.onAfterAddingAll = function(addedFileItems) {

};
uploader.onBeforeUploadItem = function(item) {

};
uploader.onProgressItem = function(fileItem, progress) {

};
uploader.onProgressAll = function(progress) {

};
uploader.onSuccessItem = function(fileItem, response, status, headers) {

};
uploader.onErrorItem = function(fileItem, response, status, headers) {

};
uploader.onCancelItem = function(fileItem, response, status, headers) {

};
uploader.onCompleteItem = function(fileItem, response, status, headers) {
console.log(response.file);
$scope.user.uploaded_picture_link = response.file;
};
uploader.onCompleteAll = function() {

};
});

