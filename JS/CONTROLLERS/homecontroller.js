app.controller('HomeController', function(
                                            $scope,
                                            SessionFactory,
                                            UserFactory,
                                            md5
                                          ) 
{
	
    $scope.user = {};
    $scope.form = {};
    $scope.chats = [];
    $scope.array_chat = [];
    $scope.chat_count = 0;
    $scope.chatter = [];

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
            get_chat_all();
        })
        .then(null, function(data){
            
        });
    }

    function get_chat_all(){
        var filters = {
            'pk' : $scope.pk
        };

        var promise = UserFactory.get_chat_all(filters);
        promise.then(function(data){
            $scope.array_chat = data.data.result;

            for(var z in $scope.array_chat){
                $scope.chat_count +=1;
                if ($scope.array_chat[z].chatted_by == $scope.user.pk) {
                    $scope.array_chat[z].yes = true;
                }else{
                    $scope.array_chat[z].yes = false;
                }
                $scope.chatter.push($scope.array_chat[z].chat_pk);
            }
            setInterval($scope.get_updated_chat, 1000);
        })
        .then(null, function(data){
            $scope.chat_count = 0;
            get_chat_all();
        });
    }

    $scope.logout = function(){
        var promise = SessionFactory.logout();
        promise.then(function(data){
            window.location = './login.html';
        })
    }

    $scope.submit_chat = function(){
        var filters = {
            'pk' : $scope.user.pk,
            'chatdesc' : $scope.form.chatdesc
        };
        var promise = UserFactory.submit_chat(filters);
        promise.then(function(data){
            $scope.form.chatdesc = '';
        })
        .then(null, function(data){
            
        });
    }

    $scope.get_updated_chat = function(){
        var filters = {
            'chat_pk' : $scope.chatter
        };
        // console.log($scope.array_chat);
        var promise = UserFactory.get_updated_chat(filters);
        promise.then(function(data){
            $scope.chats = data.data.result;
            $scope.chatter = [];

            for(var k in $scope.chats){
                if ($scope.chats[k].chatted_by == $scope.user.pk) {
                    $scope.chats[k].yes = true;
                }else{
                    $scope.chats[k].yes = false;
                }

                $scope.array_chat.push(
                {
                    name:$scope.chats[k].name,
                    chat_desc:$scope.chats[k].chat_desc,
                    chat_pk:$scope.chats[k].chat_pk,
                    date_chatted:$scope.chats[k].date_chatted,
                    chatted_by:$scope.chats[k].chatted_by,
                    yes:$scope.chats[k].yes
                }
                );
            }

            for(var l in $scope.array_chat){
                $scope.chatter.push($scope.array_chat[l].chat_pk);
            }

            console.clear();
        })
        .then(null, function(data){
            console.clear();
        });
    }

});

