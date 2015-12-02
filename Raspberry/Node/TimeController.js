var loadHtml = require('./HtmlLoader.js');

var route;

function TimeController()
{
    route = { "/get/unixtime": TimeController.prototype.showTime, "/get/time": TimeController.prototype.getTime};
}

TimeController.prototype.getRoute = function()
{
    return route;
}

TimeController.prototype.showTime = function(response, json, query)
{
    response.writeHead(200, {'Content-Type': 'text/html'});
    loadHtml(response, './HTML/showtime.html', returnTime());
}

TimeController.prototype.getTime = function(response, json, query)
{
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(returnTime()));
}

function getUnixtimeJson()
{
    var date = new Date();
    return JSON.stringify({ unixtime: date.getTime() });
}

function returnTime()
{
    var date = new Date();
    return { hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds() };
}

module.exports = TimeController;