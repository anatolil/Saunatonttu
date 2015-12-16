var fs = require('fs');
var wyliodrin = require("wyliodrin");

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
                temperature = data.trim()
                if (Math.abs(temperature - currentTemperature) < 3) {
                    currentTemperature = temperature;
                    fs.writeFileSync('temperature.txt', temperature, 'utf8');
                    
                    temperatureGoal = fs.readFileSync('temperatureGoal.txt', 'utf8');
                    if (temperature > temperatureGoal + 5) {
                        wyliodrin.pinMode (0, 0);
                    }
                    else if (temperature < temperatureGoal - 5) {
                        wyliodrin.pinMode (0, 1);
                    }
                }
            }
        });
    }
 });