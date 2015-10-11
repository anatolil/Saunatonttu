/*
* Node server
*/

//Using
var http = require('http');
var TimeController = require('./TimeController.js');
var LedController = require('./LedController.js');
var TemperatureController = require('./TemperatureController.js');

//Initialize controllers
var controllers = new Array();
controllers.push(new TimeController());
controllers.push(new LedController());
controllers.push(new TemperatureController());

http.createServer(function (request, response)
{	
    //get authentication header
    var authenticationToken = request.headers['Authentication'];

    var jsonString = '';
    request.on('data', function (data) {
        jsonString += data;
    });

    request.on('end', function () {
        var json = jsonString.length ? JSON.parse(jsonString) : '';
        var url = require('url').parse(request.url, true);
        var route = url['pathname'];
	var routeExists = false;

        for (var i = 0; i < controllers.length; i++) {
            if (controllers[i].getRoute() === route) {
                //TODO check if controller accepts authentication level
                controllers[i].action(response, json, url['query']);
		routeExists = true;
            }
        }
	if (!routeExists) {
       		 response.writeHead(404, {'Content-Type': 'text/plain'});
       		 response.end('Page not found: ' + route);
	}
    });
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');







