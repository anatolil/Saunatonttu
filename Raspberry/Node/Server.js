/*
* Node server
*/

//Using
var http = require("http");

//Todo initialize controllers
var controllers = new array();
controllers.push(new TimeController());

http.createServer(function (request, response) {
	
	//TODO get authenticationHeaders

	var jsonString = '';
    request.on('data', function (data) {
        jsonString += data;
    });
	
	request.on('end', function () {
	
		var json = JSON.parse(jsonString);
		var url = require('url').parse(request.url, true);
		var route = url['pathname'];
		
		//Todo iterate trough all controllers
		foreach (controllers.route === route) {
			//Todo check if controller accepts authenticationlevel
			controller.action(response, json, url['query']);
		}
		else {
			response.writeHead(404, {'Content-Type': 'text/plain'});
			response.end('Page not found' + route);
		}
	});   
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');







