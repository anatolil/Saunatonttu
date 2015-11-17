/*
* Node server
*/

//Using
var http = require("http");
var TimeController = require('./TimeController.js');
var LedController = require('./LedController.js');

//TODO initialize controllers
var controllers = new Array();
controllers.push(new TimeController());
controllers.push(new LedController());

http.createServer(function (request, response) {
	
	//TODO get possible authenticationHeaders

	var jsonString = '';
    request.on('data', function (data) {
        jsonString += data;
    });
	
	request.on('end', function () {
	
		var json = JSON.parse(jsonString);
		var url = require('url').parse(request.url, true);
		var route = url['pathname'];
		
		if (true) { //TODO Check here if route exists
			for (var i = 0; i < controllers.length; i++) {
				if (controllers[i].getRoute() === route) {
					//TODO check if controller accepts authentication level
					controllers[i].action(response, json, url['query']); 
				}
			}
		}
		else {
			response.writeHead(404, {'Content-Type': 'text/plain'});
			response.end('Page not found' + route);
		}
	});   
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');







