/*
* Run node blinkled.js
* Send http packet with power header to :8081
* If power = null led Off else led On.
*/

//Using
var wyliodrin = require("wyliodrin");
var http = require("http");
var qs = require('querystring');

//Allow writing to pin
wyliodrin.pinMode (0, 1);

http.createServer(function (request, response) {

   response.writeHead(200, {'Content-Type': 'text/plain'});   
   response.end("Hi i'm your hot website!");
   
   console.log("____HEADERS____");
   console.log(request.headers);
   
   if (request.method == 'POST') {
        var jsonString = '';

        request.on('data', function (data) {
            jsonString += data;
        });

        request.on('end', function () {
			var json = JSON.parse(jsonString)
			handleRequest(request.headers, json);
        });
    }
}).listen(8081);

function handleRequest(headers, json) 
{
   var power = headers['power'];

   if (power) {
	wyliodrin.digitalWrite (0, 1);
   }
   else {
	wyliodrin.digitalWrite (0, 0);
   }
}

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');







