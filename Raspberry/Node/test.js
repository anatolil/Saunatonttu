var loadHtml = require('./HtmlLoader.js');

var route;
var events = new Array();

function Event(title, start, end) 
{
    this.id = events.length + 1;
    this.title = title;
    this.start = start;
    this.end = end;
    this.overlap = false;
}

function TestController()
{
    route = { "/get/test": TestController.prototype.showTime, "/get/getEvents": TestController.prototype.getJson, "/post/saveEvent": TestController.prototype.saveEvent, "/post/editEvent": TestController.prototype.editEvent };
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
    response.end(getEventsJson());
}

TestController.prototype.saveEvent = function(response, json, query)
{
    events.push(new Event(json['title'], json['start'], json['end']));
}

TestController.prototype.editEvent = function(response, json, query)
{
    for(var i = 0; i < events.length; i++)
    {        
        if(events[i].id === json['id'])
        {
            events[i].title = json['title'];
            events[i].start = json['start']; 
            events[i].end = json['end'];
            break;
        }
    }
}

function getEventsJson()
{
    return JSON.stringify(events);
}

module.exports = TestController;