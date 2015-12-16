var fs = require('fs');
var loadHtml = require('./HtmlLoader.js');

var route;

function TemperatureController()
{
    route = {"/get/temperature": TemperatureController.prototype.renderTemperature, "/get/temperatureadjust": TemperatureController.prototype.adjustTemperature, "/post/temperaturechange": TemperatureController.prototype.changeTemperature};
}

TemperatureController.prototype.getRoute = function()
{
    return route;
}

TemperatureController.prototype.renderTemperature = function (response, json, query)
{
    response.writeHead(200, {'Content-Type': 'text/html'});
    loadHtml(response, './HTML/showtemperature.html', { temperature: fs.readFileSync('temperature.txt', 'utf8'), tempchange: 80 });
}

TemperatureController.prototype.adjustTemperature = function (response, json, query)
{
    response.writeHead(200, {'Content-Type': 'application/json'});
    var jsonResponse = JSON.stringify({ temperature: fs.readFileSync('temperature.txt', 'utf8'), temperatureWanted: fs.readFileSync('temperatureGoal.txt', 'utf8') });
    response.end(jsonResponse);
}

TemperatureController.prototype.changeTemperature = function (response, json, query)
{
    console.log(json);
    fs.writeFileSync('temperatureGoal.txt', json, 'utf8');
    
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('ok');
}

module.exports = TemperatureController;
