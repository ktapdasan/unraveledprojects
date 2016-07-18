demoApp.controller('HomeController', function($scope) {
	
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