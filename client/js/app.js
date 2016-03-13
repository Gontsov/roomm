console.log('Init Roommade app!');

var app = angular.module('RoomMade', []);

app.service('rmService', function ($http) {

	this.getAmenities = function(callback) {
		var greeting;

		$http.get('/amenities.json')
			.success(function (data) {
				if (callback){
					callback(data);
				}
			});

		return greeting;
	};

	this.restApiHotelLook = function(params, callback, callback2) {
		var conf = {};
		conf.params = params;
		$http.get('/rest', conf)
		.success(function (data) {
				if (callback){
					callback(data);
				}
				if (callback2)
					callback2();
			}
		);
	};
});

app.filter('orderObjectBy', function(){
    return function(input, attribute, reverse) {
        if (!input)
            return input;
        if (!angular.isObject(input))
            return input;

        var array = [];
        for(var objectKey in input) {
            array.push(input[objectKey]);
        }

        array.sort(function(a, b){
                    a = parseInt(a[attribute]);
                    b = parseInt(b[attribute]);
                    if (reverse)
                        return b - a;
                    else
                        return a - b;
                });
        return array;
    }
});

app.controller('mainCtrl', function ($scope, rmService, $window) {

	////////////////

	$scope.templates = [
		{
			name: 'Individual',
			options: [
				{id: 11, name: 'Air condition'},
				{id: 4, name: 'TV'},
				{id: 66, name: 'Refrigerator'},
				{id: 133, name: 'Wi-fi in room'},
				{id: 5, name: 'Telephone'},
				{id: 7, name: 'Shower'},
			],
			checkin: '',
			checkout: '',
			adult: 2,
			room: 0,
			select: false
		},
		{
			name: 'Family',
			options: [
				{id: 11, name: 'Air condition'},
				{id: 53, name: 'Kitchenette'},
				{id: 67, name: 'Crib available'},
				{id: 7, name: 'Shower'},
				{id: 8, name: 'Non-smoking'},
			],
			checkin: '',
			checkout: '',
			adult: 1,
			child: 1,
			room: 0,
			select: false
		},
		{
			name: 'Premium',
			options: [
				{id: 53, name: 'Kitchenette'},
				{id: 16, name: 'Mini bar'},
				{id: 57, name: 'Jacuzzi'},
				{id: 4, name: 'TV'},
				{id: 132, name: 'Smoking room'},
				{id: 33, name: 'Balcony'},
				{id: 11, name: 'Air condition'},
				{id: 133, name: 'Wi-fi in room'},
			],
			checkin: '',
			checkout: '',
			adult: 1,
			room: 0,
			select: false
		},
	];

	$scope.select = function(o) {
		o.select = !o.select;
	}

	$scope.search = function() {
		console.log('search');

		$scope.data.hotels = [];
		$scope.data.hotelInfo = {};

		$scope.getHotels();

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

	////////////////

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

	////////////////

	$scope.dict = {};

	$scope.data = {};
	$scope.data.hotels = [];
	$scope.data.hotelInfo = {};

	
	$scope.init = function(){

		rmService.getAmenities(function(data){
			$scope.dict.amenities = data;
		});
	}

	$scope.showLoadingProgress = function(){
		// jQuery('.c-request-progress').removeClass('c-hidden');
		jQuery('.js-loader-results').removeClass('c-hidden');
	}

	$scope.hideLoadingProgress = function(){
		// jQuery('.c-request-progress').addClass('c-hidden');
		jQuery('.js-loader-results').addClass('c-hidden');
	}

	$scope.restApiHotelLook = function(params, callback, callback2) {
		rmService.restApiHotelLook(params
			, function(data){
				if (callback){
					$scope.hideLoadingProgress();
					callback(data);
				}
			}
			, function(){
				if (callback2){
					callback2();
				}
			});
		$scope.showLoadingProgress();
	};

	$scope.getHotels = function() {

		console.log("client:getHotels");
		
		var params = {};
		params.clientMethodId = "getHotelListHere";
		
		//params.query = "55.728751,37.643944";
		// params.query = "55.777688,37.586643";

		params.query = $scope.location;

		params.lang = "ru";
		params.lookFor = "hotel";
		params.limit = "10";

		$scope.restApiHotelLook(params, function(data){
			$scope.data.hotels = data.results.hotels;

			if (!$scope.data.hotels)
				return;

			var hTotal = $scope.data.hotels.length;

			asyncLoop(hTotal, function(loop) {
			    readHotelInfo(loop.iteration(), function(result) {
			        var hidx = loop.iteration();
			        loop.next();
			    })}
			    
			    , function(){
			    	console.log('read data ended');
			    }
			);
		}, null);
	}

	function asyncLoop(iterations, func, callbackFinish) {
		var index = 0;
		var done = false;
		var loop = {
		
			next: function() {
				if (done) {
					return;
				}

				if (index < iterations) {
					index++;
					func(loop);
				}
				else {
					done = true;
					callbackFinish();
					}
				},

				iteration: function() {
					return index - 1;
				},

				getIndex: function() {
					return index;
				},

				break: function() {
					done = true;
					callbackFinish();
				}
		};
		loop.next();
		return loop;
	}

	function readHotelInfo(index, callback) {

	    console.log("readHotelInfo:" + index);

	    var hotel = $scope.data.hotels[index];
        console.log(hotel);
        $scope.getHotelInfo(hotel.id, callback);
   
	}

	$scope.searchAmenityName = function(amenityId){
		var aEntity = null;
		if ($scope.dict.amenities && $scope.dict.amenities.length > 0){
			for (var ai = 0; ai < $scope.dict.amenities.length; ai++){
				var aItem = $scope.dict.amenities[ai];
				if (aItem.id == amenityId){
					aEntity = aItem;
					break;
				}
			}  
		}
		return aEntity;
	}

	$scope.getHotelInfo = function(hotelId, callback) {

		console.log("client:getHotelInfo");
		
		var params = {};
		params.clientMethodId = "getHotelInfo";
		
		params.hotelId = hotelId;
		params.checkIn  = "2016-06-01";
		params.checkOut = "2016-06-21";
		params.adultsCount = "1";
		params.waitForResult = "1";

		$scope.restApiHotelLook(params, function(data){
			console.log(data);
			if (data.result){
				var hotelInfo = data.result.length > 0 ? data.result[0] : null;
				if (hotelInfo){
					if (hotelInfo.amenities){
						hotelInfo.amenitiesInfo = {};

						var aTotal = hotelInfo.amenities.length;
						for (var a = 0; a < aTotal; a++){
							var aItem = hotelInfo.amenities[a];
							hotelInfo.amenitiesInfo[aItem] = $scope.searchAmenityName(aItem);
						}
					}

					hotelInfo.Room = {};
					var availableCountTotal = 0;
					if (hotelInfo.rooms && hotelInfo.rooms.length > 0){
						var rTotal = hotelInfo.rooms.length;
						for (var r = 0; r < rTotal; r++){
							var room = hotelInfo.rooms[r];
							if (room.options){
								if (room.options.available){
									availableCountTotal += room.options.available;
								}
							}
						}
						hotelInfo.Room = room;
						hotelInfo.AvaTotal = availableCountTotal;

						hotelInfo.Rel = $scope.getRelevation( $scope.getSelectedTemplate().options, hotelInfo );
					}

					if (hotelInfo.AvaTotal > 0){
						$scope.data.hotelInfo[hotelInfo.id] = hotelInfo;
					}
				}
			}
		}, callback);
	}

	$scope.init();

	// Сравнивает опции шаблона с полученными
	$scope.compareOption = function (id, arr) {
		var valid = false;
		for (var i = 0; i < arr.length; i++){
			if( arr[i] === id ) {
				valid = true;
				break;
			}
		}
		return valid;
	}

	$scope.compareOptionRel = function (id, arr) {
		var valid = false;
		for (var i = 0; i < arr.length; i++){
			if( arr[i].id === id ) {
				valid = true;
				break;
			}
		}
		return valid;
	}

	$scope.getSelectedTemplate = function () {
		var template;
		for(var i = 0; i < $scope.templates.length; i++) {
			if( $scope.templates[i].select ) template = $scope.templates[i];
		}
		return template;
	}

	$scope.getStars = function(num) {
	    return new Array(num);   
	}

	$scope.goToBooking = function(link) {
		$window.open(link);
	}

	$scope.getRelevation = function(templateOptions, hotel) {
		var percent = 0;
		var matches = 0;

		if(!hotel.amenities) {
			return 0;
		}
		console.log('templateOptions', templateOptions);
		console.log('hotelAmenities', hotel.amenities);

		for (var i = 0; i < hotel.amenities.length; i++) {
			if ( $scope.compareOptionRel(hotel.amenities[i], templateOptions) ) {
				matches++;
			}
		};

		percent = matches / templateOptions.length * 100;

		$scope.setRelevation('#p'+ hotel.id, percent );
		
		return percent;
	}

	$scope.setRelevation = function(el, percent) {
		console.log('percent', percent);
		console.log('el', el);
		// console.log( document.querySelector(el) )
		// document.querySelector(el).addEventListener('mdl-componentupgraded', function() {
		// 	this.MaterialProgress.setProgress(percent);
		// });
	}

});

app.controller('templateCtrl', function ($scope) {
	$scope.templates = [
		{
			name: 'Individual',
			options: [
				{id: 11, name: 'Air condition'},
				{id: 4, name: 'TV'},
				{id: 66, name: 'Refrigerator'},
				{id: 133, name: 'Wi-fi in room'},
				{id: 5, name: 'Telephone'},
				{id: 7, name: 'Shower'},
			],
			checkin: '',
			checkout: '',
			adult: 2,
			room: 0,
			select: false
		},
		{
			name: 'Family',
			options: [
				{id: 11, name: 'Air condition'},
				{id: 53, name: 'Kitchenette'},
				{id: 67, name: 'Crib available'},
				{id: 7, name: 'Shower'},
				{id: 8, name: 'Non-smoking'},
			],
			checkin: '',
			checkout: '',
			adult: 1,
			child: 1,
			room: 0,
			select: false
		},
		{
			name: 'Premium',
			options: [
				{id: 53, name: 'Kitchenette'},
				{id: 16, name: 'Mini bar'},
				{id: 57, name: 'Jacuzzi'},
				{id: 4, name: 'TV'},
				{id: 132, name: 'Smoking room'},
				{id: 33, name: 'Balcony'},
				{id: 11, name: 'Air condition'},
				{id: 133, name: 'Wi-fi in room'},
			],
			checkin: '',
			checkout: '',
			adult: 1,
			room: 0,
			select: false
		},
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