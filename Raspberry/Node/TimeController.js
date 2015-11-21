var loadHtml = require('./HtmlLoader.js');

var route;

function TimeController()
{
    route = "/get/unixtime";
}

TimeController.prototype.getRoute = function()
{
    return route;
}

TimeController.prototype.action = function(response, json, query)
{
    response.writeHead(200, {'Content-Type': 'application/json'});
    var date = new Date();
    loadHtml(response, './showtime.html', { time: getUnixtimeJson(), hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds() });
}

function getUnixtimeJson()
{
    var date = new Date();
    return JSON.stringify({ unixtime: date.getTime() });
}

module.exports = TimeController;