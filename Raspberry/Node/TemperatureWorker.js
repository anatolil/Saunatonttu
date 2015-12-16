var fs = require('fs');

var SerialPort = require("serialport");
var serialport = new SerialPort.SerialPort("/dev/ttyACM0", {
    baudrate: 9600,
    parser: SerialPort.parsers.readline("\n")
}, false);

serialport.open(function (error) {
    if (error) {
        console.log('Serial port error');
    }
    else {
        serialport.on('data', function (data) {
            if (data.match(/(\d{2}\.\d{2})/)) {
                fs.writeFileSync('temperature.txt', data.trim(), 'utf8');
            }
        });
    }
 });