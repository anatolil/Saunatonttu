//Using
var wyliodrin = require("wyliodrin");

var route;

function LedController()
{
    route = {"/post/ledblink": LedController.prototype.blinkLed};
    wyliodrin.pinMode (0, 1);
}

LedController.prototype.getRoute = function()
{
    return route;
}

LedController.prototype.blinkLed = function(response, json, query)
{
    if (json['led'] == 0) {
        wyliodrin.digitalWrite (0, 0);
    }
    else if (json['led'] == 1) {
        wyliodrin.digitalWrite (0, 1);
    }

    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('ok!');
}

module.exports = LedController;