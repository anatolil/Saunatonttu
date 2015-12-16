var fs = require('fs');

var route;

function TemperatureController()
{
    route = {"/get/temperature": TemperatureController.prototype.renderTemperature};
}

TemperatureController.prototype.getRoute = function()
{
    return route;
}

TemperatureController.prototype.renderTemperature = function (response, json, query)
{
    response.writeHead(200, {'Content-Type': 'application/json'});
    var jsonResponse = JSON.stringify({ temperature: fs.readFileSync('temperature.txt') });
    response.end(jsonResponse);
}

module.exports = TemperatureController;
