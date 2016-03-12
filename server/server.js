var Client = require('node-rest-client').Client;
var HL = require('./hotelLook');

var getHotels = function(request, response) {
    var client = new Client();

    console.log(request.params);
 
    var getHotelsUrl = "http://engine.hotellook.com/api/v2/lookup.json?query=55.728751,37.643944lang=ru&lookFor=hotel&limit=10";
    // direct way 
    client.get(getHotelsUrl, function (data, hres) {
	    // parsed response body as js object 
	    console.log(hres);
	    response.send(data);

	    console.log(data);
	    // if (callback){
	    // 	callback(data);
	    // }
	    // raw response 
	    console.log(response);
    });
    //res.render('auth');
}

var restCall = function(request, response){
	var methodName = HL.clientMethod(request.query);
	console.log(methodName);
	if (methodName == "getHotelListHere"){
		getHotelListHere(request, response);		
	}
	else if (methodName == "getHotelInfo"){
		getHotelInfo(request, response);		
	}
	else{
		response.send("clientMethodId=" + methodName + " не поддерживается");
	}
}

var getHotelListHere = function(request, response){
    var client = new Client();
	
	console.log(request.query);

	var paramString = HL.generateParamString(request.query);
	console.log(paramString);

	var getHotelsUrl = "http://engine.hotellook.com/api/v2/lookup.json?" + paramString;

	client.get(getHotelsUrl, function (data, hres) {
		//console.log(hres);
		response.send(data);
		console.log(data);
		console.log(response);
	});
}

var getHotelInfo = function(request, response){
    var client = new Client();
	
	console.log(request.query);

	var paramString = HL.generateParamStringSigned(request.query);
	console.log(paramString);

	var getHotelsUrl = "http://engine.hotellook.com/api/v2/search/start.json?" + paramString;

	client.get(getHotelsUrl, function (data, hres) {
		//console.log(hres);
		response.send(data);
		console.log(data);
		console.log(response);
	});
}

module.exports.getHotels = getHotels;
module.exports.restCall = restCall;
