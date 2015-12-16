/*
* Node server
*/

//Using
var http = require('http');
//var LedController = require('./LedController.js');
//var TemperatureController = require('./TemperatureController.js');
var TimeController = require('./TimeController.js');
var TestController = require('./test.js');

//Initialize controllers
var controllers = new Array();
//controllers.push(new LedController());
//controllers.push(new TemperatureController());
controllers.push(new TimeController());
controllers.push(new TestController());

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
        var routeFound = false;

        for (var i = 0; i < controllers.length; i++) {
            for (var controllerRoute in controllers[i].getRoute()) {
                if (controllerRoute === route) {
                    controllers[i].getRoute()[controllerRoute](response, json, url['query']);
                    routeFound = true;
                }
            }
        }
        
        if (!routeFound) {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.end('Page not found: ' + route);
        }
    });
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');







