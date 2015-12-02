var route;

function TimeCon()
{
    route = "/get/time";
}

TimeCon.prototype.getRoute = function()
{
    return route;
}

TimeCon.prototype.action = function(response, json, query)
{
    response.writeHead(200, {'Content-Type': 'application/json'});
    var date = new Date();
    response.end(JSON.stringify({ hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds() }));
}

module.exports = TimeCon;