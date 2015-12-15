var Worker = require('webworker-threads').Worker;

var SerialPort = require("serialport");
var serialport = new SerialPort.SerialPort("/dev/ttyACM0", {
    baudrate: 9600,
    parser: SerialPort.parsers.readline("\n")
}, false);

var currentTemperature;

var worker = new Worker(function ()
{
    serialport.open(function (error) {
        if (error) {
            postMessage('Serial port error');
        }
        else {
            serialport.on('data', function (data) {
                if (data.match(/(\d{2}\.\d{2})/)) {
                    currentTemperature = data.trim();
                    postMessage(currentTemperature);
                }
            });
        }
     });
});

worker.onmessage = function(event)
{
    console.log(event.data);
    currentTemperature = event.data;
};

module.exports = function () {
    return currentTemperature;
};