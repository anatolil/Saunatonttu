var fs = require('fs');

var route;

function TemperatureController()
{
    route = "/get/temperature";
}

TemperatureController.prototype.getRoute = function()
{
    return route;
}

TemperatureController.prototype.action = function(response, json, query)
{
    
fs.readFile('/run/saunatonttu/temp.txt', "utf-8" , function (err, data) {
   
    if (err) {
	response.writeHead(418, {'Content-Type': 'plain/text'});
	response.end(err);
    }

    response.writeHead(200, {'Content-Type': 'application/json'});
    var jsonResponse = JSON.stringify({ temperature: data});
    response.end(jsonResponse);

  });

}

module.exports = TemperatureController;
