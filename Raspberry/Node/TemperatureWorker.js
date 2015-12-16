var fs = require('fs');

var SerialPort = require("serialport");
var serialport = new SerialPort.SerialPort("/dev/ttyACM0", {
    baudrate: 9600,
    parser: SerialPort.parsers.readline("\n")
}, false);

var currentTemperature;

serialport.open(function (error) {
    if (error) {
        console.log('Serial port error');
    }
    else {
        serialport.on('data', function (data) {
            if (data.match(/(\d{2}\.\d{2})/)) {
                currentTemperature = event.data.trim();
                console.log(currentTemperature);
                fs.writeFileSync('temperature.txt', currentTemperature);
            }
        });
    }
 });