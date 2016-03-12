console.log('Init App!');

var app = angular.module('RoomMade', []);

app.service('rmService', function ($http) {

	// this.getGreeting = function($scope) {
	// 	var greeting;

	// 	$http.get('/greeting.json')
	// 		.success(function (data) {
	// 				$scope.greeting = data.greeting;
	// 		});

	// 	return greeting;
	// };

	this.restApiHotelLook = function(params, callback) {
		var conf = {};
		conf.params = params;
		$http.get('/rest', conf)
		.success(function (data) {
				if (callback){
					callback(data);
				}
			}
		);
	};

});

app.controller('mainCtrl', function ($scope, rmService) {

	$scope.data = {};
	$scope.data.hotels = [];
	$scope.data.hotelInfo = [];

	$scope.getHotels = function() {
		
		var params = {};
		params.clientMethodId = "getHotelListHere";
		
		params.query = "55.728751,37.643944";
		params.lang = "ru";
		params.lookFor = "hotel";
		params.limit = "10";

		rmService.restApiHotelLook(params, function(data){
			$scope.data.hotels = data.results.hotels;
		});
	}

	$scope.getHotelInfo = function(hotelId) {
		
		var params = {};
		params.clientMethodId = "getHotelInfo";
		
		params.hotelId = hotelId;
		params.checkIn  = "2016-05-20";
		params.checkOut = "2016-06-20";
		params.adultsCount = "1";
		params.waitForResult = "1";

		rmService.restApiHotelLook(params, function(data){
			$scope.data.hotelInfo = data.results;
		});
	}
})