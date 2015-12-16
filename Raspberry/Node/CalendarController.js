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

function CalendarController()
{
    route = { "/get/calendar": CalendarController.prototype.showTime, "/get/getEvents": CalendarController.prototype.getJson, "/post/saveEvent": CalendarController.prototype.saveEvent, "/post/editEvent": CalendarController.prototype.editEvent, "/post/removeEvent": CalendarController.prototype.removeEvent };
}

CalendarController.prototype.getRoute = function()
{
    return route;
}

CalendarController.prototype.showTime = function(response, json, query)
{
    response.writeHead(200, {'Content-Type': 'text/html'});
    loadHtml(response, './HTML/calendar.html', null);
}

CalendarController.prototype.getJson = function(response, json, query)
{
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(getEventsJson());
}

CalendarController.prototype.saveEvent = function(response, json, query)
{
    events.push(new Event(json['title'], json['start'], json['end']));
    response.end();
}

CalendarController.prototype.editEvent = function(response, json, query)
{
    for (var i = 0; i < events.length; i++) {
        if (events[i].id === json['id']) {
            events[i].title = json['title'];
            events[i].start = json['start'];
            events[i].end = json['end'];
            break;
        }
    }
    response.end();
}

CalendarController.prototype.removeEvent = function(response, json, query)
{
    //console.log(json['id']-1);
    //events.splice(json['id']-1, 1);

    for(var i = 0; i < events.length; i++) {
        if (events[i].title == json['title'] && events[i].start == json['start'] && events[i].end == json['end']) {
            events.splice(i, 1);
        }
        response.end();
    }
}

function getEventsJson()
{
    return JSON.stringify(events);
}

module.exports = CalendarController;
