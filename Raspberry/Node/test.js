var loadHtml = require('./HtmlLoader.js');

var route;

function TestController()
{
    route = { "/get/test": TestController.prototype.showTime, "/get/getEvents": TestController.prototype.getJson };
}

TestController.prototype.getRoute = function()
{
    return route;
}

TestController.prototype.showTime = function(response, json, query)
{
    response.writeHead(200, {'Content-Type': 'text/html'});
    loadHtml(response, './HTML/test.html', null);
}

TestController.prototype.getJson = function(response, json, query)
{
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(getUnixtimeJson()));
}

function Item(title, start, end) {
    this.title = title;
    this.start = start;
    this.end = end;
}

function getUnixtimeJson()
{
    var asd = new Item("Kisper", "2015-12-12T10:30:00-05:00", "2015-12-12T12:30:00-05:00");
    var asd2 = new Item("Kispers", "2015-12-15T10:30:00-05:00", "2015-12-15T12:30:00-05:00");
    var lol = new Array();
    lol.push(asd);
    lol.push(asd2);
    return JSON.stringify(lol);
}

module.exports = TestController;