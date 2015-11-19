var fs = require('fs');
var SerialPort = require("serialport");
var serialport = new SerialPort.SerialPort("/dev/ttyACM0", {
    baudrate: 9600,
    parser: SerialPort.parsers.readline("\n")
}, false);

var route;

function TemperatureController()
{
    route = "/get/temperature";
}

TemperatureController.prototype.getRoute = function()
{
    return route;
}

TemperatureController.prototype.action = function (response, json, query)
{
    serialport.open(function (error) {
        if (error) {
            response.writeHead(418, {'Content-Type': 'plain/text'});
            response.end(error);
        }
        else {
            serialport.on('data', function (data) {
                if (data.match(/(\d{2}\.\d{2})/)) {
                    response.writeHead(200, {'Content-Type': 'application/json'});
                    var jsonResponse = JSON.stringify({ temperature: data.trim() });
                    response.end(jsonResponse);
                    serialport.close();
                }
                else {
                    console.log(data);
                }
            });
        }
     });
}

module.exports = TemperatureController;
