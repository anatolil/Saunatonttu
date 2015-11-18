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
    response.writeHead(200, {'Content-Type': 'application/json'});
    var jsonResponse = JSON.stringify({ temperature: getTemperature()});
    response.end(jsonResponse);
}

function getTemperature (){
  fs.readFile('/run/saunatonttu/temp.txt', function (err, data) {
    if (err) throw err;
    console.log(data);
  });
}

module.exports = TemperatureController;
