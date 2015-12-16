var fs = require('fs');

var loadHtml = require('./HtmlLoader.js');

var route;

function TemperatureController()
{
    route = {"/get/temperature": TemperatureController.prototype.renderTemperature, "/get/temperatureadjust": TemperatureController.prototype.adjustTemperature};
}

TemperatureController.prototype.getRoute = function()
{
    return route;
}

TemperatureController.prototype.renderTemperature = function (response, json, query)
{
    response.writeHead(200, {'Content-Type': 'application/json'});
    var jsonResponse = JSON.stringify({ temperature: fs.readFileSync('temperature.txt', 'utf8') });
    response.end(jsonResponse);
}

TemperatureController.prototype.adjustTemperature = function (response, json, query)
{
    response.writeHead(200, {'Content-Type': 'text/html'});
    loadHtml(response, './HTML/showtemperature.html', null);
}

module.exports = TemperatureController;
