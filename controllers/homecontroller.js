demoApp.controller('FacebookController', function($scope) {
	$scope.name = 'Login Please';
	$scope.FBLogin = function(){
		FB.login(function(response) {
			if (response.authResponse) {
				console.log('Welcome!  Fetching your information.... ');
				FB.api('/me', { scope: 'email' }, function(response) {
					console.log('Good to see you, ' + response.name + '.');
					console.log(response);
				});
			} else {
				console.log('User cancelled login or did not fully authorize.');
			}
		});
	}
});

demoApp.controller('SimpleController', function($scope) {
	$scope.data = [
	{
		number:'1',
		name:'Ken Tapdasan',
		cn:'09157930522',
		add:'Mandaluyong'
	},
	{
		number:'2',
		name:'Clarissa Mae Fortuno',
		cn:'09301986993	',
		add:'Mandaluyong'
	}
	];
	$scope.addData = function() {
		$scope.data.push({number:$scope.en1,
			name:$scope.cn1,
			cn:$scope.cn2,
			add:$scope.ad1
		})
	}
});

