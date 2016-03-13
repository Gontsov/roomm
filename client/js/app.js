console.log('Init App!');

var app = angular.module('RoomMade', []);

app.service('myService', function ($http) {

  this.getGreeting = function($scope) {
    var greeting;

    $http.get('/greeting.json')
      .success(function (data) {
          $scope.greeting = data.greeting;
      });

    return greeting;
  };

});

app.controller('mainCtrl', function ($scope, myService) {
    myService.getGreeting($scope);
});


app.controller('templateCtrl', function ($scope) {
	$scope.templates = [
		{
			name: 'Basic',
			options: [
				'1 person',
				'double bed',
				'kitchen',
				'shower',
				'suspend',
				'wi-fi',
			],
			checkin: '10/10/2015',
			checkout: '30/10/2015',
			room: 4
		},
		{
			name: 'Family',
			options: [
				'3 person',
				'trouble bed',
				'kitchen',
				'shower',
				'suspend',
			],
			checkin: '10/10/2015',
			checkout: '30/10/2015',
			room: 2
		}
	];

	$scope.datepick = function() {
		$('.datepick').datepicker({
          onSelect: function () {
            console.log($(this).val())
            $(this).parent().addClass('is-dirty')
          }
        });
	}
});

app.controller('resultCtrl', function ($scope) {
	$scope.results = [
		{
			url: 'http://hotelglobo.com/wp-content/uploads/2013/11/globo-0119.jpg',
			templateName: 'Comfort',
			stars: [1,2,3,4],
			relevation: 88,
			listOptions: [
				'1 person',
				'double bed',
				'kitchen',
				'shower',
				'suspend',
				'wi-fi',
				'test 1',
				'test 2',
				'test 3',
				'test 4',
				'test 5',
				'test 6',
				'test 7',
				'test 8',
			],
			ratinglist: [
				'Available Rooms: 4',
				'Rating: 70%',
				'Optimal Distance: 200m',
				'Price: 299$',
			],

		},
		{
			url: 'data:image/jpeg;base64,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',
			templateName: 'Comfort',
			stars: [1,2,3,4],
			relevation: 74,
			listOptions: [
				'1 person',
				'double bed',
				'kitchen',
				'shower',
				'suspend',
				'wi-fi',
				'test 1',
				'test 2',
				'test 3',
				'test 4',
				'test 5',
				'test 6',
				'test 7',
				'test 8',
			],
			ratinglist: [
				'Available Rooms: 4',
				'Rating: 70%',
				'Optimal Distance: 200m',
				'Price: 299$',
			],

		},
	];

	$scope.setRelevation = function(el, percent) {
		document.querySelector(el).addEventListener('mdl-componentupgraded', function() {
			this.MaterialProgress.setProgress(percent);
		});
	}
});