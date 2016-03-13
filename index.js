var express = require('express');

var HLAPI = require('./server/server');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/server'));
app.use(express.static(__dirname + '/node_modules/angular/'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/restOld', function(request, response) {
  
  //response.render('pages/index');
  HLAPI.getHotels(request, response);
});

app.get('/rest', function(request, response) {
  
  //response.render('pages/index');
  HLAPI.restCall(request, response);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
