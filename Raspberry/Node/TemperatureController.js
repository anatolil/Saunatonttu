var fs = require('fs');

var route;
var temperatureWorker;

function TemperatureController(TemperatureWorker)
{
    route = {"/get/temperature": TemperatureController.prototype.renderTemperature};
    temperatureWorker = TemperatureWorker;
}

TemperatureController.prototype.getRoute = function()
{
    return route;
}

TemperatureController.prototype.renderTemperature = function (response, json, query)
{
    response.writeHead(200, {'Content-Type': 'application/json'});
    var jsonResponse = JSON.stringify({ temperature: temperatureWorker() });
    response.end(jsonResponse);
}

module.exports = TemperatureController;
