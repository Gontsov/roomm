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
			room: 4,
			select: false
		},
		{
			name: 'Family',
			options: [
				'3 person',
				'triple bed',
				'kitchen',
				'shower',
				'suspend',
			],
			checkin: '10/10/2015',
			checkout: '30/10/2015',
			room: 2,
			select: false
		}
	];

	$scope.select = function(o) {
		o.select = !o.select;
	}

	$scope.search = function() {
		console.log('send data');

		$('html,body').animate({
          scrollTop: $('.results').offset().top
        }, 500);
	}

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
			url: 'https://texasstation.sclv.com/~/media/Images/Page%20Background%20Images/Texas/TS_Hotel_King_lowrez.jpg?h=630&w=1080',
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