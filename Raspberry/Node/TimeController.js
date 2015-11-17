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
    response.end(getUnixtime());
}

function getUnixtime()
{
    var date = new Date();
    return JSON.stringify({ unixtime: date.getTime() });
}

module.exports = TimeController;